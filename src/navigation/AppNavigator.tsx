import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import type { RootStackParamList } from '../types';

// Screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
// import HomeScreen from '../screens/HomeScreen';
// import HomeScreen from '../screens/HomeScreen';

// Navigators
import PatientNavigator from './PatientNavigator';
import DoctorNavigator from './DoctorNavigator';
import CallScreen from '../screens/patient/CallScreen';
import DoctorCallScreen from '../screens/doctor/DoctorCallScreen';
import CallEndedScreen from '../screens/patient/CallEndedScreen';
import DoctorCallEndedScreen from '../screens/doctor/DoctorCallEndedScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    const { isLoading, isAuthenticated, user } = useAuth();

    if (isLoading) {
        return <SplashScreen />;
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            {!isAuthenticated ? (
                <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                </>
            ) : (
                <>
                    {/* Route based on user role */}
                    {user?.role === 'doctor' ? (
                        <Stack.Screen name="DoctorApp" component={DoctorNavigator} />
                    ) : (
                        <Stack.Screen name="PatientApp" component={PatientNavigator} />
                    )}

                    {/* Global Screens */}
                    <Stack.Screen name="CallScreen" component={CallScreen} />
                    <Stack.Screen name="DoctorCallScreen" component={DoctorCallScreen} />
                    <Stack.Screen name="CallEnded" component={CallEndedScreen} />
                    <Stack.Screen name="DoctorCallEnded" component={DoctorCallEndedScreen} />

                    {/* Shared Screens */}
                </>
            )}
        </Stack.Navigator>
    );
};

export default AppNavigator;
