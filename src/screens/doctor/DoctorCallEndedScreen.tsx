import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const DoctorCallEndedScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { patient, reason } = route.params || { patient: { name: 'Jay' }, reason: 'normal' };

    const handleUploadPrescription = () => {
        // Navigate to Create Prescription Screen
        navigation.navigate('CreatePrescription', { patient });
    };

    const handleSendChat = () => {
        // Navigate to Chat
        navigation.navigate('ChatTab');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
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
                    <Icon
                        name={reason === 'low_balance' ? "signal-cellular-alt" : "check-circle"}
                        size={24}
                        color={reason === 'low_balance' ? '#D32F2F' : '#3A5F40'}
                    />
                    <Text style={[
                        styles.statusText,
                        { color: reason === 'low_balance' ? '#D32F2F' : '#3A5F40' }
                    ]}>
                        {reason === 'low_balance' ? 'Call Disconnected' : 'Call Ended'}
                    </Text>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Icon name="call" size={20} color={Colors.textSecondary} />
                        <Text style={styles.statLabel}>Consultation Duration</Text>
                        <Text style={styles.statValue}>05:56</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Icon name="account-balance-wallet" size={20} color={Colors.textSecondary} />
                        <Text style={styles.statLabel}>Total Amount Received</Text>
                        <Text style={styles.statValue}>₹ 369</Text>
                    </View>
                </View>

                {/* Conditional Rendering based on Reason */}
                {reason === 'low_balance' ? (
                    <View style={styles.warningCard}>
                        <Text style={styles.warningTitle}>User’s name Low Balance</Text>
                        <Text style={styles.warningText}>
                            The call ended due to low wallet balance of {patient.name}
                        </Text>

                        <TouchableOpacity style={styles.chatButton} onPress={handleSendChat}>
                            <Text style={styles.chatButtonText}>Send a chat</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.uploadButton} onPress={handleUploadPrescription}>
                            <Text style={styles.uploadButtonText}>Upload Prescription</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.normalActionsContainer}>
                        <TouchableOpacity style={styles.chatButton} onPress={handleSendChat}>
                            <Text style={styles.chatButtonText}>Send a chat</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.uploadButton} onPress={handleUploadPrescription}>
                            <Text style={styles.uploadButtonText}>Upload Prescription</Text>
                        </TouchableOpacity>
                    </View>
                )}
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
        ...Typography.heading, // Larger text for status
        fontSize: 20,
        color: '#3A5F40', // Dark Green for "Call Ended"
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
    normalActionsContainer: {
        width: '100%',
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
    chatButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#3A5F40',
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    chatButtonText: {
        ...Typography.body,
        color: '#3A5F40',
        fontWeight: '600',
    },
    uploadButton: {
        backgroundColor: '#3A5F40', // Dark Green
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
    },
    uploadButtonText: {
        ...Typography.body,
        color: Colors.surface,
        fontWeight: '600',
    },
});

export default DoctorCallEndedScreen;
