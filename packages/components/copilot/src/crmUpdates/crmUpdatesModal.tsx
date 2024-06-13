import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Icon,
  IconButton,
  IconType,
  Item,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Select,
  Tag,
  Text,
  Tooltip,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { Bobject, Dictionary } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import clsx from 'clsx';
import { useSWRConfig } from 'swr';

import styles from './crmUpdateModal.module.css';
import { CRMUpdatesProvider, useCrmUpdatesModal } from './crmUpdates.context';
import {
  AcceptedObject,
  EntityUpdates,
  ObjectWithUpdates,
  SuggestionStatus,
} from './crmUpdates.types';

interface Animation {
  duration?: number;
  ease?: string;
}

interface CollapsibleProps {
  children: React.ReactNode;
  open: boolean;
  animation?: Animation;
}

const defaultAnimationValues = {
  duration: 0.2,
  ease: 'ease-in-out',
};

export const Collapsible = ({
  children,
  open,
  animation = defaultAnimationValues,
}: CollapsibleProps) => {
  const collapsibleStyle = {
    display: 'grid',
    gridTemplateRows: open ? '1fr' : '0fr',
    opacity: open ? 1 : 0,
    transition: `all ${animation.duration}s ${animation.ease}`,
  };
  return (
    <div style={collapsibleStyle}>
      <div style={{ overflow: 'hidden' }}>{children}</div>
    </div>
  );
};

interface SuggestedUpdateProps {
  currentValue: string;
  suggestedValue: string;
  values: { name: string; label: string }[];
  onAccept: (fieldName: string, fieldValue: string) => void;
  onDiscard: (fieldName: string) => void;
  onReset: (fieldName: string) => void;
  status: SuggestionStatus;
  name: string;
  label: string;
  entity: string;
  objectName: string;
}

