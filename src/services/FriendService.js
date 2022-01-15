import $api from "../http";

export default class FriendService {

    static async fetchFriends() {
        return $api.get('/friends');
    }

}
