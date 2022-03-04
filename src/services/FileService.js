import $api from "../http";


export default class FileService {

    static async deleteMediaFiles(fileNames, messageId) {
        return $api.post('/delete-media-file', {fileNames, messageId});
    }

}
