const database = require("../../frameworks/Database");
const EventsService = require("../../services/EventsService");
const EventsRepository = require("../repositories/EventsRepository");

const eventsRepository = new EventsRepository(database);

async function getAllEvents(req, res){
    const service = new EventsService(eventsRepository);
    const replyService = await service.getAllEvents();

    if(replyService.error){
        res.status(500).json({ error: replyService.error });
    }
    res.status(200).json({ events: replyService })
}

async function insertEvent(req, res){
    const service = new EventsService(eventsRepository);
    const replyService = await service.insertEvent(req.body);
    if(replyService.error){
        res.status(500).json({ error: replyService.error });
    }
    res.status(201).json({ status: replyService });
}

module.exports = { getAllEvents, insertEvent };