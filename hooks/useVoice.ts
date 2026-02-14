
import { useState, useRef } from 'react';

interface VoiceRecorder {
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => Promise<{ url: string; blob: Blob | null }>;
  audioData: { url: string; blob: Blob | null };
  analyser: AnalyserNode | null;
}

export const useVoice = (): VoiceRecorder => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState<{ url: string; blob: Blob | null }>({ url: '', blob: null });
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const stopPromiseResolve = useRef<((value: { url: string; blob: Blob | null }) => void) | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newMediaRecorder = new MediaRecorder(stream);
      mediaRecorder.current = newMediaRecorder;
      audioChunks.current = [];

      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const newAnalyser = audioContext.createAnalyser();
      newAnalyser.fftSize = 256;
      source.connect(newAnalyser);
      setAnalyser(newAnalyser);

      newMediaRecorder.ondataavailable = event => {
        audioChunks.current.push(event.data);
      };

      newMediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const result = { url: audioUrl, blob: audioBlob };
        setAudioData(result);
        if (stopPromiseResolve.current) {
          stopPromiseResolve.current(result);
          stopPromiseResolve.current = null;
        }
        stream.getTracks().forEach(track => track.stop());
      };

      newMediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording: ", error);
    }
  };

  const stopRecording = (): Promise<{ url: string; blob: Blob | null }> => {
    return new Promise((resolve) => {
      if (mediaRecorder.current && isRecording) {
        stopPromiseResolve.current = resolve;
        mediaRecorder.current.stop();
        setIsRecording(false);
      } else {
        resolve({ url: '', blob: null });
      }
    });
  };

  return { isRecording, startRecording, stopRecording, audioData, analyser };
};
