import React from 'react';
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

const MOCK_NOTIFICATIONS = [
    {
        id: '1',
        title: 'Appointment Confirmed',
        message: 'Your appointment with Dr. Sarah Wilson has been confirmed for tomorrow at 10:00 AM.',
        time: '2 hours ago',
        type: 'appointment',
        read: false,
    },
    {
        id: '2',
        title: 'Prescription Added',
        message: 'Dr. James Chen added a new prescription to your records.',
        time: '1 day ago',
        type: 'medical',
        read: true,
    },
    {
        id: '3',
        title: 'Payment Successful',
        message: 'Payment of $62.00 was successful.',
        time: '2 days ago',
        type: 'payment',
        read: true,
    },
];

const NotificationsScreen = () => {
    const navigation = useNavigation();

    const renderItem = ({ item }: { item: typeof MOCK_NOTIFICATIONS[0] }) => (
        <TouchableOpacity style={[styles.card, !item.read && styles.unreadCard]}>
            <View style={[styles.iconContainer, !item.read && styles.unreadIcon]}>
                <Icon
                    name={item.type === 'appointment' ? 'event' : item.type === 'medical' ? 'description' : 'payment'}
                    size={24}
                    color={item.read ? Colors.textSecondary : Colors.primary}
                />
            </View>
            <View style={styles.info}>
                <Text style={[styles.title, !item.read && styles.unreadTitle]}>{item.title}</Text>
                <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
                <Text style={styles.time}>{item.time}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
            </View>

            <FlatList
                data={MOCK_NOTIFICATIONS}
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
    headerTitle: {
        ...Typography.heading,
        color: Colors.text,
    },
    list: {
        padding: Spacing.lg,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        // ...Shadows.sm,
    },
    unreadCard: {
        backgroundColor: Colors.primary + '05', // Very light primary tint
        borderLeftWidth: 4,
        borderLeftColor: Colors.primary,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: BorderRadius.round,
        backgroundColor: Colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    unreadIcon: {
        backgroundColor: Colors.secondary,
    },
    info: {
        flex: 1,
    },
    title: {
        ...Typography.body,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 2,
    },
    unreadTitle: {
        color: Colors.primary,
    },
    message: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: 4,
    },
    time: {
        ...Typography.caption,
        fontSize: 10,
        color: Colors.textSecondary,
    },
});

export default NotificationsScreen;
