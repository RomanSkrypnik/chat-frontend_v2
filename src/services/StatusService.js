import $api from "../http";

export default class StatusService {

    async static fetchStatuses() {
        return $api.get('/statuses');
    }

}
