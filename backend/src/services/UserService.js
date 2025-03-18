class UserService {
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async getAllUsers(){
        return await this.userRepository.getAllUsers();
    }
}

module.exports = UserService;