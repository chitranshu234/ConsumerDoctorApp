import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screens
import PatientHomeScreen from '../screens/patient/HomeScreen';
import DoctorListingScreen from '../screens/patient/DoctorListingScreen';
import DoctorDetailsScreen from '../screens/patient/DoctorDetailsScreen';
import PatientDetailsScreen from '../screens/patient/PatientDetailsScreen';
import YourConcernScreen from '../screens/patient/YourConcernScreen';
import AppointmentConfirmationScreen from '../screens/patient/AppointmentConfirmationScreen';
import PaymentMethodScreen from '../screens/patient/PaymentMethodScreen';
import PaymentSuccessScreen from '../screens/patient/PaymentSuccessScreen';
import CallScreen from '../screens/patient/CallScreen';
import CallStatusScreen from '../screens/patient/CallStatusScreen';

import AppointmentsListScreen from '../screens/patient/AppointmentsListScreen';
import AppointmentDetailsScreen from '../screens/patient/AppointmentDetailsScreen';

import MedicalRecordsScreen from '../screens/patient/MedicalRecordsScreen';
import RecordDetailsScreen from '../screens/patient/RecordDetailsScreen';

import PrescriptionsListScreen from '../screens/patient/PrescriptionsListScreen';
import PrescriptionDetailsScreen from '../screens/patient/PrescriptionDetailsScreen';

import PatientProfileScreen from '../screens/patient/ProfileScreen';
import EditProfileScreen from '../screens/patient/EditProfileScreen';
import SettingsScreen from '../screens/patient/SettingsScreen';
import NotificationsScreen from '../screens/patient/NotificationsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home Stack (Home -> Doctor List -> Doctor Details -> Book Appointment -> Patient Details -> Payment -> Success)
const HomeStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PatientHomeMain" component={PatientHomeScreen} />
        <Stack.Screen name="DoctorListing" component={DoctorListingScreen} />
        <Stack.Screen name="DoctorDetails" component={DoctorDetailsScreen} />
        <Stack.Screen name="PatientDetails" component={PatientDetailsScreen} />
        <Stack.Screen name="YourConcern" component={YourConcernScreen} />
        <Stack.Screen name="AppointmentConfirmation" component={AppointmentConfirmationScreen} />
        <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        {/* CallScreen moved to AppNavigator */}
        <Stack.Screen name="CallStatus" component={CallStatusScreen} />
    </Stack.Navigator>
);

// Appointments Stack (List -> Details)
const AppointmentsStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AppointmentsList" component={AppointmentsListScreen} />
        <Stack.Screen name="AppointmentDetails" component={AppointmentDetailsScreen} />
    </Stack.Navigator>
);

// Records Stack (List -> Details)
const RecordsStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RecordsList" component={MedicalRecordsScreen} />
        <Stack.Screen name="RecordDetails" component={RecordDetailsScreen} />
    </Stack.Navigator>
);

// Prescriptions Stack (List -> Details)
const PrescriptionsStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PrescriptionsList" component={PrescriptionsListScreen} />
        <Stack.Screen name="PrescriptionDetails" component={PrescriptionDetailsScreen} />
    </Stack.Navigator>
);

// Profile Stack (Profile -> Edit -> Settings)
const ProfileStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ProfileMain" component={PatientProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
);

const PatientNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }: { route: { name: string } }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#FFFFFF',
                tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.65)',
                tabBarStyle: {
                    backgroundColor: Colors.primary,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: 75,
                    paddingBottom: 12,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                    marginTop: 4,
                },
                tabBarItemStyle: {
                    marginHorizontal: 2,
                    borderRadius: 20,
                },
                tabBarBackground: () => null,
                tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => {
                    let iconName = 'home';

                    if (route.name === 'HomeTab') iconName = 'home';
                    else if (route.name === 'ShopTab') iconName = 'shopping-bag';
                    else if (route.name === 'ConsultTab') iconName = 'medical-services';
                    else if (route.name === 'ForumTab') iconName = 'forum';
                    else if (route.name === 'BulletinTab') iconName = 'article';

                    return <Icon name={iconName} size={26} color={color} />;
                },
                tabBarButton: (props: any) => {
                    const isFocused = props.accessibilityState?.selected;
                    const { style, ...otherProps } = props;
                    return (
                        <TouchableOpacity
                            {...otherProps}
                            style={[
                                style,
                                {
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    borderRadius: 18,
                                    backgroundColor: isFocused ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
                                }
                            ]}
                        />
                    );
                },
            })}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeStack}
                options={{ title: 'Home' }}
            />
            <Tab.Screen
                name="ShopTab"
                component={AppointmentsStack}
                options={{ title: 'Shop' }}
            />
            <Tab.Screen
                name="ConsultTab"
                component={RecordsStack}
                options={{ title: 'Consult' }}
            />
            <Tab.Screen
                name="ForumTab"
                component={PrescriptionsStack}
                options={{ title: 'Forum' }}
            />
            <Tab.Screen
                name="BulletinTab"
                component={ProfileStack}
                options={{ title: 'Bulletin' }}
            />
        </Tab.Navigator>
    );
};

export default PatientNavigator;
