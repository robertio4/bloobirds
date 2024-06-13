import { default as React, FC, useLayoutEffect, useMemo, useRef, useState } from 'react';

import {
  Button,
  CircularBadge,
  Icon,
  IconButton,
  Label,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import clsx from 'clsx';

import { leadUrl } from '../../../../app/_constants/routes';
import BobjectName from '../../../../components/bobjectName';
import { SalesLabel } from '../../../../components/salesLabel/salesLabel';
import {
  LEAD_FIELDS_LOGIC_ROLE,
  LEAD_HIGH_PRIORITY_LOGIC_ROLE,
  LEAD_STAGE_LOGIC_ROLE,
} from '../../../../constants/lead';
import {
  useBobjectDetails,
  useBobjectFormVisibility,
  useEntity,
  useHover,
  useRouter,
} from '../../../../hooks';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import { useSelectedLead } from '../../../../hooks/useSelectedLead';
import {
  getFieldByLogicRole,
  getOpportunityNamesFromLead,
  getOpportunityNamesTitle,
  getValueFromLogicRole,
} from '../../../../utils/bobjects.utils';
import { ellipsis } from '../../../../utils/strings.utils';
import { useContactBobjects } from '../../contactPageContext';
import styles from './leadsDropdown.module.css';

interface LeadCardProps {
  lead: any;
  toggleDropdownVisibility: () => void;
}

interface LeadsDropdownProps {
  toggleVisibility: () => void;
  leads: any[];
}

interface LeadICP {
  name: string;
  color: string;
  shortname: string;
}

const LeadCard: FC<LeadCardProps> = ({ lead, toggleDropdownVisibility }) => {
  const { history } = useRouter();
  const idealCustomerProfiles = useEntity('idealCustomerProfiles');
  const users = useEntity('users');
  const [leadICP, setLeadICP] = useState<LeadICP>();
  const { updateSelectedLead } = useSelectedLead();
  const { openBobjectDetails } = useBobjectDetails();
  const { openEditModal } = useBobjectFormVisibility();
  const { isSmallDesktop } = useMediaQuery();
  const divRef = useRef();
  const [, isHover] = useHover(divRef);
  const { opportunities } = useContactBobjects();
  const hasSalesEnabled = useFullSalesEnabled();

  const parsedLead = useMemo(
    () => ({
      assignedTo: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO),
      buyerPersona: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ICP),
      nameField: getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME),
      stage: getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.STAGE),
      status: getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.STATUS),
      salesStatus: getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS),
      company: getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.COMPANY),
      highPriority: getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.HIGH_PRIORITY),
      linkedinRole: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.LINKEDIN_JOB_TITLE),
      opportunity: getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.OPPORTUNITY),
      linkedinUrl: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.LINKEDIN_URL),
    }),
    [lead],
  );
  const isHighPriority =
    parsedLead.highPriority.valueLogicRole === LEAD_HIGH_PRIORITY_LOGIC_ROLE.YES;
  const cardUser = users ? users.get(parsedLead.assignedTo) : {};
  const leadIsInSalesStage = parsedLead.stage.valueLogicRole === LEAD_STAGE_LOGIC_ROLE.SALES;
  const leadStatus = leadIsInSalesStage ? parsedLead.salesStatus : parsedLead.status;

  const opportunityNames = useMemo(() => {
    return getOpportunityNamesFromLead(opportunities, lead);
  }, [parsedLead.opportunity]);

  useLayoutEffect(() => {
    if (idealCustomerProfiles && !leadICP) {
      setLeadICP(idealCustomerProfiles.get(parsedLead.buyerPersona));
    }
  }, [idealCustomerProfiles, leadICP]);

  return (
    <div
      data-test={`lead-${parsedLead.nameField.text}`}
      className={styles._card__container}
      onClick={() => {
        history.push(leadUrl(lead, parsedLead.company));
        updateSelectedLead(lead);
        toggleDropdownVisibility();
      }}
    >
      <div className={styles._card__column} ref={divRef}>
        {leadICP ? (
          <Tooltip title={leadICP.name} trigger="hover" position="top">
            <CircularBadge
              size="medium"
              style={{
                backgroundColor: leadICP.color || 'var(--verySoftPeanut)',
                color: 'white',
              }}
            >
              {leadICP.shortname || ''}
            </CircularBadge>
          </Tooltip>
        ) : (
          <CircularBadge
            size="medium"
            style={{
              backgroundColor: 'var(--verySoftPeanut)',
              color: 'white',
              fontSize: 20,
            }}
          >
            ?
          </CircularBadge>
        )}
        <div
          className={clsx(styles._name__container, { [styles._name__container_hover]: isHover })}
        >
          <BobjectName
            field={parsedLead.nameField}
            bobject={lead}
            type={BOBJECT_TYPES.LEAD}
            toggleDropdown={toggleDropdownVisibility}
            canEdit={false}
          />
          <Text
            size="xs"
            color="softPeanut"
            ellipsis={28}
            className={clsx({ [styles._linkedinRole__container]: isHover })}
          >
            {parsedLead.linkedinRole}
          </Text>
        </div>
        {isHover && (
          <div className={styles._hover_buttons_wrapper}>
            <IconButton
              name="edit"
              size={16}
              onClick={e => {
                e.stopPropagation();
                openEditModal({ bobject: lead });
                toggleDropdownVisibility();
              }}
            />
            <div className={styles._preview__button__wrapper}>
              <Button
                onClick={e => {
                  e.stopPropagation();
                  openBobjectDetails({ id: lead?.id.value });
                  toggleDropdownVisibility();
                }}
                size="small"
                variant="secondary"
                uppercase={false}
                iconLeft={isSmallDesktop ? 'eye' : null}
              >
                {isSmallDesktop ? '' : 'Preview'}
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className={styles._card__status}>
        {opportunityNames && opportunityNames?.length > 0 && (
          <div className={styles._icon__container}>
            <Tooltip title={getOpportunityNamesTitle(opportunityNames)} position="top">
              <Icon name="fileOpportunity" size={18} color="softPeanut" />
            </Tooltip>
          </div>
        )}
        {isHighPriority && (
          <div className={styles._icon__container}>
            <Tooltip title="High priority" position="top">
              <Icon name="zap" size={18} color="banana" />
            </Tooltip>
          </div>
        )}
        {parsedLead.linkedinUrl && (
          <div
            className={styles._icon__container}
            onClick={() => window.open(parsedLead.linkedinUrl, '_blank')}
          >
            <Tooltip title="LinkedIn profile" position="top">
              <Icon name="linkedin" size={18} color="darkBloobirds" />
            </Tooltip>
          </div>
        )}
        {parsedLead.assignedTo && (
          <div className={styles._icon__container}>
            <Tooltip title={cardUser?.name} position="top">
              <CircularBadge
                size="s"
                backgroundColor={cardUser?.color || 'lightPeanut'}
                style={{
                  border: 'var(--white)',
                  color: 'var(--white)',
                  fontSize: '9px',
                }}
              >
                {cardUser?.shortname || 'U'}
              </CircularBadge>
            </Tooltip>
          </div>
        )}
        {hasSalesEnabled && (
          <SalesLabel
            isSalesStage={leadIsInSalesStage}
            contracted
            overrideStyle={{ marginRight: '8px' }}
          />
        )}
        {leadStatus.text && (
          <Label
            overrideStyle={{
              color: leadStatus.valueTextColor,
              backgroundColor: leadStatus.valueBackgroundColor,
              borderColor: leadStatus.valueBackgroundColor,
            }}
          >
            {ellipsis(leadStatus.text, 26)}
          </Label>
        )}
      </div>
    </div>
  );
};

const LeadsDropdown: FC<LeadsDropdownProps> = ({ toggleVisibility, leads }) => {
  return (
    <div className={styles._dropdown__container}>
      {leads && leads?.length > 0 && (
        <>
          <div className={styles._header__container}>
            <Text uppercase size="s" color="softPeanut">
              Leads
            </Text>
          </div>
          {leads?.map((lead: any) => (
            <LeadCard lead={lead} toggleDropdownVisibility={toggleVisibility} key={lead.id.value} />
          ))}
        </>
      )}
    </div>
  );
};

export default LeadsDropdown;
