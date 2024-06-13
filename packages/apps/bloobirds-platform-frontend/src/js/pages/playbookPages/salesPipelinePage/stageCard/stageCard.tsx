import {
  Button,
  Checkbox,
  ColorPicker,
  Icon,
  IconButton,
  Input,
  Label,
  Switch,
  Text,
  Tooltip,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import React, { useEffect, useRef, useState } from 'react';
import { EntityCardItem } from '../../../../components/entityList/entityCard/entityCard';
import styles from './stageCard.module.css';
import { BobjectPicklistValueEntity } from '../../../../typings/entities.js';
import { useEntityActions } from '../../../../hooks/entities/useEntityActions';
import { forceSelectedEntitiesCacheRefresh } from '../../../../hooks/entities/useEntity.utils';
import { colors } from '../utils/colors';
import { ConfirmDeleteModalLayout } from '../../../../layouts/confirmDeleteModalLayout/confirmDeleteModalLayout';

export const StageCard = ({
  stage,
  handleDelete,
}: {
  stage: BobjectPicklistValueEntity;
  handleDelete: (id: string) => void;
}) => {
  const [checked, setChecked] = useState<boolean>(stage?.nurturingStage);
  const ref = useRef();
  const [enabled, setEnabled] = useState<boolean>(stage?.enabled);
  const [stageValue, setStageValue] = useState<string>(stage?.value);
  const [weightedPercentage, setWeightedPercentage] = useState<number>(stage?.weightedPercentage);
  const [isEdition, setIsEdition] = useState<boolean>(false);
  const [charsColor, setCharsColor] = useState<string>(stage?.textColor || '#464f57');
  const [pillColor, setPillColor] = useState<string>(stage?.backgroundColor || '#edf1f5');
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { handleUpdateEntity, handleDeleteEntity } = useEntityActions();
  const { createToast } = useToasts();

  const updateWeightedPercentage = (value: string) => {
    if (value === undefined) {
      setWeightedPercentage(undefined);
    } else {
      if (value && parseInt(value) < 0) {
        value = '0';
      } else if (value && parseInt(value) > 100) {
        value = '100';
      }
      setWeightedPercentage(value || value === '0' ? parseInt(value) : undefined);
    }
  };

  const updatePicklist = (body: any) => {
    if (!stageValue) {
      setError('You should fill a stage name!');
    } else {
      setIsEditing(true);
      handleUpdateEntity({
        id: stage?.id,
        entityName: 'bobjectPicklistFieldValues',
        label: 'picklist',
        body,
        callback: (res: any) => {
          if (res?.error) {
            if (res.response.status === 409) {
              createToast({
                message: 'This stage name already exists, try a different one.',
                type: 'error',
              });
            } else {
              createToast({
                message: 'There was a problem updating the stage, please try again',
                type: 'error',
              });
            }
            setIsEditing(false);
          } else {
            setIsEditing(false);
            setError(null);
            setIsEdition(false);
            forceSelectedEntitiesCacheRefresh(['bobjectPicklistFieldValues']);
          }
        },
      });
    }
  };

  useEffect(() => {
    if (stageValue && error) {
      setError(null);
    }
  }, [stageValue]);

  const deletePicklist = () => {
    setIsDeleting(true);
    handleDeleteEntity({
      id: stage?.id,
      entityName: 'bobjectPicklistFieldValues',
      label: 'Picklist value',
      callback: () => {
        handleDelete(stage?.id);
        forceSelectedEntitiesCacheRefresh(['bobjectPicklistFieldValues']);
        setConfirmDeleteModalOpen(false);
        setIsDeleting(false);
      },
    });
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      updatePicklist({
        value: stageValue,
      });
      if (ref) {
        // @ts-ignore
        ref.current.blur();
      }
    }
  };

  return (
    <>
      <EntityCardItem>
        <>
          <Icon name="dragAndDrop" size={24} color="softPeanut" />
          <div className={styles._color__picker}>
            <ColorPicker
              size={24}
              type="hex"
              defaultValue={{
                charColor: charsColor,
                color: pillColor,
              }}
              onChange={({ color, charColor }) => {
                updatePicklist({
                  backgroundColor: color,
                  textColor: charColor,
                });
                setCharsColor(charColor);
                setPillColor(color);
              }}
              displayColors={Object.values(colors)}
            />
          </div>
        </>
      </EntityCardItem>
      <EntityCardItem>
        <Input
          width="300px"
          transparent={!isEdition}
          innerRef={ref}
          value={stageValue}
          error={error}
          onFocus={() => setIsEdition(true)}
          onChange={setStageValue}
          onBlur={() => {
            updatePicklist({
              value: stageValue,
            });
          }}
          onKeyPress={handleKeyPress}
          size="small"
        />
      </EntityCardItem>
      <EntityCardItem>
        <Label
          overrideStyle={{
            backgroundColor: pillColor,
            borderColor: pillColor,
          }}
          uppercase={false}
        >
          <Text
            size="xs"
            align="center"
            color={charsColor === '#ffffff' ? 'white' : 'peanut'}
            className={styles._status_value}
            ellipsis={23}
          >
            {stageValue}
          </Text>
        </Label>
      </EntityCardItem>
      <EntityCardItem>
        {isEdition ? (
          <Input
            width="80px"
            transparent={false}
            innerRef={ref}
            value={weightedPercentage}
            error={error}
            onFocus={() => setIsEdition(true)}
            onChange={updateWeightedPercentage}
            onBlur={() => {
              updatePicklist(
                weightedPercentage !== undefined
                  ? { weightedPercentage }
                  : { weightedPercentage: '' },
              );
            }}
            onKeyPress={event => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
              handleKeyPress(event);
            }}
            size="medium"
            type="number"
          />
        ) : (
          <Input
            width="80px"
            transparent
            innerRef={ref}
            value={!!weightedPercentage || weightedPercentage === 0 ? weightedPercentage + '%' : ''}
            onClick={() => setIsEdition(true)}
            size="medium"
            type="text"
          />
        )}
      </EntityCardItem>
      <EntityCardItem>
        <Checkbox
          color="white"
          checked={checked}
          onClick={value => {
            updatePicklist({
              nurturingStage: value,
            });
            setChecked(value);
          }}
          backgroundColor="purple"
        />
      </EntityCardItem>
      <EntityCardItem size="small">
        {isEdition ? (
          <>
            <Button
              size="small"
              color="purple"
              disabled={isEditing}
              onClick={() =>
                updatePicklist({
                  value: stageValue,
                })
              }
            >
              SAVE
            </Button>
            <IconButton
              name="undoRevert"
              color="purple"
              onClick={() => {
                if (ref) {
                  // @ts-ignore
                  ref.current.blur();
                }
                setStageValue(stage?.value);
                setIsEdition(false);
              }}
              size={24}
            />
          </>
        ) : (
          <>
            <Tooltip
              title={!!stage?.logicRole && "You can't disable a system stage"}
              position="top"
            >
              <Switch
                disabled={!!stage?.logicRole}
                color="purple"
                checked={enabled}
                onChange={v => {
                  setEnabled(v);
                  updatePicklist({
                    enabled: v,
                  });
                }}
              />
            </Tooltip>
            <IconButton name="edit" onClick={() => setIsEdition(true)} color="purple" size={24} />
            <Tooltip title={!!stage?.logicRole && "You can't delete a system stage"} position="top">
              <IconButton
                name="trashFull"
                color="purple"
                size={24}
                disabled={!!stage?.logicRole}
                onClick={() => setConfirmDeleteModalOpen(true)}
              />
            </Tooltip>
          </>
        )}
        {confirmDeleteModalOpen && (
          <ConfirmDeleteModalLayout
            icon={undefined}
            assetLabel={'Stage'}
            isDeleting={isDeleting}
            handleDelete={deletePicklist}
            handleClose={() => setConfirmDeleteModalOpen(false)}
            variant={undefined}
            colorSchema={{
              verySoft: 'verySoftPurple',
              light: 'lightPurple',
            }}
          >
            <Text size="m">
              This action cannot be undone. If you discard changes, you will lost the stage and you
              will have to create it again.
            </Text>
            <Text size="m">Are you sure you want to continue?</Text>
          </ConfirmDeleteModalLayout>
        )}
      </EntityCardItem>
    </>
  );
};
