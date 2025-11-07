# 📝 Website Content Editor Guide

## Welcome! 
This guide will help you edit your website content easily without any coding knowledge.

## 📁 The Helper File: `content.json`

All your website content is stored in a file called **`content.json`** located in the `public` folder.

You can edit this file using:
- **Notepad** (Windows)
- **TextEdit** (Mac)
- **Any text editor** (VS Code, Notepad++, etc.)

---

## 🎯 How to Edit Content

### ⚠️ IMPORTANT RULES:
1. **Always keep the JSON format** - Don't delete commas, brackets, or quotes
2. **Use double quotes** `"` for text, not single quotes
3. **Don't add extra commas** at the end of the last item in a list
4. **Save the file** after making changes
5. **Refresh your browser** to see the changes

---

## 📋 What You Can Edit

### 1. Personal Information

Find the `"personalInfo"` section:

```json
"personalInfo": {
  "name": "Shanmuga Ratnam",           ← Change your name here
  "title": "Game Designer/Level Designer", ← Change your job title
  "email": "santhoshratnam1@gmail.com", ← Change your email
  "phone": "+1 604 729 1246",          ← Change your phone
  "birthday": "January 09, 1999",      ← Change your birthday
  "location": "Chennai,TamilNadu,India", ← Change location
  "resumeLink": "https://drive.google.com/file/d/1pEWCpUG7P1kZhWc8JxYFKDNp2zSn-R7D/view?usp=sharing"          ← Change resume link
}
```

**Example:**
```json
"name": "John Doe",
"title": "Senior Game Designer",
"email": "john@example.com"
```

---

### 2. About Section

Find the `"about"` section:

```json
"about": {
  "paragraphs": [
    "Your first paragraph here...",  ← Edit this
    "Your second paragraph here..."  ← Edit this
  ]
}
```

**To add more paragraphs:**
- Add a comma after the last paragraph
- Add a new line with `"Your new paragraph here"`

**Example:**
```json
"paragraphs": [
  "I'm a passionate game designer...",
  "I love creating immersive experiences...",
  "My goal is to make games that players remember forever."
]
```

---

### 3. Services (What I'm Doing)

Find the `"services"` section:

```json
"services": [
  {
    "icon": "./assets/images/icon-design.svg",
    "title": "Game Design",                    ← Change title
    "description": "Your description here..."  ← Change description
  }
]
```

**To add a new service:**
1. Add a comma after the last service
2. Copy the structure and add your new service

**Example:**
```json
{
  "icon": "./assets/images/icon-design.svg",
  "title": "3D Modeling",
  "description": "Creating stunning 3D models for games."
}
```

---

### 4. Testimonials (Feedbacks)

Find the `"testimonials"` section:

```json
"testimonials": [
  {
    "name": "Quinlan Henshaw",              ← Change name
    "avatar": "./assets/images/avatar-1.png", ← Change image path
    "text": "Great work..."                 ← Change testimonial text
  }
]
```

**To add a new testimonial:**
1. Add a comma after the last testimonial
2. Copy the structure and add your new testimonial

**Example:**
```json
{
  "name": "Jane Smith",
  "avatar": "./assets/images/avatar-5.png",
  "text": "Amazing work! The game design was outstanding."
}
```

---

### 5. Companies Worked

Find the `"companies"` section:

```json
"companies": [
  {
    "name": "Company 1",                    ← Change company name
    "logo": "./assets/images/logo-1-color.png", ← Change logo path
    "link": "https://company1.com"        ← Change company website
  }
]
```

**To add a new company:**
1. Add a comma after the last company
2. Copy the structure and add your new company

**Example:**
```json
{
  "name": "Epic Games",
  "logo": "./assets/images/epic-logo.png",
  "link": "https://epicgames.com"
}
```

---

### 6. Projects

Find the `"projects"` section. There are two types:

#### Game Projects:
```json
"gameProject": [
  {
    "id": "ragball",                                    ← Unique ID (don't change)
    "title": "Ragball",                                 ← Change project name
    "category": "game project",                        ← Keep this
    "image": "./assets/images/blog-3.png"              ← Change image path
  }
]
```

#### Others Projects:
```json
"others": [
  {
    "id": "nekokuza",                                   ← Unique ID (don't change)
    "title": "Nekokuza",                               ← Change project name
    "category": "others",                              ← Keep this
    "image": "./assets/images/project-3.png"            ← Change image path
  }
]
```

**To add a new project:**
1. Add a comma after the last project
2. Copy the structure and add your new project
3. Give it a unique `id` (lowercase, no spaces)

**Example:**
```json
{
  "id": "my-new-game",
  "title": "My New Game",
  "category": "game project",
  "image": "./assets/images/my-game.png"
}
```

