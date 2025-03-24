const User = require("../entities/User");
const bcryptjs = require("bcryptjs");

class UserService {
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async getAllUsers(){
        return await this.userRepository.getAllUsers();
    }

    async registerUser(data){
        console.log(data);

        const hashPassword = await bcryptjs.hash(data.password, 10);

        const user = new User(data.name, data.email, hashPassword, data.dob);

        // return await this.userRepository.registerUser(user);
        return await user;
    }
}

module.exports = UserService;