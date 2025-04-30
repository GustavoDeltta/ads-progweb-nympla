const { Router } = require("express");
const EventsController = require("../adapters/controllers/EventsController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const EventsRoutes = Router();

EventsRoutes.get("/events/all", EventsController.getAllEvents);
EventsRoutes.post("/events/insert", authMiddleware, roleMiddleware("admin"), EventsController.insertEvent);  
EventsRoutes.put("/events/update", authMiddleware, roleMiddleware("admin"), EventsController.updateEvent);
EventsRoutes.delete("/events/delete/:id", authMiddleware, roleMiddleware("admin"), EventsController.deleteEvent);

module.exports = EventsRoutes;