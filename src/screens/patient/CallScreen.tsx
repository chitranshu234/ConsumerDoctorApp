import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, PermissionsAndroid, Platform } from 'react-native';
import { ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ZEGO_APP_ID, ZEGO_APP_SIGN } from '../../constants/config';

const CallScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { remoteUser } = route.params || { remoteUser: { name: 'Dr. Prem' } };

    const [isCallActive, setIsCallActive] = useState(true);

    useEffect(() => {
        const checkPermissions = async () => {
            if (Platform.OS === 'android') {
                await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                ]);
            }
        };
        checkPermissions();
    }, []);

    // Generate a random user ID for the patient
    const randomUserID = String(Math.floor(Math.random() * 100000));
    const userName = 'Jay';
    const callID = route.params?.callID || 'demo_test_room_123';

    const handleCallEnd = (reason: string) => {
        setIsCallActive(false); // Force unmount immediately
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{
                    name: 'CallEnded',
                    params: {
                        reason: reason,
                        doctor: { name: remoteUser.name, image: 'https://i.pravatar.cc/150?u=doctor1' }
                    }
                }],
            });
        }, 1000);
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            {isCallActive ? (
                <ZegoUIKitPrebuiltCall
                    key={callID}
                    appID={ZEGO_APP_ID}
                    appSign={ZEGO_APP_SIGN}
                    userID={randomUserID}
                    userName={userName}
                    callID={callID}
                    config={{
                        ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
                        turnOnMicrophoneWhenJoining: true,
                        turnOnCameraWhenJoining: true,
                        useSpeakerphone: true,
                        audioVideoViewConfig: {
                            showMicrophoneStateOnView: true,
                            showCameraStateOnView: true,
                        },
                        onHangUp: () => {
                            console.log('Local user hung up');
                            handleCallEnd('normal');
                        },
                        onOnlySelfInRoom: () => {
                            console.log('Remote user hung up');
                            handleCallEnd('remote_ended');
                        },
                    }}
                />
            ) : (
                <View style={{ flex: 1, backgroundColor: '#000' }} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
});

export default CallScreen;
