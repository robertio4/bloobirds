import React, { useMemo, useState } from 'react';

import { Button, CircularBadge, Icon, IconButton } from '@bloobirds-it/flamingo-ui';
import { randomizeColor, randomizeColorNameN } from '@bloobirds-it/utils';

import { EntityCardItem } from '../../../../../../components/entityList/entityCard/entityCard';
import { useEntity } from '../../../../../../hooks';
import { SuggestedTargetMarket } from '../../../../../../hooks/useCopilot';
import { useOpenTargetMarketModal } from '../../../../../../hooks/useSteppableModal';
import styles from '../../../businessAssetsPage.module.css';

export const SuggestedTargetMarketCard = ({
  targetMarket,
}: {
  targetMarket: SuggestedTargetMarket;
}) => {
  const [discard, setDiscard] = useState<boolean>(false);

  const { handleOpenCreateEditModal } = useOpenTargetMarketModal();
  const generateShortName = (value: string) => {
    const shortNameLetters = value.replace(/[^a-zA-Z ]/g, ' ').split(' ');
    return shortNameLetters.length >= 2
      ? shortNameLetters[0].slice(0, 1).toUpperCase() +
          shortNameLetters[1].slice(0, 1).toUpperCase()
      : shortNameLetters[0].slice(0, 2).toUpperCase();
  };

  const cadence = useEntity('cadences')?.findBy('id')(targetMarket.content.cadence);

  const acceptSuggestion = () => {};

  const rejectSuggestion = () => {};

  const randomColor = useMemo(() => randomizeColor(), []);
  return (
    <>
      <EntityCardItem size="small">
        <Icon name="stars" size={24} color="white" gradient />
        <CircularBadge size="medium" backgroundColor={randomColor} color="white">
          {generateShortName(targetMarket.content.name)}
        </CircularBadge>
      </EntityCardItem>
      <EntityCardItem>{targetMarket.content.name}</EntityCardItem>
      <EntityCardItem>{cadence?.name}</EntityCardItem>
      <EntityCardItem>{targetMarket?.content.description}</EntityCardItem>
      <EntityCardItem>{}</EntityCardItem>
      <EntityCardItem>
        <span className={styles._status__span}>
          <Button
            color="purple"
            size="small"
            onClick={() =>
              handleOpenCreateEditModal({
                isCreationType: true,
                targetMarket: {
                  name: targetMarket.content.name,
                  description: targetMarket.content.description,
                  color: randomColor,
                  defaultCadence: cadence?.name,
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
