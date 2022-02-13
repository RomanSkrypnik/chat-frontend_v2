import $api from "../http";

export default class FriendService {

    static async fetchFriends() {
        return $api.get('/friends');
    }

    static async fetchFriend(hash) {
        return $api.post('/search-friend-by-hash', {hash});
    }

    static async fetchUsersBySearch(search) {
        return $api.post('/users-by-search', {search});
    }

}
