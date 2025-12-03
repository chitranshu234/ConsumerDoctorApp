import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const DoctorCallStatusScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { patient } = route.params || { patient: { name: 'Jay' } };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleCallAgain = () => {
        // Logic to retry call
        navigation.replace('DoctorCallScreen', { remoteUser: patient });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon name="close" size={24} color={Colors.text} />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <View style={styles.profileContainer}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>JP</Text>
                    </View>
                    <Text style={styles.patientName}>{patient.name}</Text>
                    <Text style={styles.concern}>Headache</Text>
                </View>

                <View style={styles.statusContainer}>
                    <Icon name="signal-cellular-alt" size={24} color={Colors.success} />
                    <Text style={styles.statusText}>Call Disconnected</Text>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Icon name="call" size={20} color={Colors.textSecondary} />
                        <Text style={styles.statLabel}>Consultation Duration</Text>
                        <Text style={styles.statValue}>00:00</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Icon name="account-balance-wallet" size={20} color={Colors.textSecondary} />
                        <Text style={styles.statLabel}>Total Amount Received</Text>
                        <Text style={styles.statValue}>₹ 0</Text>
                    </View>
                </View>

                {/* Not Available Card */}
                <View style={styles.warningCard}>
                    <Text style={styles.warningTitle}>User is not available</Text>
                    <Text style={styles.warningText}>
                        User is not picking up the call. wait or try again later
                    </Text>

                    <TouchableOpacity style={styles.secondaryButton} onPress={handleGoBack}>
                        <Text style={styles.secondaryButtonText}>Go Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.primaryButton} onPress={handleCallAgain}>
                        <Text style={styles.primaryButtonText}>Call Again</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        alignItems: 'flex-start',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.xl,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFCC80', // Light orange
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    avatarText: {
        ...Typography.heading,
        fontSize: 32,
        color: Colors.surface,
    },
    patientName: {
        ...Typography.heading,
        fontSize: 24,
        color: Colors.text,
        marginBottom: 4,
    },
    concern: {
        ...Typography.body,
        color: Colors.textSecondary,
    },
    statusContainer: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    statusText: {
        ...Typography.body,
        color: '#D32F2F', // Red
        fontWeight: '600',
        marginTop: Spacing.sm,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: Spacing.xxl,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statLabel: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginTop: 4,
        marginBottom: 4,
    },
    statValue: {
        ...Typography.heading,
        fontSize: 18,
        color: Colors.text,
    },
    warningCard: {
        backgroundColor: '#FFF8E1', // Light yellow/beige
        width: '100%',
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        // ...Shadows.sm,
    },
    warningTitle: {
        ...Typography.body,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    warningText: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: Spacing.lg,
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#3A5F40',
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    secondaryButtonText: {
        ...Typography.body,
        color: '#3A5F40',
        fontWeight: '600',
    },
    primaryButton: {
        backgroundColor: '#3A5F40', // Dark Green
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
    },
    primaryButtonText: {
        ...Typography.body,
        color: Colors.surface,
        fontWeight: '600',
    },
});

export default DoctorCallStatusScreen;
