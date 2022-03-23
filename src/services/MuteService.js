import $api from "../http";

export default class MuteService {

    static async mute(hash) {
        return await $api.post('/mute-relation', {hash});
    }

    static async unmute(hash) {
        return await $api.post('/unmute-relation', {hash});
    }

}
