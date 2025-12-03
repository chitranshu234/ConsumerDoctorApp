import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
    const navigation = useNavigation();
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const renderSettingItem = (icon: string, title: string, type: 'link' | 'switch', value?: boolean, onToggle?: (val: boolean) => void) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => type === 'link' && console.log('Navigate')}
            disabled={type === 'switch'}
        >
            <View style={styles.itemLeft}>
                <View style={styles.iconContainer}>
                    <Icon name={icon} size={24} color={Colors.primary} />
                </View>
                <Text style={styles.itemTitle}>{title}</Text>
            </View>
            {type === 'switch' ? (
                <Switch
                    value={value}
                    onValueChange={onToggle}
                    trackColor={{ false: Colors.border, true: Colors.primary }}
                    thumbColor={Colors.surface}
                />
            ) : (
                <Icon name="chevron-right" size={24} color={Colors.textSecondary} />
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Settings</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>General</Text>
                {renderSettingItem('notifications', 'Notifications', 'switch', notifications, setNotifications)}
                {renderSettingItem('language', 'Language', 'link')}
                {renderSettingItem('dark-mode', 'Dark Mode', 'switch', darkMode, setDarkMode)}

                <Text style={styles.sectionTitle}>Support</Text>
                {renderSettingItem('help', 'Help Center', 'link')}
                {renderSettingItem('info', 'About Us', 'link')}
                {renderSettingItem('policy', 'Privacy Policy', 'link')}
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
    sectionTitle: {
        ...Typography.body,
        fontWeight: '600',
        color: Colors.textSecondary,
        marginBottom: Spacing.md,
        marginTop: Spacing.md,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.surface,
        padding: Spacing.md,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.md,
        // ...Shadows.sm,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: BorderRadius.round,
        backgroundColor: Colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    itemTitle: {
        ...Typography.body,
        color: Colors.text,
        fontWeight: '500',
    },
});

export default SettingsScreen;
