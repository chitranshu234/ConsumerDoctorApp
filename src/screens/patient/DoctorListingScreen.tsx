import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput,
    Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { getDoctors, Doctor } from '../../services/MockDataService';

const DoctorListingScreen = () => {
    const navigation = useNavigation<any>();
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);


    const categories = ['All', 'Hair', 'Diabetes', 'Dental', 'Skin', 'Eye'];

    useEffect(() => {
        loadDoctors();
    }, []);

    const loadDoctors = async () => {
        const data = await getDoctors();
        setDoctors(data);
    };

    const handleStartCall = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
        setShowDisclaimer(true);
    };

    const handleProceedCall = () => {
        setShowDisclaimer(false);
        if (selectedDoctor) {
            // Use deterministic call ID based on Doctor ID so both parties join the same room
            const callID = `call_${selectedDoctor.id}`;
            navigation.navigate('CallScreen', {
                remoteUser: { id: selectedDoctor.id, name: selectedDoctor.name },
                callID: callID
            });
        }
    };


    const renderCategoryItem = ({ item }: { item: string }) => (
        <TouchableOpacity
            style={[
                styles.categoryItem,
                selectedCategory === item && styles.categoryItemActive,
            ]}
            onPress={() => setSelectedCategory(item)}
        >
            <Text
                style={[
                    styles.categoryText,
                    selectedCategory === item && styles.categoryTextActive,
                ]}
            >
                {item}
            </Text>
        </TouchableOpacity>
    );

    const renderDoctorCard = ({ item }: { item: Doctor }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Image source={{ uri: item.image }} style={styles.doctorImage} />
                <View style={styles.doctorInfo}>
                    <View style={styles.nameRow}>
                        <Text style={styles.doctorName}>{item.name}</Text>
                        <View style={styles.onlineIndicator} />
                        <View style={styles.ratingContainer}>
                            <Icon name="star" size={16} color={Colors.warning} />
                            <Text style={styles.ratingText}>{item.rating}</Text>
                        </View>
                    </View>
                    <Text style={styles.specialization}>{item.specialization} + 2 others</Text>
                    <Text style={styles.language}>Hindi, English, Telugu</Text>
                    <Text style={styles.experience}>Exp : {item.experience}years</Text>
                    <Text style={styles.price}>
                        ₹ 15/min <Text style={styles.freeText}>Free (5min)</Text>
                    </Text>
                </View>
            </View>

            <View style={styles.cardActions}>
                <TouchableOpacity
                    style={styles.scheduleButton}
                    onPress={() => navigation.navigate('DoctorDetails', { doctor: item })}
                >
                    <Text style={styles.scheduleButtonText}>Schedule</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.callButton}
                    onPress={() => handleStartCall(item)}
                >
                    <Text style={styles.callButtonText}>Free Call</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color={Colors.text} />
                </TouchableOpacity>
                <View style={styles.walletContainer}>
                    <Icon name="account-balance-wallet" size={20} color={Colors.text} />
                    <Text style={styles.walletText}>₹ 150</Text>
                </View>
            </View>

            {/* Filters */}
            <View style={styles.filterContainer}>
                <FlatList
                    data={categories}
                    renderItem={renderCategoryItem}
                    keyExtractor={(item) => item}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesList}
                />
                <TouchableOpacity style={styles.filterButton}>
                    <Icon name="tune" size={20} color={Colors.text} />
                    <Text style={styles.filterButtonText}>Filter</Text>
                </TouchableOpacity>
            </View>

            {/* Doctor List */}
            <FlatList
                data={doctors}
                renderItem={renderDoctorCard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />

            {/* Disclaimer Modal */}
            <Modal
                visible={showDisclaimer}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowDisclaimer(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHandle} />

                        <Text style={styles.modalTitle}>Disclaimer</Text>

                        <Text style={styles.modalText}>
                            By continuing, you consent to this call being recorded for quality and support purposes. Please provide accurate details to help the doctor assist you effectively.
                            <Text style={styles.linkText}> Read Terms & Conditions...</Text>
                        </Text>

                        <TouchableOpacity style={styles.modalPrimaryButton} onPress={handleProceedCall}>
                            <Text style={styles.modalPrimaryButtonText}>Proceed</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.modalSecondaryButton} onPress={() => setShowDisclaimer(false)}>
                            <Text style={styles.modalSecondaryButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.lg,
    },
    walletContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    walletText: {
        ...Typography.body,
        fontWeight: '600',
        marginLeft: Spacing.sm,
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        marginBottom: Spacing.md,
    },
    categoriesList: {
        paddingRight: Spacing.md,
    },
    categoryItem: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.xl,
        borderWidth: 1,
        borderColor: Colors.border,
        marginRight: Spacing.sm,
        backgroundColor: Colors.surface,
    },
    categoryItemActive: {
        backgroundColor: '#E8F5E9', // Light green
        borderColor: '#E8F5E9',
    },
    categoryText: {
        ...Typography.body,
        color: Colors.text,
    },
    categoryTextActive: {
        fontWeight: '600',
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.xl,
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.surface,
        marginLeft: Spacing.sm,
    },
    filterButtonText: {
        ...Typography.body,
        marginLeft: Spacing.xs,
    },
    list: {
        padding: Spacing.lg,
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.xl,
        padding: Spacing.md,
        marginBottom: Spacing.lg,
        // ...Shadows.sm,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    cardHeader: {
        flexDirection: 'row',
        marginBottom: Spacing.md,
    },
    doctorImage: {
        width: 80,
        height: 80,
        borderRadius: BorderRadius.lg,
        marginRight: Spacing.md,
    },
    doctorInfo: {
        flex: 1,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    doctorName: {
        ...Typography.body,
        fontWeight: 'bold',
        fontSize: 16,
    },
    onlineIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.success,
        marginLeft: Spacing.xs,
        marginRight: 'auto',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        ...Typography.caption,
        fontWeight: 'bold',
        marginLeft: 2,
    },
    specialization: {
        ...Typography.caption,
        color: Colors.textSecondary,
    },
    language: {
        ...Typography.caption,
        color: Colors.textSecondary,
    },
    experience: {
        ...Typography.caption,
        color: Colors.textSecondary,
    },
    price: {
        ...Typography.caption,
        color: Colors.text,
        marginTop: 4,
    },
    freeText: {
        color: Colors.danger,
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    scheduleButton: {
        flex: 1,
        marginRight: Spacing.md,
        paddingVertical: Spacing.md,
        alignItems: 'center',
    },
    scheduleButtonText: {
        ...Typography.body,
        color: '#3A5F40',
        fontWeight: '600',
    },
    callButton: {
        flex: 1,
        backgroundColor: '#3A5F40',
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
    },
    callButtonText: {
        ...Typography.body,
        color: Colors.surface,
        fontWeight: '600',
    },
    // Floating Video Styles
    floatingVideoContainer: {
        position: 'absolute',
        bottom: Spacing.xl,
        right: Spacing.lg,
        width: 120,
        height: 160,
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
        // ...Shadows.md,
        borderWidth: 2,
        borderColor: Colors.surface,
    },
    floatingVideoImage: {
        width: '100%',
        height: '100%',
    },
    floatingVideoOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: Spacing.xs,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
    },
    floatingVideoLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
    },
    floatingVideoText: {
        ...Typography.caption,
        color: Colors.surface,
        fontSize: 10,
        marginRight: 4,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: Colors.surface,
        borderTopLeftRadius: BorderRadius.xl,
        borderTopRightRadius: BorderRadius.xl,
        padding: Spacing.lg,
        paddingBottom: Spacing.xxl,
        alignItems: 'center',
    },
    modalHandle: {
        width: 40,
        height: 4,
        backgroundColor: Colors.border,
        borderRadius: 2,
        marginBottom: Spacing.lg,
    },
    modalTitle: {
        ...Typography.heading,
        fontSize: 20,
        color: Colors.text,
        marginBottom: Spacing.md,
    },
    modalText: {
        ...Typography.body,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: Spacing.xl,
        lineHeight: 22,
    },
    linkText: {
        color: '#3A5F40',
        fontWeight: '600',
    },
    modalPrimaryButton: {
        backgroundColor: '#3A5F40',
        width: '100%',
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    modalPrimaryButtonText: {
        ...Typography.body,
        color: Colors.surface,
        fontWeight: '600',
        fontSize: 16,
    },
    modalSecondaryButton: {
        backgroundColor: Colors.surface,
        width: '100%',
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#3A5F40',
    },
    modalSecondaryButtonText: {
        ...Typography.body,
        color: '#3A5F40',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default DoctorListingScreen;