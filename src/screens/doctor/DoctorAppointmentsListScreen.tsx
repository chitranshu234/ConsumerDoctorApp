import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image,
    Modal,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

// Mock Data for Doctor Appointments
const MOCK_APPOINTMENTS = [
    {
        id: '1',
        patientName: 'Jay',
        concern: 'Hairfall',
        status: 'Booked-Paid',
        date: 'Tuesday, 13/09/2023',
        time: '10:30 AM',
        fee: '800',
        type: 'Video',
        image: 'https://i.pravatar.cc/150?u=jay',
    },
    {
        id: '2',
        patientName: 'Aliana Sen',
        concern: 'Hairfall',
        status: 'Booked-Paid',
        date: 'Tuesday, 13/09/2023',
        time: '10:30 AM',
        fee: '800',
        type: 'Video',
        image: 'https://i.pravatar.cc/150?u=aliana',
    },
    {
        id: '3',
        patientName: 'David John',
        concern: 'Skin Rash',
        status: 'Booked-Paid',
        date: 'Wednesday, 14/09/2023',
        time: '11:00 AM',
        fee: '500',
        type: 'Audio',
        image: 'https://i.pravatar.cc/150?u=david',
    },
];

const DoctorAppointmentsListScreen = () => {
    const navigation = useNavigation<any>();
    const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

    const handleStartCall = (appointment: any) => {
        setSelectedAppointment(appointment);
        setShowDisclaimer(true);
    };

    const handleProceedCall = () => {
        setShowDisclaimer(false);
        if (selectedAppointment) {
            // Use deterministic call ID based on Doctor ID so both parties join the same room
            // In a real app, this would be the logged-in doctor's ID. 
            // Here we assume the appointment has the correct doctorId.
            // Fallback to '1' (Dr. Prem) if missing for safety in this mock.
            const doctorId = selectedAppointment.doctorId || '1';
            const callID = `call_${doctorId}`;

            // Navigate to Doctor Call Screen
            navigation.navigate('DoctorCallScreen', {
                remoteUser: {
                    name: selectedAppointment.patientName,
                    image: selectedAppointment.image,
                    id: selectedAppointment.id
                },
                callID: callID
            });
        }
    };

    const handleCancel = (id: string) => {
        // Handle cancel logic
        console.log('Cancel appointment', id);
    };

    const renderAppointmentCard = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DoctorAppointmentDetails', { appointment: item })}
        >
            <View style={styles.cardHeader}>
                <Image source={{ uri: item.image }} style={styles.patientImage} />
                <View style={styles.patientInfo}>
                    <Text style={styles.patientName}>{item.patientName}</Text>
                    <Text style={styles.concern}>{item.concern}</Text>
                </View>
            </View>

            <View style={styles.statusRow}>
                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
                <View style={styles.radioCircle} />
            </View>

            <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                    <Icon name="event" size={16} color={Colors.success} />
                    <Text style={styles.detailText}>{item.date}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Icon name="access-time" size={16} color={Colors.success} />
                    <Text style={styles.detailText}>{item.time}</Text>
                </View>
            </View>

            <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                    <Icon name="account-balance-wallet" size={16} color={Colors.success} />
                    <Text style={styles.detailText}>INR {item.fee}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Icon name="videocam" size={16} color={Colors.success} />
                    <Text style={styles.detailText}>{item.type}</Text>
                </View>
            </View>

            <View style={styles.actionsRow}>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => handleCancel(item.id)}
                >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.startButton}
                    onPress={() => handleStartCall(item)}
                >
                    <Text style={styles.startButtonText}>Start Call</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Appointments</Text>
                <TouchableOpacity style={styles.sortButton}>
                    <Icon name="swap-vert" size={24} color={Colors.text} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={appointments}
                renderItem={renderAppointmentCard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />

            {/* Disclaimer Modal */}
            <Modal
                visible={showDisclaimer}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowDisclaimer(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHandle} />

                        <Text style={styles.modalTitle}>Disclaimer</Text>

                        <Text style={styles.modalText}>
                            By continuing, you consent to this call being recorded for quality and support purposes. Please provide accurate details to help the doctor assist you effectively.
                            <Text style={styles.linkText}> Read Terms & Conditions...</Text>
                        </Text>

                        <TouchableOpacity style={styles.modalPrimaryButton} onPress={handleProceedCall}>
                            <Text style={styles.modalPrimaryButtonText}>Proceed</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.modalSecondaryButton} onPress={() => setShowDisclaimer(false)}>
                            <Text style={styles.modalSecondaryButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F5F1', // Light greenish background
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.lg,
        paddingTop: Spacing.xl,
    },
    title: {
        ...Typography.heading,
        fontSize: 28,
        color: Colors.text,
    },
    sortButton: {
        padding: Spacing.xs,
        backgroundColor: '#E8F5E9',
        borderRadius: BorderRadius.md,
    },
    list: {
        padding: Spacing.lg,
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.xl,
        padding: Spacing.lg,
        marginBottom: Spacing.lg,
        // ...Shadows.sm,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    patientImage: {
        width: 50,
        height: 50,
        borderRadius: BorderRadius.round, // Circle
        marginRight: Spacing.md,
        backgroundColor: '#E0E0E0',
    },
    patientInfo: {
        flex: 1,
    },
    patientName: {
        ...Typography.body,
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.text,
    },
    concern: {
        ...Typography.caption,
        color: Colors.textSecondary,
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    statusBadge: {
        backgroundColor: '#FFF3E0', // Light orange
        paddingHorizontal: Spacing.md,
        paddingVertical: 4,
        borderRadius: BorderRadius.lg,
    },
    statusText: {
        ...Typography.caption,
        color: '#FF9800', // Orange
        fontWeight: '600',
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.success,
        backgroundColor: Colors.surface,
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.sm,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '48%',
    },
    detailText: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginLeft: 8,
        fontWeight: '500',
    },
    actionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Spacing.md,
    },
    cancelButton: {
        flex: 1,
        marginRight: Spacing.md,
        paddingVertical: Spacing.md,
        alignItems: 'center',
        borderRadius: BorderRadius.lg,
        backgroundColor: Colors.surface,
    },
    cancelButtonText: {
        ...Typography.body,
        color: Colors.text,
        fontWeight: '600',
    },
    startButton: {
        flex: 1,
        backgroundColor: '#3A5F40', // Dark Green
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
    },
    startButtonText: {
        ...Typography.body,
        color: Colors.surface,
        fontWeight: '600',
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: Colors.surface,
        borderTopLeftRadius: BorderRadius.xl,
        borderTopRightRadius: BorderRadius.xl,
        padding: Spacing.lg,
        paddingBottom: Spacing.xxl,
        alignItems: 'center',
    },
    modalHandle: {
        width: 40,
        height: 4,
        backgroundColor: Colors.border,
        borderRadius: 2,
        marginBottom: Spacing.lg,
    },
    modalTitle: {
        ...Typography.heading,
        fontSize: 20,
        color: Colors.text,
        marginBottom: Spacing.md,
    },
    modalText: {
        ...Typography.body,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: Spacing.xl,
        lineHeight: 20,
    },
    linkText: {
        color: Colors.primary,
        fontWeight: '600',
    },
    modalPrimaryButton: {
        backgroundColor: '#3A5F40', // Dark green
        width: '100%',
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    modalPrimaryButtonText: {
        ...Typography.body,
        color: Colors.surface,
        fontWeight: '600',
    },
    modalSecondaryButton: {
        width: '100%',
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    modalSecondaryButtonText: {
        ...Typography.body,
        color: Colors.text,
        fontWeight: '600',
    },
});

export default DoctorAppointmentsListScreen;
