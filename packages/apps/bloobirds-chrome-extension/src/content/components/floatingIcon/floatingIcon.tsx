import { ComponentPropsWithoutRef, useState } from 'react';
import Draggable from 'react-draggable';

import classNames from 'classnames';
import { useDebounce } from 'use-debounce';

import { useFloatingIconPosition } from '../../../hooks/useFloatingIconPosition';
import BloobirdsLogo from '../bloobirds';
import styles from './floatingIcon.module.css';

interface FloatingIconProps {
  visible: boolean;
  onClick: ComponentPropsWithoutRef<'div'>['onClick'];
  className?: string;
}

const FloatingIcon = (props: FloatingIconProps): JSX.Element => {
  const [dragging, setDragging] = useState(false);
  const { onClick, visible } = props;

  const [delayedDragging] = useDebounce(dragging, 100);

  const classes = classNames(styles.container, {
    [styles.visible]: visible,
    [styles.dragging]: dragging,
  });

  const classesHoverSide = classNames(styles.hoverSide, {
    [styles.visibleHoverSide]: dragging,
  });

  const { dimensions, bounds, position, setPosition } = useFloatingIconPosition();

  return (
    <>
      <Draggable
        handle="#bb-icon-handle"
        bounds={bounds}
        position={position}
        onStart={() => {
          setDragging(true);
        }}
        onStop={(_, data) => {
          setDragging(false);
          setPosition({ x: data.x, y: data.y });
        }}
      >
        <div id="floating-icon" className={classes}>
          <div className={styles.logo} onClick={delayedDragging ? undefined : onClick}>
            <BloobirdsLogo width={24} height={24} fill="white" />
          </div>

          <div className={classesHoverSide}>
            <div id="bb-icon-handle">
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1 0.75C0.447715 0.75 0 1.19772 0 1.75V2.25C0 2.80228 0.447715 3.25 1 3.25H1.5C2.05228 3.25 2.5 2.80228 2.5 2.25V1.75C2.5 1.19772 2.05228 0.75 1.5 0.75H1ZM1 5.75C0.447715 5.75 0 6.19772 0 6.75V7.25C0 7.80228 0.447715 8.25 1 8.25H1.5C2.05228 8.25 2.5 7.80228 2.5 7.25V6.75C2.5 6.19772 2.05228 5.75 1.5 5.75H1ZM0 11.75C0 11.1977 0.447715 10.75 1 10.75H1.5C2.05228 10.75 2.5 11.1977 2.5 11.75V12.25C2.5 12.8023 2.05228 13.25 1.5 13.25H1C0.447715 13.25 0 12.8023 0 12.25V11.75ZM6 0.75C5.44772 0.75 5 1.19772 5 1.75V2.25C5 2.80228 5.44772 3.25 6 3.25H6.5C7.05228 3.25 7.5 2.80228 7.5 2.25V1.75C7.5 1.19772 7.05228 0.75 6.5 0.75H6ZM5 6.75C5 6.19772 5.44772 5.75 6 5.75H6.5C7.05228 5.75 7.5 6.19772 7.5 6.75V7.25C7.5 7.80228 7.05228 8.25 6.5 8.25H6C5.44772 8.25 5 7.80228 5 7.25V6.75ZM6 10.75C5.44772 10.75 5 11.1977 5 11.75V12.25C5 12.8023 5.44772 13.25 6 13.25H6.5C7.05228 13.25 7.5 12.8023 7.5 12.25V11.75C7.5 11.1977 7.05228 10.75 6.5 10.75H6Z"
                  fill="#1991FF"
                />
              </svg>
            </div>
          </div>
        </div>
      </Draggable>
      {dragging && (
        <div
          className={styles.movableArea}
          style={{ ...dimensions, left: document.documentElement.clientWidth - 4 }}
        />
      )}
    </>
  );
};

export default FloatingIcon;
