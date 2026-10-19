# Cinephoria — Membership Application

A retro cinema-themed membership application website for **Cinephoria** (Club de cinéma · FST Fès), ready for seamless deployment on [Vercel](https://vercel.com).

---

## 🚀 Deployment to Vercel

You can deploy this website to Vercel using either the **Vercel Dashboard (GitHub)** or the **Vercel CLI**.

### Option A: Deploy via GitHub & Vercel Dashboard (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Cinephoria form"
   git branch -M main
   git remote add origin <YOUR_GITHUB_REPO_URL>
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Under **Environment Variables**, add:
   - **Key**: `GOOGLE_SCRIPT_URL`
   - **Value**: Your Google Apps Script Web App URL (`https://script.google.com/macros/s/.../exec`)
5. Click **Deploy**.

---

### Option B: Deploy via Vercel CLI

Run the following command in this directory:
```bash
npx vercel
```
Follow the interactive prompts:
1. Set up and deploy? **Yes** (`Y`)
2. Link to existing project? **No** (or link to yours)
3. Project name: `cinephoria-formulaire`
4. Directory located: `./`
5. Overwrite settings? **No**

To deploy directly to production with your environment variable:
```bash
npx vercel env add GOOGLE_SCRIPT_URL production
npx vercel --prod
```

---

## ⚙️ Google Apps Script Setup (Google Sheets Backend)

To receive responses into your Google Sheet:

1. Open a new or existing **Google Sheet**.
2. Go to **Extensions** → **Apps Script**.
3. Replace the code in the editor with the contents of [`Code.gs`](./Code.gs).
4. Save the project (e.g. "Cinephoria Submissions").
5. Click **Deploy** → **New deployment**:
   - Select type: **Web app**
   - Description: `Cinephoria form backend`
   - Execute as: **Me** (`your-account@gmail.com`)
   - Who has access: **Anyone**
6. Click **Deploy**, authorize permissions when prompted, and copy the **Web app URL** (ends with `/exec`).
7. Paste this URL into Vercel's `GOOGLE_SCRIPT_URL` environment variable (or into `SCRIPT_URL` in [`index.html`](./index.html) if you prefer direct client submission).

---

## 📁 Project Structure

- [`index.html`](./index.html): Responsive cinema marquee ticket application form with client-side validation.
- [`api/submit.js`](./api/submit.js): Vercel Serverless Function that securely receives submissions and forwards them to your Google Apps Script without exposing the script URL publicly.
- [`vercel.json`](./vercel.json): Vercel routing configuration and security headers.
- [`Code.gs`](./Code.gs): Google Apps Script handler for appending responses to your Google Sheet.
- [`package.json`](./package.json): Project metadata and development scripts.
- [`.gitignore`](./.gitignore): Excludes build artifacts and environment files from version control.
