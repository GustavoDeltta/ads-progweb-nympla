class EventsRepository{
    constructor(database){
        this.database = database;
    }

    async getAllEvents(){
        try{
            const query = "select * from events";
            const reply = await this.database.query(query);
            return reply.rows;
        }catch(error){
            return {error: error.message}
        }
    }

    async insertEvent(event){
        try{
            const query = "insert into events (title, date, description, image_url) values($1, $2, $3, $4) returning *";
            const reply = await this.database.query(query, [
                event.title,
                event.date,
                event.description,
                event.image_url
            ]);
            return reply.rows;
        }catch(error){
            return {error: error.message}
        }
    }
}

module.exports = EventsRepository;