import $api from "../http";

export default class AuthService {

    static async register(formData) {
        return $api.post('/register', formData);
    }

    static async login(email, password) {
        return $api.post('/login', {email, password});
    }

    static async logout() {
        return $api.post('/logout');
    }

}