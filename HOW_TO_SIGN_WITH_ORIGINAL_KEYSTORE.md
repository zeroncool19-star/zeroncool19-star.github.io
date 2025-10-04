# How to Sign Your App with Original Keystore

## Step-by-Step Guide

### Step 1: Open Your Project in Android Studio

1. Open Android Studio
2. Click **"Open"**
3. Navigate to and select: `frontend/android` folder (from your extracted zip)
4. Click **"OK"**
5. Wait for Gradle sync to complete

---

### Step 2: Start the Signing Process

1. In Android Studio menu, go to: **Build > Generate Signed Bundle / APK**
2. Select **"Android App Bundle"** (NOT APK)
3. Click **"Next"**

---

### Step 3: Select Your ORIGINAL Keystore

1. Click **"Choose existing..."** button
2. Browse to your original keystore file location
   - It might be named: `seaweed-swimmer-keystore.jks` or similar
3. Select it and click **"Open"**

---

### Step 4: Enter Keystore Details

Now you'll see a form. Fill it in:

**Key store path:** 
- Should auto-fill with your keystore location
- Example: `C:\Users\YourName\Documents\seaweed-swimmer-keystore.jks`

**Key store password:**
- Enter the password you used when creating the ORIGINAL keystore
- ⚠️ This must be EXACTLY what you used before

**Key alias:**
- Enter the alias you used (probably something like: `seaweed-swimmer` or `seaweedswimmer`)
- ⚠️ Must match your original alias

**Key password:**
- Enter the key password from your original keystore
- (Might be same as keystore password)

**Remember passwords:** ✅ Check this box (saves for next time)

---

### Step 5: Verify It's Correct

Before clicking Next, double-check:
- ✅ Keystore path points to your ORIGINAL file
- ✅ Passwords are correct (no typos)
- ✅ Alias matches original

**If passwords are wrong, you'll get an error. That's OK - try again!**

---

### Step 6: Build Configuration

After entering correct credentials, click **"Next"**

You'll see build options:

**Destination Folder:**
- Choose where to save your AAB
- Default is usually fine: `app/release/`

**Build Variants:**
- Select: **"release"** (should be default)

**Signature Versions:**
- ✅ Check **V1 (Jar Signature)**
- ✅ Check **V2 (Full APK Signature)**

Click **"Finish"**

---

### Step 7: Wait for Build

Android Studio will now:
1. Compile your app
2. Sign it with your original keystore
3. Create the AAB file

**Bottom right corner** will show progress:
```
Building...
Gradle build running...
```

This takes 1-5 minutes depending on your computer.

---

### Step 8: Find Your Signed AAB

When build completes, you'll see:
```
✅ Build: build successful
   locate
```

Click **"locate"** or manually go to:
```
frontend/android/app/release/app-release.aab
```

**This is your signed AAB file!** 🎉

---

### Step 9: Verify Signature (Optional but Recommended)

To confirm it's signed with the correct keystore:

**Open Terminal/Command Prompt** and run:

```bash
# Windows
cd path\to\your\project\frontend\android\app\release
jarsigner -verify -verbose -certs app-release.aab

# Mac/Linux
cd path/to/your/project/frontend/android/app/release
jarsigner -verify -verbose -certs app-release.aab
```

Look for:
```
jar verified.
```

And check the certificate SHA1 matches: `5A:E0:F1:A2:52:79...`

---

### Step 10: Upload to Google Play

Now you can upload this AAB:

1. Go to Google Play Console
2. Navigate to your app
3. Go to **"Release" > "Production"** (or Testing)
4. Click **"Create new release"**
5. **Upload** your `app-release.aab`
6. Fill in release notes
7. Click **"Review release"**
8. Click **"Start rollout to production"**

**This time it should work!** ✅

---

## Common Issues & Solutions

### Issue 1: "Keystore password incorrect"

**Solution:**
- Double-check your password (no extra spaces)
- Try any variations you might have used
- Check if you saved it in a password manager
- Look for a text file where you might have saved it

### Issue 2: "Key alias not found"

**Solution:**
- Try common aliases:
  - `seaweed-swimmer`
  - `seaweedswimmer`
  - `my-key-alias`
  - `release`
  - `key0`

To list all aliases in your keystore:
```bash
keytool -list -v -keystore path/to/your/keystore.jks
```

### Issue 3: "Cannot find keystore file"

**Solution:**
- Make sure you're pointing to the `.jks` file (not a folder)
- Use full path, not relative path
- Copy keystore to a simple location like Desktop temporarily

### Issue 4: Build succeeds but Google Play still rejects

**Solution:**
- Verify SHA1 fingerprint matches
- Make sure you're using the RIGHT keystore file
- Check you didn't accidentally create a new one

---

## Quick Reference

**Build Command:**
```
Build > Generate Signed Bundle / APK
└─ Android App Bundle
   └─ Choose existing keystore
      └─ Enter passwords
         └─ Select release variant
            └─ Finish
```

**Output Location:**
```
frontend/android/app/release/app-release.aab
```

---

## Tips

💡 **Save your keystore info in Android Studio**
- Check "Remember passwords" when signing
- Studio will save for next time

💡 **Backup your keystore NOW**
- Before uploading, make 3 copies
- External drive, cloud storage, USB

💡 **Increment version code**
- Should be 12 in build.gradle (already done)
- Each upload needs higher version code

💡 **Test on device first**
- Install the AAB on test device before uploading
- Make sure app works as expected

---

## Need Help?

If you get stuck, let me know:
1. What error message you see
2. At which step you're having trouble
3. Whether passwords are working

I'll help you get through it! 🚀
