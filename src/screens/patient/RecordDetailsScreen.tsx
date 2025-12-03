import React from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';

const RecordDetailsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const { record } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Record Details</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.previewContainer}>
                    <Icon name="description" size={64} color={Colors.primary} />
                    <Text style={styles.previewText}>Preview Available</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>Title</Text>
                    <Text style={styles.value}>{record.title}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>Type</Text>
                    <Text style={styles.value}>{record.type}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>Date</Text>
                    <Text style={styles.value}>{record.date}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>Prescribed By</Text>
                    <Text style={styles.value}>{record.doctorName}</Text>
                </View>

                <TouchableOpacity style={styles.downloadButton}>
                    <Icon name="file-download" size={24} color={Colors.surface} style={{ marginRight: 8 }} />
                    <Text style={styles.downloadButtonText}>Download Record</Text>
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
    previewContainer: {
        height: 200,
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.lg,
        borderWidth: 1,
        borderColor: Colors.border,
        borderStyle: 'dashed',
    },
    previewText: {
        ...Typography.body,
        color: Colors.textSecondary,
        marginTop: Spacing.sm,
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.md,
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
    downloadButton: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.md,
        marginTop: Spacing.md,
    },
    downloadButtonText: {
        ...Typography.body,
        color: Colors.surface,
        fontWeight: '600',
    },
});

export default RecordDetailsScreen;
