const Event = require("../entities/Event");

class EventsService{
    constructor(eventsRepository){
        this.eventsRepository = eventsRepository;
    }

    async getAllEvents(){
        return await this.eventsRepository.getAllEvents();
    }

    async insertEvent(data){
        const event = new Event(data.title, data.date, data.description, data.image_url);
        return await this.eventsRepository.insertEvent(event);
    }
}

module.exports = EventsService;