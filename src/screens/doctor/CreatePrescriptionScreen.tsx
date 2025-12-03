import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ScrollView,
    FlatList,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const CreatePrescriptionScreen = () => {
    const navigation = useNavigation();
    const [diagnosis, setDiagnosis] = useState('');
    const [medicines, setMedicines] = useState<{ name: string; dosage: string }[]>([]);
    const [medName, setMedName] = useState('');
    const [medDosage, setMedDosage] = useState('');

    const addMedicine = () => {
        if (medName && medDosage) {
            setMedicines([...medicines, { name: medName, dosage: medDosage }]);
            setMedName('');
            setMedDosage('');
        }
    };

    const removeMedicine = (index: number) => {
        const newMedicines = [...medicines];
        newMedicines.splice(index, 1);
        setMedicines(newMedicines);
    };

    const handleSave = () => {
        // Save prescription logic
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="close" size={24} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.title}>New Prescription</Text>
                <TouchableOpacity onPress={handleSave}>
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.label}>Diagnosis</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={diagnosis}
                    onChangeText={setDiagnosis}
                    placeholder="Enter diagnosis..."
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                    placeholderTextColor={Colors.textSecondary}
                />

                <Text style={styles.sectionTitle}>Medicines</Text>

                <View style={styles.addMedicineForm}>
                    <TextInput
                        style={styles.input}
                        value={medName}
                        onChangeText={setMedName}
                        placeholder="Medicine Name"
                        placeholderTextColor={Colors.textSecondary}
                    />
                    <TextInput
                        style={[styles.input, { marginTop: Spacing.sm }]}
                        value={medDosage}
                        onChangeText={setMedDosage}
                        placeholder="Dosage (e.g., 1-0-1 after food)"
                        placeholderTextColor={Colors.textSecondary}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={addMedicine}>
                        <Icon name="add" size={20} color={Colors.surface} />
                        <Text style={styles.addButtonText}>Add Medicine</Text>
                    </TouchableOpacity>
                </View>

                {medicines.map((med, index) => (
                    <View key={index} style={styles.medicineCard}>
                        <View style={styles.medicineInfo}>
                            <Text style={styles.medicineName}>{med.name}</Text>
                            <Text style={styles.medicineDosage}>{med.dosage}</Text>
                        </View>
                        <TouchableOpacity onPress={() => removeMedicine(index)}>
                            <Icon name="delete-outline" size={24} color={Colors.danger} />
                        </TouchableOpacity>
                    </View>
                ))}
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
        backgroundColor: Colors.surface,
        // ...Shadows.sm,
    },
    backButton: {
        padding: 4,
    },
    title: {
        ...Typography.heading,
        color: Colors.text,
    },
    saveText: {
        ...Typography.body,
        color: Colors.primary,
        fontWeight: '600',
    },
    content: {
        padding: Spacing.lg,
    },
    label: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: Spacing.xs,
    },
    input: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        ...Typography.body,
        color: Colors.text,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    textArea: {
        height: 80,
        marginBottom: Spacing.lg,
    },
    sectionTitle: {
        ...Typography.heading,
        fontSize: 18,
        color: Colors.text,
        marginBottom: Spacing.md,
    },
    addMedicineForm: {
        backgroundColor: Colors.surface,
        padding: Spacing.md,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.lg,
        // ...Shadows.sm,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.md,
        marginTop: Spacing.md,
    },
    addButtonText: {
        ...Typography.body,
        color: Colors.surface,
        fontWeight: '600',
        marginLeft: 8,
    },
    medicineCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        marginBottom: Spacing.sm,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    medicineInfo: {
        flex: 1,
    },
    medicineName: {
        ...Typography.body,
        fontWeight: '600',
        color: Colors.text,
    },
    medicineDosage: {
        ...Typography.caption,
        color: Colors.textSecondary,
    },
});

export default CreatePrescriptionScreen;
