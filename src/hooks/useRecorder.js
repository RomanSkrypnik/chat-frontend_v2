import {useEffect, useState} from "react";

const useRecorder = () => {
    const [audioFile, setAudioFile] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recorder, setRecorder] = useState(null);

    const chunks = [];

    useEffect(async () => {
        if (recorder === null) {
            if (isRecording) {
                await requestRecorder().then(setRecorder, console.error);
            }
            return;
        }

        if (isRecording) {
            recorder.start(5000);
        } else {
            recorder.stop();
        }

        const handleData = e => {
            chunks.push(e.data);
        };

        const handleStop = async () => {
            if (recorder.state === 'inactive' && !isRecording) {
                const blob = new File(chunks, 'my_record.webm', {type: `audio/webm`});
                recorder.stream.getTracks().forEach(track => track.stop());

                setRecorder(null);
                setAudioFile(blob);
            }
        };

        const handleError = e => {
            console.log(e.error);
        };

        recorder.addEventListener("dataavailable", handleData);
        recorder.addEventListener('stop', handleStop);
        recorder.addEventListener('error', handleError);

        return () => {
            recorder.removeEventListener("dataavailable", handleData);
            recorder.removeEventListener('stop', handleStop);
            recorder.removeEventListener('error', handleError);
        };
    }, [recorder, isRecording]);

    const startRecording = () => {
        setIsRecording(true);
    };

    const stopRecording = () => {
        setIsRecording(false);
    };

    return [audioFile, isRecording, startRecording, stopRecording];
};

async function requestRecorder() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true});
        return new MediaRecorder(stream, {mimeType: 'audio/webm',});
    } catch (e) {
        console.log(e);
    }
}

export default useRecorder;
