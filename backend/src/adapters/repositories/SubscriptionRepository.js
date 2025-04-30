class SubscriptionRepository {
    constructor(database) {
        this.database = database;
    }

    async createSubscription(user_id, event_id) {
        try {
            const query = "insert into subscriptions(user_id, event_id) values($1, $2) returning *"
            const reply = await this.database.query(query, [
                user_id,
                event_id
            ]);
            return reply.rows;
        } catch (error) {
            return { error: error.message }
        }
    }

    async getAllSubscriptions() {
        try {
            const query = `
                SELECT subscriptions.id, subscriptions.user_id, users.name AS user_name, users.email AS user_email, subscriptions.event_id, events.title AS title, events.date AS date, subscriptions.check_in
                FROM subscriptions
                JOIN users ON subscriptions.user_id = users.id
                JOIN events ON subscriptions.event_id = events.id
            `;
            const reply = await this.database.query(query);
            return reply.rows;
        } catch (error) {
            return { error: error.message }
        }
    }

    async findByUserId(user_id) {
        try {
            const query = `
                SELECT subscriptions.id, events.title AS title, events.date AS date, events.description as description, events.image_url as image_url, subscriptions.check_in
                FROM subscriptions
                JOIN events ON subscriptions.event_id = events.id
                WHERE subscriptions.user_id = $1
            `;
            const reply = await this.database.query(query, [
                user_id
            ]);
            return reply.rows;
        } catch (error) {
            return { error: error.message }
        }
    }

    async findUsersByEventId(event_id) {
        try {
            const query = `
                SELECT subscriptions.id, users.name AS name, users.email AS email
                FROM subscriptions
                JOIN users ON subscriptions.user_id = users.id
                WHERE subscriptions.event_id = $1
            `;
            const reply = await this.database.query(query, [
                event_id
            ]);
            return reply.rows;
        } catch (error) {
            return { error: error.message }
        }
    }

    async deleteById(id) {
        try {
            const query = "delete from subscriptions where id = $1";
            const reply = await this.database.query(query, [id]);
            return reply.rows;
        } catch (error) {
            return { error: error.message };
        }
    }

}

module.exports = SubscriptionRepository;