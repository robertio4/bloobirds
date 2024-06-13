import React, { useRef } from 'react';
import { Control } from 'react-hook-form';

import { MyEditor } from '@bloobirds-it/rich-text-editor';
import { SmartEmailTab } from '@bloobirds-it/types';

import { emailHelperTabs } from '../smartEmailHelper.constants';
import styles from './smartEmailHelperTabs.module.css';

export interface TabProps {
  control: Control<any>;
  bodyEditor: MyEditor;
  error: boolean;
  hasAttachments: boolean;
  format: string;
  htmlContent: string;
}

export const SmartEmailHelperLayout = (props: { tab: SmartEmailTab; tabProps: TabProps }) => {
  const ref = useRef();
  const { tab, tabProps } = props;

  const emailHelperTabTmp = emailHelperTabs(ref, tabProps);

  return (
    <div className={styles._tab_container} ref={ref}>
      {emailHelperTabTmp[tab]?.tab}
    </div>
  );
};
