# 🏥 ConsumerDoctorApp - Telemedicine Mobile Application

> A full-featured React Native telemedicine app with real-time video calling using Zego Cloud SDK

[![React Native](https://img.shields.io/badge/React%20Native-0.74-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Zego Cloud](https://img.shields.io/badge/Zego%20Cloud-SDK-green)](https://www.zegocloud.com/)

---

## 📱 About The Project

**ConsumerDoctorApp** is a comprehensive telemedicine platform built with React Native that connects patients with doctors through seamless video consultations. The app features:

- 👨‍⚕️ **Dual Interfaces**: Separate experiences for Patients and Doctors
- 📞 **HD Video Calls**: Crystal-clear video consultations powered by Zego Cloud
- 📅 **Appointment Management**: Book, track, and manage appointments
- 💊 **Prescription Sharing**: Digital prescription management
- 📋 **Medical Records**: Secure storage of patient health records
- 🔒 **Secure Authentication**: Protected user sessions

---

## ✨ Features

### 🧑‍💼 For Patients (19 Screens)

- 🏠 **Home Dashboard** - Quick access to doctors and appointments
- 🔍 **Doctor Search & Listing** - Find specialists by category
- 👨‍⚕️ **Doctor Profiles** - View ratings, experience, and availability
- 📅 **Book Appointments** - Schedule consultations easily
- 📞 **Video Calls** - HD video consultations with doctors
- 💳 **Payment Integration** - Book and pay seamlessly
- 📋 **Medical Records** - Access your health history
- 💊 **Prescriptions** - View and download prescriptions
- 👤 **Profile Management** - Update personal information
- 🔔 **Notifications** - Stay updated on appointments

### 👨‍⚕️ For Doctors (12 Screens)

- 📊 **Dashboard** - Overview of appointments and patients
- 📅 **Appointment Management** - View and manage consultations
- 📞 **Video Consultations** - Conduct video calls with patients
- 💊 **Prescription Creation** - Create and share digital prescriptions
- 🩺 **Patient Details** - Access patient medical history
- 👤 **Profile Management** - Update professional information

---

## 🚀 Tech Stack

- **Framework**: React Native 0.74+
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack & Tab)
- **State Management**: Context API
- **Video Calling**: Zego Cloud SDK
- **Styling**: React Native StyleSheet
- **Icons**: React Native Vector Icons

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- ✅ **Node.js** (v16 or higher)
- ✅ **npm** or **yarn**
- ✅ **React Native CLI**
- ✅ **Android Studio** (for Android)
- ✅ **Xcode** (for iOS - macOS only)
- ✅ **Zego Cloud Account** ([Sign up here](https://www.zegocloud.com/))

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd ConsumerDocterApp
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Get Zego Cloud Credentials

1. Go to [Zego Cloud Console](https://console.zegocloud.com/)
2. Create a new project
3. Navigate to **Project Management** → **Project Config**
4. Copy your **AppID** and **AppSign**

### 4️⃣ Configure Zego Credentials

Open `src/constants/config.ts` and add your credentials:

```typescript
export const ZEGO_APP_ID = YOUR_APP_ID; // Replace with your AppID
export const ZEGO_APP_SIGN = 'YOUR_APP_SIGN'; // Replace with your AppSign
```

### 5️⃣ Install iOS Dependencies (macOS only)

```bash
cd ios
pod install
cd ..
```

---

## 🏃‍♂️ Running the App

### 🤖 Android

```bash
# Uninstall previous build (if needed)
adb -s emulator-5554 uninstall com.consumerdocterapp

# Run the app
npm run android
```

### 🍎 iOS (macOS only)

```bash
npm run ios
```

---

## 📂 Project Structure

```
ConsumerDocterApp/
├── src/
│   ├── screens/
│   │   ├── patient/          # Patient screens (19 screens)
│   │   └── doctor/           # Doctor screens (12 screens)
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   ├── PatientNavigator.tsx
│   │   └── DoctorNavigator.tsx
│   ├── context/
│   │   └── AuthContext.tsx   # Authentication state
│   ├── constants/
│   │   ├── theme.ts          # Colors, spacing, typography
│   │   └── config.ts         # Zego credentials
│   ├── services/
│   │   └── MockDataService.ts # Mock data
│   └── types/
│       └── index.ts          # TypeScript types
├── android/                  # Android native code
├── ios/                      # iOS native code
└── patches/                  # Zego SDK patches
```

---

## 🎥 Video Call Features

### ✅ Implemented Features

- 📞 **One-to-one video calls**
- 🎤 **Mute/unmute microphone**
- 📹 **Enable/disable camera**
- 🔊 **Speaker/earpiece toggle**
- ☎️ **End call functionality**
- 🚪 **Automatic call cleanup**

### 🔑 Key Implementation Details

- **Deterministic Room IDs**: Uses doctor ID to ensure both parties join the same room
- **Permission Handling**: Auto-requests camera/microphone permissions
- **Graceful Disconnection**: 1-second delay before unmounting for clean exit
- **Audio Configuration**: Forces audio/video ON by default

---

## 🐛 Troubleshooting

### ❌ Build Failed: Insufficient Storage

**Solution**: Uninstall the app before building

```bash
adb -s emulator-5554 uninstall com.consumerdocterapp
npm run android
```

### ❌ Zego SDK Crashes

**Solution**: Patches are already applied via `patch-package`. If you reinstall `node_modules`, run:

```bash
npm install
# Patches will auto-apply via postinstall script
```

### ❌ iOS Build Issues

**Solution**: Reinstall pods

```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

### ❌ Metro Bundler Cache Issues

**Solution**: Clear Metro cache

```bash
npm start -- --reset-cache
```

---

## 📱 Platform Support

| Platform | Status | Notes |
|----------|--------|-------|
| 🤖 **Android** | ✅ Fully Supported | Tested on Android 10+ |
| 🍎 **iOS** | ✅ Ready | Requires macOS to build |

---

## 🎨 Design

The UI is designed in Figma with:
- 🎨 Modern, clean interface
- 🌈 Consistent color scheme (Green primary)
- 📱 Responsive layouts
- ♿ Accessibility considerations

---

## 🔒 Security

- 🔐 **Secure Authentication**: Context-based auth flow
- 🔑 **Environment Variables**: Credentials stored in `config.ts`
- 🛡️ **Privacy**: Video calls are end-to-end encrypted by Zego

---

## 📦 Key Dependencies

```json
{
  "@react-navigation/native": "Latest",
  "@react-navigation/stack": "Latest",
  "@react-navigation/bottom-tabs": "Latest",
  "@zegocloud/zego-uikit-prebuilt-call-rn": "Latest",
  "react-native-vector-icons": "Latest",
  "react-native-safe-area-context": "Latest"
}
```

---

## 🤝 Contributing

This is an internship assignment project. However, suggestions and improvements are welcome!

---

## 📄 License

This project is created as part of a React Native Mobile App Developer Internship Assignment.

---

## 👤 Developer

**Chitrasen** - React Native Developer Intern

---

## 🙏 Acknowledgments

- **Zego Cloud** - For the excellent video calling SDK
- **React Native Community** - For the amazing tools and libraries
- **Design Team** - For the beautiful Figma designs

---

## 📞 Support

For issues or questions:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Review [Zego Documentation](https://docs.zegocloud.com/)
3. Check React Native docs

---


Made with ❤️ by **Chitranshu Pandey**
