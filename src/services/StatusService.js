import $api from "../http";

export default class StatusService {

    static async fetchStatuses() {
        return await $api.get('/statuses');
    }

}
