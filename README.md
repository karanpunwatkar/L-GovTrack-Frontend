# 🛰️ L-GovTrack – Civic Issue Reporting System

L-GovTrack is a full-stack web application designed to streamline the process of reporting local issues (like potholes, broken lights, water problems, etc.) to government authorities. Citizens can report complaints with optional location, photo, and email, while admins can track and update complaint statuses in real-time.

> ✨ Built with: React + Tailwind CSS + Node.js + Express + Prisma + MongoDB + Nodemailer

---

## 🌐 Live Demo

> 🔗 Frontend: https://l-govtrack.netlify.app/
> 
> 🛠️ Backend: https://l-govtrack-api.up.railway.app

---

## 📸 Screenshots

### 🎯 Submit Complaint (Frontend)
![Image](https://github.com/user-attachments/assets/af5ae273-d779-4f99-86d3-be9680185b80)


### 📋 View Complaints
![Image](https://github.com/user-attachments/assets/3fa5915f-6bcd-4a92-a779-9239cbf99857)

### 🔧 Status Management (Admin)
![Image](https://github.com/user-attachments/assets/c4d30045-4550-4826-89f0-b89100ed32b3)

---

## ⚙️ Features

- 📝 Citizens can submit complaints with:
  - Title, Description, Name, Phone, Email
  - Optional Location (Lat/Lng)
  - Optional image upload (preview)
- 📊 Complaints are saved to MongoDB via Express API
- 🎯 Admins can update complaint status to:
  - `Pending`, `In Progress`, or `Resolved`
- 📩 Sends **email notification** when status is updated
- 💬 Comment section on each complaint for engagement
- 📅 Sorted by latest date
- 🌐 Responsive frontend with Tailwind CSS

---

## 🔧 Tech Stack

| Layer     | Technology                  |
|-----------|-----------------------------|
| Frontend  | React + Vite + Tailwind CSS |
| Backend   | Node.js + Express.js        |
| Database  | MongoDB (via Prisma ORM)    |
| Email     | Nodemailer (Gmail SMTP)     |
| Hosting   | Vercel (frontend), Railway (backend) |

---

## 📁 Folder Structure


---

## 🧪 How It Works

### 1. Complaint Submission

- A user fills out the form with issue details
- Form sends data to backend via POST `/complaints`
- Data is saved in MongoDB Atlas

### 2. Viewing Complaints

- Frontend fetches data from `/complaints`
- Complaints are displayed in cards with:
  - Title, description, image, location, time, status

### 3. Status Update

- Admin clicks a button to change status
- Sends PUT `/complaints/:id/status` to update DB
- If email is provided, user gets email via Nodemailer

---

## 🚀 Setup Instructions

### 📦 Prerequisites

- Node.js v18+
- MongoDB Atlas account (free)
- Gmail App Password for email

### 🔑 Setup `.env` (in `/server`)


### 📦 Install Dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
npx prisma db push

# Backend
cd server
npm run dev

# Frontend
cd ../client
npm run dev
