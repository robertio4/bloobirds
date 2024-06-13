import { useState } from 'react';

import { Bobject } from '@bloobirds-it/types';
import { getSobjectIdLogicRoleFromId } from '@bloobirds-it/utils';

import { MultipleBobjectsLayout } from './multipleBobjectsLayout';

export const DuplicatedBobjectsPage = ({
  bobjects,
  sobjectId,
}: {
  bobjects: Bobject[];
  sobjectId: string;
}) => {
  const searchValueController = useState('');
  const sobjectLogicRole = getSobjectIdLogicRoleFromId(sobjectId);

  return (
    <MultipleBobjectsLayout>
      <MultipleBobjectsLayout.Header />
      <MultipleBobjectsLayout.List
        bobjects={bobjects}
        searchValueController={searchValueController}
        itemExtraProps={{
          dataToUpdate: { [sobjectLogicRole]: sobjectId },
        }}
      />
    </MultipleBobjectsLayout>
  );
};
