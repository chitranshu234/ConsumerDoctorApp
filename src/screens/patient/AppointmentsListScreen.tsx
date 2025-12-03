import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAppointments, Appointment } from '../../services/MockDataService';
import { useNavigation } from '@react-navigation/native';

const AppointmentsListScreen = () => {
    const navigation = useNavigation<any>();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [activeTab, setActiveTab] = useState<'Appointments' | 'Orders'>('Appointments');
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

    useEffect(() => {
        loadAppointments();
    }, []);

    const loadAppointments = async () => {
        const data = await getAppointments();
        setAppointments(data);
    };

    const handleStartCall = (appointment: Appointment) => {
        setSelectedAppointment(appointment);
        setShowDisclaimer(true);
    };

    const handleProceedCall = () => {
        setShowDisclaimer(false);
        if (selectedAppointment) {
            // Generate a unique call ID
            const callID = `patient_call_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

            navigation.navigate('CallScreen', {
                remoteUser: {
                    id: selectedAppointment.doctorId,
                    name: selectedAppointment.doctorName,
                },
                callID: callID
            });
        }
    };

    const renderAppointmentCard = ({ item }: { item: Appointment }) => {
        const isUpcoming = item.status === 'upcoming';
        const isCompleted = item.status === 'completed';

        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.doctorName}>{item.doctorName}</Text>
                    {isUpcoming && <View style={styles.upcomingBadge}><Text style={styles.upcomingText}>Upcoming</Text></View>}
                    {isCompleted && <View style={styles.completedBadge}><Text style={styles.completedText}>Completed</Text></View>}
                </View>

                <Text style={styles.specialization}>{item.doctorSpecialization}</Text>

                <View style={styles.cardBody}>
                    <Image source={{ uri: item.doctorImage || 'https://i.pravatar.cc/150?u=doctor1' }} style={styles.doctorImage} />

                    <View style={styles.dateTimeContainer}>
                        <View style={styles.dateTimeRow}>
                            <Icon name="event" size={16} color={Colors.textSecondary} />
                            <Text style={styles.dateTimeText}>{item.date}</Text>
                        </View>
                        <View style={styles.dateTimeRow}>
                            <Icon name="access-time" size={16} color={Colors.textSecondary} />
                            <Text style={styles.dateTimeText}>{item.time}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.cardFooter}>
                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => navigation.navigate('AppointmentDetails', { appointment: item })}
                    >
                        <Text style={styles.secondaryButtonText}>View Details</Text>
                    </TouchableOpacity>

                    {isUpcoming && (
                        <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={() => handleStartCall(item)}
                        >
                            <Text style={styles.primaryButtonText}>Start Call</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.title}>My Bookings</Text>
            </View>

            <View style={styles.tabsContainer}>
                <View style={styles.tabs}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'Appointments' && styles.activeTab]}
                        onPress={() => setActiveTab('Appointments')}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === 'Appointments' && styles.activeTabText,
                            ]}
                        >
                            Appointments
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'Orders' && styles.activeTab]}
                        onPress={() => setActiveTab('Orders')}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === 'Orders' && styles.activeTabText,
                            ]}
                        >
                            Orders
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.filterText}>Filter Appointments</Text>
                    <Icon name="filter-list" size={20} color={Colors.text} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={appointments}
                renderItem={renderAppointmentCard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No appointments found</Text>
                    </View>
                }
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
        backgroundColor: Colors.background,
    },
    header: {
        padding: Spacing.lg,
        paddingBottom: Spacing.md,
    },
    backButton: {
        marginBottom: Spacing.md,
    },
    title: {
        ...Typography.heading,
        fontSize: 32,
        color: Colors.text,
    },
    tabsContainer: {
        paddingHorizontal: Spacing.lg,
        marginBottom: Spacing.md,
    },
    tabs: {
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        borderRadius: BorderRadius.lg,
        padding: 4,
        marginBottom: Spacing.md,
    },
    tab: {
        flex: 1,
        paddingVertical: Spacing.sm,
        alignItems: 'center',
        borderRadius: BorderRadius.md,
    },
    activeTab: {
        backgroundColor: Colors.text, // Black
    },
    tabText: {
        ...Typography.body,
        color: Colors.textSecondary,
        fontWeight: '600',
    },
    activeTabText: {
        color: Colors.surface, // White
    },
    filterButton: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    filterText: {
        ...Typography.caption,
        color: Colors.text,
        fontWeight: '600',
        marginRight: 4,
    },
    list: {
        padding: Spacing.lg,
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.lg,
        // ...Shadows.sm,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    doctorName: {
        ...Typography.body,
        fontWeight: '600',
        color: Colors.text,
        fontSize: 16,
    },
    upcomingBadge: {
        backgroundColor: '#FFF3E0', // Light Orange
        paddingHorizontal: Spacing.sm,
        paddingVertical: 2,
        borderRadius: BorderRadius.sm,
    },
    upcomingText: {
        ...Typography.caption,
        color: '#FF9800', // Orange
        fontWeight: '600',
    },
    completedBadge: {
        backgroundColor: '#E8F5E9', // Light Green
        paddingHorizontal: Spacing.sm,
        paddingVertical: 2,
        borderRadius: BorderRadius.sm,
    },
    completedText: {
        ...Typography.caption,
        color: Colors.success,
        fontWeight: '600',
    },
    specialization: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: Spacing.md,
    },
    cardBody: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    doctorImage: {
        width: 50,
        height: 50,
        borderRadius: BorderRadius.md,
        marginRight: Spacing.md,
    },
    dateTimeContainer: {
        justifyContent: 'center',
    },
    dateTimeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    dateTimeText: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginLeft: 8,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Spacing.sm,
    },
    secondaryButton: {
        flex: 1,
        marginRight: Spacing.sm,
        paddingVertical: Spacing.sm,
        alignItems: 'center',
    },
    secondaryButtonText: {
        ...Typography.body,
        color: '#3A5F40', // Dark green text
        fontWeight: '600',
    },
    primaryButton: {
        flex: 1,
        backgroundColor: '#3A5F40', // Dark green
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
    },
    primaryButtonText: {
        ...Typography.body,
        color: Colors.surface,
        fontWeight: '600',
    },
    emptyState: {
        padding: Spacing.xl,
        alignItems: 'center',
    },
    emptyText: {
        ...Typography.body,
        color: Colors.textSecondary,
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
        lineHeight: 22,
    },
    linkText: {
        color: '#3A5F40',
        fontWeight: '600',
    },
    modalPrimaryButton: {
        backgroundColor: '#3A5F40',
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
        fontSize: 16,
    },
    modalSecondaryButton: {
        backgroundColor: Colors.surface,
        width: '100%',
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#3A5F40',
    },
    modalSecondaryButtonText: {
        ...Typography.body,
        color: '#3A5F40',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default AppointmentsListScreen;
