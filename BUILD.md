# Build

## Instructions

```bash
cd project_folder
```

```bash
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res`
```

```bash
cd android
```

```bash
./gradlew assembleDebug
```

```bash
android/app/build/outputs/apk/debug/app-debug.apk
```
