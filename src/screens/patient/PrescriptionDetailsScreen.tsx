import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const PrescriptionDetailsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const { prescription } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Prescription Details</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Doctor Info */}
                <View style={styles.card}>
                    <Text style={styles.label}>Prescribed By</Text>
                    <Text style={styles.value}>{prescription.doctorName}</Text>
                    <Text style={styles.subValue}>{prescription.specialization}</Text>
                    <Text style={[styles.date, { marginTop: 8 }]}>{prescription.date}</Text>
                </View>

                {/* Medicines */}
                <Text style={styles.sectionTitle}>Medicines</Text>
                {prescription.medicines.map((medicine: string, index: number) => (
                    <View key={index} style={styles.medicineCard}>
                        <View style={styles.medicineIcon}>
                            <Icon name="medication" size={24} color={Colors.primary} />
                        </View>
                        <View style={styles.medicineInfo}>
                            <Text style={styles.medicineName}>{medicine}</Text>
                            <Text style={styles.medicineDosage}>1 Tablet - After Meal - 2x Daily</Text>
                        </View>
                    </View>
                ))}

                <TouchableOpacity style={styles.downloadButton}>
                    <Icon name="file-download" size={24} color={Colors.surface} style={{ marginRight: 8 }} />
                    <Text style={styles.downloadButtonText}>Download Prescription</Text>
                </TouchableOpacity>
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
    card: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        marginBottom: Spacing.xl,
        // ...Shadows.sm,
    },
    label: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: 4,
    },
    value: {
        ...Typography.body,
        fontWeight: '600',
        color: Colors.text,
    },
    subValue: {
        ...Typography.caption,
        color: Colors.textSecondary,
    },
    date: {
        ...Typography.caption,
        color: Colors.textSecondary,
    },
    sectionTitle: {
        ...Typography.heading,
        fontSize: 18,
        color: Colors.text,
        marginBottom: Spacing.md,
    },
    medicineCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        // ...Shadows.sm,
    },
    medicineIcon: {
        width: 50,
        height: 50,
        borderRadius: BorderRadius.md,
        backgroundColor: Colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
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
        marginTop: 2,
    },
    downloadButton: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.md,
        marginTop: Spacing.lg,
    },
    downloadButtonText: {
        ...Typography.body,
        color: Colors.surface,
        fontWeight: '600',
    },
});

export default PrescriptionDetailsScreen;
