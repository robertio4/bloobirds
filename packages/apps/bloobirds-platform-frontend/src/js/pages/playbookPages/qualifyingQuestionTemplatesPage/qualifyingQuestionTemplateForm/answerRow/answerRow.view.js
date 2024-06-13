import React from 'react';
import { Controller } from 'react-hook-form';

import { Input } from '@bloobirds-it/flamingo-ui';

import styles from '../qualifyingQuestionTemplateForm.module.css';

const AnswerRow = ({ control, type, index, answer, register, errors, left, right }) => {
  const answerBaseName = `${type}Answers[${index}]`;

  return (
    <div className={styles._answerRow__container}>
      <input
        name={`${answerBaseName}.order`}
        defaultValue={answer.order}
        hidden
        ref={register({ type: 'numeral' })}
      />
      <input
        name={`${answerBaseName}.enabled`}
        defaultValue={answer.enabled}
        hidden
        ref={register()}
      />
      <input name={`${answerBaseName}.id`} defaultValue={answer.id} hidden ref={register()} />
      {left}
      <Controller
        name={`${answerBaseName}.value`}
        as={Input}
        error={errors[`${type}Answers`]?.[index]?.value?.message}
        control={control}
        rules={{ required: 'Each answer must have a value' }}
        placeholder="Answer"
        width="360px"
        defaultValue={answer.value}
      />
      <Controller
        name={`${answerBaseName}.score`}
        as={Input}
        error={errors[`${type}Answers`]?.[index]?.score?.message}
        type="number"
        control={control}
        placeholder="Score"
        width="132px"
        defaultValue={answer.score}
      />
      {right}
    </div>
  );
};

export default AnswerRow;
