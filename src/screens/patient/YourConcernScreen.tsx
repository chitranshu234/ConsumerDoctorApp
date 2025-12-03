import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
// import Slider from '@react-native-community/slider'; // Not installed

const YourConcernScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { doctor } = route.params || {};

    const displayDoctor = doctor || {
        name: 'Dr. Prem',
        specialization: 'Gynecology + 2 others',
        price: 15,
        image: 'https://i.pravatar.cc/150?u=doctor1',
    };

    const [concern, setConcern] = useState('Diabetes');
    const [severity, setSeverity] = useState(0.2); // 0 to 1
    const [duration, setDuration] = useState('28');
    const [durationUnit, setDurationUnit] = useState('Days');

    const handleProceed = () => {
        navigation.navigate('AppointmentConfirmation', { doctor: displayDoctor });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={Colors.text} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.screenTitle}>Your Concern</Text>

                {/* Green Background Shape (Simplified) */}
                <View style={styles.bgShape} />

                {/* Doctor Profile */}
                <View style={styles.doctorProfile}>
                    <Image source={{ uri: displayDoctor.image }} style={styles.doctorImage} />
                    <View style={styles.doctorInfo}>
                        <Text style={styles.doctorName}>{displayDoctor.name}</Text>
                        <Text style={styles.doctorSpeciality}>{displayDoctor.specialization}</Text>
                        <Text style={styles.callRate}>Instant Call - ₹ {displayDoctor.price}/min</Text>
                    </View>
                </View>

                {/* Concern Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Please select a concern</Text>
                    <TextInput
                        style={styles.input}
                        value={concern}
                        onChangeText={setConcern}
                    />
                </View>

                {/* Severity Slider Placeholder */}
                <Text style={styles.sectionTitle}>Select severity of your concern</Text>
                <View style={styles.sliderContainer}>
                    <View style={{ height: 40, justifyContent: 'center' }}>
                        <View style={{ height: 4, backgroundColor: '#E0E0E0', borderRadius: 2 }}>
                            <View style={{ width: '20%', height: 4, backgroundColor: Colors.primary, borderRadius: 2 }} />
                        </View>
                        <View style={{ position: 'absolute', left: '20%', width: 20, height: 20, borderRadius: 10, backgroundColor: Colors.primary, marginLeft: -10 }} />
                    </View>
                    <View style={styles.severityLabels}>
                        <Text style={styles.severityLabel}>Mild</Text>
                        <Text style={[styles.severityLabel, styles.activeSeverity]}>Moderate</Text>
                        <Text style={styles.severityLabel}>Severe</Text>
                    </View>
                </View>

                {/* Duration */}
                <Text style={styles.sectionTitle}>How long have you been facing?</Text>
                <View style={styles.durationContainer}>
                    <Text style={styles.durationValue}>{duration}</Text>
                    <Icon name="keyboard-arrow-down" size={24} color={Colors.textSecondary} />
                </View>

                <View style={styles.radioGroup}>
                    {['Days', 'Weeks', 'Months', 'Year'].map((unit) => (
                        <TouchableOpacity
                            key={unit}
                            style={styles.radioButton}
                            onPress={() => setDurationUnit(unit)}
                        >
                            <View style={[styles.radioOuter, durationUnit === unit && styles.radioOuterSelected]}>
                                {durationUnit === unit && <View style={styles.radioInner} />}
                            </View>
                            <Text style={styles.radioLabel}>{unit}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
                    <Text style={styles.proceedButtonText}>Proceed</Text>
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
        padding: Spacing.lg,
        alignItems: 'flex-start',
        zIndex: 1,
    },
    backButton: {
        marginBottom: Spacing.md,
    },
    content: {
        padding: Spacing.lg,
        paddingTop: 0,
    },
    screenTitle: {
        ...Typography.heading,
        fontSize: 32,
        color: Colors.text,
        marginBottom: Spacing.xl,
        zIndex: 1,
    },
    bgShape: {
        position: 'absolute',
        top: -100,
        right: -50,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: '#E8F5E9', // Light green
        opacity: 0.5,
    },
    doctorProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    doctorImage: {
        width: 60,
        height: 60,
        borderRadius: BorderRadius.md,
        marginRight: Spacing.md,
    },
    doctorInfo: {
        justifyContent: 'center',
    },
    doctorName: {
        ...Typography.heading,
        fontSize: 18,
    },
    doctorSpeciality: {
        ...Typography.caption,
        color: Colors.textSecondary,
    },
    callRate: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.xl,
        backgroundColor: Colors.surface,
    },
    inputLabel: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: 4,
    },
    input: {
        ...Typography.body,
        fontSize: 18,
        color: Colors.text,
        padding: 0,
    },
    sectionTitle: {
        ...Typography.body,
        fontWeight: '600',
        marginBottom: Spacing.md,
        color: Colors.text,
    },
    sliderContainer: {
        marginBottom: Spacing.xl,
    },
    severityLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Spacing.xs,
    },
    severityLabel: {
        ...Typography.caption,
        color: Colors.textSecondary,
    },
    activeSeverity: {
        color: Colors.primary,
        fontWeight: '600',
    },
    durationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.lg,
        backgroundColor: Colors.surface,
    },
    durationValue: {
        ...Typography.body,
        fontSize: 18,
        color: Colors.text,
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.textSecondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    radioOuterSelected: {
        borderColor: Colors.primary,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.primary,
    },
    radioLabel: {
        ...Typography.body,
        color: Colors.text,
    },
    footer: {
        padding: Spacing.lg,
        marginTop: 'auto',
    },
    proceedButton: {
        backgroundColor: Colors.buttonPrimary,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
    },
    proceedButtonText: {
        ...Typography.body,
        color: Colors.surface,
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default YourConcernScreen;
