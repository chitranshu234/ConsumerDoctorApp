import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const PaymentSuccessScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { doctor } = route.params || {};

    const displayDoctor = doctor || {
        name: 'Dr. Prem',
        specialization: 'Gynecology + 2 others',
        price: 15,
        image: 'https://i.pravatar.cc/150?u=doctor1',
    };

    const handleCheckBookings = () => {
        navigation.navigate('AppointmentsTab');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Doctor Image with Checkmark */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: displayDoctor.image }} style={styles.doctorImage} />
                    <View style={styles.checkIconContainer}>
                        <Icon name="check" size={24} color={Colors.surface} />
                    </View>
                </View>

                <Text style={styles.amountText}>Paid ₹50</Text>
                <Text style={styles.successText}>
                    Chat Consultation Booked Successfully
                </Text>

                <View style={styles.balanceContainer}>
                    <Icon name="account-balance-wallet" size={24} color={Colors.textSecondary} />
                    <View style={styles.balanceInfo}>
                        <Text style={styles.balanceLabel}>Available Balance</Text>
                        <Text style={styles.balanceValue}>₹ 660</Text>
                    </View>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={handleCheckBookings}>
                    <Text style={styles.buttonText}>Check Bookings</Text>
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
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.xl,
    },
    imageContainer: {
        marginBottom: Spacing.xl,
        position: 'relative',
    },
    doctorImage: {
        width: 120,
        height: 120,
        borderRadius: 60, // Circle
    },
    checkIconContainer: {
        position: 'absolute',
        bottom: -5,
        alignSelf: 'center',
        backgroundColor: Colors.success, // Green
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Colors.background,
    },
    amountText: {
        ...Typography.heading,
        fontSize: 28,
        color: Colors.success, // Green text
        marginBottom: Spacing.sm,
    },
    successText: {
        ...Typography.body,
        color: Colors.text, // Dark green/text color
        textAlign: 'center',
        marginBottom: Spacing.xxl,
        fontSize: 16,
    },
    balanceContainer: {
        alignItems: 'center',
        marginTop: Spacing.xl,
    },
    balanceInfo: {
        alignItems: 'center',
        marginTop: Spacing.xs,
    },
    balanceLabel: {
        ...Typography.caption,
        color: Colors.textSecondary,
    },
    balanceValue: {
        ...Typography.heading,
        fontSize: 24,
        color: Colors.text,
        marginTop: 4,
    },
    footer: {
        padding: Spacing.lg,
        paddingBottom: Spacing.xxl,
    },
    button: {
        backgroundColor: Colors.buttonPrimary,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
    },
    buttonText: {
        ...Typography.body,
        color: Colors.surface,
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default PaymentSuccessScreen;
