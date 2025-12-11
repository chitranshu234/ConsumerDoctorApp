import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import type { RootStackParamList } from '../types';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';

type LoginScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Login'
>;

const LoginScreen = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState<'patient' | 'doctor'>('patient');

    const validateForm = () => {
        if (!email.trim()) {
            Alert.alert('Error', 'Please enter your email');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return false;
        }
        if (!password) {
            Alert.alert('Error', 'Please enter your password');
            return false;
        }
        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return false;
        }
        return true;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await login(email, password, role);
        } catch (error) {
            Alert.alert('Error', 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled">
                <View style={styles.content}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Login to your account</Text>

                    {/* Role Selector */}
                    <View style={styles.roleContainer}>
                        <TouchableOpacity
                            style={[
                                styles.roleButton,
                                role === 'patient' && styles.roleButtonActive,
                            ]}
                            onPress={() => setRole('patient')}
                            disabled={isLoading}>
                            <Text
                                style={[
                                    styles.roleText,
                                    role === 'patient' && styles.roleTextActive,
                                ]}>
                                Patient
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.roleButton,
                                role === 'doctor' && styles.roleButtonActive,
                            ]}
                            onPress={() => setRole('doctor')}
                            disabled={isLoading}>
                            <Text
                                style={[
                                    styles.roleText,
                                    role === 'doctor' && styles.roleTextActive,
                                ]}>
                                Doctor
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor={Colors.textSecondary}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                editable={!isLoading}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                placeholderTextColor={Colors.textSecondary}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                editable={!isLoading}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.button, isLoading && styles.buttonDisabled]}
                            onPress={handleLogin}
                            disabled={isLoading}>
                            <Text style={styles.buttonText}>
                                {isLoading ? 'Logging in...' : 'Login'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account? </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignUp')}
                            disabled={isLoading}>
                            <Text style={styles.linkText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        padding: Spacing.lg,
        justifyContent: 'center',
    },
    title: {
        ...Typography.title,
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    subtitle: {
        ...Typography.body,
        color: Colors.textSecondary,
        marginBottom: Spacing.xl,
    },
    roleContainer: {
        flexDirection: 'row',
        marginBottom: Spacing.xl,
        backgroundColor: Colors.inputBackground,
        borderRadius: BorderRadius.md,
        padding: 4,
    },
    roleButton: {
        flex: 1,
        paddingVertical: Spacing.sm,
        alignItems: 'center',
        borderRadius: BorderRadius.sm,
    },
    roleButtonActive: {
        backgroundColor: Colors.surface,
        // // ...Shadows.sm,
    },
    roleText: {
        ...Typography.body,
        color: Colors.textSecondary,
        fontWeight: '600',
    },
    roleTextActive: {
        color: Colors.primary,
    },
    form: {
        marginBottom: Spacing.lg,
    },
    inputContainer: {
        marginBottom: Spacing.md,
    },
    label: {
        ...Typography.caption,
        color: Colors.text,
        marginBottom: Spacing.xs,
        fontWeight: '600',
    },
    input: {
        backgroundColor: Colors.inputBackground,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        ...Typography.body,
        color: Colors.text,
    },
    button: {
        backgroundColor: Colors.primary,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        alignItems: 'center',
        marginTop: Spacing.md,
        // // ...Shadows.sm,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        ...Typography.subheading,
        color: Colors.textLight,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        ...Typography.body,
        color: Colors.textSecondary,
    },
    linkText: {
        ...Typography.body,
        color: Colors.primary,
        fontWeight: '600',
    },
});

export default LoginScreen;
