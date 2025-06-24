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
## 🖼️ Image 1: Frontend UI Ready
## Description:
The initial user interface of the L-GovTrack app is fully designed with sections like Navbar, Complaint Form, and Rewards — but not yet connected to the backend.
![Image](https://github.com/user-attachments/assets/1b013255-d40f-42fc-b26c-f746b378e6f8)



## 🖼️ Image 2: Frontend + Backend Integration
# Description:
The frontend is now connected to the backend. Real-time data is fetched using APIs, allowing dynamic rendering of complaint records and user interactions.
![Image](https://github.com/user-attachments/assets/65e267a3-fd8c-4248-98b6-6c3c477194a3)



## 🖼️ Image 3: Complaint Submitted Successfully
# Description:
A user submits a complaint through the form. The data is sent to the backend via Axios and confirmed with a success message, showing the API is functioning.
![Image](https://github.com/user-attachments/assets/3ecf995f-a299-4487-bb65-fd065cf39d3f)



## 🖼️ Image 4: Complaint Saved to Database
# Description:
The submitted complaint is successfully stored in the MongoDB database. It includes details like title, description, location, and timestamp using Prisma ORM.
![Image](https://github.com/user-attachments/assets/4803dff7-c634-498c-8de8-f1f1b98c382d)

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
