import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

// Mock Data
const MOCK_PRESCRIPTIONS = [
    {
        id: '1',
        doctorName: 'Dr. Sarah Wilson',
        specialization: 'Cardiologist',
        date: '2023-11-15',
        medicines: ['Aspirin 75mg', 'Atorvastatin 20mg'],
        status: 'Active',
    },
    {
        id: '2',
        doctorName: 'Dr. James Chen',
        specialization: 'Dermatologist',
        date: '2023-10-20',
        medicines: ['Hydrocortisone Cream'],
        status: 'Completed',
    },
];

const PrescriptionsListScreen = () => {
    const navigation = useNavigation<any>();
    const [prescriptions, setPrescriptions] = useState(MOCK_PRESCRIPTIONS);

    const renderItem = ({ item }: { item: typeof MOCK_PRESCRIPTIONS[0] }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('PrescriptionDetails', { prescription: item })}
        >
            <View style={styles.header}>
                <View style={styles.doctorInfo}>
                    <Text style={styles.doctorName}>{item.doctorName}</Text>
                    <Text style={styles.specialization}>{item.specialization}</Text>
                </View>
                <View style={[styles.statusBadge, item.status === 'Active' ? styles.activeBadge : styles.completedBadge]}>
                    <Text style={[styles.statusText, item.status === 'Active' ? styles.activeText : styles.completedText]}>
                        {item.status}
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.footer}>
                <View style={styles.dateContainer}>
                    <Icon name="event" size={16} color={Colors.textSecondary} />
                    <Text style={styles.date}>{item.date}</Text>
                </View>
                <Text style={styles.medicineCount}>{item.medicines.length} Medicines</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.screenHeader}>
                <Text style={styles.title}>My Prescriptions</Text>
            </View>

            <FlatList
                data={prescriptions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    screenHeader: {
        padding: Spacing.lg,
        backgroundColor: Colors.surface,
        // ...Shadows.sm,
    },
    title: {
        ...Typography.heading,
        color: Colors.text,
    },
    list: {
        padding: Spacing.lg,
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        // ...Shadows.sm,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    doctorInfo: {
        flex: 1,
    },
    doctorName: {
        ...Typography.body,
        fontWeight: '600',
        color: Colors.text,
    },
    specialization: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    statusBadge: {
        paddingHorizontal: Spacing.sm,
        paddingVertical: 4,
        borderRadius: BorderRadius.sm,
    },
    activeBadge: {
        backgroundColor: Colors.success + '20',
    },
    completedBadge: {
        backgroundColor: Colors.textSecondary + '20',
    },
    statusText: {
        ...Typography.caption,
        fontWeight: '600',
    },
    activeText: {
        color: Colors.success,
    },
    completedText: {
        color: Colors.textSecondary,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: Spacing.md,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    date: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginLeft: 4,
    },
    medicineCount: {
        ...Typography.caption,
        color: Colors.primary,
        fontWeight: '600',
    },
});

export default PrescriptionsListScreen;
