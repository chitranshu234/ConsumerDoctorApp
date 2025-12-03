import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';

const PatientProfileScreen = () => {
    const { logout, user } = useAuth();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Profile</Text>
                <Text style={styles.subtitle}>{user?.name}</Text>
                <Text style={styles.email}>{user?.email}</Text>

                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <Text style={styles.logoutText}>Logout</Text>
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
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.lg,
    },
    title: {
        ...Typography.title,
        color: Colors.text,
        marginBottom: Spacing.md,
    },
    subtitle: {
        ...Typography.heading,
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    email: {
        ...Typography.body,
        color: Colors.textSecondary,
        marginBottom: Spacing.xl,
    },
    logoutButton: {
        backgroundColor: Colors.danger,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.xl,
        borderRadius: BorderRadius.md,
        width: '100%',
        alignItems: 'center',
    },
    logoutText: {
        ...Typography.body,
        color: Colors.surface,
        fontWeight: '600',
    },
});

export default PatientProfileScreen;
