const Event = require("../models/Event");
const ExpressError = require("../utils/ExpressError");
const Registration = require("../models/Registration");

module.exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (err) {
    next(err);
  }
};
module.exports.createEvent = async (req, res, next) => {
  try {
    const event = new Event(req.body);
    event.owner = req.user._id;
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};
module.exports.getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id).populate("owner", "_id");

    if (!event) {
      throw new ExpressError(404, "Event not found");
    }
    res.json(event);
  } catch (err) {
    next(err);
  }
};
module.exports.deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const registrationCount = await Registration.countDocuments({
      event: id,
    });
    if (registrationCount > 0) {
      return res.status(400).json({
        error: "Cannot delete event with registered participants",
      });
    }
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      throw new ExpressError(404, "Event not found");
    }
    res.json({
      message: "Event deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports.updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedEvent) {
      throw new ExpressError(404, "Event not found");
    }
    res.json(updatedEvent);
  } catch (err) {
    next(err);
  }
};
module.exports.registerForEvent = async (req, res, next) => {
  try {
    const { id } = req.params; // ✅ FIRST

    const event = await Event.findById(id);

    if (!event) {
      throw new ExpressError(404, "Event not found");
    }

    if (event.owner.equals(req.user._id)) {
      throw new ExpressError(403, "Event owner cannot register");
    }

    const registration = new Registration({
      user: req.user._id,
      event: id,
    });

    await registration.save();

    res.status(201).json({
      message: "Successfully registered for event",
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        error: "You are already registered for this event",
      });
    }
    next(err);
  }
};

module.exports.getEventParticipants = async (req, res, next) => {
  try {
    const { id } = req.params;
    const registrations = await Registration.find({ event: id }).populate(
      "user",
      "username email"
    );
    res.json(registrations);
  } catch (err) {
    next(err);
  }
};
module.exports.unregisterFromEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedRegistration = await Registration.findOneAndDelete({
      user: req.user._id,
      event: id,
    });
    if (!deletedRegistration) {
      return res.status(404).json({
        error: "You are not registered for this event",
      });
    }
    res.json({
      message: "Successfully unregistered from event",
    });
  } catch (err) {
    next(err);
  }
};
module.exports.getParticipantsCount = async (req, res, next) => {
  try {
    const { id } = req.params;

    const count = await Registration.countDocuments({
      event: id,
    });

    res.json({ count });
  } catch (err) {
    next(err);
  }
};
module.exports.getMyCreatedEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ owner: req.user._id });
    res.json(events);
  } catch (err) {
    next(err);
  }
};

