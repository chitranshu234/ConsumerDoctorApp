import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const DoctorAppointmentDetailsScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { appointment } = route.params || { appointment: { patientName: 'JAY PATIL', id: '1' } };

    const [expandedSection, setExpandedSection] = useState<string | null>('Appointment Details');

    const toggleSection = (section: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedSection(expandedSection === section ? null : section);
    };

    const renderSectionHeader = (title: string) => (
        <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection(title)}
        >
            <Text style={styles.sectionTitle}>{title}</Text>
            <Icon
                name={expandedSection === title ? "keyboard-arrow-up" : "keyboard-arrow-right"}
                size={24}
                color={Colors.text}
            />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Appointments Details</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Patient Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>JP</Text>
                    </View>
                    <View style={styles.profileRow}>
                        <Text style={styles.profileLabel}>Patient name</Text>
                        <Text style={styles.profileValue}>: {appointment.patientName.toUpperCase()}</Text>
                    </View>
                </View>

                {/* Appointment Details Section */}
                <View style={styles.sectionContainer}>
                    {renderSectionHeader('Appointment Details')}
                    {expandedSection === 'Appointment Details' && (
                        <View style={styles.sectionContent}>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Patient name</Text>
                                <Text style={styles.detailValue}>: APPLF112349087</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Appointment Type</Text>
                                <Text style={styles.detailValue}>: Free Audio</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Appointment fee</Text>
                                <Text style={styles.detailValue}>: 0 INR</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Appointment paid</Text>
                                <Text style={styles.detailValue}>: 0 INR</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Appointment date</Text>
                                <Text style={styles.detailValue}>: 16 Dec, 2024</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Appointment time</Text>
                                <Text style={styles.detailValue}>: 03:29 PM</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Booking Status</Text>
                                <Text style={styles.detailValue}>: Doctor-No-Show</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Routine Status</Text>
                                <Text style={styles.detailValue}>: Not Assigned</Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* Other Sections (Collapsed by default) */}
                <View style={styles.sectionContainer}>
                    {renderSectionHeader('Symptom Details')}
                </View>
                <View style={styles.sectionContainer}>
                    {renderSectionHeader('Coupon Details')}
                </View>
                <View style={styles.sectionContainer}>
                    {renderSectionHeader('Booking Details')}
                </View>
                <View style={styles.sectionContainer}>
                    {renderSectionHeader('Medical Reports')}
                </View>
                <View style={styles.sectionContainer}>
                    {renderSectionHeader('Add Prescription')}
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
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Spacing.lg,
        backgroundColor: '#E8F5E9', // Light green header background
        borderBottomLeftRadius: BorderRadius.xl,
        borderBottomRightRadius: BorderRadius.xl,
        paddingBottom: Spacing.xl,
    },
    headerTitle: {
        ...Typography.heading,
        fontSize: 20,
        color: Colors.text,
    },
    content: {
        padding: Spacing.lg,
    },
    profileCard: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.xl,
        padding: Spacing.xl,
        alignItems: 'center',
        marginBottom: Spacing.lg,
        // ...Shadows.sm,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFCC80', // Light orange
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    avatarText: {
        ...Typography.heading,
        fontSize: 32,
        color: Colors.surface,
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: Spacing.lg,
    },
    profileLabel: {
        ...Typography.body,
        color: Colors.textSecondary,
        width: 100,
    },
    profileValue: {
        ...Typography.body,
        color: Colors.text,
        fontWeight: '600',
    },
    sectionContainer: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.md,
        // ...Shadows.sm,
        borderWidth: 1,
        borderColor: Colors.border,
        overflow: 'hidden',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.lg,
    },
    sectionTitle: {
        ...Typography.body,
        fontWeight: '600',
        color: Colors.text,
        fontSize: 16,
    },
    sectionContent: {
        padding: Spacing.lg,
        paddingTop: 0,
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: Spacing.md,
    },
    detailLabel: {
        ...Typography.caption,
        color: Colors.textSecondary,
        width: 140,
        fontSize: 14,
    },
    detailValue: {
        ...Typography.caption,
        color: Colors.text,
        fontWeight: '500',
        flex: 1,
        fontSize: 14,
    },
});

export default DoctorAppointmentDetailsScreen;
