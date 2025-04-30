const database = require("../../frameworks/Database");
const SubscriptionService = require("../../services/SubscriptionService");
const SubscriptionRepository = require("../repositories/SubscriptionRepository");
const EventsRepository = require("../repositories/EventsRepository")
const UserRepository = require("../repositories/UserRepository");

const subscriptionsRepository = new SubscriptionRepository(database);

async function createSubscription(req, res) {
    const service = new SubscriptionService(subscriptionsRepository);
    const { user_id, event_id } = req.body;
    const replyService = await service.createSubscription(user_id, event_id);
    if(replyService.error){
        res.status(500).json({ error: replyService.error });
    }
    res.status(200).json({ status: replyService });
}

async function getAllSubscriptions(req, res) {
    const service = new SubscriptionService(subscriptionsRepository);
    const replyService = await service.getAllSubscriptions();
    if(replyService.error){
        res.status(500).json({ error: replyService.error })
    }
    res.status(200).json({ subscriptions: replyService })
}

async function findByUserId(req, res) {
    const service = new SubscriptionService(subscriptionsRepository);
    const { user_id } = req.params;
    const replyService = await service.findByUserId(user_id);
    if(replyService.error){
        return res.status(500).json({ error: replyService.error });
    }
    res.status(200).json({ 
        idUser: user_id,
        subscriptions: replyService 
    });
}

async function findUsersByEventId(req, res) {
    const service = new SubscriptionService(subscriptionsRepository);
    const { event_id } = req.params;
    const replyService = await service.findUsersByEventId(event_id);
    if(replyService.error){
        return res.status(500).json({ error: replyService.error });
    }
    res.status(200).json({ users: replyService });
}

async function deleteById(req, res) {
    const service = new SubscriptionService(subscriptionsRepository);
    const { id } = req.params;
    const replyService = await service.deleteById(id);
    if(replyService.error){
        res.status(500).json({ error: replyService.error });
    }
    res.status(200).json({ status: replyService });
}

module.exports = { createSubscription, getAllSubscriptions, findByUserId, findUsersByEventId, deleteById }