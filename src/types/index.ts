export interface User {
    id: string;
    name: string;
    email: string;
    role: 'patient' | 'doctor';
}

export interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
}

export interface Doctor {
    id: string;
    name: string;
    specialization: string;
    image: string;
    rating: number;
    reviews: number;
    experience: number;
    about: string;
    price: number;
}

export interface Appointment {
    id: string;
    doctorId: string;
    doctorName: string;
    doctorImage: string;
    doctorSpecialization: string;
    patientName?: string;
    date: string;
    time: string;
    status: 'upcoming' | 'completed' | 'cancelled';
    type: 'video' | 'audio' | 'visit';
    fee?: string;
}

export type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
    PatientApp: undefined;
    DoctorApp: undefined;
    CallScreen: { remoteUser: { name: string; image?: string; id?: string }; callID?: string };
    DoctorCallScreen: { remoteUser: { name: string; image?: string; id?: string }; callID?: string };
    CallEnded: { reason: string; doctor: { name: string; image: string } };
    DoctorCallEnded: { patient: { name: string; image?: string }; reason: string };
};

export interface CallState {
    status: 'idle' | 'calling' | 'connected' | 'ended';
    roomId: string | null;
    remoteUser: User | null;
    isMicMuted: boolean;
    isCameraEnabled: boolean;
    callDuration: number;
}
