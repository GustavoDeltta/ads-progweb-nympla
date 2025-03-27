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
            return {error: error.message}
        }
    }

    async registerUser(user){
        try{
            const query = "insert into users(name, email, password, dob, role) values($1, $2, $3, $4, 'user') returning *";
            const reply = await this.database.query(query, [
                user.name, 
                user.email, 
                user.password, 
                user.dob
            ]);
            return reply.rows;
        }catch(error){
            return {error: error.message}
        }
    }

    async getUserByEmail(email){
        try{
            const query = "select * from users where email = $1";
            const reply = await this.database.query(query, [email]);
            return reply.rows[0];
        }catch(error){
            return {error: error.message}
        }
    }
}

module.exports = UserRepository;