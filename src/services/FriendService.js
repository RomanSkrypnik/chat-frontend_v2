import $api from "../http";

export default class FriendService {

    static async fetchFriend(hash) {
        return $api.get('/friend', {hash});
    }

    static async fetchFriends() {
        return $api.get('/friends');
    }

}
