import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CATEGORIES = [
    { id: '1', name: 'Hypertension', icon: 'speed' },
    { id: '2', name: 'Anxiety', icon: 'psychology' },
    { id: '3', name: 'Diabetes', icon: 'bloodtype' },
    { id: '4', name: 'Obesity', icon: 'accessibility' },
    { id: '5', name: 'Rubella', icon: 'coronavirus' },
    { id: '6', name: 'Hypothermia', icon: 'ac-unit' },
    { id: '7', name: 'Frostbite', icon: 'severe-cold' },
];

const PatientHomeScreen = ({ navigation }: any) => {
    const [selectedConcern, setSelectedConcern] = React.useState<string | null>('3');

    const renderCategory = (item: typeof CATEGORIES[0]) => {
        const isSelected = selectedConcern === item.id;

        return (
            <TouchableOpacity
                key={item.id}
                style={styles.categoryItem}
                onPress={() => {
                    setSelectedConcern(item.id);
                    navigation.navigate('DoctorListing', { concern: item.name });
                }}
            >
                <View style={[
                    styles.categoryIconWrapper,
                    isSelected && styles.categoryIconWrapperSelected
                ]}>
                    <View style={styles.categoryIconContainer}>
                        <Icon name={item.icon} size={32} color={Colors.primary} />
                    </View>
                </View>
                <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#E8F5E9" />

            {/* Green Background Section with Circles */}
            <View style={styles.topSection}>
                <SafeAreaView edges={['top']} style={styles.safeArea}>
                    <View style={styles.bgCircle1} />
                    <View style={styles.bgCircle2} />

                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" size={24} color={Colors.text} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={styles.screenTitle}>Select Concern</Text>
                    </View>
                </SafeAreaView>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Categories / Top Concerns */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Top Concerns</Text>
                    <View style={styles.categoriesGrid}>
                        {CATEGORIES.map(renderCategory)}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    topSection: {
        backgroundColor: '#E8F5E9',
        position: 'relative',
        overflow: 'hidden',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    safeArea: {
        paddingBottom: Spacing.xxl,
    },
    bgCircle1: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: '#D4EDD6',
        opacity: 0.6,
        top: -150,
        right: -50,
    },
    bgCircle2: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#C8E6C9',
        opacity: 0.5,
        top: 50,
        right: -80,
    },
    header: {
        padding: Spacing.lg,
        paddingBottom: Spacing.sm,
        zIndex: 10,
    },
    titleContainer: {
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.xl,
        zIndex: 10,
    },
    screenTitle: {
        fontSize: 36,
        color: Colors.text,
        fontWeight: '700',
        lineHeight: 44,
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        paddingBottom: Spacing.xl,
    },
    section: {
        marginTop: Spacing.lg,
    },
    sectionTitle: {
        fontSize: 14,
        color: Colors.text,
        marginLeft: Spacing.lg,
        marginBottom: Spacing.lg,
        fontWeight: '400',
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: Spacing.lg,
        justifyContent: 'space-between',
    },
    categoryItem: {
        alignItems: 'center',
        width: '30%', // 3 columns
        marginBottom: Spacing.xl,
    },
    categoryIconWrapper: {
        padding: 6,
        borderRadius: 100, // Fully circular
        borderWidth: 2,
        borderColor: 'transparent',
        marginBottom: Spacing.sm,
    },
    categoryIconWrapperSelected: {
        borderColor: 'rgba(58, 95, 64, 0.5)', // Semi-transparent green border
        backgroundColor: 'rgba(232, 245, 233, 0.15)', // Very light green background
    },
    categoryIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40, // Circle
        backgroundColor: '#E8F5E9', // Light green
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryName: {
        fontSize: 12,
        color: Colors.text,
        textAlign: 'center',
        fontWeight: '400',
    },
});

export default PatientHomeScreen;
