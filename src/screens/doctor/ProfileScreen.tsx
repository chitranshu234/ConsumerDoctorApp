import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';

const DoctorProfileScreen = () => {
    const navigation = useNavigation();
    const { user, logout } = useAuth();

    const renderMenuItem = (icon: string, title: string, onPress?: () => void, color: string = Colors.text) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={styles.menuLeft}>
                <View style={[styles.iconContainer, { backgroundColor: color + '10' }]}>
                    <Icon name={icon} size={24} color={color} />
                </View>
                <Text style={[styles.menuText, { color }]}>{title}</Text>
            </View>
            <Icon name="chevron-right" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150?u=doctor' }}
                        style={styles.profileImage}
                    />
                    <Text style={styles.name}>Dr. {user?.name || 'Smith'}</Text>
                    <Text style={styles.specialization}>Cardiologist</Text>
                    <View style={styles.ratingContainer}>
                        <Icon name="star" size={16} color={Colors.warning} />
                        <Text style={styles.rating}>4.8 (450 reviews)</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    {renderMenuItem('person-outline', 'Edit Profile', () => console.log('Edit Profile'))}
                    {renderMenuItem('notifications-none', 'Notifications', () => console.log('Notifications'))}
                    {renderMenuItem('lock-outline', 'Privacy & Security', () => console.log('Privacy'))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>General</Text>
                    {renderMenuItem('help-outline', 'Help & Support', () => console.log('Help'))}
                    {renderMenuItem('info-outline', 'About App', () => console.log('About'))}
                </View>

                <View style={styles.section}>
                    {renderMenuItem('logout', 'Logout', logout, Colors.danger)}
                </View>
            </ScrollView>
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
    },
    header: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: BorderRadius.round,
        marginBottom: Spacing.md,
    },
    name: {
        ...Typography.heading,
        color: Colors.text,
        marginBottom: 4,
    },
    specialization: {
        ...Typography.body,
        color: Colors.textSecondary,
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        paddingHorizontal: Spacing.md,
        paddingVertical: 4,
        borderRadius: BorderRadius.round,
        // ...Shadows.sm,
    },
    rating: {
        ...Typography.caption,
        fontWeight: '600',
        color: Colors.text,
        marginLeft: 4,
    },
    section: {
        marginBottom: Spacing.xl,
    },
    sectionTitle: {
        ...Typography.body,
        fontWeight: '600',
        color: Colors.textSecondary,
        marginBottom: Spacing.md,
        marginLeft: Spacing.sm,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.surface,
        padding: Spacing.md,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.md,
        // ...Shadows.sm,
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: BorderRadius.round,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    menuText: {
        ...Typography.body,
        fontWeight: '500',
    },
});

export default DoctorProfileScreen;
