# 🎓 Campus Connect

Campus Connect is a **full-stack event management web application** built for college campuses.  
It enables students to create, manage, and register for events with **secure authentication**, **authorization**, and **role-based access control**.

---

## 🚀 Live Demo

- **Frontend:** https://campus-connect-frontend-byzd.onrender.com  
- **Backend:** https://campus-connect-7yuv.onrender.com  

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Axios
- Bootstrap + Custom CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Passport.js (Local Strategy)
- Express Sessions

### Deployment
- Render (Frontend & Backend)

---

## ✨ Features

- User Signup, Login & Logout
- Secure password hashing using Passport
- Session-based authentication (cookies)
- Create, edit, and delete events (owner only)
- Register and unregister for events
- Prevents event owner from registering for own event
- View registered participants (owner only)
- Protected frontend routes
- Clean and responsive UI

---

## 🔐 Authentication & Authorization

- Passwords are hashed using **passport-local-mongoose**
- Session-based authentication (no JWT)
- Role-based access:
  - Only event owners can edit or delete events
  - Only logged-in users can register for events
  - Participants list visible only to event owner

---

## 📸 Screenshots

Screenshots are available in the `/screenshots` folder:
- Login Page
- Signup Page
- Events Listing
- Event Details
- Create Event Page
- Registered Participants View
- My Events Page

---

##🎯 Learning Outcomes

- Built a complete production-ready full-stack application
- Gained hands-on experience with sessions, cookies, and CORS
- Implemented secure authentication & authorization
- Learned real-world deployment debugging
- Improved frontend UI/UX with React

---

##👤 Author

Prayas Mangrati

B.Tech Computer Science & Engineering

Aspiring Software Engineer
