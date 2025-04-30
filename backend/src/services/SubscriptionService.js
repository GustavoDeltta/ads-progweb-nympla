class SubscriptionService{
    constructor(subscriptionRepository, userRepository, eventsRepository){
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
        this.eventsRepository = eventsRepository;
    }

    async createSubscription(user_id, event_id){
        return await this.subscriptionRepository.createSubscription(user_id, event_id);
    }
    
    async getAllSubscriptions(){
        const subscriptions = await this.subscriptionRepository.getAllSubscriptions();
        if (!subscriptions || subscriptions.length === 0) {
            return { error: 'Nenhuma inscrição encontrada.' };
        }
        return subscriptions;
    }

    async findByUserId(user_id){
        const subscriptions = await this.subscriptionRepository.findByUserId(user_id);
        if (!subscriptions || subscriptions.length === 0) {
            return { error: 'Nenhuma inscrição encontrada para este usuário.' };
        }
        return subscriptions;
    }

    async findUsersByEventId(event_id){
        const users = await this.subscriptionRepository.findUsersByEventId(event_id);
        if (!users || users.length === 0) {
            return { error: 'Nenhuma inscrição encontrada para este usuário.' };
        }
        return users;
    }

    async deleteById(id){
        return await this.subscriptionRepository.deleteById(id);
    }
}

module.exports = SubscriptionService;