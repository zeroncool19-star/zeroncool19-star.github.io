# 🚀 Deploy Your Seaweed Swimmer Website to GitHub Pages

## 📋 What We've Created

Your website includes:
- ✅ **index.html** - Beautiful landing page for your game
- ✅ **style.css** - Professional styling
- ✅ **privacy-policy.html** - Required privacy policy page
- ✅ **app-ads.txt** - AdMob verification file (in the root!)
- ✅ **README.md** - Repository documentation

## 🔧 Step-by-Step Deployment Instructions

### Step 1: Open Terminal/Command Prompt

Navigate to the github-pages folder:
```bash
cd /app/github-pages
```

### Step 2: Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit - Seaweed Swimmer website"
```

### Step 3: Connect to Your GitHub Repository

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username (the one you used to create seaweedswimmer.github.io):

```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/seaweedswimmer.github.io.git
git branch -M main
git push -u origin main
```

**Example:** If your GitHub username is "johndoe":
```bash
git remote add origin https://github.com/johndoe/seaweedswimmer.github.io.git
```

### Step 4: Authenticate with GitHub

When prompted, you'll need to authenticate. GitHub now requires a Personal Access Token (not password):

1. Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "Seaweed Swimmer deployment"
4. Select scopes: ✅ repo (all checkboxes)
5. Generate token and COPY IT (you won't see it again!)
6. Use this token as your password when git asks

### Step 5: Verify Deployment

1. Go to: https://github.com/YOUR_GITHUB_USERNAME/seaweedswimmer.github.io
2. Click "Settings" tab
3. Scroll to "Pages" section (left sidebar)
4. You should see: "Your site is published at https://seaweedswimmer.github.io"

**Note:** It may take 1-2 minutes for the site to go live.

## ✅ Verification Checklist

After deployment, verify these URLs work:

- [ ] **Main site:** https://seaweedswimmer.github.io
- [ ] **Privacy policy:** https://seaweedswimmer.github.io/privacy-policy.html
- [ ] **app-ads.txt:** https://seaweedswimmer.github.io/app-ads.txt

## 📱 Update Your Google Play Store Listing

1. Go to Google Play Console
2. Navigate to your app → Store presence → Store listing
3. In the "Website" field, enter: `https://seaweedswimmer.github.io`
4. Save changes

## 🔐 Update AdMob

1. Go to AdMob console
2. Navigate to Apps → Your app
3. The system will automatically verify your app-ads.txt file at:
   `https://seaweedswimmer.github.io/app-ads.txt`
4. Wait 24 hours for verification

## 🛠️ Troubleshooting

### "Permission denied" error
- Make sure you're using a Personal Access Token, not your password
- Verify the repository name is exactly: `seaweedswimmer.github.io`

### "Repository not found"
- Double-check your GitHub username in the remote URL
- Make sure the repository exists at github.com/YOUR_USERNAME/seaweedswimmer.github.io

### Site not loading
- Wait 2-3 minutes after first push
- Check GitHub Pages settings in your repository
- Ensure the branch is set to "main" in Pages settings

### app-ads.txt not found
- Verify the file is in the root directory (not in a subfolder)
- Check it's accessible at https://seaweedswimmer.github.io/app-ads.txt
- Wait 24 hours for AdMob to crawl it

## 📧 Need Help?

If you get stuck, check:
1. GitHub Pages documentation: https://pages.github.com/
2. GitHub authentication: https://docs.github.com/en/authentication

## 🎉 Once Live

Your website will be accessible at:
**https://seaweedswimmer.github.io**

And your app-ads.txt will be at:
**https://seaweedswimmer.github.io/app-ads.txt**

Perfect for Google Play Store and AdMob verification!
