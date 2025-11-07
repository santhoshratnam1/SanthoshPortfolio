# 🔧 Troubleshooting Guide

Complete guide for fixing common issues with your portfolio website.

## 🚨 Most Common Issue: CORS Error

### The Problem
You see errors like "Failed to fetch" or "CORS policy" when opening the website. This happens when you double-click `index.html` directly.

### ✅ Solution: Use a Local Server

**EASIEST: VS Code Live Server**
1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"
3. Done! ✅

**Alternative: Python**
```bash
python -m http.server 8000
# Then open: http://localhost:8000
```

**Alternative: Node.js**
```bash
npm install -g http-server
http-server
# Then open: http://localhost:8080
```

---

## 🔄 Content Not Updating

### Solution 1: Hard Refresh (Most Common)
- **Windows/Linux:** `Ctrl + Shift + R` or `Ctrl + F5`
- **Mac:** `Cmd + Shift + R`

### Solution 2: Check Browser Console
1. Press `F12` to open Developer Tools
2. Click "Console" tab
3. Look for error messages

**✅ If working, you'll see:**
```
✅ Content loaded successfully from content.json
✅ Website content populated successfully!
```

**❌ If broken, you'll see:**
```
❌ Error loading content: Failed to fetch
⚠️ CORS ERROR DETECTED!
```

### Solution 3: Validate JSON
1. Copy content from `content.json`
2. Go to https://jsonlint.com
3. Paste and validate
4. Fix any syntax errors

---

## 🖼️ Images Not Loading

### Check Console
Look for errors like "Failed to load icon" in the browser console.

### Verify Files Exist
- Check that image files are in `assets/images/` folder
- Verify file names match exactly (case-sensitive)

### Fix Paths
In `content.json`, use absolute paths:
- ✅ `/assets/images/icon-dev.svg`
- ❌ `./assets/images/icon-dev.svg` (may not work with some servers)

---

## 📝 JSON Syntax Errors

### Common Mistakes

**Missing Comma:**
```json
❌ Wrong:
"name": "John"
"title": "Designer"

✅ Correct:
"name": "John",
"title": "Designer"
```

**Wrong Quotes:**
```json
❌ Wrong: 'name': 'John'
✅ Correct: "name": "John"
```

**Extra Comma:**
```json
❌ Wrong: "name": "John",
✅ Correct: "name": "John"
```

---

## 🔍 Debugging Steps

1. **Check Console** (`F12`) - Most errors show here
2. **Validate JSON** - Use jsonlint.com
3. **Hard Refresh** - `Ctrl+Shift+R`
4. **Use Local Server** - Never open HTML directly
5. **Check File Paths** - Verify all paths are correct

---

## 💡 Pro Tips

- Always use a local server (Live Server recommended)
- Hard refresh after every change
- Check console first when something breaks
- Validate JSON before saving if unsure
- Keep backup of `content.json` before major edits

---

## 🆘 Still Not Working?

1. Check browser console for specific errors
2. Verify `content.json` is saved and valid
3. Make sure you're using a local server
4. Try a different browser
5. Check if JavaScript is enabled

---

**Remember:** The console (`F12`) is your best friend! Always check it first! 🎯
