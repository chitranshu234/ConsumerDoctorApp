# 🏥 ConsumerDoctorApp(MediConnect)

A telemedicine app built with React Native that lets patients video call with doctors. Simple, functional, and works!

## What's This?

This is a full-featured healthcare app where:
- **Patients** can search for doctors, book appointments, and do video consultations
- **Doctors** can manage appointments and consult with patients via video

Built for a React Native internship assignment.

## 🎯 Main Features

**For Patients:**
- Find and book doctors by specialization
- Video call with doctors
- Manage appointments and prescriptions
- View medical records

**For Doctors:**
- See appointment schedule
- Video consultations with patients
- Create and share prescriptions

**The Cool Part:** Real-time HD video calls using Zego Cloud SDK

## 🛠️ Tech Stack

- React Native + TypeScript
- React Navigation
- Zego Cloud SDK (for video calls)
- Context API (state management)

## 🚀 Quick Start

### Prerequisites

You'll need:
- Node.js (v16+)
- React Native CLI
- Android Studio or Xcode
- A Zego Cloud account (free signup)

### Setup

1. **Clone and install:**
```bash
git clone <your-repo>
cd ConsumerDocterApp
npm install
```

2. **Get Zego credentials:**
   - Sign up at [zegocloud.com](https://www.zegocloud.com/)
   - Create a project and grab your AppID and AppSign
   - Add them to `src/constants/config.ts`

3. **Run it:**

Android:
```bash
npm run android
```

iOS (Mac only):
```bash
cd ios && pod install && cd ..
npm run ios
```

## 📂 Project Structure

```
src/
├── screens/          # All app screens
│   ├── patient/      # 19 screens for patients
│   └── doctor/       # 12 screens for doctors
├── navigation/       # App navigation setup
├── context/          # Auth state management
├── constants/        # Theme colors, Zego config
└── services/         # Mock data service
```

## 🎥 Video Calling

The video call feature includes:
- Mute/unmute mic
- Camera on/off
- End call
- Auto permission requests

**How it works:** Each doctor gets a unique room ID, so when a patient calls Dr. X, they both join the same room. Simple!

## ⚠️ Common Issues

**"Insufficient Storage" error?**
```bash
adb -s emulator-5554 uninstall com.consumerdocterapp
npm run android
```

**Metro cache issues?**
```bash
npm start -- --reset-cache
```

**iOS pod issues?**
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
```

## 📱 Supported Platforms

-  **Android** - Fully tested
-  **iOS** - Ready to build (need a Mac)

## 🔑 Important Notes

1. **Zego Config:** You MUST add your own Zego credentials in `config.ts` for calls to work
2. **Mock Data:** Currently using dummy data from `MockDataService.ts`
3. **Patches:** Some Zego SDK fixes are auto-applied via `patch-package`

## 📦 APK Location

After building, find your APK here:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

Install it on any Android phone!

## 🤝 What I Learned

Building this taught me:
- Integrating video SDKs 
- Debugging native modules
- Managing complex navigation flows
- TypeScript best practices
- Cross-platform considerations

---

Made by **Chitranshu Pandey**
