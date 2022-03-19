import {Howl, Howler} from 'howler';

export const soundsUrl = process.env.PUBLIC_URL + '/sounds/';

export default class SoundHelper {

    static playSound(soundName) {
        const sound = new Howl({src: soundsUrl + soundName});
        sound.play();
    }

    static changeVolume(vol) {
        Howler.volume(vol);
    }

}
