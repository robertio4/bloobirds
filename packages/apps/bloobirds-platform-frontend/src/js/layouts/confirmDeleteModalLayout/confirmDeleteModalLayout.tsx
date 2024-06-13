import {
  Button,
  Icon,
  IconType,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Spinner,
  Text,
} from '@bloobirds-it/flamingo-ui';
import styles from './confirmDeleteModalLayout.module.css';
import React, { useEffect } from 'react';
import { useKeyPress } from '../../hooks/useKeyPress';

interface ModalProps {
  assetLabel: string;
  handleDelete: () => void;
  variant?: 'primary' | 'gradient';
  handleClose: () => void;
  icon?: IconType;
  isDeleting?: boolean;
  children?: React.ReactElement | React.ReactElement[] | string;
  colorSchema?: any;
  disable?: boolean;
}

export const ConfirmDeleteModalLayout = ({
  assetLabel,
  handleDelete,
  variant,
  handleClose,
  icon,
  isDeleting,
  children,
  colorSchema,
  disable = false,
}: ModalProps) => {
  const keyPressed = useKeyPress('Enter');

  useEffect(() => {
    if (keyPressed) {
      handleDelete();
    }
  }, [keyPressed]);

  return (
    <Modal width={600} open onClose={handleClose}>
      <ModalHeader
        variant={variant || 'primary'}
        {...(colorSchema ? { color: colorSchema.verySoft } : {})}
      >
        <ModalTitle
          variant={variant || 'primary'}
          {...(colorSchema ? { color: colorSchema.verySoft } : {})}
        >
          <div className={styles._title__container}>
            {icon && (
              <Icon
                name="compass"
                className={styles._icon}
                color={colorSchema?.light || 'bloobirds'}
              />
            )}
            <Text size="m" inline>
              Delete {assetLabel}
            </Text>
          </div>
        </ModalTitle>
        <ModalCloseIcon color="black" size="small" onClick={handleClose} />
      </ModalHeader>
      <ModalContent>
        <div className={styles.content}>{children}</div>
      </ModalContent>
      <ModalFooter>
        <Button variant="tertiary" onClick={handleClose} color={colorSchema?.light || 'bloobirds'}>
          Cancel
        </Button>
        <Button
          variant="primary"
          color={disable ? 'lightestBloobirds' : 'tomato'}
          disabled={disable}
          dataTest="deleteModalDeleteButton"
          onClick={handleDelete}
        >
          {isDeleting ? <Spinner name="loadingCircle" color="white" size={16} /> : 'Delete'}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
