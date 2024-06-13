import React from 'react';

import { Spinner, useToasts } from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys } from '@bloobirds-it/types';

import { useRouter } from '../../../../hooks';
import useQualifyingQuestion from '../../../../hooks/useQualifyingQuestion';
import { useQueryParam } from '../../../../hooks/useQueryParams';
import { useUserHelpers } from '../../../../hooks/useUserHelpers';
import {
  FORM_MODES,
  QQ_TYPES_MAP,
  TEMPLATE_TYPES,
  typeToUrl,
} from '../../../../utils/templates.utils';
import QualifyingQuestionTemplateFormView from './qualifyingQuestionTemplateForm.view';

const QualifyingQuestionTemplateFormContainer = () => {
  const { history } = useRouter();
  const id = useQueryParam('id');
  const formMode = useQueryParam('mode');

  const { createToast } = useToasts();
  const { isLoading, qualifyingQuestion, saveQualifyingQuestion } = useQualifyingQuestion(id);
  const { save } = useUserHelpers();

  if (formMode === FORM_MODES.EDITION && isLoading) {
    return <Spinner name="loadingCircle" />;
  }
  if (formMode === FORM_MODES.CLONE && isLoading) {
    return <Spinner name="loadingCircle" />;
  }

  const goBack = () => {
    history.push(typeToUrl(TEMPLATE_TYPES.QUALIFYING_QUESTION));
  };

  return (
    <QualifyingQuestionTemplateFormView
      existingQQ={qualifyingQuestion}
      mode={formMode}
      onCancel={goBack}
      onSave={async body => {
        try {
          await saveQualifyingQuestion(body);
          createToast({ type: 'success', message: 'Qualifying question saved successfully' });
          save(UserHelperKeys.DEFINE_QQ);
          goBack();
        } catch (error) {
          if (error.response.status === 409) {
            createToast({
              type: 'error',
              message: `Qualifying question with name "${body.question}" already exists`,
            });
          } else if (error.response.status === 411) {
            createToast({
              type: 'error',
              message: 'The name of the qualifying question is too long',
            });
          } else {
            createToast({ type: 'error', message: 'Something went wrong' });
          }
        }
      }}
    />
  );
};

export default QualifyingQuestionTemplateFormContainer;
