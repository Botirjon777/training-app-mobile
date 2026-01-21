# Build, Install, and Run Training App on Emulator
# This script builds the release APK, installs it on the emulator, and launches the app

Write-Host "Starting build process..." -ForegroundColor Cyan

# Step 1: Build the release APK
Write-Host "`n[1/3] Building release APK..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\android"
.\gradlew.bat app:assembleRelease -x lint -x test --configure-on-demand --build-cache -PreactNativeDevServerPort=8081

if ($LASTEXITCODE -ne 0) {
    Write-Host "`nBuild failed!" -ForegroundColor Red
    exit 1
}

Write-Host "`nBuild completed successfully!" -ForegroundColor Green

# Step 2: Install APK on emulator
Write-Host "`n[2/3] Installing APK on emulator..." -ForegroundColor Yellow
$adbPath = "C:\Users\User\AppData\Local\Android\Sdk\platform-tools\adb.exe"
$apkPath = "$PSScriptRoot\android\app\build\outputs\apk\release\app-release.apk"

& $adbPath install -r $apkPath

if ($LASTEXITCODE -ne 0) {
    Write-Host "`nInstallation failed!" -ForegroundColor Red
    exit 1
}

Write-Host "`nInstallation completed successfully!" -ForegroundColor Green

# Step 3: Launch the app
Write-Host "`n[3/3] Launching app on emulator..." -ForegroundColor Yellow
& $adbPath shell am start -n com.trainingapp.fitness/.MainActivity

if ($LASTEXITCODE -ne 0) {
    Write-Host "`nFailed to launch app!" -ForegroundColor Red
    exit 1
}

Write-Host "`nApp launched successfully!" -ForegroundColor Green
Write-Host "`n✓ All steps completed successfully!" -ForegroundColor Cyan
