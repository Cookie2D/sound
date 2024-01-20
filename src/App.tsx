import { useEffect, useRef, useState } from 'react'
//import InputAudio from './components/inputs/audio/InputAudio';
import { useAudio } from './hooks/useAudio';
import PlayButton from './components/buttons/play/PlayButton';

export default function App() {
  const [audio] = useState<string>(`/assets/test_music.mp3`);
  const canvaRef = useRef<HTMLCanvasElement>(null);
  const { toggle, playing, audioData } = useAudio(audio);

  // TODO: move out of effect
  useEffect(() => {
    const ctx = canvaRef.current?.getContext('2d');
    if (!ctx) return;
    if (!playing || !audioData) {
      ctx.fillStyle = 'rgba(15, 12, 42, 1)';
      return;
    }

    let id = 0
    function audioVisualize() {

      if (!audioData || !ctx) return;

      const width = 800;
      const height = 400;
      ctx.fillStyle = 'rgba(15, 12, 42, 1)';
      ctx.fillRect(0, 0, width, height);
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#00ff00';

      const sliceWith = width * (1.0 / audioData.length)
      let x = 0;
      const y = height

      for (let i = 0; i < audioData.length / 2; i++) {
        ctx.beginPath();
        ctx.moveTo(x * 2, y);
        const v = y - (audioData[i])
        ctx.lineTo(x * 2, v)
        ctx.stroke();

        x += sliceWith
      }

      id = requestAnimationFrame(audioVisualize);
    }

    audioVisualize()

    return () => {
      cancelAnimationFrame(id)
    }
  }, [playing, audioData])

  return (
    <div className="grid place-items-center h-screen bg-slate-900 text-slate-50">
      <div className='text-center'>
        <div>
          {/*<InputAudio
            value={audio}
            setValue={setAudio}
          />*/}

          <div className='border-4 border-slate-800 m-2' >
            <canvas ref={canvaRef} width="800" height="400"></canvas>
          </div>
        </div>
        <PlayButton
          onClick={toggle}
          state={playing}
        />
      </div>
    </div>
  )
}