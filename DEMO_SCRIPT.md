# 1-2 Minute Demo Video Script: Smart Leads Dashboard

Here is a detailed, structured screen-recording script designed to showcase all the mandatory and evaluation-critical features of your assignment in **90 seconds**.

---

## Script Overview
* **Target Duration**: ~90 seconds (approx. 220 spoken words at moderate pace).
* **Setup before recording**: 
  - Open a browser tab to the Netlify app.
  - Log out if logged in (start on the Login screen).
  - Keep the DevTools Network panel open (optional but looks great for proving pagination/debounce).

---

## Storyboard & Script

### **0:00 - 0:15 | Intro & Authentication**
* **Visual Action**: Start on the Login page. Type a test user's credentials, log in, and show the dashboard landing.
* **Voiceover**:
  > *"Hi everyone, my name is Jaswanth Reddy, and this is the Smart Leads Dashboard—a production-grade lead management platform built with React, Node.js, and TypeScript.*
  > *Let's start by logging in. The system uses secure JWT authentication with password hashing using bcrypt on the backend."*

### **0:15 - 0:35 | Dashboard & CRUD Operations**
* **Visual Action**: Hover over the key metrics cards. Click **"Create Lead"**, fill out a name, email, status, and source, and click **"Save Lead"**.
* **Voiceover**:
  > *"Once logged in, we land on our premium dark mode dashboard. You can see real-time statistics aggregated from our MongoDB Atlas database.*
  > *Creating a lead is simple. When we add a new lead, request payloads are strictly validated using Zod, ensuring type safety from the UI all the way to Mongoose."*

### **0:35 - 0:55 | Advanced Filtering, Debouncing & Pagination**
* **Visual Action**: 
  1. Type a name in the search box (e.g. "Rahul") and highlight the instant result.
  2. Select a Status filter ("Qualified") and Source filter ("Instagram").
  3. Scroll down to show page navigation controls (Previous / Next).
* **Voiceover**:
  > *"Here is the advanced filtering system. Multiple filters work together seamlessly. As I type, a custom React hook debounces the search input to minimize API requests.*
  > *At the bottom, we have server-side pagination returning precisely 10 records per page using MongoDB's skip and limit operators."*

### **0:55 - 1:15 | Role-Based Access Control (RBAC) & CSV Export**
* **Visual Action**: 
  1. Click the **"Export CSV"** button and open the downloaded CSV.
  2. Point to a Lead entry's trash icon. Explain that since you are logged in as an Admin, you can delete; but Sales users cannot.
* **Voiceover**:
  > *"We also have built-in Role-Based Access Control. Admin users have delete permissions, while Sales roles are restricted to viewing and editing.*
  > *Additionally, we can instantly export our currently filtered, searched, and sorted list as a clean CSV file."*

### **1:15 - 1:30 | Tech Stack & Outro**
* **Visual Action**: Click the theme toggle button (Dark/Light mode) to show responsive styling, then transition to showing the repository structure.
* **Voiceover**:
  > *"The app includes complete dark mode support, and the backend is deployed on Google Cloud Run using Artifact Registry and a GitHub Actions pipeline. Thank you!"*

---

## 💡 Quick Tips for Recording
1. **Screen Resolution**: Record in standard 1080p (1920x1080) for clarity.
2. **Speed**: Talk calmly and clearly. Don't rush—90 seconds is plenty of time if you practice the clicks beforehand.
3. **Cursor**: Use a cursor highlight effect or make sure your mouse is easily visible.
