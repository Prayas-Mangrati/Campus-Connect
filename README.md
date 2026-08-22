# 🎓 Campus Connect

Campus Connect is a **full-stack event management web application** built for college campuses.

It allows students to discover campus events, create and manage their own events, register for activities, and view registered participants. The application uses **session-based authentication, authorization, and owner-level access control** to keep event management secure.

---

## 🚀 Live Demo

- **Frontend:** https://campus-connect-frontend-byzd.onrender.com
- **Backend:** https://campus-connect-7yuv.onrender.com

---

## 🛠 Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Axios
- Bootstrap
- Custom CSS
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js
- Passport Local Strategy
- Express Session
- Joi
- Multer

### Cloud & Deployment

- Cloudinary — Event banner image storage
- MongoDB Atlas — Database
- Render — Frontend & Backend deployment

---

## ✨ Features

### 👤 Authentication

- User Signup, Login & Logout
- Secure password hashing using `passport-local-mongoose`
- Session-based authentication using cookies
- Registration number associated with each student
- Protected routes for authenticated users

### 📅 Event Management

- Create new campus events
- Edit existing events
- Delete events
- Event ownership and authorization
- Event categories:
  - Tech
  - Workshop
  - Hackathon
  - Cultural
  - Sports
  - Seminar
  - Other
- Event date and time
- Event location and description
- Events displayed with newest events first

### 🖼 Event Banners

- Upload event banners using Cloudinary
- Image preview before uploading
- Default gradient banner when no image is provided
- Existing banners remain unchanged when editing an event
- Replace event banners during editing

### 🔎 Event Discovery

- Browse all campus events
- Filter events by category
- View detailed event information
- Responsive event cards
- Visual indication for cancelled events

### 📝 Event Registration

- Students can register for events
- Students can unregister from events
- Event owners cannot register for their own events
- Prevents duplicate registrations
- Registration count displayed on event details
- Registration automatically closes when an event is cancelled

### 🚫 Event Cancellation

- Event organizers can cancel their events
- Cancelled events are visually marked
- Registration is disabled for cancelled events
- Organizers can reopen cancelled events
- Existing registrations are preserved when an event is cancelled

### 👥 Participant Management

- Event owners can view registered participants
- Participant information includes:
  - Username
  - Email
  - Registration Number
  - Department
  - Year
- Participant information is only accessible to the event owner

### 📱 Responsive UI

- Responsive navbar with mobile hamburger menu
- Mobile-friendly event cards
- Responsive event details
- Responsive create/edit event pages
- Toast notifications for important actions
- Clean gradient-based UI

---

## 🔐 Authentication & Authorization

Campus Connect uses **Passport.js with Express Sessions** instead of JWT authentication.

### Authentication

- Passwords are securely hashed using `passport-local-mongoose`
- Login state is maintained using server-side sessions
- HTTP-only cookies are used for session authentication

### Authorization

- Only authenticated users can create events
- Only event owners can edit their events
- Only event owners can delete their events
- Only event owners can cancel/reopen their events
- Only event owners can view registered participants
- Users cannot register for their own events

---

## 🗄️ Database

Campus Connect uses **MongoDB with Mongoose**.

### Main Models

- `User`
- `Event`
- `Registration`

Events are linked to their organizers through MongoDB references, while registrations connect students with events.

---

## ☁️ Image Uploads

Event banner images are handled using **Cloudinary**.

The upload flow is:

```text
User selects image
        ↓
Frontend preview
        ↓
Multer
        ↓
Cloudinary
        ↓
Cloudinary URL stored in MongoDB
        ↓
Displayed on Event Card & Event Details
```
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

## 🎯 Learning Outcomes

Through this project, I gained hands-on experience with:

- Building a full-stack application using React and Node.js
- REST API development using Express.js
- MongoDB database design with Mongoose
- Session-based authentication with Passport.js
- Authorization and ownership-based access control
- Working with cookies and CORS
- File uploads and Cloudinary integration
- Form validation using Joi
- Protected React routes
- API integration using Axios
- Responsive frontend design
- Real-world deployment and debugging
- Managing frontend and backend environments

---

## 👤 Author

Prayas Mangrati

B.Tech Computer Science & Engineering

Aspiring Software Engineer
