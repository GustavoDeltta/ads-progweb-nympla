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
        const hashPassword = await bcryptjs.hash(data.password, 10);
        const user = new User(
            data.name, 
            data.email, 
            hashPassword, 
            data.dob
        );
        return await this.userRepository.registerUser(user);
    }

    async authUser(dataLogin){

        const user = await this.userRepository.getUserByEmail(dataLogin.email);
        if(!user){
            return { error: "User not found!", code: 404};
        }

        const correctPassword = await bcryptjs.compare(dataLogin.password, user.password)
        if(!correctPassword){
            return {error: "Invalid crendentials", code: 401};
        }
        
        return {status:"Login successfully!", user};
    }
}

module.exports = UserService;