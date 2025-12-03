import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const AppointmentConfirmationScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { doctor } = route.params || {};

    const displayDoctor = doctor || {
        name: 'Dr. Prem',
        specialization: 'Gynecology + 2 others',
        price: 15,
        image: 'https://i.pravatar.cc/150?u=doctor1',
    };

    const handleMakePayment = () => {
        navigation.navigate('PaymentMethod', { amount: 50 });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Doctor Image with Checkmark */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: displayDoctor.image }} style={styles.doctorImage} />
                    <View style={styles.checkIconContainer}>
                        <Icon name="check" size={24} color={Colors.surface} />
                    </View>
                </View>

                <Text style={styles.title}>Appointment Confirmed</Text>
                <Text style={styles.subtitle}>
                    Thank you for choosing our Experts to help guide you
                </Text>

                {/* Details List */}
                <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Expert</Text>
                        <Text style={styles.detailValue}>{displayDoctor.name}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Appointment Date</Text>
                        <Text style={styles.detailValue}>23 November 2023</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Appointment Time</Text>
                        <Text style={styles.detailValue}>17:28 PM</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Consultation Type</Text>
                        <Text style={styles.detailValue}>Phone Consultation</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Current Wallet Balance</Text>
                        <Text style={styles.detailValue}>₹ 660</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Consultation Fee</Text>
                        <Text style={styles.detailValue}>₹ 50</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.paymentButton} onPress={handleMakePayment}>
                    <Text style={styles.paymentButtonText}>Make payment</Text>
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
        padding: Spacing.lg,
        alignItems: 'center',
        paddingTop: Spacing.xxl,
    },
    imageContainer: {
        marginBottom: Spacing.lg,
        position: 'relative',
    },
    doctorImage: {
        width: 120,
        height: 120,
        borderRadius: 40, // Squircle-ish
    },
    checkIconContainer: {
        position: 'absolute',
        bottom: -10,
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
    title: {
        ...Typography.heading,
        fontSize: 24,
        color: Colors.text,
        marginBottom: Spacing.sm,
        textAlign: 'center',
    },
    subtitle: {
        ...Typography.body,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: Spacing.xxl,
        paddingHorizontal: Spacing.lg,
    },
    detailsContainer: {
        width: '100%',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.lg,
    },
    detailLabel: {
        ...Typography.body,
        color: Colors.textSecondary,
        fontSize: 16,
    },
    detailValue: {
        ...Typography.body,
        color: Colors.text,
        fontWeight: '500',
        fontSize: 16,
    },
    footer: {
        padding: Spacing.lg,
        marginTop: 'auto',
    },
    paymentButton: {
        backgroundColor: Colors.buttonPrimary,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
    },
    paymentButtonText: {
        ...Typography.body,
        color: Colors.surface,
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default AppointmentConfirmationScreen;
