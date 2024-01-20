import { useEffect, useRef, useState } from 'react';

export function useAudio(url: string | undefined) {
  const [playing, setPlaying] = useState(false);
  const [audioData, setAudioData] = useState<Uint8Array>();
  const audioContext = useRef<AudioContext>();
  const audioSource = useRef<MediaElementAudioSourceNode>();
  const analyser = useRef<AnalyserNode | null>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    if (!url) return;

    audioContext.current = new AudioContext();
    const audio = new Audio(url);
    audioSource.current = audioContext.current.createMediaElementSource(audio);
    analyser.current = audioContext.current.createAnalyser();
    analyser.current.fftSize = 256;
    audioSource.current.connect(analyser.current);
    analyser.current.connect(audioContext.current.destination);

    const updateVisualization = () => {
      const dataArray = new Uint8Array(analyser.current!.frequencyBinCount);
      analyser.current?.getByteFrequencyData(dataArray);
      setAudioData(new Uint8Array(dataArray));
      animationFrameId.current = requestAnimationFrame(updateVisualization);
    };

    audio.addEventListener('ended', () => setPlaying(false));

    if (playing) {
      audio.play();
      updateVisualization();
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      audio.removeEventListener('ended', () => setPlaying(false));
      audio.pause();
      audio.currentTime = 0;
      audioContext.current?.close();
      audioSource.current?.disconnect();
      analyser.current = null;
    };
  }, [url, playing]);

  const toggle = () => setPlaying(!playing);

  return {
    toggle,
    playing,
    audioData,
  };
}
