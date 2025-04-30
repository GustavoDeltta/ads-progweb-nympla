const { Router } = require("express");
const SubscriptionController = require("../adapters/controllers/SubscriptionsController");
const roleMiddleware = require("../middlewares/roleMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

const SubscriptionsRoutes = Router();

SubscriptionsRoutes.get("/subscription/all", authMiddleware, roleMiddleware("user"), SubscriptionController.getAllSubscriptions);
SubscriptionsRoutes.get("/subscription/find/:user_id", authMiddleware, roleMiddleware("user"), SubscriptionController.findByUserId);
SubscriptionsRoutes.get("/subscription/registered/:event_id", authMiddleware, roleMiddleware("admin"), SubscriptionController.findUsersByEventId);
SubscriptionsRoutes.post("/subscription/create", authMiddleware, roleMiddleware("user"), SubscriptionController.createSubscription);
SubscriptionsRoutes.delete("/subscription/delete/:id", authMiddleware, roleMiddleware("user"), SubscriptionController.deleteById);

module.exports = SubscriptionsRoutes; 