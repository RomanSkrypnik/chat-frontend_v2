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

    static async refresh() {
        return $api.get('/refresh');
    }

    static async uploadPhoto(avatar) {
        return $api.post('/upload-photo', avatar);
    }

    static async checkPasswordIdentity(password) {
        return $api.post('/check-password-identity', password);
    }

}
