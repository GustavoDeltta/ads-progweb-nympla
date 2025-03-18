class UserService {
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async getAllUsers(){
        // return await this.userRepository.getAllUsers();
        return await "Listando usuários..."
    }
}

module.exports = UserService;