const SuggestedUpdate = ({
  currentValue,
  suggestedValue,
  values,
  name,
  label,
  onAccept,
  onDiscard,
  onReset,
  status,
  entity,
  objectName,
}: SuggestedUpdateProps) => {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState<string>(suggestedValue);

  const icons: Record<string, IconType> = {
    Account: 'company',
    Contact: 'sfdcContacts',
    Opportunity: 'sfdcOpp',
  };
  return (
    <div className={styles.suggestedUpdate}>
      <div className={styles.suggestedUpdateFieldName}>
        <Icon name={icons[entity]} size={16} color="softPeanut" />
        <Text size="xs">
          {label}{' '}
          <Text size="xxs" inline color="softPeanut">
            |
          </Text>{' '}
          {objectName}
        </Text>
      </div>
      {status !== 'accepted' && (
        <div className={styles.suggestedUpdateRow}>
          <Text size="xs" color="softPeanut" className={styles.suggestedUpdateRowLeft}>
            {t('crmUpdatesModal.current')}
          </Text>
          <Text size="xs" className={styles.currentValue}>
            {currentValue ? values?.find(value => value.name === currentValue)?.label : '--None--'}
          </Text>
          <div className={styles.suggestedUpdateRowActions}>
            {status === 'discarded' && (
              <Tooltip title={t('crmUpdatesModal.reset')} position="top">
                <IconButton name="stars" color="purple" size={16} onClick={() => onReset(name)} />
              </Tooltip>
            )}
          </div>
        </div>
      )}
      {status !== 'discarded' && (
        <div
          className={clsx(styles.suggestedUpdateRow, {
            [styles.suggestedUpdateRowSelected]: selectedValue === suggestedValue,
          })}
        >
          <Text size="xs" color="softPeanut" className={styles.suggestedUpdateRowLeft}>
            {t('crmUpdatesModal.new')}
          </Text>

          <div className={styles.valueSelector}>
            <Select
              value={selectedValue}
              onChange={setSelectedValue}
              width="100%"
              size="labeled"
              renderDisplayValue={value => values?.find(v => v.name === value)?.label}
              //@ts-ignore
              adornmentLeft={
                selectedValue === suggestedValue && <Icon name="stars" size={12} color="purple" />
              }
            >
              {values?.map(value => (
                <Item
                  key={value.name}
                  value={value.name}
                  className={clsx(styles.item, {
                    [styles.suggestedItem]: suggestedValue === value.name,
                  })}
                >
                  {value.name === suggestedValue && (
                    <IconButton
                      name="stars"
                      size={12}
                      color="purple"
                      onClick={() => onReset(name)}
                    />
                  )}
                  {value.label}
                </Item>
              ))}
            </Select>
          </div>

          {status === 'accepted' && (
            <Tooltip title={t('crmUpdatesModal.reset')} position="top">
              <IconButton
                name="refresh"
                color="bloobirds"
                size={18}
                onClick={() => onReset(name)}
              />
            </Tooltip>
          )}
          {status === 'base' && (
            <>
              <Tooltip title={t('crmUpdatesModal.acceptSuggestion')} position="top">
                <IconButton
                  name="check"
                  color="melon"
                  size={16}
                  onClick={() => onAccept(name, selectedValue)}
                />
              </Tooltip>
              <Tooltip title={t('crmUpdatesModal.discardSuggestion')} position="bottom">
                <IconButton
                  name="cross"
                  color="extraMeeting"
                  onClick={() => onDiscard(name)}
                  size={18}
                />
              </Tooltip>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const ObjectSelector = ({
  entity,
  currentObj,
  onChange,
}: {
  currentObj: string;
  entity: string;
  onChange: (newObjectId: string) => void;
}) => {
  const { updates } = useCrmUpdatesModal();

  const objects = updates[entity].objects;
  return (
    <Select
      defaultValue={currentObj}
      value={currentObj}
      onChange={onChange}
      size="labeled"
      width="200px"
    >
      {Object.values(objects).map((obj: ObjectWithUpdates) => (
        <Item key={obj.objectId} value={obj.objectId}>
          {obj.name}
        </Item>
      ))}
    </Select>
  );
};

interface UpdatesMap {
  [key: string]: ObjectWithUpdates;
}

const UpdatesProposed = ({ entity }: { entity: string }) => {
  const { acceptSuggestion, discardSuggestion, resetSuggestion, updates } = useCrmUpdatesModal();

  const [updatesMap, setUpdatesMap] = useState<Dictionary<ObjectWithUpdates>>({});

  useEffect(() => {
    if (entity !== undefined) {
      const firstObjectWithUpdates =
        updates[entity] && updates[entity].objects
          ? Object.keys(updates[entity].objects).find(
              objectId => updates[entity].objects[objectId].updates?.length > 0,
            )
          : undefined;
      const activeObject = updates[entity]?.objects[firstObjectWithUpdates];
      setUpdatesMap({ [entity]: activeObject });
    } else {
      setUpdatesMap({
        ...Object.entries<UpdatesMap>(updates).reduce<Dictionary<ObjectWithUpdates>>(
          (acc, [entityName, entityUpdates]) => {
            const firstObject = Object.values(entityUpdates.objects).find(
              object => object.updates?.length > 0,
            );
            if (firstObject) {
              acc[entityName] = firstObject;
            }
            return acc;
          },
          {},
        ),
      });
    }
  }, [entity, updates]);

  const onChangeEntityObject = (entity: string, objectId: string) => {
    const activeObject = updates[entity]?.objects[objectId];
    setUpdatesMap({ ...updatesMap, [entity]: activeObject });
  };

  return (
    <div className={styles.updatesRoot}>
      <div className={styles.updates}>
        {Object.entries<ObjectWithUpdates>(updatesMap).map(([entity, object]) => (
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '8px',
              }}
            >
              <Text size="m" weight="bold">
                {entity} updates
              </Text>
              {entity === 'Opportunity' && (
                <ObjectSelector
                  currentObj={object.objectId}
                  entity={entity}
                  onChange={newObjectId => onChangeEntityObject(entity, newObjectId)}
                />
              )}
            </div>
            {object.updates.map(suggestion => (
              <SuggestedUpdate
                objectName={object.name}
                name={suggestion.name}
                label={suggestion.label}
                key={suggestion.name}
                entity={suggestion.entity}
                currentValue={suggestion.currentValue}
                suggestedValue={suggestion.suggestedValue}
                values={suggestion.values}
                onAccept={(fieldName, value) =>
                  acceptSuggestion({
                    entity: suggestion.entity,
                    fieldName,
                    value,
                    objectId: suggestion.objectId,
                  })
                }
                onDiscard={fieldName =>
                  discardSuggestion({
                    entity: suggestion.entity,
                    fieldName,
                    objectId: suggestion.objectId,
                  })
                }
                onReset={fieldName =>
                  resetSuggestion({
                    entity: suggestion.entity,
                    fieldName,
                    objectId: suggestion.objectId,
                  })
                }
                status={suggestion.status as SuggestionStatus}
              />
            ))}
          </>
        ))}
      </div>
    </div>
  );
};

const ObjectFilers = ({
  onChangeEntity,
  entity,
}: {
  entity: string;
  onChangeEntity: (entity: string) => void;
}) => {
  const { t } = useTranslation();
  const { updates } = useCrmUpdatesModal();

  const counters = {
    Account: Object.keys(updates['Account'].objects).filter(
      id => updates['Account'].objects[id].updates.length > 0,
    ).length,
    Contact: Object.keys(updates['Contact'].objects).filter(
      id => updates['Contact'].objects[id].updates.length > 0,
    ).length,
    Opportunity: Object.keys(updates['Opportunity'].objects).filter(
      id => updates['Opportunity'].objects[id].updates.length > 0,
    ).length,
  };
  const { acceptAllSuggestions, resetAllSuggestions, discardAllSuggestions } = useCrmUpdatesModal();
  return (
    <div className={styles.filters}>
      <div className={styles.tags}>
        <Tag
          active={!entity}
          value={undefined}
          onClick={() => onChangeEntity(undefined)}
          uppercase={false}
          variant="primary"
        >
          All
        </Tag>
        {counters.Contact > 0 && (
          <Tag
            active={entity === 'Contact'}
            value="Contact"
            onClick={() => onChangeEntity('Contact')}
            uppercase={false}
            variant="primary"
          >
            Lead
          </Tag>
        )}
        {counters.Account > 0 && (
          <Tag
            active={entity === 'Account'}
            value="Account"
            onClick={() => onChangeEntity('Account')}
            uppercase={false}
            variant="primary"
          >
            Company
          </Tag>
        )}
        {counters.Opportunity > 0 && (
          <Tag
            active={entity === 'Opportunity'}
            value="Opportunity"
            onClick={() => onChangeEntity('Opportunity')}
            uppercase={false}
            variant="primary"
          >
            Opportunity
          </Tag>
        )}
      </div>
      <div className={styles.updatesHeaderActions}>
        <Tooltip title={t('crmUpdatesModal.suggestAllAgain')} position="top">
          <IconButton
            name="stars"
            color="purple"
            size={24}
            onClick={() => resetAllSuggestions(entity)}
          />
        </Tooltip>
        <Tooltip title={t('crmUpdatesModal.acceptAllSuggestions')} position="top">
          <IconButton
            name="check"
            color="melon"
            size={24}
            onClick={() => acceptAllSuggestions(entity)}
          />
        </Tooltip>
        <Tooltip title={t('crmUpdatesModal.discardAllSuggestions')} position="bottom">
          <IconButton
            name="cross"
            color="extraMeeting"
            size={24}
            onClick={() => discardAllSuggestions(entity)}
          />
        </Tooltip>
      </div>
    </div>
  );
};
export const CrmUpdatesModal = ({
  activity,
  open,
  onClose,
}: {
  activity: Bobject;
  open: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const { cache } = useSWRConfig();
  const [updates, setUpdates] = useState<Dictionary<EntityUpdates>>({});
  const { createToast } = useToasts();
  const acceptedObjects = useMemo(() => {
    return Object.entries(updates).reduce<AcceptedObject[]>((acc, [entity, entityUpdates]) => {
      const aObj = Object.values(entityUpdates as EntityUpdates)
        .filter(obj => obj.updates.filter(upd => upd.status === 'accepted').length > 0)
        .map<AcceptedObject>((obj: ObjectWithUpdates) => ({
          entityName: entity,
          fields: obj.updates.filter(upd => upd.status === 'accepted'),
          objectName: obj.name,
          objectId: obj.objectId,
        }));

      return [...acc, ...aObj];
    }, []);
  }, [updates]);

  const updateObjects = useCallback(() => {
    if (acceptedObjects.length > 0) {
      return Promise.all(
        acceptedObjects.map(objectUpdate =>
          api.patch(
            `/utils/service/salesforce/sobject/${objectUpdate.entityName}/${objectUpdate.objectId}`,
            objectUpdate.fields.reduce<Dictionary<string>>((acc, field) => {
              acc[field.name] = field.acceptedValue;
              return acc;
            }, {}),
          ),
        ),
      ).then(() => {
        const pattern = new RegExp(`\/utils\/service\/salesforce\/query`);
        const keys = Array.from(cache.keys());
        keys.filter(key => pattern.test(key)).forEach(key => cache.delete(key));
        createToast({
          type: 'success',
          message: 'Objects in Salesforce updated successfully',
        });
      });
    } else {
      return Promise.resolve();
    }
  }, [acceptedObjects]);

  const handleAccept = () => {
    updateObjects().then(onClose);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader size="small" color="verySoftPurple">
        <ModalTitle variant="primary" size="small" icon="salesforce" className={styles.title}>
          {t('crmUpdatesModal.title')}
        </ModalTitle>
        <ModalCloseIcon onClick={onClose} color="purple" size="small" />
      </ModalHeader>
      <ModalContent className={styles.content}>
        <CrmUpdatesContent activity={activity} onUpdatesChange={setUpdates} />
      </ModalContent>
      <ModalFooter className={styles.footer}>
        <Button
          variant="clear"
          onClick={onClose}
          color="extraMeeting"
          uppercase={false}
          size="small"
        >
          {t('crmUpdatesModal.cancel')}
        </Button>
        <Button
          className={styles.accpetButton}
          onClick={handleAccept}
          uppercase={false}
          variant="primary"
          size="small"
          disabled={acceptedObjects.length === 0}
        >
          {t('crmUpdatesModal.accept')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export const CrmUpdatesContent = ({
  activity,
  onUpdatesChange,
}: {
  activity: Bobject;
  onUpdatesChange?: (updates: Dictionary<EntityUpdates>) => void;
}) => {
  const [activeEntity, setActiveEntity] = useState<string>(undefined);
  return (
    <CRMUpdatesProvider activity={activity} onUpdatesChange={onUpdatesChange}>
      <div className={styles.contentRoot}>
        <ObjectFilers
          onChangeEntity={(entity: string) => setActiveEntity(entity)}
          entity={activeEntity}
        />
        <UpdatesProposed entity={activeEntity} />
      </div>
    </CRMUpdatesProvider>
  );
};
