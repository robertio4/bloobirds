import { useEffect } from 'react';

import { IconButton } from '@bloobirds-it/flamingo-ui';

import styles from '../../tourHandler.module.css';

export const SliderControls = ({ length, position, setPosition, closeModal }) => {
  function moveBack() {
    if (position === 0) return;
    setPosition(position - 1);
  }

  function moveForward() {
    if (position === length - 1) {
      return;
    } else {
      setPosition(position + 1);
    }
  }

  useEffect(() => {
    const down = (e: any) => {
      if (e.key === 'ArrowRight') {
        moveForward();
      } else if (e.key === 'ArrowLeft') {
        moveBack();
      } else if (e.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [position]);

  return (
    <div className={styles.sliderControls}>
      <div className={styles.sliderControlsLeft}>
        <IconButton name="chevronLeft" disabled={position === 0} size={16} onClick={moveBack} />
      </div>
      <ul>
        {Array.from({ length }).map((dot: number, index) => (
          <li data-testid={`dot-${dot}`} key={index}>
            <IconButton
              name="statusCircle"
              size={8}
              color={position === index ? 'bloobirds' : 'veryLightBloobirds'}
              onClick={() => setPosition(index)}
            />
          </li>
        ))}
      </ul>
      <div className={styles.sliderControlsLeft}>
        <IconButton
          name="chevronRight"
          disabled={position === length - 1}
          size={16}
          onClick={moveForward}
        />
      </div>
    </div>
  );
};
