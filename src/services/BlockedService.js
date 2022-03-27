import $api from "../http";

export default class BlockedService {

    static async blockFriend(hash) {
        return await $api.post('/block-user', {hash});
    }

    static async unblockFriend(hash) {
        return await $api.post('/unblock-user', {hash});
    }

}
