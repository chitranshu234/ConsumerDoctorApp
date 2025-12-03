import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Doctor } from '../../services/MockDataService';

type RootStackParamList = {
    DoctorDetails: { doctor: Doctor };
    BookAppointment: { doctor: Doctor };
};

type DoctorDetailsRouteProp = RouteProp<RootStackParamList, 'DoctorDetails'>;

const DoctorDetailsScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<DoctorDetailsRouteProp>();
    const { doctor } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Doctor Details</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Profile Header */}
                <View style={styles.profileHeader}>
                    <Image source={{ uri: doctor.image }} style={styles.image} />
                    <View style={styles.info}>
                        <Text style={styles.name}>{doctor.name}</Text>
                        <Text style={styles.specialization}>{doctor.specialization}</Text>
                        <View style={styles.ratingRow}>
                            <Icon name="star" size={16} color={Colors.warning} />
                            <Text style={styles.rating}>{doctor.rating}</Text>
                            <Text style={styles.reviews}>({doctor.reviews} reviews)</Text>
                        </View>
                    </View>
                </View>

                {/* Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <View style={[styles.statIcon, { backgroundColor: Colors.secondary }]}>
                            <Icon name="people" size={24} color={Colors.primary} />
                        </View>
                        <Text style={styles.statValue}>1000+</Text>
                        <Text style={styles.statLabel}>Patients</Text>
                    </View>
                    <View style={styles.statItem}>
                        <View style={[styles.statIcon, { backgroundColor: '#FFF3E0' }]}>
                            <Icon name="workspace-premium" size={24} color={Colors.warning} />
                        </View>
                        <Text style={styles.statValue}>{doctor.experience} Yrs</Text>
                        <Text style={styles.statLabel}>Experience</Text>
                    </View>
                    <View style={styles.statItem}>
                        <View style={[styles.statIcon, { backgroundColor: '#E8F5E9' }]}>
                            <Icon name="star" size={24} color={Colors.success} />
                        </View>
                        <Text style={styles.statValue}>{doctor.rating}</Text>
                        <Text style={styles.statLabel}>Rating</Text>
                    </View>
                </View>

                {/* About */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About Doctor</Text>
                    <Text style={styles.aboutText}>{doctor.about}</Text>
                </View>

                {/* Working Hours */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Working Hours</Text>
                    <Text style={styles.workingHours}>Mon - Fri, 09:00 AM - 05:00 PM</Text>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>Consultation Price</Text>
                    <Text style={styles.price}>${doctor.price}</Text>
                </View>
                <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() => navigation.navigate('PatientDetails', { doctor })}
                >
                    <Text style={styles.bookButtonText}>Book Appointment</Text>
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
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: BorderRadius.lg,
    },
    info: {
        marginLeft: Spacing.lg,
        flex: 1,
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
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        ...Typography.body,
        fontWeight: '600',
        color: Colors.text,
        marginLeft: 4,
    },
    reviews: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginLeft: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.xl,
        backgroundColor: Colors.surface,
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        // ...Shadows.sm,
    },
    statItem: {
        alignItems: 'center',
    },
    statIcon: {
        width: 50,
        height: 50,
        borderRadius: BorderRadius.round,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    statValue: {
        ...Typography.heading,
        fontSize: 18,
        color: Colors.text,
    },
    statLabel: {
        ...Typography.caption,
        color: Colors.textSecondary,
    },
    section: {
        marginBottom: Spacing.xl,
    },
    sectionTitle: {
        ...Typography.heading,
        fontSize: 18,
        color: Colors.text,
        marginBottom: Spacing.sm,
    },
    aboutText: {
        ...Typography.body,
        color: Colors.textSecondary,
        lineHeight: 24,
    },
    workingHours: {
        ...Typography.body,
        color: Colors.textSecondary,
    },
    footer: {
        padding: Spacing.lg,
        backgroundColor: Colors.surface,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    priceContainer: {
        flex: 1,
    },
    priceLabel: {
        ...Typography.caption,
        color: Colors.textSecondary,
    },
    price: {
        ...Typography.heading,
        color: Colors.primary,
    },
    bookButton: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.xl,
        borderRadius: BorderRadius.md,
    },
    bookButtonText: {
        ...Typography.body,
        color: Colors.surface,
        fontWeight: '600',
    },
});

export default DoctorDetailsScreen;
