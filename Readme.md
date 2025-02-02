# Formular Validare Plugin

**Formular Validare** is a custom WordPress block plugin that allows users to validate Romanian CNP (Cod Numeric Personal) using an external API. The plugin includes a custom Gutenberg block with editable text fields and integrates API validation directly in the frontend.


---

## 🔒 **Security Features**
- **REST API Protection**: All API requests use **WordPress REST API with nonce validation**.
- **Admin-Only API Key Retrieval**: The API key is stored securely in WordPress options and **can only be retrieved by administrators**.
- **No Direct Access**: Prevents unauthorized users from accessing sensitive data.

---

---

## 🚀 Features
- **Custom Gutenberg Block:** Allows users to enter a CNP and validate it via an external API.
- **Editable Block Settings:** Users can modify the **header text, button text, and placeholder text** in the block editor.
- **REST API Integration:** Fetches the API key securely via WordPress REST API.
- **Dynamic Validation Response:** Displays validation results in a styled list instead of an alert.

---

## 📦 Installation
### 1️⃣ **Download & Upload**
- Clone or download the plugin folder.
- Upload it to `wp-content/plugins/` directory.

### 2️⃣ **Activate Plugin**
- Go to **WordPress Admin → Plugins** and activate `Formular Validare`.

### 3️⃣ **Run Dependencies**
```sh
npm install
npm run build

---

## 📂 Plugin Structure

```
└── 📁formular-validare
    └── 📁build
        └── 📁formular-validare
            └── block.json
            └── index.asset.php
            └── index.css
            └── index.css.map
            └── index.js
            └── index.js.map
            └── style-index.css
            └── style-index.css.map
            └── view.asset.php
            └── view.js
            └── view.js.map
    └── 📁lib
        └── autoload.php
        └── 📁blocks
            └── 📁inc
            └── index.php
        └── 📁hooks
            └── 📁inc
                └── block-assets.php
                └── plugin-settings-page.php
                └── register-plugin-settings.php
            └── index.php
    └── 📁src
        └── 📁formular-validare
            └── block.json
            └── edit.js
            └── editor.scss
            └── index.js
            └── save.js
            └── style.scss
            └── view.js
    └── formular-validare.php
    └── package-lock.json
    └── package.json
    └── Readme.md
```


