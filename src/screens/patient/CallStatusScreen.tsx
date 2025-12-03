import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const CallStatusScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { doctor } = route.params || {};

    const displayDoctor = doctor || {
        name: 'Dr. Prem',
        specialization: 'Male-Female Infertility',
        image: 'https://i.pravatar.cc/150?u=doctor1',
    };

    const handleStartChat = () => {
        // Navigate to chat or back
        navigation.goBack();
    };

    const handleSeeMoreExperts = () => {
        navigation.navigate('DoctorListing');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Doctor Profile */}
                <View style={styles.profileContainer}>
                    <Image source={{ uri: displayDoctor.image }} style={styles.avatar} />
                    <Text style={styles.doctorName}>{displayDoctor.name}</Text>
                    <Text style={styles.specialization}>{displayDoctor.specialization}</Text>
                </View>

                <Text style={styles.statusText}>No Answer</Text>

                {/* Notification Banner */}
                <View style={styles.notificationBanner}>
                    <View style={styles.bellIconContainer}>
                        <Icon name="notifications-active" size={24} color={Colors.surface} />
                    </View>
                    <Text style={styles.notificationText}>
                        Tap on the <Text style={{ fontWeight: 'bold' }}>bell</Text> icon to get notified when {displayDoctor.name} is online
                    </Text>
                </View>

                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.orText}>or</Text>
                    <View style={styles.divider} />
                </View>

                {/* Bottom Card */}
                <View style={styles.bottomCard}>
                    <Text style={styles.cardText}>
                        Start a <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Chat Consultation</Text> with {displayDoctor.name} or consult another expert now.
                    </Text>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.textButton} onPress={handleSeeMoreExperts}>
                            <Text style={styles.textButtonLabel}>See More Experts</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.primaryButton} onPress={handleStartChat}>
                            <Text style={styles.primaryButtonText}>Start Chat</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        alignItems: 'center',
        paddingTop: Spacing.xxl * 2,
        paddingHorizontal: Spacing.lg,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.md,
    },
    doctorName: {
        ...Typography.heading,
        fontSize: 22,
        color: Colors.text,
        marginBottom: 4,
    },
    specialization: {
        ...Typography.body,
        color: Colors.textSecondary,
    },
    statusText: {
        ...Typography.heading,
        color: Colors.primary, // Green
        marginBottom: Spacing.xl,
    },
    notificationBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF8E1', // Light yellow/cream
        padding: Spacing.md,
        borderRadius: BorderRadius.xl,
        marginBottom: Spacing.xxl,
    },
    bellIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#556B2F', // Olive green
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    notificationText: {
        ...Typography.caption,
        color: '#556B2F',
        flex: 1,
        fontSize: 13,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '60%',
        marginBottom: Spacing.xxl * 2,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.border,
    },
    orText: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginHorizontal: Spacing.md,
    },
    bottomCard: {
        position: 'absolute',
        bottom: Spacing.xl,
        left: Spacing.lg,
        right: Spacing.lg,
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.xl,
        padding: Spacing.lg,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    cardText: {
        ...Typography.caption,
        color: Colors.text,
        textAlign: 'center',
        marginBottom: Spacing.lg,
        lineHeight: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textButton: {
        padding: Spacing.sm,
    },
    textButtonLabel: {
        ...Typography.body,
        color: '#556B2F', // Olive green
        fontWeight: '600',
    },
    primaryButton: {
        backgroundColor: '#3A5F40', // Dark green
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.xl,
        borderRadius: BorderRadius.lg,
    },
    primaryButtonText: {
        ...Typography.body,
        color: Colors.surface,
        fontWeight: '600',
    },
});

export default CallStatusScreen;
