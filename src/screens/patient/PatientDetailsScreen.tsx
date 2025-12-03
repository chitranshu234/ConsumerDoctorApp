import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const PatientDetailsScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { doctor } = route.params || {}; // Handle potential missing params if testing directly

    // Mock doctor if not passed (for development/testing)
    const displayDoctor = doctor || {
        name: 'Dr. Prem',
        specialization: 'Gynecology + 2 others',
        price: 15,
        image: 'https://i.pravatar.cc/150?u=doctor1',
    };

    const [gender, setGender] = useState('Prefer not to say');
    const [age, setAge] = useState('28 years');
    const [height, setHeight] = useState('171 cms');
    const [weight, setWeight] = useState('63 kg');

    const handleConfirm = () => {
        navigation.navigate('YourConcern', { doctor: displayDoctor });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={Colors.text} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.screenTitle}>Basic Info</Text>

                {/* Doctor Profile */}
                <View style={styles.doctorProfile}>
                    <Image source={{ uri: displayDoctor.image }} style={styles.doctorImage} />
                    <View style={styles.doctorInfo}>
                        <Text style={styles.doctorName}>{displayDoctor.name}</Text>
                        <Text style={styles.doctorSpeciality}>{displayDoctor.specialization}</Text>
                        <Text style={styles.callRate}>Instant Call - ₹ {displayDoctor.price}/min</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Please confirm your basic information</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Gender</Text>
                    <TextInput
                        style={styles.input}
                        value={gender}
                        onChangeText={setGender}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Age</Text>
                    <TextInput
                        style={styles.input}
                        value={age}
                        onChangeText={setAge}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Height</Text>
                    <TextInput
                        style={styles.input}
                        value={height}
                        onChangeText={setHeight}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Weight</Text>
                    <TextInput
                        style={styles.input}
                        value={weight}
                        onChangeText={setWeight}
                    />
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                    <Text style={styles.confirmButtonText}>Confirm</Text>
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
    },
    backButton: {
        marginBottom: Spacing.md,
    },
    content: {
        padding: Spacing.lg,
    },
    screenTitle: {
        ...Typography.heading,
        fontSize: 32,
        color: Colors.text,
        marginBottom: Spacing.xl,
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
    sectionTitle: {
        ...Typography.body,
        fontWeight: '600',
        marginBottom: Spacing.lg,
        color: Colors.text,
    },
    inputGroup: {
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.lg,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        backgroundColor: Colors.surface,
    },
    label: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: 2,
    },
    input: {
        ...Typography.body,
        color: Colors.text,
        padding: 0, // Remove default padding
        height: 24,
    },
    footer: {
        padding: Spacing.lg,
        marginTop: 'auto',
    },
    confirmButton: {
        backgroundColor: Colors.buttonPrimary,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
    },
    confirmButtonText: {
        ...Typography.body,
        color: Colors.surface,
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default PatientDetailsScreen;
