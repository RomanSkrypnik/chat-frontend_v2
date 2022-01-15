import $api from "../http";

export default class StatusService {

    static async fetchStatuses() {
        return $api.get('/statuses');
    }

    static async changeStatus(email, status) {
        return $api.post('/change-status', {email, status});
    }

}
