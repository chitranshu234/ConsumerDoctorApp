import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Colors = {
    primary: '#3A5F40',
    secondary: '#E8F5E9',
    background: '#F5F7F5',
    surface: '#FFFFFF',
    text: '#1A1A1A',
    textSecondary: '#757575',
    textLight: '#FFFFFF',
    border: '#E0E0E0',
    danger: '#FF5252',
    success: '#4CAF50',
    warning: '#FFC107',
    inputBackground: '#F0F0F0',
    buttonPrimary: '#3A5F40',
};

export const Spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
};

export const BorderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 100,
};

export const Typography = {
    title: { fontSize: 28, fontWeight: 'bold' as 'bold' },
    heading: { fontSize: 20, fontWeight: '700' as '700' },
    subheading: { fontSize: 18, fontWeight: '600' as '600' },
    body: { fontSize: 16, fontWeight: '400' as '400' },
    caption: { fontSize: 14, fontWeight: '400' as '400' },
};

export const Shadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
};
