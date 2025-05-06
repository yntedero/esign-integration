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