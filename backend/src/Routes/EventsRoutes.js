const { Router } = require("express");
const EventsController = require("../adapters/controllers/EventsController");

const EventsRoutes = Router();

EventsRoutes.get("/events/all", EventsController.getAllEvents);
EventsRoutes.post("/events/insert", EventsController.insertEvent);  
EventsRoutes.put("/events/update", EventsController.updateEvent);
EventsRoutes.delete("/events/delete", EventsController.deleteEvent);

module.exports = EventsRoutes;