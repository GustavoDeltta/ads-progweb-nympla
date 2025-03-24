class UserService {
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async getAllUsers(){
        return await this.userRepository.getAllUsers();
    }

    async registerUser(data){
        console.log(data);
        return "";
    }
}

module.exports = UserService;