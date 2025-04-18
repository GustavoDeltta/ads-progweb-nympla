const Event = require("../entities/Event");

class EventsService{
    constructor(eventsRepository){
        this.eventsRepository = eventsRepository;
    }

    async getAllEvents(){
        return await this.eventsRepository.getAllEvents();
    }

    async insertEvent(data){
        const event = new Event(
            data.title, 
            data.date, 
            data.description, 
            data.image_url
        );
        return await this.eventsRepository.insertEvent(event);
    }

    async updateEvent(data){
        const id = data.id;
        const event = new Event(
            data.title, 
            data.date, 
            data.description, 
            data.image_url
        );
        return await this.eventsRepository.updateEvent(id, event);
    }

    async deleteEvent(id){
        return await this.eventsRepository.deleteEvent(id)
    }
}

module.exports = EventsService;