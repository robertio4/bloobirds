import React, { useMemo, useState } from 'react';

import { Button, CircularBadge, Icon, IconButton } from '@bloobirds-it/flamingo-ui';
import { deserialize } from '@bloobirds-it/rich-text-editor';
import { randomizeColor } from '@bloobirds-it/utils';

import { EntityCardItem } from '../../../../../../components/entityList/entityCard/entityCard';
import { useEntity } from '../../../../../../hooks';
import { SuggestedBuyerPersona } from '../../../../../../hooks/useCopilot';
import { useOpenBuyerPersonaModal } from '../../../../../../hooks/useSteppableModal';
import styles from '../../../businessAssetsPage.module.css';

export const SuggestedBuyerPersonaCard = ({
  buyerPersona,
}: {
  buyerPersona: SuggestedBuyerPersona;
}) => {
  const [discard, setDiscard] = useState<boolean>(false);
  const { handleOpenCreateEditModal } = useOpenBuyerPersonaModal();
  const generateShortName = (value: string) => {
    const shortNameLetters = value.replace(/[^a-zA-Z ]/g, ' ').split(' ');
    return shortNameLetters.length >= 2
      ? shortNameLetters[0].slice(0, 1).toUpperCase() +
          shortNameLetters[1].slice(0, 1).toUpperCase()
      : shortNameLetters[0].slice(0, 2).toUpperCase();
  };

  const cadence = useEntity('cadences')?.findBy('id')(buyerPersona.content.cadence);

  const acceptSuggestion = () => {};

  const rejectSuggestion = () => {};

  const randomColor = useMemo(() => randomizeColor(), []);

  return (
    <>
      <EntityCardItem size="small">
        <Icon name="stars" size={24} color="white" gradient />
        <CircularBadge size="medium" backgroundColor={randomColor} color="white">
          {generateShortName(buyerPersona.content.name)}
        </CircularBadge>
      </EntityCardItem>
      <EntityCardItem>{buyerPersona.content.name}</EntityCardItem>
      <EntityCardItem>{cadence?.name}</EntityCardItem>
      <EntityCardItem>{buyerPersona?.content.description}</EntityCardItem>
      <EntityCardItem>{}</EntityCardItem>
      <EntityCardItem>
        <span className={styles._status__span}>
          <Button
            color="purple"
            size="small"
            onClick={() =>
              handleOpenCreateEditModal({
                isCreationType: true,
                buyerPersona: {
                  name: buyerPersona.content.name,
                  color: randomColor,
                  description: buyerPersona.content.description,
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
