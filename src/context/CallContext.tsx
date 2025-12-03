import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, CallState } from '../types';

interface CallContextType extends CallState {
    startCall: (roomId: string, remoteUser: User) => void;
    endCall: () => void;
    toggleMic: () => void;
    toggleCamera: () => void;
    updateCallDuration: (duration: number) => void;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

export const CallProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, setState] = useState<CallState>({
        status: 'idle',
        roomId: null,
        remoteUser: null,
        isMicMuted: false,
        isCameraEnabled: true,
        callDuration: 0,
    });

    const startCall = (roomId: string, remoteUser: User) => {
        setState({
            status: 'calling',
            roomId,
            remoteUser,
            isMicMuted: false,
            isCameraEnabled: true,
            callDuration: 0,
        });
    };

    const endCall = () => {
        setState({
            status: 'ended',
            roomId: null,
            remoteUser: null,
            isMicMuted: false,
            isCameraEnabled: true,
            callDuration: 0,
        });
        // Reset to idle after a short delay
        setTimeout(() => {
            setState(prev => ({ ...prev, status: 'idle' }));
        }, 1000);
    };

    const toggleMic = () => {
        setState(prev => ({
            ...prev,
            isMicMuted: !prev.isMicMuted,
        }));
    };

    const toggleCamera = () => {
        setState(prev => ({
            ...prev,
            isCameraEnabled: !prev.isCameraEnabled,
        }));
    };

    const updateCallDuration = (duration: number) => {
        setState(prev => ({
            ...prev,
            callDuration: duration,
        }));
    };

    return (
        <CallContext.Provider
            value={{
                ...state,
                startCall,
                endCall,
                toggleMic,
                toggleCamera,
                updateCallDuration,
            }}>
            {children}
        </CallContext.Provider>
    );
};

export const useCall = () => {
    const context = useContext(CallContext);
    if (!context) {
        throw new Error('useCall must be used within CallProvider');
    }
    return context;
};
