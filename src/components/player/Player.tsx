import { useEffect, useRef } from 'react';

interface PlayerProps {
  data: Uint8Array | undefined
  enabled: boolean
}

export default function Player({ data, enabled }: PlayerProps) {
  const canvaRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvaRef.current?.getContext('2d');
    if (!ctx) return;
    if (!enabled || !data) {
      ctx.fillStyle = 'rgba(15, 12, 42, 1)';
      return;
    }

    let id = 0
    function audioVisualize() {
      if (!data || !ctx) return;

      const width = 800;
      const height = 400;
      ctx.fillStyle = 'rgba(15, 12, 42, 1)';
      ctx.fillRect(0, 0, width, height);
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#00ff00';

      const sliceWith = width * (1.0 / data.length / 2)
      let x = 0;
      const y = height

      for (let i = 0; i < data.length; i++) {
        ctx.beginPath();
        ctx.moveTo(x * 2, y);
        const v = y - (data[i])
        ctx.lineTo(x * 2, v)
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(width - x * 2, y);
        const rightY = y - data[i];
        ctx.lineTo(width - x * 2, rightY);
        ctx.stroke();

        x += sliceWith
      }

      id = requestAnimationFrame(audioVisualize);
    }

    audioVisualize()

    return () => {
      cancelAnimationFrame(id)
    }
  }, [enabled, data])

  return (
    <div className='border-4 border-slate-800 m-2' >
      <canvas ref={canvaRef} width="800" height="400"></canvas>
    </div>
  )
}
