# Autogram Integration

---
### Repository layout

```
autogram-signature/
├── .gitignore   # ignores IDE files
├── index.html   # self‑contained Single‑Page App (open this in a browser)
└── README.md    # project overview & usage guide
```
---

### Quick start

> No build step required – a modern browser is enough.

1. **Clone / download** this repo.  
2. Open `index.html` or run live server:  
   * If you use **VSCode**, install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) and run it
   * If you use **WebStorm**, right-click `index.html` and select **Open in Browser**
   * If you use **Chrome**, open `index.html` directly in the browser
3. Make sure that it runs at live server or opened in a browser,
4. Install the [Autogram Desktop](https://sluzby.slovensko.digital/autogram/#download) so the custom URI `autogram://go` is registered
5. Follow the UI: select a PDF → adjust options → **Sign PDF**
   If the desktop app doesn’t launch automatically, click **Open Autoram**
---

### Customisation notes

* All logic lives inside `index.html` made it `Vue.js` like widget component
* Styling is done with `Tailwind CSS`
* PDF/A detection uses XMP metadata via `pdf.js`
* To target a different server address, edit the method `fetch (Fetch API)` URL in function `signPdf()`

---
## Launching Autogram CLI Silently at Startup

To run `autogram-cli.exe` on Windows boot (for all users) without any visible console or GUI, the most stable and user-friendly approach is to use **Task Scheduler**. This lets you configure Autogram CLI to run in the background on system startup. Here's how to set it up step by step:

1.  **Install Autogram Normally:** Ensure you have Autogram installed via the MSI installer. This will place `autogram-cli.exe` on your system (typically in `C:\Program Files\Autogram\` or a similar directory). No special installation options are needed for CLI usage.

2.  **Open Task Scheduler:** Press <kbd>Win+R</kbd>, type `taskschd.msc` and hit Enter. In the Task Scheduler, choose **"Create Task"** (not just Basic Task, for full options).

3.  **General Settings:** Give the task a name (e.g. "Autogram Background Service"). Choose **"Run whether user is logged on or not."** This option is key to running it hidden -- it will run the task in the background without opening any window on the desktop. (When you save the task, you'll be prompted to enter the account password for permission.) For best results, use an account with administrative privileges or the **SYSTEM** account. Running under the System account ensures no user-interface, and the process will start at boot before any user logs in. *(Note: if you use System, check "Run with highest privileges"; if you use a specific user, that user needs to have Autogram installed/access to the program files.)*

4.  **Trigger:** In the **Triggers** tab, create a new trigger set to **"At startup"**. This ensures the task runs when the machine boots. (If you prefer it to start when any user logs in instead, you can use an "At logon" trigger for all users, but "At startup" with System is truly machine-wide.)

5.  **Action:** In the **Actions** tab, create a new action to **"Start a program."** For the program path, browse to the Autogram installation folder and select **`autogram-cli.exe`**. If Autogram CLI requires any command-line arguments to start its background service, add them here -- however, in most cases, simply running `autogram-cli.exe` with no arguments will launch the Autogram backend. (There is no special `--daemon` or `--quiet` flag documented, so no extra arguments are typically needed for normal operation. You can verify by running `autogram-cli --help` in a console to see available options.)

6.  **Conditions/Settings:** In the **Conditions** tab, you might uncheck "Stop if on batteries" (if on a laptop) to ensure it always runs. In the **Settings** tab, you can enable "Restart the task if it fails" so that if Autogram CLI crashes or exits, it will restart after a delay -- this helps keep it running persistently.

7.  **Save the Task:** Click OK to save. If using your user account (with "run whether user is logged on or not"), you'll be prompted to enter your Windows credentials so Task Scheduler can run it in the background. If using SYSTEM, choose the built-in "SYSTEM" account (`NT AUTHORITY\SYSTEM`) in the task's **Security options** and check "Run with highest privileges" (no password needed for SYSTEM).

8.  **Verify on Boot:** Reboot the machine or start the task manually to test. The Autogram CLI process should launch without any visible window. You can open Task Manager and look under **Background Processes** to confirm "Autogram" or a Java process is running. Autogram's REST API (on default port 37200) should now be available on localhost after startup, and any Autogram functionality (like the browser extension or custom protocol calls) will connect to this running instance.