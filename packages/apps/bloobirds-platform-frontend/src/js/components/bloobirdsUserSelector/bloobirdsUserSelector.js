import React, { useMemo } from 'react';

import { Item, Select } from '@bloobirds-it/flamingo-ui';
import useSWR from 'swr';

import { useActiveUser } from '../../hooks';
import { useBobjectFields } from '../../hooks/useBobjectFields';
import { api } from '../../utils/api';
import { BobjectTypes } from "@bloobirds-it/types";

const BloobirdsUserSelector = props => {
  const { activeAccount } = useActiveUser();

  const { data: bloobirdsUsers } = useSWR('/entities/users', () =>
    api.get('/entities/users', { params: { accountId: activeAccount.id } }).then(res => res.data),
  );
  let fieldUsers = undefined;
  if (props?.fieldUsers) {
    const fields = useBobjectFields(BobjectTypes.Company)?.sections?.reduce(
      (acc, section) => [...acc, ...section.fields],
      [],
    );
    fieldUsers = fields?.find(field => field?.label === props?.fieldUsers)?.fieldValues;
  }

  const mappedBloobirdsUsers = useMemo(
    () =>
      bloobirdsUsers?._embedded.users.map(bloobirdsUser => (
        <Item key={bloobirdsUser.id} value={bloobirdsUser.id} label={bloobirdsUser.name}>
          {bloobirdsUser.name}
        </Item>
      )),
    [bloobirdsUsers],
  );

  const mappedFieldUsers = useMemo(
    () =>
      fieldUsers?.map(fieldValue => (
        <Item key={fieldValue.value} value={fieldValue.value} label={fieldValue.label}>
          {fieldValue?.label}
        </Item>
      )),
    [fieldUsers],
  );

  return (
    <Select placeholder={props.fieldUsers ? props.fieldUsers : 'Bloobirds Users'} {...props}>
      <Item value={''}> None </Item>
      {props.fieldUsers ? mappedFieldUsers : mappedBloobirdsUsers}
    </Select>
  );
};

export default BloobirdsUserSelector;
