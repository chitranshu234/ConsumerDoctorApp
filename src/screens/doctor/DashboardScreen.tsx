import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Image,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { getAppointments, Appointment } from '../../services/MockDataService';

const DoctorDashboardScreen = () => {
    const { user } = useAuth();
    const navigation = useNavigation<any>();
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        loadAppointments();
    }, []);

    const loadAppointments = async () => {
        const data = await getAppointments();
        // Filter for doctor's appointments (mock logic)
        setAppointments(data.filter(a => a.status === 'upcoming'));
    };

    const renderStatCard = (title: string, value: string, icon: string, color: string) => (
        <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
                <Icon name={icon} size={24} color={color} />
            </View>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statTitle}>{title}</Text>
        </View>
    );

    const renderAppointmentItem = ({ item }: { item: Appointment }) => (
        <TouchableOpacity
            style={styles.appointmentCard}
            onPress={() => navigation.navigate('AppointmentDetails', { appointment: item })}
        >
            <View style={styles.appointmentHeader}>
                <Text style={styles.patientName}>Patient: John Doe</Text>
                {/* Mock patient name as it's not in Appointment type yet */}
                <View style={[styles.typeBadge, item.type === 'video' ? styles.videoBadge : styles.personBadge]}>
                    <Icon
                        name={item.type === 'video' ? 'videocam' : 'person'}
                        size={14}
                        color={item.type === 'video' ? Colors.primary : Colors.textSecondary}
                    />
                    <Text style={[styles.typeText, item.type === 'video' ? styles.videoText : styles.personText]}>
                        {item.type === 'video' ? 'Video' : 'Visit'}
                    </Text>
                </View>
            </View>
            <View style={styles.appointmentInfo}>
                <View style={styles.infoRow}>
                    <Icon name="event" size={16} color={Colors.textSecondary} />
                    <Text style={styles.infoText}>{item.date}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Icon name="access-time" size={16} color={Colors.textSecondary} />
                    <Text style={styles.infoText}>{item.time}</Text>
                </View>
            </View>
            <View style={styles.actions}>
                {item.type === 'video' && (
                    <TouchableOpacity style={styles.joinButton}>
                        <Text style={styles.joinButtonText}>Join Call</Text>
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Hello,</Text>
                        <Text style={styles.doctorName}>Dr. {user?.name || 'Smith'}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                        <Icon name="notifications-none" size={28} color={Colors.text} />
                        <View style={styles.badge} />
                    </TouchableOpacity>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsContainer}>
                    {renderStatCard('Patients', '1.2k', 'people', Colors.primary)}
                    {renderStatCard('Experience', '10 Yrs', 'workspace-premium', Colors.warning)}
                    {renderStatCard('Rating', '4.8', 'star', Colors.success)}
                    {renderStatCard('Reviews', '450', 'rate-review', Colors.secondary)}
                </View>

                {/* Upcoming Appointments */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('ScheduleTab')}>
                            <Text style={styles.seeAllText}>See all</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={appointments}
                        renderItem={renderAppointmentItem}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                        contentContainerStyle={styles.list}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.lg,
    },
    greeting: {
        ...Typography.body,
        color: Colors.textSecondary,
    },
    doctorName: {
        ...Typography.heading,
        fontSize: 24,
        color: Colors.text,
    },
    badge: {
        position: 'absolute',
        top: 2,
        right: 2,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.danger,
        borderWidth: 1,
        borderColor: Colors.surface,
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: Spacing.md,
        justifyContent: 'space-between',
    },
    statCard: {
        width: '48%',
        backgroundColor: Colors.surface,
        padding: Spacing.md,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.md,
        alignItems: 'center',
        // ...Shadows.sm,
    },
    statIcon: {
        width: 40,
        height: 40,
        borderRadius: BorderRadius.round,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    statValue: {
        ...Typography.heading,
        fontSize: 20,
        color: Colors.text,
    },
    statTitle: {
        ...Typography.caption,
        color: Colors.textSecondary,
    },
    section: {
        padding: Spacing.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    sectionTitle: {
        ...Typography.heading,
        fontSize: 18,
        color: Colors.text,
    },
    seeAllText: {
        ...Typography.body,
        color: Colors.primary,
        fontWeight: '600',
    },
    list: {
        paddingBottom: Spacing.xl,
    },
    appointmentCard: {
        backgroundColor: Colors.surface,
        padding: Spacing.md,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.md,
        // ...Shadows.sm,
    },
    appointmentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    patientName: {
        ...Typography.body,
        fontWeight: '600',
        color: Colors.text,
    },
    typeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: BorderRadius.sm,
    },
    videoBadge: {
        backgroundColor: Colors.primary + '10',
    },
    personBadge: {
        backgroundColor: Colors.textSecondary + '10',
    },
    typeText: {
        ...Typography.caption,
        fontWeight: '600',
        marginLeft: 4,
    },
    videoText: {
        color: Colors.primary,
    },
    personText: {
        color: Colors.textSecondary,
    },
    appointmentInfo: {
        flexDirection: 'row',
        marginBottom: Spacing.md,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: Spacing.lg,
    },
    infoText: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginLeft: 4,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    joinButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 6,
        paddingHorizontal: Spacing.md,
        borderRadius: BorderRadius.md,
    },
    joinButtonText: {
        ...Typography.caption,
        color: Colors.surface,
        fontWeight: '600',
    },
});

export default DoctorDashboardScreen;
