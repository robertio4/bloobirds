import React, { ReactNode } from 'react';

import { Icon, Tooltip } from '@bloobirds-it/flamingo-ui';
import {
  getPluginType,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  MarkToolbarButton,
  BalloonToolbar,
} from '@udecode/plate';

import { useMyPlateEditorRef } from '../../config/typescript';
import styles from '../element.module.css';

export const MarkBalloonToolbar = ({ id, children }: { id: string; children?: ReactNode }) => {
  const editor = useMyPlateEditorRef(id);

  const arrow = false;
  const theme = 'light';

  const buttons = [
    {
      type: getPluginType(editor, MARK_BOLD),
      icon: <Icon name="textBold" />,
      title: 'Bold',
    },
    {
      type: getPluginType(editor, MARK_ITALIC),
      icon: <Icon name="textItalic" />,
      title: 'Italic',
    },
    {
      type: getPluginType(editor, MARK_UNDERLINE),
      icon: <Icon name="textUnderlined" />,
      title: 'Underline',
    },
  ];

  const renderMarkButton = (index: number, type: string, icon: ReactNode, title: string) => (
    <Tooltip key={index} title={title} position="top">
      <div className={styles.svgs}>
        <MarkToolbarButton type={type} icon={icon} actionHandler="onMouseDown" />
      </div>
    </Tooltip>
  );

  const renderButtons = () =>
    buttons.map((button, index) => renderMarkButton(index, button.type, button.icon, button.title));

  return (
    <div className={styles.svgs}>
      <BalloonToolbar theme={theme} arrow={arrow}>
        {renderButtons()}
        {children}
      </BalloonToolbar>
    </div>
  );
};
