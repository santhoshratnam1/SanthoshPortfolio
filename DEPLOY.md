# 🚀 Deploy to GitHub Pages

Since you already have a Git repository set up, here's how to deploy your updated portfolio:

## Option 1: Using Your Git Client (Easiest)

1. **Open your Git client** (GitKraken, GitHub Desktop, etc.)
2. **Open your repository**: `SanthoshPortfolio`
3. **Copy all files** from `Portfolio_Final` folder to your repository folder
4. **Stage all changes** (add all files)
5. **Commit** with message: "Update portfolio with new features and content"
6. **Push** to GitHub

## Option 2: Using Command Line

If your repository is in a different location:

```bash
# Navigate to your repository folder
cd "D:\Portfolio Website"  # or wherever your repo is

# Copy files from Portfolio_Final
# (You'll need to copy manually or use commands)

# Then commit and push
git add .
git commit -m "Update portfolio with new features"
git push origin main
```

## Option 3: Initialize Git in Current Folder

If you want to use this `Portfolio_Final` folder as your repo:

```bash
# Initialize git
git init

# Add remote (your existing GitHub repo)
git remote add origin https://github.com/santhoshratnam1/SanthoshPortfolio.git

# Add all files
git add .

# Commit
git commit -m "Update portfolio with new features"

# Push
git branch -M main
git push -u origin main
```

## GitHub Pages Settings

1. Go to: https://github.com/santhoshratnam1/SanthoshPortfolio/settings/pages
2. **Source**: Select `main` branch, `/ (root)` folder
3. **Save**

Your site will be live at: https://santhoshratnam1.github.io/SanthoshPortfolio/

---

**Note:** If your current GitHub Pages uses a `public` folder, you may need to:
- Either move files to `public` folder, OR
- Change GitHub Pages settings to use root folder

