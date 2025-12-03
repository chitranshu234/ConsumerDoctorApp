import { Doctor, Appointment } from '../types';

export const getDoctors = async (): Promise<Doctor[]> => {
    return [
        {
            id: '1',
            name: 'Dr. Prem',
            specialization: 'Gynecologist',
            image: 'https://i.pravatar.cc/150?u=doctor1',
            rating: 4.8,
            reviews: 120,
            experience: 12,
            about: 'Expert in gynecology with over 12 years of experience.',
            price: 15,
        },
        {
            id: '2',
            name: 'Dr. Sarah',
            specialization: 'Cardiologist',
            image: 'https://i.pravatar.cc/150?u=doctor2',
            rating: 4.9,
            reviews: 80,
            experience: 8,
            about: 'Heart specialist committed to patient care.',
            price: 20,
        },
    ];
};

export const getAppointments = async (): Promise<Appointment[]> => {
    return [
        {
            id: '1',
            doctorId: '1',
            doctorName: 'Dr. Prem',
            doctorImage: 'https://i.pravatar.cc/150?u=doctor1',
            doctorSpecialization: 'Gynecologist',
            date: '2023-11-20',
            time: '10:00 AM',
            status: 'upcoming',
            type: 'video',
        },
        {
            id: '2',
            doctorId: '2',
            doctorName: 'Dr. Sarah',
            doctorImage: 'https://i.pravatar.cc/150?u=doctor2',
            doctorSpecialization: 'Cardiologist',
            date: '2023-10-15',
            time: '02:00 PM',
            status: 'completed',
            type: 'audio',
        },
    ];
};

export type { Doctor, Appointment };
