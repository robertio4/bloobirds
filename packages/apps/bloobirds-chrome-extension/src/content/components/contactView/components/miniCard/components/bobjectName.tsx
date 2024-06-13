import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import {
  Bobject,
  BobjectTypes,
  FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  MainBobjectTypes,
} from '@bloobirds-it/types';
import { getMainBobjectIcon, getTextFromLogicRole } from '@bloobirds-it/utils';

import { ContactViewTab } from '../../../../../../types/contactView';
import { useExtensionContext } from '../../../../context';
import { useContactViewContext } from '../../../context/contactViewContext';
import styles from '../miniCard.module.css';

export const BobjectName = ({
  bobject,
  style,
  isBold,
}: {
  bobject: Bobject<MainBobjectTypes>;
  style?: Record<string, string>;
  isBold: boolean;
}) => {
  const { setActiveTab } = useContactViewContext();
  const { setActiveBobject, useGetActiveBobjectContext } = useExtensionContext();
  const data = useGetActiveBobjectContext();
  const bobjectType = bobject?.id?.typeName;
  const bobjectNameText = getTextFromLogicRole(
    bobject,
    bobjectType === BobjectTypes.Company || bobjectType === BobjectTypes.Opportunity
      ? FIELDS_LOGIC_ROLE[bobjectType]?.NAME
      : LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
  );

  const handleClick = () => {
    let bobjectToRedirect;
    switch (bobjectType) {
      case BobjectTypes.Company:
        bobjectToRedirect = data?.company;
        break;
      case BobjectTypes.Lead:
        bobjectToRedirect = data?.leads?.find(l => l?.id?.value === bobject?.id?.value);
        break;
      case BobjectTypes.Opportunity:
        bobjectToRedirect = data?.opportunities?.find(o => o?.id?.value === bobject?.id?.value);
        break;
      default:
        break;
    }

    if (bobjectToRedirect) {
      setActiveBobject(bobjectToRedirect);
      setActiveTab(ContactViewTab[bobjectType?.toUpperCase()]);
    }
  };

  const icon = getMainBobjectIcon(bobjectType);

  return bobjectNameText ? (
    <span className={styles.leadName} style={style} onClick={handleClick}>
      <Icon name={icon} color="bloobirds" size={14} />
      <Text color="bloobirds" size="xs" weight={isBold ? 'bold' : 'regular'}>
        {bobjectNameText}
      </Text>
    </span>
  ) : (
    <></>
  );
};
