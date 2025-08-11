DailyPrep – Master Interviews in 10 Minutes a Day

DailyPrep is a full‑stack web application built to transform the way people prepare for tech interviews.  
The concept is simple – instead of spending hours searching for relevant questions, users can dedicate just 10 minutes a day to practice with a set of 5‑10 expertly curated interview questions, each accompanied by **audio explanations in Hinglish** for quick, on‑the‑go learning.  
There are no sign‑ups, no distractions – just pure, focused preparation.


## Features

-  **Daily Curated Interview Questions** – 5–10 hand-picked questions each day
-  **Audio Explanations** – Understand concepts on the go
- **No Signup Required** – Jump straight into learning
-  **Suggestion Box** – Share your feedback & ideas anonymously
-  **Gamification** – Track streaks, earn badges, and increase your total question count
-  **Admin Panel** – Manage questions, view visitor stats, and suggestions
-  **Visitor Analytics** – Daily, Weekly, Monthly charts for engagement tracking
-  **Performance Optimised** – Lazy loading, React.memo, and chart rendering optimisations

## screenshot-
<img width="1900" height="825" alt="Screenshot 2025-08-11 121013" src="https://github.com/user-attachments/assets/18492fa1-33c2-449a-80c4-5e3b55011b74" />
<img width="1902" height="831" alt="Screenshot 2025-08-11 120911" src="https://github.com/user-attachments/assets/a3e38298-c4b1-4008-9389-e4a2ff56340f" />
<img width="1902" height="823" alt="Screenshot 2025-08-11 120945" src="https://github.com/user-attachments/assets/ea30dd7f-f23e-4dd7-a3e8-2a0e38653c56" />
<img width="1897" height="831" alt="Screenshot 2025-08-11 121004" src="https://github.com/user-attachments/assets/f6e8a294-6eb6-495e-9456-a8e84b7e5ddb" />

## Tech Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS for styling
- Recharts for data visualisation
- React Router for routing
- Sonner for notifications

**Backend:**
- Express.js
- Firebase (Firestore for data storage)
- SendGrid for subscription emails

**Tools & Libraries:**
- Axios for API requests
- Lucide React for icons

---

## Performance Audit

We benchmarked the app using **Google Lighthouse** before and after our performance optimisations  
(`React.memo` + route-level `React.lazy` loading for Admin Panel).

### Optimisations Applied
- **React.memo** on heavy components (`VisitorStatsChart`) to prevent unnecessary re-renders
- **Dynamic imports** + `React.lazy` with `Suspense` for Admin Dashboard routes (code-splitting)
- Reduced **Total Blocking Time** by deferring heavy JS parsing
- Minified component props & reduced reactivity overhead


### Results Overview
| Page & Mode              | LCP Before | LCP After | Improvement |
|--------------------------|-----------:|----------:|------------:|
| **Landing – Mobile**     | 2.2 s      | 1.9 s     | **13.6% faster** |
| **Admin – Desktop**      | 1.2 s      | 0.5 s     | **58.3% faster** |

---

### **📷 Lighthouse Reports**
<img width="1897" height="831" alt="Screenshot 2025-08-11 121004" src="https://github.com/user-attachments/assets/65b6ea3f-a6b6-4e24-888f-0c1f752defa6" />

## Getting Started

### 1. Clone the repo
git clone https://github.com/yourusername/dailyprep.git
cd dailyprep
2. Backend setup
Bash

cd server
npm install
Configure .env with your Firebase and other API keys
Start backend:
Bash

npm start
3. Frontend setup
Bash

cd ../client
npm install
Configure VITE_API_URL in .env to point to your backend
Start frontend:
npm run dev

In summary, DailyPrep is a fast, intuitive, and habit‑forming interview prep solution that combines useful daily content, interactive features, admin control, and consistent performance optimisation. With its clean UI, real‑time updates, and focus on habit‑building, it’s designed to help learners stay motivated and make measurable progress in short, daily sessions – preparing them for interviews the smart way, not the hard way.
