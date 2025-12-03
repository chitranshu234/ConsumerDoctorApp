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

const CallEndedScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { reason, doctor } = route.params || {};

    const isLowBalance = reason === 'low_balance';
    const statusText = isLowBalance ? 'Call Disconnected' : 'Call Ended';
    const statusColor = isLowBalance ? Colors.danger : '#3A5F40'; // Red or Green

    const displayDoctor = doctor || {
        name: 'Dr. Prem',
        image: 'https://i.pravatar.cc/150?u=doctor1',
    };

    const handleDone = () => {
        navigation.navigate('PatientHomeMain');
    };

    const handleCallAgain = () => {
        // Logic to restart call
        navigation.goBack();
    };

    const handleRecharge = () => {
        // Navigate to wallet/recharge
        // navigation.navigate('Wallet');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="close" size={24} color={Colors.text} />
                </TouchableOpacity>
                <View style={styles.walletContainer}>
                    <Icon name="account-balance-wallet" size={20} color={Colors.textSecondary} />
                    <Text style={styles.walletText}>₹ 150</Text>
                </View>
            </View>

            <View style={styles.content}>
                <Image source={{ uri: displayDoctor.image }} style={styles.avatar} />
                <Text style={styles.doctorName}>{displayDoctor.name}</Text>
                <View style={styles.onlineIndicator} />

                <View style={styles.statusContainer}>
                    <Icon name="signal-cellular-alt" size={24} color={statusColor} />
                    <Text style={[styles.statusText, { color: statusColor }]}>{statusText}</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Icon name="call" size={20} color={Colors.textSecondary} />
                        <Text style={styles.statLabel}>Consultation Duration</Text>
                        <Text style={styles.statValue}>05:56</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Icon name="account-balance-wallet" size={20} color={Colors.textSecondary} />
                        <Text style={styles.statLabel}>Total Amount Deducted</Text>
                        <Text style={styles.statValue}>₹ 369</Text>
                    </View>
                </View>
            </View>

            <View style={styles.footer}>
                {isLowBalance ? (
                    <View style={styles.lowBalanceCard}>
                        <Text style={styles.lowBalanceTitle}>Low Balance</Text>
                        <Text style={styles.lowBalanceText}>
                            Your call ended due to low balance. Add at least ₹25 to continue speaking with Dr. Prerna.
                        </Text>
                        <TouchableOpacity style={styles.rechargeButton} onPress={handleRecharge}>
                            <Text style={styles.rechargeButtonText}>Recharge now</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        <TouchableOpacity style={styles.secondaryButton} onPress={handleCallAgain}>
                            <Text style={styles.secondaryButtonText}>Call Again</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.primaryButton} onPress={handleDone}>
                            <Text style={styles.primaryButtonText}>Done</Text>
                        </TouchableOpacity>
                    </>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.lg,
    },
    walletContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    walletText: {
        ...Typography.body,
        color: Colors.textSecondary,
        marginLeft: Spacing.sm,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: Spacing.xxl,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.md,
    },
    doctorName: {
        ...Typography.heading,
        fontSize: 20,
        color: Colors.text,
        marginBottom: 4,
    },
    onlineIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.success,
        marginBottom: Spacing.lg,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.xxl,
    },
    statusText: {
        ...Typography.body,
        fontWeight: '600',
        fontSize: 18,
        marginLeft: Spacing.sm,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: Spacing.lg,
    },
    statItem: {
        alignItems: 'center',
    },
    statLabel: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginTop: Spacing.xs,
        marginBottom: Spacing.xs,
    },
    statValue: {
        ...Typography.heading,
        fontSize: 18,
        color: Colors.text,
    },
    footer: {
        padding: Spacing.lg,
        paddingBottom: Spacing.xxl,
    },
    primaryButton: {
        backgroundColor: '#3A5F40',
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    primaryButtonText: {
        ...Typography.body,
        color: Colors.surface,
        fontWeight: '600',
    },
    secondaryButton: {
        backgroundColor: Colors.surface,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    secondaryButtonText: {
        ...Typography.body,
        color: '#3A5F40',
        fontWeight: '600',
    },
    lowBalanceCard: {
        backgroundColor: '#FFF8E1', // Light yellow
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
    },
    lowBalanceTitle: {
        ...Typography.body,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: Spacing.sm,
    },
    lowBalanceText: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: Spacing.lg,
        lineHeight: 20,
    },
    rechargeButton: {
        backgroundColor: '#3A5F40',
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
    },
    rechargeButtonText: {
        ...Typography.body,
        color: Colors.surface,
        fontWeight: '600',
    },
});

export default CallEndedScreen;
