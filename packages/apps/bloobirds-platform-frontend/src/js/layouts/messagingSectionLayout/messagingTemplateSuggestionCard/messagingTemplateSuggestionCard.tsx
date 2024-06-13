import React, { useState } from 'react';

import { Button, Icon, IconButton, Text } from '@bloobirds-it/flamingo-ui';
import { SuggestedQualifyingQuestion } from '@bloobirds-it/hooks';
import classNames from 'classnames';
import { capitalize } from 'lodash';

import { APP_PLAYBOOK_MESSAGING_QQ_FORM } from '../../../app/_constants/routes';
import { useRouter } from '../../../hooks';
import { FORM_MODES } from '../../../utils/templates.utils';
import styles from '../messagingTemplateCard/messagingTemplateCard.module.css';

export const MessagingTemplateSuggestionCard = ({
  qualifyingQuestion,
}: {
  qualifyingQuestion: SuggestedQualifyingQuestion;
}) => {
  const [discard, setDiscard] = useState<boolean>(false);
  const { history } = useRouter();

  return (
    <div className={classNames(styles._container, styles._suggestion)}>
      <div className={styles._icon__container}>
        <Icon name="stars" gradient size={24} />
      </div>
      <div className={styles._suggestion_metadata}>
        <Text color="peanut" weight="medium" size="m">
          {qualifyingQuestion.content.name}
        </Text>
        <div className={styles._suggestion_type}>
          <Text size="s" color="peanut" weight="medium">
            Type:
          </Text>
          <Text size="s" color="peanut">
            {capitalize(qualifyingQuestion.content.type)}
          </Text>
          <Text size="s" color="peanut" weight="medium">
            Values:
          </Text>
          <Text size="s" color="peanut">
            {qualifyingQuestion.content.type !== 'text' &&
              qualifyingQuestion.content.choices.join(', ')}
          </Text>
        </div>
      </div>
      <div className={styles._suggestion_actions}>
        <Button
          size="small"
          color="purple"
          onClick={e => {
            history.push(
              `${APP_PLAYBOOK_MESSAGING_QQ_FORM}?mode=${FORM_MODES.CREATION}&suggestion=${qualifyingQuestion?.pk}`,
              {
                event: e,
              },
            );
          }}
        >
          Save
        </Button>
        {!discard && (
          <IconButton name="cross" color="purple" size={24} onClick={() => setDiscard(true)} />
        )}
        {discard && (
          <span>
            <IconButton name="thumbsUp" color="purple" size={24} />
            <IconButton name="thumbsDown" color="purple" size={24} />
          </span>
        )}
      </div>
    </div>
  );
};
