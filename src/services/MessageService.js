import $api from "../http";

export default class MessageService {

    static async fetchMessages(hash, offset, limit) {
        return await $api.post('/messages', {hash, offset, limit});
    }

    static async readMessage(id) {
        return await $api.post('/read-message', {id});
    }
}
