import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  ColorPicker,
  Icon,
  IconButton,
  Input,
  Label,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import {
  EntityCard,
  EntityCardItem,
} from '../../../../components/entityList/entityCard/entityCard';
import { colors } from '../utils/colors';
import styles from './newStageCard.module.css';
import { useStageCreation } from '../hooks/useStageCreation';
import { useEntityActions } from '../../../../hooks/entities/useEntityActions';
import { useUserSettings } from '../../../../components/userPermissions/hooks';
import { forceSelectedEntitiesCacheRefresh } from '../../../../hooks/entities/useEntity.utils';

export const NewStageCard = ({
  addStage,
  bobjectFieldId,
}: {
  addStage: (stage: any) => void;
  bobjectFieldId: string;
}) => {
  const [stageValue, setStageValue] = useState<string>();
  const [charsColor, setCharsColor] = useState<string>('#464f57');
  const [pillColor, setPillColor] = useState<string>('#edf1f5');
  const [checked, setChecked] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { setStageCreation } = useStageCreation();
  const { handleCreateEntity } = useEntityActions();
  const settings = useUserSettings();
  const { createToast } = useToasts();

  const createPicklist = () => {
    if (!stageValue) {
      setError('You should fill a stage name!');
    } else {
      setIsCreating(true);
      const stage = {
        value: stageValue,
        backgroundColor: pillColor,
        textColor: charsColor,
        borderColor: pillColor,
        nurturingStage: checked,
        enabled: true,
        account: `/accounts/${settings.account.id}`,
        bobjectField: `/bobjectFields/${bobjectFieldId}`,
        ordering: -1,
        score: 0,
      };
      handleCreateEntity({
        entityName: 'bobjectPicklistFieldValues',
        label: 'picklist',
        body: stage,
        callback: (res: any) => {
          if (res?.error) {
            if (res.response.status === 409) {
              createToast({
                message: 'This stage name already exists, try a different one.',
                type: 'error',
              });
            } else {
              createToast({
                message: 'There was a problem creating the stage, please try again',
                type: 'error',
              });
            }
            setIsCreating(false);
          } else {
            setIsCreating(false);
            forceSelectedEntitiesCacheRefresh(['bobjectPicklistFieldValues']);
            setStageCreation(false);
            const stageWithId = { ...stage, id: res?.response.id };
            addStage(stageWithId);
          }
        },
      });
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      createPicklist();
    }
  };

  useEffect(() => {
    if (stageValue && error) {
      setError(null);
    }
  }, [stageValue]);

  return (
    <EntityCard>
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
          size="small"
          value={stageValue}
          onChange={setStageValue}
          onKeyPress={handleKeyPress}
          autoFocus={true}
          error={error}
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
            color="peanut"
            className={styles._status_value}
            ellipsis={23}
            uppercase={false}
          >
            {stageValue || 'opportunity stage name'}
          </Text>
        </Label>
      </EntityCardItem>
      <EntityCardItem>
        <Checkbox
          color="white"
          checked={checked}
          onClick={setChecked}
          backgroundColor="bloobirds"
        />
      </EntityCardItem>
      <EntityCardItem size="small">
        <Button size="small" color="purple" disabled={isCreating} onClick={createPicklist}>
          SAVE
        </Button>
        <IconButton
          name="undoRevert"
          color="purple"
          onClick={() => setStageCreation(false)}
          size={24}
        />
      </EntityCardItem>
    </EntityCard>
  );
};
