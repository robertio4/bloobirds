import React from 'react';
import { Box } from '@udecode/plate-core';
import { Image, Media } from '@udecode/plate-media';
import { useFocused, useReadOnly, useSelected } from 'slate-react';
import { ImageElementProps } from '@udecode/plate';
import styles from './imageLink.module.css';
import clsx from 'clsx';

export const ImageElement = (props: ImageElementProps) => {
  const { children, nodeProps, resizableProps, ignoreReadOnly = false } = props;

  const { as, ...rootProps } = props;

  const focused = useFocused();
  const selected = useSelected();
  const readOnly = useReadOnly();

  const classes = clsx(styles.image, {
    [styles.focused]: selected && focused,
  });

  return (
    <Media.Root {...rootProps} className={styles.root}>
      <figure className={`group ${styles.figure}`} contentEditable={false}>
        <Media.Resizable
          // @ts-ignore
          className={styles.resizable}
          handleComponent={{
            // eslint-disable-next-line react/jsx-handler-names
            left: <Box className={styles.handleLeft} />,
            // eslint-disable-next-line react/jsx-handler-names
            right: <Box className={styles.handleRight} />,
          }}
          readOnly={!ignoreReadOnly && readOnly}
          {...resizableProps}
        >
          <Image className={classes} {...nodeProps} width={'100%'} />
        </Media.Resizable>
      </figure>

      {children}
    </Media.Root>
  );
};
