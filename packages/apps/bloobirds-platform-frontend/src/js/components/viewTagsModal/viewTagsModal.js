import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalFooter,
  Text,
  Tag,
  Input,
  Button,
  Label,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import styles from './viewTagsModal.module.css';
import { useTagsModal } from '../../hooks/useTagsModal';

const ViewTagsModal = () => {
  const [search, setSearch] = useState();
  const { valuesToRender, areValues, handleClose, extraText } = useTagsModal();

  return (
    <Modal
      width={720}
      title={`${areValues ? 'Values' : 'Fields'} to be displayed ${extraText || ''}`}
      open
      onClose={handleClose}
    >
      <ModalContent>
        <div className={styles._modal__title}>
          <div className={styles._title__container}>
            <div className={styles._title__text}>
              <Text>List of {areValues ? 'values' : 'fields'}</Text>
            </div>
            <Label size="small" uppercase={false}>
              {valuesToRender?.length} results
            </Label>
          </div>
          <Input
            width={200}
            type="text"
            icon="search"
            onChange={value => setSearch(value)}
            placeholder="Search..."
          />
        </div>
        <div className={styles._value__tag__container}>
          {valuesToRender
            ?.filter(value => (search ? value.label.toLowerCase().includes(search) : true))
            .map(value => (
              <span className={styles._value__tag} key={value?.label}>
                <Tooltip
                  title={value?.disabled && `This ${areValues ? 'value' : 'field'} is disabled.`}
                  position={value?.disabled && 'top'}
                >
                  <Tag
                    uppercase={false}
                    color={value?.disabled ? 'verySoftTomato' : 'veryLightBloobirds'}
                  >
                    {value.label}
                  </Tag>
                </Tooltip>
              </span>
            ))}
        </div>
      </ModalContent>
      <ModalFooter>
        <div />
        <Button onClick={handleClose} variant="tertiary">
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ViewTagsModal;
