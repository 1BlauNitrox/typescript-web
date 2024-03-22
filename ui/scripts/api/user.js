
class User {

    constructor(api) {
        this.api = api;
      }

    async getUserStatus() {
        try {
        const response = await api.get('/api/user');
        return response;
        } catch (error) {
        console.error('Error fetching user status:', error);
        throw error;
        }
    }

    async login(email, password) {
        try {
            const response = await api.post('/api/auth/login', JSON.stringify({
                email: email,
                password: password
            }));
            return response;
        } catch (error) {
            console.error('Error user login:', error);
            throw error;
        }
    }

    async register(username, email, password) {
        try {
            const response = await api.post('/api/auth/register', JSON.stringify({
                name: username,
                email: email,
                password: password
            }));
            return response;
        } catch (error) {
            console.error('Error user register:', error);
            throw error;
        }
    }
}
