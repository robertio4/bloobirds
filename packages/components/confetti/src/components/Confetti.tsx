import React from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

import { useConfetti } from '@bloobirds-it/hooks';

export default () => {
  const { width, height } = useWindowSize();
  const { show, hideConfetti } = useConfetti();
  return (
    show.display && (
      <Confetti
        width={width}
        height={height}
        style={{ zIndex: 200 }}
        tweenDuration={10000}
        numberOfPieces={500}
        gravity={0.5}
        colors={[
          '#e91e63',
          '#9c27b0',
          '#3f51b5',
          '#2196f3',
          '#03a9f4',
          '#00bcd4',
          '#009688',
          '#CDDC39',
          '#FFEB3B',
          '#FFC107',
          '#FF9800',
          '#FF5722',
        ]}
        recycle={false}
        onConfettiComplete={hideConfetti}
        drawShape={
          show.bloobirdsShape
            ? ctx => {
                ctx.beginPath();
                ctx.quadraticCurveTo(15.2, 9.3, 13.2, 9.3);
                ctx.quadraticCurveTo(23.1, 9.1, 21.5, 9.3);
                ctx.quadraticCurveTo(26.0, 9.5, 26.3, 13.9);
                ctx.quadraticCurveTo(26.3, 17.4, 22.3, 18.6);
                ctx.quadraticCurveTo(22.3, 18.8, 22.3, 19.3);
                ctx.quadraticCurveTo(29.9, 18.8, 30.6, 25.9);
                ctx.quadraticCurveTo(30.9, 31.5, 24.2, 33.1);
                ctx.quadraticCurveTo(15.8, 33.2, 13.8, 33.2);
                ctx.quadraticCurveTo(11.7, 33.1, 11.7, 31.6);
                ctx.quadraticCurveTo(11.8, 19.4, 11.8, 11.2);
                ctx.quadraticCurveTo(11.4, 9.3, 13.2, 9.3);
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
              }
            : undefined
        }
      />
    )
  );
};
