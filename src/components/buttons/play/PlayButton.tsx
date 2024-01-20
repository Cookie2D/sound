import React, { useState } from 'react'
import PlayIcon from '../../../assets/icons/PlayIcon';
import PauseIcon from '../../../assets/icons/PauseIcon';

interface PlayButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  state: boolean
}

export default function PlayButton({ onClick, state }: PlayButtonProps) {
  const [active, setActive] = useState<boolean>(state);
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setActive(prev => !prev)
    onClick(event);
  }
  return (
    <button
      className='bg-purple-600 border-2 p-4 rounded-full text-slate-200'
      onClick={handleClick}
    >
      {active ? <PauseIcon className='w-6 h-6' /> : <PlayIcon className='w-6 h-6' />}
    </button>

  )
}
