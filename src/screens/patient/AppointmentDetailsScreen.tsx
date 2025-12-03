import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Appointment } from '../../services/MockDataService';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

type RootStackParamList = {
    AppointmentDetails: { appointment: Appointment };
    VideoCall: { roomId: string; remoteUser: { id: string; name: string } };
};

type AppointmentDetailsRouteProp = RouteProp<RootStackParamList, 'AppointmentDetails'>;

const ExpandableSection = ({ title, children, expanded, onPress }: any) => {
    return (
        <View style={styles.sectionContainer}>
            <TouchableOpacity style={styles.sectionHeader} onPress={onPress}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <Icon
                    name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    size={24}
                    color={Colors.text}
                />
            </TouchableOpacity>
            {expanded && <View style={styles.sectionContent}>{children}</View>}
        </View>
    );
};

const AppointmentDetailsScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<AppointmentDetailsRouteProp>();
    const { appointment } = route.params;

    const [expandedSection, setExpandedSection] = useState<string | null>('Appointment Details');

    const toggleSection = (section: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedSection(expandedSection === section ? null : section);
    };

    const doctorImage = appointment.doctorImage || 'https://i.pravatar.cc/150?u=doctor1';

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Appointment Details</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Doctor Profile Card */}
                <View style={styles.doctorCard}>
                    <Image source={{ uri: doctorImage }} style={styles.doctorImage} />
                    <View style={styles.doctorInfoRow}>
                        <Text style={styles.doctorLabel}>Doctor name</Text>
                        <Text style={styles.doctorNameSeparator}>:</Text>
                        <Text style={styles.doctorName}>{appointment.doctorName}</Text>
                    </View>
                </View>

                {/* Sections */}
                <ExpandableSection
                    title="Appointment Details"
                    expanded={expandedSection === 'Appointment Details'}
                    onPress={() => toggleSection('Appointment Details')}
                >
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Appointment ID</Text>
                        <Text style={styles.detailSeparator}>:</Text>
                        <Text style={styles.detailValue}>APPLF10247816</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Appointment type</Text>
                        <Text style={styles.detailSeparator}>:</Text>
                        <Text style={styles.detailValue}>Freeaudio</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Appointment fee</Text>
                        <Text style={styles.detailSeparator}>:</Text>
                        <Text style={styles.detailValue}>0 INR</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Duration</Text>
                        <Text style={styles.detailSeparator}>:</Text>
                        <Text style={styles.detailValue}>1 min</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Appointment date</Text>
                        <Text style={styles.detailSeparator}>:</Text>
                        <Text style={styles.detailValue}>{appointment.date}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Appointment time</Text>
                        <Text style={styles.detailSeparator}>:</Text>
                        <Text style={styles.detailValue}>{appointment.time}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Booking Status</Text>
                        <Text style={styles.detailSeparator}>:</Text>
                        <Text style={styles.detailValue}>{appointment.status === 'upcoming' ? 'Confirmed' : 'Completed'}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Routine status</Text>
                        <Text style={styles.detailSeparator}>:</Text>
                        <Text style={styles.detailValue}>Not assigned</Text>
                    </View>
                </ExpandableSection>

                <ExpandableSection
                    title="Symptoms Details"
                    expanded={expandedSection === 'Symptoms Details'}
                    onPress={() => toggleSection('Symptoms Details')}
                >
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Symptoms</Text>
                        <Text style={styles.detailSeparator}>:</Text>
                        <Text style={styles.detailValue}>Anxiety</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Description</Text>
                        <Text style={styles.detailSeparator}>:</Text>
                        <Text style={styles.detailValue}>N/A</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Severity</Text>
                        <Text style={styles.detailSeparator}>:</Text>
                        <Text style={styles.detailValue}>Moderate</Text>
                    </View>
                </ExpandableSection>

                <ExpandableSection
                    title="Coupons Details"
                    expanded={expandedSection === 'Coupons Details'}
                    onPress={() => toggleSection('Coupons Details')}
                >
                    <Text style={styles.placeholderText}>No coupons applied</Text>
                </ExpandableSection>

                <ExpandableSection
                    title="Booking Details"
                    expanded={expandedSection === 'Booking Details'}
                    onPress={() => toggleSection('Booking Details')}
                >
                    <Text style={styles.placeholderText}>Booking details here</Text>
                </ExpandableSection>

                <ExpandableSection
                    title="medical Report"
                    expanded={expandedSection === 'medical Report'}
                    onPress={() => toggleSection('medical Report')}
                >
                    <Text style={styles.placeholderText}>No reports available</Text>
                </ExpandableSection>

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
    content: {
        padding: Spacing.lg,
    },
    doctorCard: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.xl,
        alignItems: 'center',
        marginBottom: Spacing.lg,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    doctorImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: Spacing.lg,
    },
    doctorInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: Spacing.md,
    },
    doctorLabel: {
        ...Typography.body,
        color: Colors.textSecondary,
        flex: 1,
    },
    doctorNameSeparator: {
        ...Typography.body,
        color: Colors.text,
        marginHorizontal: Spacing.sm,
    },
    doctorName: {
        ...Typography.body,
        fontWeight: '600',
        color: Colors.text,
        flex: 1,
        textAlign: 'right',
    },
    sectionContainer: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
        overflow: 'hidden',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.md,
    },
    sectionTitle: {
        ...Typography.body,
        fontSize: 18,
        color: Colors.text,
    },
    sectionContent: {
        padding: Spacing.md,
        paddingTop: 0,
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: Spacing.md,
    },
    detailLabel: {
        ...Typography.caption,
        color: Colors.textSecondary,
        flex: 1,
        fontSize: 14,
    },
    detailSeparator: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginHorizontal: Spacing.sm,
    },
    detailValue: {
        ...Typography.body,
        color: Colors.text,
        fontWeight: '600',
        flex: 1.5,
        fontSize: 14,
    },
    placeholderText: {
        ...Typography.caption,
        color: Colors.textSecondary,
        fontStyle: 'italic',
    },
});

export default AppointmentDetailsScreen;
