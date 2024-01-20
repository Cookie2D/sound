import { useState } from 'react'
import InputAudio from './components/inputs/audio/InputAudio';
import { useAudio } from './hooks/useAudio';
import PlayButton from './components/buttons/play/PlayButton';
import Player from './components/player/Player';

interface AudioDetails {
  name: string | undefined
}

export default function App() {
  const [audio, setAudio] = useState<string>();
  const [audioDetails, setAudioDetails] = useState<AudioDetails>()

  const { toggle, playing, audioData } = useAudio(audio);

  return (
    <div className="grid place-items-center h-screen bg-slate-900 text-slate-50">
      <div className="text-center">
        {audio ? (
          <span>In player: {audioDetails?.name}</span>
        ) : (
          <span>Upload your song</span>
        )}

        <Player enabled={playing} data={audioData} />

        <div className="flex justify-center gap-4 items-center">
          <InputAudio
            value={audio}
            setValue={setAudio}
            setAudioDetails={setAudioDetails}
          />

          <PlayButton onClick={toggle} state={playing} disabled={!audio} />
        </div>
      </div>
    </div>
  );
}