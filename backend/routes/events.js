const express = require("express");
const router = express.Router();
const eventController = require("../controllers/events");
const multer = require("multer");
const { storage } = require("../utils/cloudConfig");

const upload = multer({ storage });
const {
  validateCreateEvent,
  validateUpdateEvent,
} = require("../middlewares/validateEvent");
const { isLoggedIn, isEventOwner } = require("../middlewares/validateEvent");
//GET /events
router.get("/", eventController.getAllEvents);

router.get("/:id", eventController.getEventById);

router.delete("/:id", isLoggedIn, isEventOwner, eventController.deleteEvent);

router.patch(
  "/:id",
  isLoggedIn,
  isEventOwner,
  upload.single("banner"),
  validateUpdateEvent,
  eventController.updateEvent,
);

router.get(
  "/:id/participants",
  isLoggedIn,
  isEventOwner,
  eventController.getEventParticipants,
);

router.delete("/:id/register", isLoggedIn, eventController.unregisterFromEvent);
router.patch(
  "/:id/status",
  isLoggedIn,
  isEventOwner,
  eventController.toggleEventStatus,
);
//POST/events
router.post(
  "/",
  isLoggedIn,
  upload.single("banner"),
  validateCreateEvent,
  eventController.createEvent,
);

router.post("/:id/register", isLoggedIn, eventController.registerForEvent);

router.get("/:id/participants/count", eventController.getParticipantsCount);
router.get("/mine/created", isLoggedIn, eventController.getMyCreatedEvents);

module.exports = router;
