require("dotenv").config();
const mongoose = require("mongoose");

const express = require("express");
const app = express();

// ---------------- DB ----------------
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//-----------------Cleaning invalid Registrations----------

const {cleanupOrphanRegistrations}=require("./utils/cleanup");

cleanupOrphanRegistrations()
.then(()=>console.log("Orphan registrations cleaned"))
.catch(console.error);
//-----------------fix backend cors----------
const cors = require("cors");

app.use(
  cors({
    origin: "campus-connect-sooty-theta.vercel.app", // frontend live link
    credentials: true,
  })
);


// ---------------- BODY PARSERS ----------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ---------------- SESSION & PASSPORT ----------------
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User");

const sessionConfig = {
  name:"session",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,     // 🔥 MUST be false for localhost true for render
    sameSite: "none",   // 🔥 REQUIRED for cross-site cookies
  },
};

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ---------------- ROUTES ----------------
const userRoutes = require("./routes/users");
const eventRoutes = require("./routes/events");

app.use("/users", userRoutes);
app.use("/events", eventRoutes);

// ---------------- ROOT ----------------
app.get("/", (req, res) => {
  res.send("Campus Connect server running");
});

// ---------------- ERROR HANDLER ----------------
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).json({error:message});
});

// ---------------- SERVER ----------------
const PORT=process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
