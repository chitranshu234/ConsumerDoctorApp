import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';

const EditProfileScreen = () => {
    const navigation = useNavigation();
    const { user } = useAuth();

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState('+1 234 567 890');
    const [address, setAddress] = useState('123 Main St, New York, NY');

    const handleSave = () => {
        // Save profile logic here
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Edit Profile</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150?u=user' }}
                        style={styles.profileImage}
                    />
                    <TouchableOpacity style={styles.cameraButton}>
                        <Icon name="camera-alt" size={20} color={Colors.surface} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor={Colors.textSecondary}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholderTextColor={Colors.textSecondary}
                />

                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    placeholderTextColor={Colors.textSecondary}
                />

                <Text style={styles.label}>Address</Text>
                <TextInput
                    style={styles.input}
                    value={address}
                    onChangeText={setAddress}
                    placeholderTextColor={Colors.textSecondary}
                />
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
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
    imageContainer: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
        position: 'relative',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: BorderRadius.round,
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: '35%',
        backgroundColor: Colors.primary,
        padding: 8,
        borderRadius: BorderRadius.round,
        borderWidth: 2,
        borderColor: Colors.surface,
    },
    label: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: Spacing.xs,
        marginTop: Spacing.md,
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
    footer: {
        padding: Spacing.lg,
        backgroundColor: Colors.surface,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    saveButton: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
    },
    saveButtonText: {
        ...Typography.body,
        color: Colors.surface,
        fontWeight: '600',
        fontSize: 18,
    },
});

export default EditProfileScreen;
