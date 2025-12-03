import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const PAYMENT_METHODS = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'credit-card' },
    { id: 'paypal', name: 'PayPal', icon: 'account-balance-wallet' },
    { id: 'apple', name: 'Apple Pay', icon: 'phone-iphone' },
    { id: 'google', name: 'Google Pay', icon: 'android' },
];

const PaymentMethodScreen = () => {
    const navigation = useNavigation<any>();
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

    const handlePay = () => {
        if (!selectedMethod) return;
        // Simulate payment processing
        setTimeout(() => {
            navigation.navigate('PaymentSuccess');
        }, 1000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Payment Method</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>Select Payment Method</Text>

                {PAYMENT_METHODS.map((method) => (
                    <TouchableOpacity
                        key={method.id}
                        style={[
                            styles.methodCard,
                            selectedMethod === method.id && styles.selectedMethod,
                        ]}
                        onPress={() => setSelectedMethod(method.id)}
                    >
                        <View style={styles.methodInfo}>
                            <View style={styles.iconContainer}>
                                <Icon name={method.icon} size={24} color={Colors.primary} />
                            </View>
                            <Text style={styles.methodName}>{method.name}</Text>
                        </View>
                        <View style={styles.radioOuter}>
                            {selectedMethod === method.id && <View style={styles.radioInner} />}
                        </View>
                    </TouchableOpacity>
                ))}

                <View style={styles.summaryContainer}>
                    <Text style={styles.summaryTitle}>Order Summary</Text>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Consultation Fee</Text>
                        <Text style={styles.summaryValue}>$60.00</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Service Fee</Text>
                        <Text style={styles.summaryValue}>$2.00</Text>
                    </View>
                    <View style={[styles.summaryRow, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>$62.00</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.payButton, !selectedMethod && styles.disabledButton]}
                    onPress={handlePay}
                    disabled={!selectedMethod}
                >
                    <Text style={styles.payButtonText}>Pay Now</Text>
                </TouchableOpacity>
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
        alignItems: 'center',
        padding: Spacing.lg,
        backgroundColor: Colors.surface,
        // ...Shadows.sm,
    },
    backButton: {
        marginRight: Spacing.md,
    },
    title: {
        ...Typography.heading,
        color: Colors.text,
    },
    content: {
        padding: Spacing.lg,
    },
    sectionTitle: {
        ...Typography.heading,
        fontSize: 18,
        color: Colors.text,
        marginBottom: Spacing.md,
    },
    methodCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.surface,
        padding: Spacing.md,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    selectedMethod: {
        borderColor: Colors.primary,
        backgroundColor: Colors.primary + '10',
    },
    methodInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: BorderRadius.round,
        backgroundColor: Colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    methodName: {
        ...Typography.body,
        fontWeight: '600',
        color: Colors.text,
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.primary,
    },
    summaryContainer: {
        marginTop: Spacing.xl,
        backgroundColor: Colors.surface,
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        // ...Shadows.sm,
    },
    summaryTitle: {
        ...Typography.heading,
        fontSize: 16,
        marginBottom: Spacing.md,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.sm,
    },
    summaryLabel: {
        ...Typography.body,
        color: Colors.textSecondary,
    },
    summaryValue: {
        ...Typography.body,
        fontWeight: '600',
        color: Colors.text,
    },
    totalRow: {
        marginTop: Spacing.sm,
        paddingTop: Spacing.sm,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    totalLabel: {
        ...Typography.heading,
        fontSize: 18,
    },
    totalValue: {
        ...Typography.heading,
        fontSize: 18,
        color: Colors.primary,
    },
    footer: {
        padding: Spacing.lg,
        backgroundColor: Colors.surface,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    payButton: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: Colors.textSecondary,
    },
    payButtonText: {
        ...Typography.body,
        color: Colors.surface,
        fontWeight: '600',
        fontSize: 18,
    },
});

export default PaymentMethodScreen;