---

## 🖼️ Adding Images

When adding images:
1. Place your image in the `public/assets/images/` folder
2. Use the path: `"./assets/images/your-image.png"`
3. Supported formats: `.png`, `.jpg`, `.jpeg`, `.svg`

---

## ✅ Quick Checklist

Before saving, make sure:
- [ ] All text is in double quotes `"`
- [ ] Commas are between items (not after the last one)
- [ ] All brackets `{ }` and `[ ]` are closed
- [ ] No extra commas at the end
- [ ] File is saved as `content.json` (not `.txt`)

---

## 🐛 Common Mistakes

### ❌ Wrong:
```json
"name": 'John Doe',  ← Single quotes
"name": John Doe,     ← No quotes
"name": "John Doe",,  ← Extra comma
```

### ✅ Correct:
```json
"name": "John Doe"
```

---

## 🔄 How to See Changes

1. **Save** the `content.json` file
2. **Refresh** your browser (Press F5 or Ctrl+R)
3. Changes should appear immediately!

---

## 💡 Tips

- **Backup first**: Copy `content.json` before making big changes
- **Test one change at a time**: Make small changes and test
- **Use a JSON validator**: Check [jsonlint.com](https://jsonlint.com) if something breaks
- **Keep it simple**: Don't add complex formatting in text fields

---

## 📞 Need Help?

If something doesn't work:
1. Check for typos in the JSON format
2. Make sure all quotes and commas are correct
3. Validate your JSON at [jsonlint.com](https://jsonlint.com)
4. Check the browser console (F12) for errors

---

## 7. Project Modals (Detailed Project Pages)

Find the `"projectModals"` section. Each project has its own modal with detailed information.

### Project Modal Structure:

```json
"projectModals": {
  "ragball": {
    "header": {
      "title": "Ragball",
      "subtitle": "Physics-Based Sports Puzzle Game",
      "meta": [
        {"label": "Engine", "value": "Unity"},
        {"label": "Role", "value": "Game Designer / Programmer"}
      ],
      "downloadLink": "YOUR_GOOGLE_DRIVE_LINK_HERE"
    },
    "overview": [
      "First paragraph of project overview...",
      "Second paragraph..."
    ],
    "levelDesign": [
      {
        "number": "Level 01",
        "title": "Tutorial Arena",
        "description": "Description of the level..."
      }
    ],
    "goals": [
      "Goal 1",
      "Goal 2"
    ],
    "features": [
      "Feature 1",
      "Feature 2"
    ],
    "metrics": [
      {"value": "1", "label": "Core Level"},
      {"value": "4 Weeks", "label": "Development"}
    ],
    "challenges": [
      {
        "title": "Challenge Name",
        "problem": "What was the problem?",
        "solution": "How did you solve it?"
      }
    ],
    "gameAreas": [
      {
        "name": "Area Name",
        "description": "Description of the area..."
      }
    ],
    "media": [
      {
        "type": "image",
        "src": "./assets/images/image.png",
        "alt": "Image description",
        "caption": "Caption for the image"
      },
      {
        "type": "video",
        "src": "https://www.youtube.com/embed/VIDEO_ID",
        "caption": "Video caption"
      }
    ],
    "finalThoughts": [
      "First paragraph of final thoughts...",
      "Second paragraph..."
    ]
  }
}
```

### Sections You Can Edit:

1. **Header** - Title, subtitle, meta info, download link
2. **Overview** - Project description paragraphs
3. **Level Design** - List of levels/episodes
4. **Goals** - Project goals list
5. **Features** - Key features list
6. **Metrics** - Project statistics
7. **Challenges** - Problems and solutions
8. **Game Areas** - Different areas/zones in the game
9. **Media** - Images and videos
10. **Final Thoughts** - Reflection paragraphs

### To Add a New Level:

```json
{
  "number": "Level 02",
  "title": "Advanced Arena",
  "description": "Your level description here..."
}
```

### To Add a New Challenge:

```json
{
  "title": "Your Challenge Title",
  "problem": "Describe the problem...",
  "solution": "Describe how you solved it..."
}
```

### To Add Media:

**For Images:**
```json
{
  "type": "image",
  "src": "./assets/images/your-image.png",
  "alt": "Image description",
  "caption": "Caption text"
}
```

**For Videos (YouTube):**
```json
{
  "type": "video",
  "src": "https://www.youtube.com/embed/VIDEO_ID",
  "caption": "Video caption"
}
```

---

## 🎉 You're All Set!

Now you can easily update your website by editing `content.json`!

**Remember:** All project modal content is editable in the `"projectModals"` section!

Happy editing! 🚀

