import React from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, Tooltip } from '@bloobirds-it/flamingo-ui';
import { getNodeFragment, ToolbarButton, usePlateSelection } from '@udecode/plate';

import { useMyPlateEditorRef } from '../../config/typescript';
import styles from '../element.module.css';

export const SaveSnippetButton = ({ saveSnippetCallback }) => {
  const test = useMyPlateEditorRef();
  const selectedNode = usePlateSelection();
  const { t } = useTranslation('translation', { keyPrefix: 'richTextEditor' });

  function handleClick() {
    const node = getNodeFragment(test, selectedNode);
    saveSnippetCallback(node);
  }

  return (
    <Tooltip title={t('saveSnippet')} position="top">
      <div className={styles.svgs}>
        <ToolbarButton icon={<Icon name="save" />} onMouseDown={handleClick} />
      </div>
    </Tooltip>
  );
};
