import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Dimensions,
    StatusBar,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const DoctorIncomingCallScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { appointment } = route.params || { appointment: { patientName: 'Siya Khandagale' } };

    const handleAccept = () => {
        // Use deterministic call ID based on Doctor ID (assuming appointment has doctorId)
        // Fallback to '1' if missing.
        const doctorId = appointment.doctorId || '1';
        const callID = `call_${doctorId}`;

        // Navigate to DoctorCallScreen
        navigation.replace('DoctorCallScreen', {
            remoteUser: { name: appointment.patientName },
            callID: callID
        });
    };

    const handleDecline = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden />

            {/* Header Notification Style */}
            <SafeAreaView style={styles.headerContainer}>
                <View style={styles.notificationCard}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150?u=siya' }}
                        style={styles.avatarSmall}
                    />
                    <View style={styles.notificationInfo}>
                        <Text style={styles.callerName}>{appointment.patientName}</Text>
                        <Text style={styles.callType}>Amrutam</Text>
                    </View>
                    <View style={styles.notificationActions}>
                        <TouchableOpacity style={[styles.actionButtonSmall, styles.declineButton]} onPress={handleDecline}>
                            <Icon name="call-end" size={20} color={Colors.surface} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButtonSmall, styles.acceptButton]} onPress={handleAccept}>
                            <Icon name="call" size={20} color={Colors.surface} />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

            {/* Main Full Screen Call UI */}
            <View style={styles.fullScreenContainer}>
                <View style={styles.callerInfoMain}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150?u=siya' }}
                        style={styles.avatarLarge}
                    />
                    <Text style={styles.callerNameLarge}>{appointment.patientName}</Text>
                </View>

                <View style={styles.bottomActions}>
                    <View style={styles.actionContainer}>
                        <TouchableOpacity style={[styles.actionButtonLarge, styles.declineButton]} onPress={handleDecline}>
                            <Icon name="call-end" size={32} color={Colors.surface} />
                        </TouchableOpacity>
                        <Text style={styles.actionLabel}>Decline</Text>
                    </View>

                    <View style={styles.actionContainer}>
                        <TouchableOpacity style={[styles.actionButtonLarge, styles.acceptButton]} onPress={handleAccept}>
                            <Icon name="call" size={32} color={Colors.surface} />
                        </TouchableOpacity>
                        <Text style={styles.actionLabel}>Accept</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.surface,
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 10,
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? Spacing.lg : 0,
    },
    notificationCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F4C3', // Light beige/green
        width: '90%',
        padding: Spacing.sm,
        borderRadius: BorderRadius.xl,
        // ...Shadows.md,
    },
    avatarSmall: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: Spacing.md,
    },
    notificationInfo: {
        flex: 1,
    },
    callerName: {
        ...Typography.body,
        fontWeight: 'bold',
        color: Colors.text,
    },
    callType: {
        ...Typography.caption,
        color: Colors.textSecondary,
    },
    notificationActions: {
        flexDirection: 'row',
    },
    actionButtonSmall: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: Spacing.sm,
    },
    fullScreenContainer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 100,
        alignItems: 'center',
    },
    callerInfoMain: {
        alignItems: 'center',
        marginTop: 50,
    },
    avatarLarge: {
        width: 100,
        height: 100,
        borderRadius: 12, // Square with rounded corners as per screenshot
        marginBottom: Spacing.lg,
    },
    callerNameLarge: {
        ...Typography.heading,
        fontSize: 24,
        color: Colors.text,
    },
    bottomActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        marginBottom: 50,
    },
    actionContainer: {
        alignItems: 'center',
    },
    actionButtonLarge: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.sm,
        // ...Shadows.md,
    },
    declineButton: {
        backgroundColor: '#FF5252',
    },
    acceptButton: {
        backgroundColor: '#4CAF50',
    },
    actionLabel: {
        ...Typography.body,
        color: Colors.text,
    },
});

import { Platform } from 'react-native';

export default DoctorIncomingCallScreen;
