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

// Mock Data for Records
const MOCK_RECORDS = [
    {
        id: '1',
        title: 'Blood Test Report',
        date: '2023-11-15',
        doctorName: 'Dr. Sarah Wilson',
        type: 'Lab Report',
    },
    {
        id: '2',
        title: 'General Checkup Prescription',
        date: '2023-10-20',
        doctorName: 'Dr. James Chen',
        type: 'Prescription',
    },
    {
        id: '3',
        title: 'X-Ray Report',
        date: '2023-09-05',
        doctorName: 'Dr. Michael Brown',
        type: 'Radiology',
    },
];

const MedicalRecordsScreen = () => {
    const navigation = useNavigation<any>();
    const [records, setRecords] = useState(MOCK_RECORDS);

    const renderRecordItem = ({ item }: { item: typeof MOCK_RECORDS[0] }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('RecordDetails', { record: item })}
        >
            <View style={styles.iconContainer}>
                <Icon
                    name={item.type === 'Prescription' ? 'description' : 'analytics'}
                    size={24}
                    color={Colors.primary}
                />
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.doctorName}</Text>
                <Text style={styles.date}>{item.date}</Text>
            </View>
            <Icon name="chevron-right" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Medical Records</Text>
                <TouchableOpacity style={styles.addButton}>
                    <Icon name="add" size={24} color={Colors.surface} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={records}
                renderItem={renderRecordItem}
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.lg,
        backgroundColor: Colors.surface,
        // ...Shadows.sm,
    },
    headerTitle: {
        ...Typography.heading,
        color: Colors.text,
    },
    addButton: {
        backgroundColor: Colors.primary,
        width: 40,
        height: 40,
        borderRadius: BorderRadius.round,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        padding: Spacing.lg,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        // ...Shadows.sm,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: BorderRadius.md,
        backgroundColor: Colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    info: {
        flex: 1,
    },
    title: {
        ...Typography.body,
        fontWeight: '600',
        color: Colors.text,
    },
    subtitle: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    date: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginTop: 2,
    },
});

export default MedicalRecordsScreen;
