import { useEffect, useState } from 'react';

export function useAudio(url: string | undefined) {
  const [playing, setPlaying] = useState(false);
  const [element, setElement] = useState<HTMLAudioElement>()

  useEffect(() => {
    if (!element) return;
    playing ? element.play() : element.pause();
  },
    [playing, element]
  );

  useEffect(() => {
    if (!url) return;
    const audio = new Audio(url)
    setElement(audio)

    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [url]);

  const toggle = () => setPlaying(!playing);

  return {
    toggle,
    playing
  }
}