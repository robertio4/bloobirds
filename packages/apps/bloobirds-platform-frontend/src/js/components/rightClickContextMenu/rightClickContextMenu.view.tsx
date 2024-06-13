import React from 'react';
import styles from './rightClickContextMenu.module.css';

type Props = {
  url?: string;
  xPos?: string;
  yPos?: string;
  hideContextMenu: () => void;
};

const RightClickContextMenu = ({ url, xPos, yPos, hideContextMenu }: Props) => (
  <div
    className={styles._container__wrapper}
    style={{
      top: yPos && `calc(${yPos} - 8px)`,
      left: xPos && `calc(${xPos} - 8px)`,
    }}
    onMouseLeave={() => {
      hideContextMenu();
    }}
  >
    <div className={styles._container}>
      <a
        target="_blank"
        rel="noreferrer"
        href={url}
        onClick={event => {
          window.open(url, '_blank');
          hideContextMenu();
          event.preventDefault();
          event.stopPropagation();
        }}
        className={styles._link}
      >
        Open in a new tab
      </a>
    </div>
  </div>
);

export default RightClickContextMenu;
