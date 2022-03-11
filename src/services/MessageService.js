import $api from "../http";

export default class MessageService {

    static async fetchMessages(hash, offset, limit) {
        return await $api.post('/messages', {hash, offset, limit});
    }

    static async sendTextMessage(text, hash) {
        return await $api.post('/send-text-message', {text, hash});
    }

    static async sendMediaMessage(fd) {
        return await $api.post('/send-media-message', fd);
    }

    static async sendVoiceMessage(fd) {
        return await $api.post('/send-voice-message', fd);
    }

}
