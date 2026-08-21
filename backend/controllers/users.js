const User = require("../models/User");
const Registration = require("../models/Registration");
const ExpressError = require("../utils/ExpressError");

/**
 * USER SIGNUP (account creation)
 */
module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, registrationNumber, department, year, password } = req.body;

    const user = new User({ username, email, registrationNumber, department, year });
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      res.status(201).json(registeredUser);
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        error: "Username, Registration Number or email already exists",
      });
    }
    next(err);
  }
};

/**
 * USER LOGIN
 */
module.exports.loginUser = (req, res) => {
  res.json({
    message: "Logged in successfully",
    user: req.user,
  });
};

/**
 * GET MY REGISTRATIONS
 */
module.exports.getMyRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find({
      user: req.user._id,
    }).populate("event");

    res.json(registrations);
  } catch (err) {
    next(err);
  }
};

/**
 * GET MY REGISTERED EVENTS
 */
module.exports.getMyRegisteredEvents = async (req, res, next) => {
  try {
    const registrations = await Registration.find({
      user: req.user._id,
    }).populate("event");

    const events = registrations
      .filter((reg) => reg.event)
      .map((reg) => reg.event);

    res.json(events);
  } catch (err) {
    next(err);
  }
};
