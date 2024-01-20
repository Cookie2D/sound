import { useState } from 'react'
//import InputAudio from './components/inputs/audio/InputAudio';
import { useAudio } from './hooks/useAudio';
import PlayButton from './components/buttons/play/PlayButton';
import Player from './components/player/Player';

export default function App() {
  const [audio] = useState<string>(`/assets/test_music.mp3`);
  const { toggle, playing, audioData } = useAudio(audio);

  return (
    <div className="grid place-items-center h-screen bg-slate-900 text-slate-50">
      <div className='text-center'>
        {/*<InputAudio
            value={audio}
            setValue={setAudio}
          />*/}

        <Player
          enabled={playing}
          data={audioData}
        />

        <PlayButton
          onClick={toggle}
          state={playing}
        />
      </div>
    </div>
  )
}