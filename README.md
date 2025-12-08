# ConsumerDoctorApp (MediConnect)

A telemedicine mobile application built with React Native for connecting patients with doctors through video consultations.

## Overview

This app provides two interfaces:
- **Patients**: Search doctors, book appointments, and conduct video consultations
- **Doctors**: Manage appointments and consult with patients

## Features

**Patient Side:**
- Doctor search and filtering
- Appointment booking
- Video consultations
- Medical records access
- Prescription management

**Doctor Side:**
- Appointment scheduling
- Video consultations
- Prescription creation
- Patient information management

## Tech Stack

- React Native
- TypeScript
- React Navigation
- Context API (State Management)
- Zego Cloud SDK (Video Calling)

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ConsumerDocterApp
npm install
```

2. Configure Zego Cloud credentials in `src/constants/config.ts`:
   - Sign up at zegocloud.com
   - Get your AppID and AppSign
   - Add them to the config file

3. Run the app:

**Android:**
```bash
npm run android
```

**iOS (macOS required):**
```bash
cd ios && pod install && cd ..
npm run ios
```

## Project Structure

```
src/
├── screens/
│   ├── patient/      # 19 patient screens
│   └── doctor/       # 12 doctor screens
├── navigation/       # Navigation configuration
├── context/          # Authentication context
├── constants/        # Theme and configuration
└── services/         # Data services
```

## Video Call Implementation

- One-to-one video calls using Zego Cloud SDK
- Microphone and camera controls
- Deterministic room IDs for reliable connections
- Automatic permission handling

## Troubleshooting

**Build errors (insufficient storage):**
```bash
adb -s emulator-5554 uninstall com.consumerdocterapp
npm run android
```

**Clear Metro cache:**
```bash
npm start -- --reset-cache
```

**iOS pod issues:**
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
```

## Platform Support

- **Android**: Fully tested
- **iOS**: Ready to build (requires macOS)

## Requirements

- Node.js v16+
- React Native CLI
- Android Studio / Xcode
- Zego Cloud account

## APK Location

Built APK can be found at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

Made by **Chitranshu Pandey**
