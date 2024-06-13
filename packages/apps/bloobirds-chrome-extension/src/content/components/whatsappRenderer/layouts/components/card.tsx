import { Button, Icon, Text, useHover } from '@bloobirds-it/flamingo-ui';
import {
  Bobject,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  ContactViewSubTab,
  ExtensionOpportunity,
  LEAD_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { getTextFromLogicRole, parseAmount, updateBobject } from '@bloobirds-it/utils';

import { useExtensionContext } from '../../../context';
import styles from './card.module.css';

const WhatsappBobjectCard = ({
  bobject,
  isLinkMode = false,
  phoneNumber,
  onSelect,
}: {
  //Bobject<BobjectTypes.Lead> | SearchBobjectType
  bobject: Bobject | ExtensionOpportunity;
  isLinkMode?: boolean;
  phoneNumber?: string;
  onSelect?: (bobjectId: string) => void;
}) => {
  const {
    setContactViewBobjectId,
    setWhatsappLead,
    setNoMatchFound,
    setForcedActiveSubTab,
  } = useExtensionContext();

  const isOpportunity =
    bobject?.id?.typeName === BobjectTypes.Opportunity ||
    bobject?.bobjectType === BobjectTypes.Opportunity;
  const isCompany =
    bobject?.id?.typeName === BobjectTypes.Company || bobject?.bobjectType === BobjectTypes.Company;

  const name =
    bobject?.name ??
    bobject.fullName ??
    (isCompany
      ? getTextFromLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.NAME)
      : getTextFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME));
  const jobTitle =
    bobject.jobTitle ?? getTextFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.JOB_TITLE);
  const amount = bobject?.amount;
  const phone =
    bobject.phone ??
    (isCompany
      ? getTextFromLogicRole(bobject, 'COMPANY__GENERIC_PHONE')
      : getTextFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.PHONE));
  let companyName = bobject.companyName;
  if (!companyName) {
    const companyId =
      bobject.company?.value ?? getTextFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.COMPANY);
    const companyBobject = bobject.referencedBobjects?.[companyId];
    companyName =
      companyBobject && getTextFromLogicRole(companyBobject, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  }
  const website = getTextFromLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.WEBSITE);

  const [ref, isHovering] = useHover();

  const handleSelect = () => {
    const bobjectId = bobject?.id?.value ?? bobject?.rawBobject?.id;
    setWhatsappLead({ id: bobjectId, name, number: phone ?? phoneNumber });
    setNoMatchFound(null);
    setContactViewBobjectId(bobjectId);
    setForcedActiveSubTab(ContactViewSubTab.ACTIVITIES);
    onSelect?.(bobjectId);
  };

  const handleLink = () => {
    handleSelect();

    // Edit the lead's number phone
    const bobjectId = bobject?.id?.value ?? bobject?.rawBobject?.id;
    updateBobject(bobjectId, { LEAD__PHONE: phoneNumber });
  };

  const iconName = isOpportunity ? 'fileOpportunity' : isCompany ? 'company' : 'person';

  return (
    <div className={styles.bobjectItemCompressed} ref={ref}>
      <div className={styles.circleIcon}>
        <Icon name={iconName} size={20} color="bloobirds" />
      </div>
      <div className={styles.bobjectItemContent}>
        <div className={styles.bobjectItemName}>
          <Text size="s" color="bloobirds" className={styles.bobjectItemContentSpan}>
            <span dangerouslySetInnerHTML={{ __html: name }} />
          </Text>
        </div>
        <div className={styles.bobjectItemContentInfoRow}>
          {(jobTitle || website) && (
            <Text size="xs" color="softPeanut" className={styles.bobjectItemContentSpan}>
              {jobTitle || website}
            </Text>
          )}
          {amount && (
            <Text size="xs" color="softPeanut" className={styles.bobjectItemContentSpan}>
              {parseAmount(amount)}
            </Text>
          )}
          {companyName && (
            <div
              className={styles.bobjectItemContentInfoColumn}
              style={{ maxWidth: phone ? '33%' : '50%' }}
            >
              <div className={styles.bobjectItemContentInfoRowSeparator}>
                {jobTitle && <Icon name={'circle'} size={15} color={'softPeanut'} />}
                <Icon name={'company'} size={15} color={'bloobirds'} />
              </div>

              <Text size="xs" color="bloobirds" className={styles.bobjectItemContentSpan}>
                {companyName}
              </Text>
            </div>
          )}
          {phone && (
            <div
              className={styles.bobjectItemContentInfoColumn}
              style={{ maxWidth: companyName ? '33%' : '50%' }}
            >
              {(jobTitle || website || companyName) && (
                <Icon name={'circle'} size={15} color={'softPeanut'} />
              )}
              <Text size="xs" weight="bold" className={styles.bobjectItemContentSpan}>
                {phone}
              </Text>
            </div>
          )}
        </div>
      </div>
      {isHovering && (
        <div className={styles.hoverButtons}>
          {isLinkMode && phoneNumber ? (
            <Button iconLeft="arrowRight" size="small" onClick={handleLink} uppercase={false}>
              Link
            </Button>
          ) : (
            <Button iconLeft="arrowRight" size="small" onClick={handleSelect} uppercase={false}>
              Select
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default WhatsappBobjectCard;
