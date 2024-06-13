import { useTranslation } from 'react-i18next';

import {
  Text,
  Button,
  CircularBadge,
  Icon,
  Tooltip,
  Label,
  IconType,
} from '@bloobirds-it/flamingo-ui';
import { useUserSearch, useFullSalesEnabled } from '@bloobirds-it/hooks';
import { format } from 'date-fns';

import {
  LEAD_FIELDS_LOGIC_ROLE,
  LEAD_OPT_OUT_LOGIC_ROLE,
  LEAD_STAGE_LOGIC_ROLE,
} from '../../../constants/fields';
import { useBuyerPersonas } from '../../../hooks/useBuyerPersonas';
import { LinkedInLead } from '../../../types/entities';
import { createBloobirdsUrl } from '../../../utils/url';
import {
  BubbleWindow,
  BubbleWindowContent,
  BubbleWindowFooter,
  BubbleWindowHeaderCircularBadge,
} from '../bubbleWindow/bubbleWindow';
import { useExtensionContext } from '../context';
import { StatusLabel } from '../statusLabel/statusLabel';
import styles from './styles.module.css';

export interface LeadPageProps {
  lead: LinkedInLead;
}

export default (props: LeadPageProps): JSX.Element => {
  const { lead } = props;
  const {
    id,
    leadIcp,
    assignedTo,
    otherFields,
    optedOut,
    mrRating,
    highPriority,
    stage,
    prospectingStatus,
    salesStatus,
  } = lead;
  const { t } = useTranslation('translation', { keyPrefix: 'sidePeek.leadPage' });
  const leadUrl = createBloobirdsUrl(id);
  const hasSalesEnabled = useFullSalesEnabled(id?.accountId);
  const { useGetDataModel } = useExtensionContext();
  const dataModel = useGetDataModel();
  const prospectingStatusText = dataModel?.findValueById(prospectingStatus);
  const isSalesStage = dataModel?.findValueById(stage)?.logicRole === LEAD_STAGE_LOGIC_ROLE.SALES;
  const salesStatusText = dataModel?.findValueById(salesStatus);
  const status = isSalesStage ? salesStatusText : prospectingStatusText;
  const buyerPersonas = useBuyerPersonas();
  const users = useUserSearch();
  const leadUserAssignedTo = users?.users?.find(user => user?.id === assignedTo);
  const icp = buyerPersonas?.find(bp => bp?.id === leadIcp);
  const isOptOut = dataModel?.findValueById(optedOut)?.logicRole === LEAD_OPT_OUT_LOGIC_ROLE.YES;
  const mrRatingValue = dataModel?.findValueById(mrRating);
  const optOutTooltipText = t('optedOut');

  const onClick = () => {
    window.open(leadUrl, '_blank');
  };

  return (
    <BubbleWindow>
      <BubbleWindowHeaderCircularBadge
        title={icp?.shortName || '?'}
        backgroundColor={icp?.color || 'var(--verySoftPeanut)'}
        color="verySoftBloobirds"
        titleColor={icp?.color ? 'white' : 'darkBloobirds'}
        borderColor="white"
      />
      <BubbleWindowContent className={styles._textWrapperLeadPage}>
        <div className={styles._extraInfoContainer}>
          {highPriority && <Icon size={20} name="zap" color="banana" />}
          {mrRatingValue && (
            <div className={styles._mr_rating__container}>
              <Label
                overrideStyle={{
                  backgroundColor: mrRatingValue?.backgroundColor,
                  color: mrRatingValue?.textColor,
                  borderColor: mrRatingValue?.outlineColor,
                }}
              >
                {mrRatingValue?.name}
              </Label>
            </div>
          )}
        </div>
        <div className={styles._bobjectName} onClick={onClick}>
          <Tooltip title={optOutTooltipText} position="top">
            <span className={styles._opt_out_sign}>
              {isOptOut && <Icon name="slash" color="tomato" />}
            </span>
          </Tooltip>
          <Text size="xl" color="bloobirds" align="center" dataTest={`lead-CardName`}>
            {lead?.fullName ? lead?.fullName : `${lead?.name} ${lead?.surname}`}
          </Text>
        </div>
        <div className={styles._statusLabel}>
          {hasSalesEnabled ? (
            <Tooltip title={isSalesStage ? t('stageSales') : t('stageProspecting')} position="top">
              <Label
                size={'small'}
                uppercase={false}
                color={isSalesStage ? 'peanut' : 'verySoftGrape'}
                textColor={isSalesStage ? 'white' : 'peanut'}
                overrideStyle={{
                  ...{
                    paddingLeft: '3px',
                    paddingRight: '3px',
                    borderTopRightRadius: 0,
                    borderBottomLeftRadius: 0,
                  },
                }}
              >
                {isSalesStage ? 'Sa' : 'Pr'}
              </Label>
            </Tooltip>
          ) : (
            <></>
          )}
          <StatusLabel
            backgroundColor={status?.backgroundColor}
            color={status?.textColor}
            borderColor={status?.outlineColor}
            text={status?.name || ''}
          />
        </div>
        {leadUserAssignedTo ? (
          <div className={styles._assignedToWrapper}>
            <CircularBadge
              size="small"
              backgroundColor={leadUserAssignedTo?.color || 'softPeanut'}
              style={{ color: 'var(--white)', fontSize: '9px' }}
            >
              {leadUserAssignedTo?.shortname || 'U'}
            </CircularBadge>
            <Text size="s">{leadUserAssignedTo?.name}</Text>
          </div>
        ) : (
          <></>
        )}
        <div className={styles._otherFieldsWrapper}>
          {otherFields && Object.keys(otherFields)?.length > 0 ? (
            Object.keys(otherFields)?.map(extraField => {
              if (!otherFields[extraField]) {
                return null;
              }
              const fieldValue = dataModel?.findValueById(otherFields[extraField])?.name;
              let value = fieldValue ? fieldValue : otherFields[extraField];
              const field = dataModel?.findFieldById(extraField);
              if (field?.logicRole === LEAD_FIELDS_LOGIC_ROLE.COMPANY) {
                value = lead?.companyName;
              }
              const fieldIcon = field?.layoutIcon;
              const fieldName = field?.name;
              const isDate = field?.fieldType === 'DATE' || field?.fieldType === 'DATETIME';
              return (
                <div className={styles._otherFieldWrapper} key={extraField}>
                  <Tooltip title={`${fieldName}: ${value}`} position="top">
                    {fieldIcon ? (
                      <Icon name={fieldIcon as IconType} size={16} color="softPeanut" />
                    ) : (
                      <></>
                    )}
                    <Text size="s" color="peanut" className={styles._otherFieldText} ellipsis={30}>
                      {isDate ? format(new Date(value), 'PPP') : value}
                    </Text>
                  </Tooltip>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </BubbleWindowContent>
      <BubbleWindowFooter>
        <Button onClick={onClick} expand>
          {t('viewLeadInBB')}
        </Button>
      </BubbleWindowFooter>
    </BubbleWindow>
  );
};
