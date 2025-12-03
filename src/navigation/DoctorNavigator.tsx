import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screens
import DoctorAppointmentsListScreen from '../screens/doctor/DoctorAppointmentsListScreen';
import DoctorAppointmentDetailsScreen from '../screens/doctor/DoctorAppointmentDetailsScreen';
import DoctorIncomingCallScreen from '../screens/doctor/DoctorIncomingCallScreen';

import DoctorCallStatusScreen from '../screens/doctor/DoctorCallStatusScreen';
import CreatePrescriptionScreen from '../screens/doctor/CreatePrescriptionScreen';

// Placeholder Screens for Tabs
import DashboardScreen from '../screens/doctor/DashboardScreen'; // Assuming exists or use placeholder
import ProfileScreen from '../screens/doctor/ProfileScreen'; // Assuming exists

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Appointment Stack
const AppointmentStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DoctorAppointmentsList" component={DoctorAppointmentsListScreen} />
        <Stack.Screen name="DoctorAppointmentDetails" component={DoctorAppointmentDetailsScreen} />
        <Stack.Screen name="DoctorIncomingCall" component={DoctorIncomingCallScreen} />
        {/* DoctorCallScreen moved to AppNavigator */}
        <Stack.Screen name="DoctorCallStatus" component={DoctorCallStatusScreen} />
        <Stack.Screen name="CreatePrescription" component={CreatePrescriptionScreen} />
    </Stack.Navigator>
);

const DoctorNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }: { route: { name: string } }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#3A5F40', // Dark Green
                tabBarInactiveTintColor: Colors.textLight,
                tabBarStyle: {
                    backgroundColor: Colors.surface,
                    borderTopWidth: 1,
                    borderTopColor: Colors.border,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarIcon: ({ color, size }: { color: string; size: number }) => {
                    let iconName = 'home';

                    if (route.name === 'HomeTab') iconName = 'home';
                    else if (route.name === 'AppointmentTab') iconName = 'event';
                    else if (route.name === 'ChatTab') iconName = 'chat';
                    else if (route.name === 'NotificationTab') iconName = 'notifications';
                    else if (route.name === 'SettingsTab') iconName = 'settings';

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '600',
                },
            })}
        >
            <Tab.Screen
                name="HomeTab"
                component={DashboardScreen}
                options={{ title: 'Home' }}
            />
            <Tab.Screen
                name="AppointmentTab"
                component={AppointmentStack}
                options={{ title: 'Appointment' }}
            />
            <Tab.Screen
                name="ChatTab"
                component={DashboardScreen} // Placeholder
                options={{ title: 'Chat' }}
            />
            <Tab.Screen
                name="NotificationTab"
                component={DashboardScreen} // Placeholder
                options={{ title: 'Notifications' }}
            />
            <Tab.Screen
                name="SettingsTab"
                component={ProfileScreen} // Placeholder
                options={{ title: 'Settings' }}
            />
        </Tab.Navigator>
    );
};

export default DoctorNavigator;
