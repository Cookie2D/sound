import React from 'react'

interface InputAudioProps {
  value?: string | undefined,
  setValue: (state: string) => void
}

export default function InputAudio({ setValue: setAudio }: InputAudioProps) {

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const audioUrl = event.target?.result as string;
        setAudio(audioUrl);
      };

      reader.readAsDataURL(file);
    }
  }

  // TODO: add styles
  return (
    <label className='flex flex-col text-center p-2'>
      Upload your sound
      <input
        type="file"
        name="audio"
        id="audio"
        onChange={handleChange}
        className="hidden" />
      <div>
        Upload your file
      </div>
    </label>
  )
}
