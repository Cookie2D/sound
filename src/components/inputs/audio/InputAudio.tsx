import React from 'react'
import UploadIcon from '../../../assets/icons/UploadIcon';

interface InputAudioProps {
  value?: string | undefined,
  setValue: (state: string) => void
  setAudioDetails: (state: { name: string }) => void;
}

export default function InputAudio({ setValue: setAudio, setAudioDetails }: InputAudioProps) {

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();

      setAudioDetails({
        name: file.name,
      })

      reader.onload = (event) => {
        const audioUrl = event.target?.result as string;
        setAudio(audioUrl);
      };

      reader.readAsDataURL(file);
    }
  }

  return (
    <label className='flex flex-col text-center p-2 cursor-pointer transform hover:scale-105 transition-transform duration-300'>
      <div
        className={`w-16 h-16 bg-red-500 rounded-full cursor-pointer select-none  
        transition-all duration-150 [box-shadow:0_8px_0_0_#f81b1b,0_13px_0_0_#1b70f841]
        border-1 border-red-400 focus:outline-none outline-none
        active:translate-y-2 active:[box-shadow:0_0px_0_0_#f81b1bb2,0_0px_0_0_#1b70f841] active:border-b-[0px]
        }`}
      >
        <span className="flex flex-col justify-center items-center h-full text-white">
          <UploadIcon className="w-6 h-6" />
        </span>
      </div>
      <input
        type="file"
        name="audio"
        id="audio"
        onChange={handleChange}
        className="hidden"
      />
    </label>
  )
}
