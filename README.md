# 🪁 Creatokite — India's Micro-Creator Network

Creatokite is a production-grade, full-stack platform designed to bridge the gap between micro-creators and D2C brands. Built with a focus on speed, security, and professional aesthetics, Creatokite empowers creators with as few as 1,000 followers to monetize their content through verified brand partnerships.

![Creatokite Banner](public/kite.svg)

## 🚀 Key Features

### 🤳 For Creators
- **Instant Campaign Matching**: AI-driven discovery of campaigns matching your niche and audience.
- **Guaranteed Payments**: Secure escrow system ensuring you get paid on time, every time.
- **Growth Analytics**: Professional dashboard to track reach, engagement, and earnings.
- **Trust Score**: Build your reputation through verified delivery and brand reviews.

### 🏢 For Brands
- **Creator Discovery**: Search and invite verified micro-creators with high engagement.
- **Campaign Management**: Launch and monitor multiple campaigns with real-time ROI tracking.
- **Fraud Prevention**: AI-powered audience authenticity checks and trust scores.
- **Asset Management**: Centralized hub for campaign deliverables and brand assets.

### 🛡️ For Admins
- **Unified Control**: Manage users, moderate campaigns, and oversee platform health.
- **Verification Pipeline**: Review creator documentation and verify social identities.
- **System Monitoring**: Live analytics on platform growth and GMV.

## 🛠️ Tech Stack

- **Frontend**: React (Vite) + TailwindCSS
- **State & Auth**: Firebase Authentication + Custom Auth Context
- **Database**: Cloud Firestore (Real-time NoSQL)
- **Animations**: Framer Motion (Professional staggered & floating effects)
- **Icons**: Lucide React
- **Charts**: Recharts (Professional data visualization)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/creatokite.git
   cd creatokite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory and add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_ADMIN_INVITE_CODE=CREATOKITE-ADMIN-2026
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## 🔐 Admin Access

To register as an Admin, use the **Admin Invite Code**: `CREATOKITE-ADMIN-2026` during the sign-up process.

## 📁 Project Structure

- `src/components/common`: Reusable UI components (Buttons, Cards, Loaders).
- `src/components/layout`: Structural components (Navbar, Sidebar, Footer).
- `src/contexts`: Context providers (Auth, Theme).
- `src/pages`: Feature-specific pages (Auth, Creator, Brand, Admin).
- `src/utils`: Helper functions and mock data.

## 🌐 Deployment

This project is optimized for deployment on **Netlify** or **Vercel**. 
- Ensure you set the `CI=false` environment variable in your build settings.
- Security headers (COOP, CSP) are pre-configured in `netlify.toml`.

---
Built with ❤️ for the Indian Creator Economy.
