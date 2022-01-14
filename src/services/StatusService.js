import $api from "../http";

export default class StatusService {

    static async fetchStatuses() {
        return await $api.get('/statuses');
    }

    static async changeStatus(email, status) {
        return await $api.post('/change-status', {email, status});
    }

}
