import styles from './imageLink.module.css';
import { useFocused, useReadOnly, useSelected } from 'slate-react';
import { Box, Image, Link, Media } from '@udecode/plate';
import clsx from 'clsx';

const ImageLink = props => {
  const { as, ...rootProps } = props;
  const {
    children,
    nodeProps,
    resizableProps,
    align = 'center',
    ignoreReadOnly = false,
  } = rootProps;

  const focused = useFocused();
  const selected = useSelected();
  const readOnly = useReadOnly();

  const classes = clsx(styles.image, {
    [styles.focused]: selected && focused,
  });

  // Fix for useLink hook of @udecode/plate-link
  const linkProps = {
    ...rootProps,
    element: { ...rootProps.element, url: rootProps.element.href, target: '_blank' },
  };

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
          align={align}
          readOnly={!ignoreReadOnly && readOnly}
          {...resizableProps}
        >
          <Link.Root {...linkProps}>
            <Image className={classes} {...nodeProps} width={'100%'} />
          </Link.Root>
        </Media.Resizable>
      </figure>

      {children}
    </Media.Root>
  );
};

export default ImageLink;
