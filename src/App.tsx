import { useState } from 'react'
import InputAudio from './components/inputs/audio/InputAudio';
import { useAudio } from './hooks/useAudio';
import PlayButton from './components/buttons/play/PlayButton';

export default function App() {
  const [audio, setAudio] = useState<string>(`/assets/test_music.mp3`);
  const { toggle, playing } = useAudio(audio);


  return (
    <div className="grid place-items-center h-screen">
      <div className='text-center'>
        <div>
          <InputAudio
            value={audio}
            setValue={setAudio}
          />
        </div>
        <PlayButton
          onClick={toggle}
          state={playing}
        />
      </div>
    </div>
  )
}