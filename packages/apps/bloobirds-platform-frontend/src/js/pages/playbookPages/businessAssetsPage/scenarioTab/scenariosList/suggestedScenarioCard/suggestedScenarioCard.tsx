import React, { useMemo, useState } from 'react';

import { Button, CircularBadge, Icon, IconButton } from '@bloobirds-it/flamingo-ui';
import { randomizeColor } from '@bloobirds-it/utils';

import { EntityCardItem } from '../../../../../../components/entityList/entityCard/entityCard';
import { SuggestedScenario } from '../../../../../../hooks/useCopilot';
import { useOpenScenarioModal } from '../../../../../../hooks/useSteppableModal';
import styles from '../../../businessAssetsPage.module.css';

export const SuggestedScenarioCard = ({ scenario }: { scenario: SuggestedScenario }) => {
  const [discard, setDiscard] = useState<boolean>(false);
  const { handleOpenCreateEditModal } = useOpenScenarioModal();
  const generateShortName = (value: string) => {
    const shortNameLetters = value.replace(/[^a-zA-Z ]/g, ' ').split(' ');
    return shortNameLetters.length >= 2
      ? shortNameLetters[0].slice(0, 1).toUpperCase() +
          shortNameLetters[1].slice(0, 1).toUpperCase()
      : shortNameLetters[0].slice(0, 2).toUpperCase();
  };

  const acceptSuggestion = () => {};

  const rejectSuggestion = () => {};

  const randomColor = useMemo(() => randomizeColor(), []);

  return (
    <>
      <EntityCardItem size="small">
        <Icon name="stars" size={24} color="white" gradient />
        <CircularBadge size="medium" backgroundColor={randomColor} color="white">
          {generateShortName(scenario.content.name)}
        </CircularBadge>
      </EntityCardItem>
      <EntityCardItem>{scenario.content.name}</EntityCardItem>
      <EntityCardItem>{scenario?.content.description}</EntityCardItem>
      <EntityCardItem>
        <span className={styles._status__span}>
          <Button
            color="purple"
            size="small"
            onClick={() =>
              handleOpenCreateEditModal({
                isCreationType: true,
                scenario: {
                  name: scenario?.content.name,
                  color: randomColor,
                  description: scenario.content.description,
                },
              })
            }
          >
            Save
          </Button>
          {!discard && (
            <IconButton name="cross" color="purple" size={24} onClick={() => setDiscard(true)} />
          )}
          {discard && (
            <span>
              <IconButton name="thumbsUp" color="purple" size={24} onClick={acceptSuggestion} />
              <IconButton name="thumbsDown" color="purple" size={24} onClick={rejectSuggestion} />
            </span>
          )}
        </span>
      </EntityCardItem>
    </>
  );
};
