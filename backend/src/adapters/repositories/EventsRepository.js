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

    async updateEvent(id, event){
        try{
            const query = "UPDATE events SET title = $2, date = $3, description = $4, image_url = $5 WHERE id = $1 returning *";
            const reply = await this.database.query(query, [
                id,
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

    async deleteEvent(id){
        try{
            const query = "DELETE FROM events WHERE id = $1";
            const result = await this.database.query(query, [id]);
            if (result.rowCount === 0) {
                return { error: 'Evento não encontrado para exclusão.' };  // Retorna erro se nada foi deletado
            }
            return { success: 'Evento deletado com sucesso!' };  // Retorna sucesso se a exclusão foi bem-sucedida
        } catch (error) {
            return { error: error.message };  // Propaga o erro se algo der errado
        }
    }
}

module.exports = EventsRepository;