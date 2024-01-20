import React, { useCallback, useEffect, useState } from "react";
import PlayIcon from "../../../assets/icons/PlayIcon";
import PauseIcon from "../../../assets/icons/PauseIcon";

interface PlayButtonProps {
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  state: boolean;
  disabled?: boolean
}

export default function PlayButton({ onClick, state, disabled = false }: PlayButtonProps) {
  const [active, setActive] = useState<boolean>(state);

  const handleClick = useCallback(
    (event?: React.MouseEvent<HTMLButtonElement>) => {
      if (event && (event.nativeEvent as PointerEvent)?.pointerType !== "mouse") {
        return;
      }

      setActive((prev) => !prev);
      onClick(event);
    },
    [onClick]
  );

  useEffect(() => {
    function handleSpacePrace(event: KeyboardEvent) {
      if (event.code === "Space" && !disabled) {
        handleClick();
      }
    }

    window.addEventListener("keydown", handleSpacePrace);

    return () => {
      window.removeEventListener("keydown", handleSpacePrace);
    };
  }, [handleClick, disabled]);

  return (
    <button
      disabled={disabled}
      className={`w-16 h-16 bg-red-500 rounded-full cursor-pointer select-none  
        transition-all duration-150 [box-shadow:0_8px_0_0_#f81b1b,0_13px_0_0_#1b70f841]
        border-1 border-red-400 focus:outline-none outline-none
        ${active &&
        "translate-y-2 [box-shadow:0_0px_0_0_#f81b1bb2,0_0px_0_0_#1b70f841] border-b-[0px]"
        }
        ${disabled && 'cursor-not-allowed'}
        `
      }
      onClick={handleClick}
    >
      <span className="flex flex-col justify-center items-center h-full text-white">
        {active ? (
          <PauseIcon className="w-6 h-6" />
        ) : (
          <PlayIcon className="w-6 h-6" />
        )}
      </span>
    </button>
  );
}
