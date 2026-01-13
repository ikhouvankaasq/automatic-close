# Automatic Close - Chrome Extension

Automatic Close is a Chrome extension that allows you to automatically close specific websites or tabs. You can organize blocked domains into folders, enable or disable the extension, use dark mode, and manage domains both from a popup or a full dashboard.

---

## 🌟 Features

- **Automatic Tab Blocking:** Automatically closes tabs that match blocked domains when the extension is enabled.
- **Folder Organization:** Organize blocked domains into folders for easier management.
- **Selectable Folder:** Click on a folder to select it; new domains are added to the selected folder.
- **Folder Deletion:** Delete folders (except Default) along with all their domains.
- **Domain Deletion:** Delete individual blocked domains easily.
- **Enable / Disable:** Quick toggle to enable or disable the extension.
- **Popup & Dashboard:** Quick popup for adding domains or open a full dashboard for easier management.
- **Dashboard:** A full-page, wide layout for managing domains and folders, smooth scrolling.
- **Dark Mode:** Toggle dark mode for both popup and dashboard.
- **Search:** Live search to filter blocked domains in popup and dashboard.
- **Add via Enter Key:** Add new domains by pressing Enter.
- **Import/Export Folders:** Prepare for future export/import functionality (currently folder management supported).

---

## 📂 File Structure

automatic-close/
├─ popup.html # The extension popup layout
├─ popup.js # Logic for popup interactions
├─ dashboard.html # Full-page dashboard layout
├─ dashboard.js # Logic for the dashboard
├─ background.js # Background script to automatically close blocked tabs
├─ automatic-close-logo.png # Logo used in popup and dashboard
├─ manifest.json # Chrome extension manifest
└─ README.md # This README file

---

## 🛠 How It Works

### 1. **Popup**

- Opens when you click the extension icon.  
- Allows you to:
  - Add a domain to the selected folder.
  - Select a folder to add new domains to.
  - Delete individual domains.
  - Delete folders (except Default) using the 🗑️ button next to folders.
  - Toggle Enable/Disable for automatic closing.
  - Toggle dark mode.
  - Open the dashboard for a full-page view.
- Live search filters domains instantly in the popup.
- Pressing Enter in the input field will add the domain to the selected folder.

### 2. **Dashboard**

- Opens in a full browser tab for easier management.
- Uses the same layout as popup, but wider (max-width 1200px).
- Smooth scrolling and larger inputs for comfortable use.
- Allows:
  - Selecting folders.
  - Adding domains to the selected folder.
  - Deleting individual domains.
  - Adding new folders.
  - Deleting folders with all contained domains (Default folder cannot be deleted).
  - Live search across all domains.
  - Enable/Disable toggle.
  - Dark mode toggle.

### 3. **Background Script (`background.js`)**

- Monitors all tabs using `chrome.tabs.onCreated` and `chrome.tabs.onUpdated`.
- When enabled, closes any tab that matches a blocked domain.
- Never closes the dashboard tab.
- Works independently of the popup; tabs are closed automatically even if the popup is not open.

### 4. **Folder Management**

- Click on any folder to select it; new domains are added to that folder.
- Delete a folder using the 🗑️ button; all domains in that folder are also deleted.
- Default folder is permanent and cannot be deleted.

### 5. **Domain Management**

- Add domains via input + Enter or the `+` button.
- Delete domains individually using ❌ button.
- Domains are automatically grouped by folder.

### 6. **Enable / Disable**

- Enable or disable the extension to control automatic tab closure.
- Works in both popup and dashboard.

### 7. **Dark Mode**

- Toggle dark mode for easier nighttime use.
- Applies to both popup and dashboard.

### 8. **Search Functionality**

- Live search filters blocked domains by text.
- Search bar can be toggled with the search icon (🔍) in popup or dashboard.

---

## ⚡ Installation

1. Clone this repository or download as ZIP.
2. Open `chrome://extensions/` in Google Chrome.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the folder containing the extension files.
5. The extension icon will appear in the Chrome toolbar.
6. Click the icon to open the popup, or open the dashboard via the ↗️ button.

---

## 📌 Notes

- The extension does **not** interfere with your other tabs except for the blocked domains.
- Always add domains correctly (e.g., `youtube.com`, `facebook.com`) to ensure they are blocked.
- Dashboard is recommended for managing a large number of domains and folders.
- Popup is optimized for quick access and adding domains.
