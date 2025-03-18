class UserRepository{
    constructor(database){
        this.database = database;
    }

    async getAllUsers(){
        try{
            const query = "select * from users";
            const reply = await this.database.query(query);
            return reply.rows;
        }catch(error){
            return {error}
        }
    }
}

module.exports = UserRepository;