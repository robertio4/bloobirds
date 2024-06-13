import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  CircularBadge,
  ColorType,
  Icon,
  IconButton,
  Label,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { BobjectTypes, Bobject, BobjectField } from '@bloobirds-it/types';
import { formatDateAsText } from '@bloobirds-it/utils';
import { useWizardContext, WIZARD_MODALS } from '@bloobirds-it/wizard-modal-context';
import classnames from 'clsx';
import { TFunction } from 'i18next';
import { isEmpty } from 'lodash';

import { BuyerPersonasButton } from '../../../components/buyerPersonasButton/buyerPersonasButton';
import BuyerPersonasModal from '../../../components/buyerPersonasModal/buyerPersonasModal';
import { SalesLabel } from '../../../components/salesLabel/salesLabel';
import { TargetMarketsButton } from '../../../components/targetMarketsButton/targetMarketsButton';
import { useUserSettings } from '../../../components/userPermissions/hooks';
import { getTimezone } from '../../../constants/countryToTimeZone';
import { useEntity, useHover } from '../../../hooks';
import { useBuyerPersonasList } from '../../../hooks/useBuyerPersonasList';
import { useBuyerPersonasModal } from '../../../hooks/useBuyerPersonasModal';
import { useFullSalesEnabled } from '../../../hooks/useFeatureFlags';
import useManageProducts from '../../../hooks/useManageProducts';
import { useTargetMarketsModal } from '../../../hooks/useTargetMarketsModal';
import { parseAmount } from '../../../utils/amount.utils';
import { getValueFromLogicRole } from '../../../utils/bobjects.utils';
import { generateShortName } from '../../../utils/strings.utils';
import { addHttpIfNeeded } from '../../../utils/url.utils';
import { CopyText } from './copyText/copyText';
import styles from './infoCardTemplate.module.css';
import { parseDate, parseNumber, parsePhone } from './infoCardTemplate.utils';
import { useIsNoStatusPlanAccount } from "@bloobirds-it/hooks";

const EXCEPTION_LOGIC_ROLE = [
  /[A-Z]*__ATTEMPTS_COUNT/,
  /[A-Z]*__ATTEMPTS_LAST_DAY/,
  /[A-Z]*__TOUCHES_COUNT/,
  /[A-Z]*__TOUCHES_LAST_DAY/,
  /[A-Z]*__COUNTRY/,
  /[A-Z]*__CLOSE_DATE/,
  /[A-Z]*__CREATION_DATE/,
];

const addTextToField = (field: BobjectField, t: TFunction) => {
  let fieldText;
  switch (true) {
    case /[A-Z]*__ATTEMPTS_COUNT/.test(field?.logicRole):
      fieldText = `${field?.text ? parseInt(field?.text, 10) : 0} attempts`;
      break;
    case /[A-Z]*__ATTEMPTS_LAST_DAY/.test(field?.logicRole):
      fieldText = `Last attempt, ${formatDateAsText({ text: field?.text, t })}`;
      break;
    case /[A-Z]*__TOUCHES_COUNT/.test(field?.logicRole):
      fieldText = `${field?.text ? parseInt(field?.text, 10) : 0} touches`;
      break;
    case /[A-Z]*__TOUCHES_LAST_DAY/.test(field?.logicRole):
      fieldText = `Last touch, ${formatDateAsText({ text: field?.text, t })}`;
      break;
    case /[A-Z]*__COUNTRY/.test(field?.logicRole): {
      const timezone = getTimezone(field?.text);
      fieldText = field?.text;
      if (timezone) {
        fieldText = `${fieldText} (${timezone})`;
      }
      break;
    }
    case /[A-Z]*__CLOSE_DATE/.test(field?.logicRole):
      fieldText = `Closes ${formatDateAsText({ text: field?.text, t })}`;
      break;
    case /[A-Z]*__CREATION_DATE/.test(field?.logicRole):
      fieldText = `Created ${formatDateAsText({ text: field?.text, t })}`;
      break;
    default:
      break;
  }

  return fieldText;
};

const parseField = (field: BobjectField, t: TFunction) => {
  let parsedField;

  if (EXCEPTION_LOGIC_ROLE.some(regex => regex.test(field?.logicRole))) {
    return addTextToField(field, t);
  }

  switch (field?.type) {
    case 'NUMBER':
      parsedField = parseNumber(field) || 0;
      break;
    case 'DATETIME':
    case 'DATE':
      parsedField = parseDate(field);
      break;
    case 'PHONE':
      parsedField = parsePhone(field);
      break;
    case 'URL':
      parsedField = addHttpIfNeeded(field?.text);
      break;
    case 'REFERENCE': {
      const { referencedBobject, referencedBobjectType } = field;
      parsedField = getValueFromLogicRole(
        referencedBobject,
        `${referencedBobjectType.toUpperCase()}__NAME`,
      );
      break;
    }
    case 'DOUBLE':
      parsedField = field?.text;
      break;
    default:
      parsedField = field?.text;
      break;
  }

  return parsedField;
};

interface StatusLabelContentProps {
  text: string;
  backgroundColor: ColorType;
  borderColor: ColorType;
  color: ColorType;
  onClick: () => void;
}

const StatusLabelContent = ({ text, backgroundColor, color, onClick }: StatusLabelContentProps) => (
  <span
    onClick={onClick}
    className={classnames(styles._status__container, {
      [styles._status__container__clickable]: !!onClick,
    })}
  >
    <Label
      dataTest={`companyStatus-${text}`}
      overrideStyle={{
        backgroundColor,
        color,
        borderColor: backgroundColor,
      }}
    >
      <Text htmlTag="span" color={color} size="s" ellipsis={21}>
        {text}
      </Text>
    </Label>
  </span>
);

interface StatusLabelProps {
  onClick: () => void;
  backgroundColor: ColorType;
  color: ColorType;
  borderColor: ColorType;
  text: string;
}

const StatusLabel = (props: StatusLabelProps) => {
  if (props.text.length > 21) {
    return (
      <Tooltip title={props.text} position="top">
        <StatusLabelContent {...props} />
      </Tooltip>
    );
  }

  return <StatusLabelContent {...props} />;
};

interface TargetMarketField extends BobjectField {
  color: ColorType;
  shortname: string;
}

interface RequiredFieldsInterface {
  amount: string | number;
  currency: BobjectField;
  targetMarket: TargetMarketField;
  mrRating: BobjectField;
  icp: BobjectField;
}

interface InfoCardTemplateProps {
  assignTo: BobjectField;
  bobject: Bobject;
  requiredFields: RequiredFieldsInterface;
  name: BobjectField;
  stage: BobjectField;
  status: BobjectField;
  highPriority: BobjectField;
  optOut: BobjectField;
  hasRequiredMissing: boolean;
  otherFields: Array<BobjectField>;
  handleOnClickName: () => void;
  handleOnClickEdit: () => void;
  isInactive: boolean;
  bobjectName: BobjectTypes;
  onStatusClick: () => void;
  contextualMenu: any;
}

const InfoCardTemplate = ({
  assignTo,
  bobject,
  requiredFields,
  name,
  stage,
  status,
  highPriority,
  optOut,
  hasRequiredMissing,
  otherFields = [],
  handleOnClickName,
  handleOnClickEdit,
  isInactive = false,
  bobjectName,
  onStatusClick,
  contextualMenu,
}: InfoCardTemplateProps) => {
  const [ref, isHover] = useHover();
  const isNoStatusAccount = useIsNoStatusPlanAccount()
  const { openWizard } = useWizardContext();
  const [refCircular, isCircularHover] = useHover();
  const assignedToValue = assignTo?.value;
  const config = useUserSettings();
  const meetingFieldsRequiredEnabled = config?.settings.meetingFieldsRequiredEnabled;
  const users = useEntity('users');
  const userInfo = users?.get(assignedToValue);
  const { isOpen: isOpenTargetMarketsModal, closeTargetMarketsModal } = useTargetMarketsModal();
  const { isOpen: isOpenBuyerPersonasModal, closeBuyerPersonasModal } = useBuyerPersonasModal();
  const { buyerPersonas } = useBuyerPersonasList();
  const buyerPersona =
    Array.isArray(buyerPersonas) &&
    buyerPersonas?.find(bp => bp?.name === requiredFields?.icp?.text);
  const { openProductsModal } = useManageProducts();
  const hasSalesEnabled = useFullSalesEnabled();
  const canManageProducts = bobjectName === BobjectTypes.Opportunity && hasSalesEnabled;
  const isCompanyOrLead = bobjectName === BobjectTypes.Company || bobjectName === BobjectTypes.Lead;
  const showDistinction = !isNoStatusAccount && hasSalesEnabled && isCompanyOrLead;
  const showSalesDistinction =
    showDistinction && stage.valueLogicRole === `${bobjectName.toUpperCase()}__STAGE__SALES`;
  const showProspectDistinction = showDistinction && !showSalesDistinction;
  const optOutTooltipText =
    'This person has been opted out by requesting not to be contacted again.';

  const loadTMModal = () => {
    return import('../../../components/targetMarketsModal/targetMarketsModal');
  };
  const TargetMarketsModal = React.lazy(loadTMModal);
  const { t } = useTranslation();

  return (
    <div
      className={classnames(styles._container, styles[`_${bobjectName.toLowerCase()}_container`], {
        [styles._container_distinction]: showDistinction,
        [styles._container_sales]: showSalesDistinction,
        [styles._container_prospect]: showProspectDistinction,
      })}
    >
      {showDistinction && <SalesLabel isSalesStage={showSalesDistinction} />}
      <div className={styles._info__container}>
        {highPriority && <Icon size={20} name="zap" color="banana" />}
        {requiredFields?.mrRating?.text && (
          <div className={styles._mr_rating__container}>
            <Label
              overrideStyle={{
                backgroundColor: requiredFields?.mrRating?.valueBackgroundColor,
                color: requiredFields?.mrRating?.valueTextColor,
                borderColor: requiredFields?.mrRating?.valueOutlineColor,
              }}
            >
              {requiredFields?.mrRating?.text}
            </Label>
          </div>
        )}
        <div className={styles._contextual__menu}>{contextualMenu}</div>
      </div>
      {requiredFields?.targetMarket && (
        <>
          {requiredFields?.targetMarket?.name ? (
            <Tooltip title={requiredFields?.targetMarket?.name} position="top">
              <div className={styles._circular_badge__container}>
                <CircularBadge
                  size="large"
                  style={{
                    backgroundColor: requiredFields?.targetMarket?.color || 'var(--softPeanut)',
                    color: 'white',
                  }}
                >
                  {requiredFields?.targetMarket?.shortname ||
                    generateShortName(requiredFields?.targetMarket?.name)}
                </CircularBadge>
              </div>
            </Tooltip>
          ) : (
            <div
              //@ts-ignore
              ref={refCircular}
              className={classnames({ [styles._circular_badge__badge]: isCircularHover })}
            >
              {isCircularHover && (
                <div className={styles._circular_badge__button}>
                  <div className={styles._circular_badge__button_hovered}>
                    <TargetMarketsButton textBefore="Keep in mind your" />
                  </div>
                </div>
              )}
              <CircularBadge
                size="large"
                style={{
                  backgroundColor: 'var(--verySoftPurple)',
                  color: isCircularHover ? 'var(--purple)' : 'var(--lightPurple)',
                  border: '1px dashed var(--lightPurple)',
                  fontSize: '20px',
                }}
              >
                ?
              </CircularBadge>
            </div>
          )}
        </>
      )}
      {requiredFields?.icp && (
        <Tooltip title={requiredFields?.icp?.text} position="top">
          <div className={styles._circular_badge__container}>
            {requiredFields?.icp?.text ? (
              <CircularBadge size="large" backgroundColor={buyerPersona?.color}>
                {buyerPersona?.shortName || ''}
              </CircularBadge>
            ) : (
              <div
                //@ts-ignore
                ref={refCircular}
                className={classnames({ [styles._circular_badge__badge]: isCircularHover })}
              >
                {isCircularHover && (
                  <div className={styles._circular_badge__button}>
                    <div className={styles._circular_badge__button_hovered}>
                      <BuyerPersonasButton textBefore="Keep in mind your" />
                    </div>
                  </div>
                )}
                <CircularBadge
                  size="large"
                  style={{
                    backgroundColor: 'var(--verySoftPurple)',
                    color: isCircularHover ? 'var(--purple)' : 'var(--lightPurple)',
                    border: '1px dashed var(--lightPurple)',
                    fontSize: '20px',
                  }}
                >
                  ?
                </CircularBadge>
              </div>
            )}
          </div>
        </Tooltip>
      )}
      {'amount' in requiredFields && (
        <div className={styles._tag__container}>
          <div className={styles._tag__content}>
            <Text
              dataTest="Text-opportunityAmount"
              weight="bold"
              align="center"
              size="xxl"
              ellipsis={12}
            >
              {`${requiredFields.currency} ${
                !requiredFields.amount ? '-' : parseAmount(requiredFields.amount)
              }`}
            </Text>
          </div>
        </div>
      )}
      <div className={styles._name_wrapper}>
        <Tooltip title={optOut && optOutTooltipText} position="top">
          <span className={styles._opt_out_sign}>
            {optOut && <Icon name="slash" color="tomato" />}
          </span>
        </Tooltip>
        <Tooltip title={name?.value} position="top">
          {/*@ts-ignore*/}
          <div ref={ref} className={styles._name__container}>
            <span className={styles._name_text__container} onClick={handleOnClickName}>
              {name?.value ? (
                <Text
                  size="xl"
                  color="bloobirds"
                  align="center"
                  dataTest={`${bobjectName.toLowerCase()}CardName`}
                >
                  {name?.value}
                </Text>
              ) : (
                <Text
                  size="xl"
                  color="bloobirds"
                  align="center"
                  dataTest={`${bobjectName.toLowerCase()}CardName`}
                >
                  {getValueFromLogicRole(bobject, 'LEAD__EMAIL', true)}
                </Text>
              )}
            </span>
            {meetingFieldsRequiredEnabled && hasRequiredMissing && (
              <span className={styles._warning__dot} />
            )}
            <div
              className={classnames(styles._edit_icon, { [styles._edit_icon__visible]: isHover })}
            >
              <IconButton
                size={20}
                name="edit"
                dataTest={`edit${bobjectName}Button`}
                onClick={handleOnClickEdit}
              />
            </div>
          </div>
        </Tooltip>
      </div>
      {canManageProducts && (
        <div onClick={() => openProductsModal(bobject?.id.value)} className={styles.link}>
          <Text size="m" color="bloobirds">
            Manage products
          </Text>
        </div>
      )}
      {status?.text && (
        <StatusLabel
          onClick={onStatusClick}
          backgroundColor={status?.valueBackgroundColor as ColorType}
          color={status?.valueTextColor as ColorType}
          borderColor={status?.valueOutlineColor as ColorType}
          text={status?.text}
        />
      )}
      {assignTo && (
        <div className={styles._assignTo__container}>
          {userInfo && (
            <CircularBadge
              size="small"
              style={{ color: 'var(--white)', fontSize: '9px' }}
              backgroundColor={userInfo?.color || 'lightPeanut'}
            >
              {userInfo?.shortname || ''}
            </CircularBadge>
          )}
          <Text size="s">{userInfo?.name}</Text>
        </div>
      )}
      {otherFields && (
        <div className={styles._fields__container} style={{ marginBottom: isInactive && '20px' }}>
          {otherFields.map(field => {
            const isLinkTypeField = field?.type === 'URL';
            return (
              !isEmpty(field) &&
              field?.text &&
              parseField(field, t) && (
                <CopyText
                  isLinkTypeField={isLinkTypeField}
                  textToCopy={isLinkTypeField ? field?.text : parseField(field, t)}
                  key={`${bobjectName}-${field?.name}`}
                >
                  <div
                    className={classnames(styles._field__container, {
                      [styles._link_field_container]: isLinkTypeField,
                    })}
                    key={`${bobjectName}-${field?.name}`}
                  >
                    <Tooltip title={`${field?.label}: ${parseField(field, t)}`} position="top">
                      <Icon size={16} color="softPeanut" name={field?.icon} />
                      {!isLinkTypeField ? (
                        <Text dataTest={field?.label} size="s" color="peanut">
                          {parseField(field, t)}
                        </Text>
                      ) : (
                        <a
                          className={styles._field_link}
                          href={addHttpIfNeeded(field?.text)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {field?.text}
                        </a>
                      )}
                    </Tooltip>
                  </div>
                </CopyText>
              )
            );
          })}
        </div>
      )}
      {!!isInactive && isInactive && (
        <div
          className={classnames(styles._inactive__container, styles._inactive__container_pointer)}
          onClick={() => {
            openWizard(WIZARD_MODALS.NEXT_STEP, bobject);
          }}
        >
          <Tooltip
            title={`This ${bobjectName.toLowerCase()} does not have future tasks`}
            position="top"
            trigger="hover"
          >
            <Text size="s" weight="bold">
              <span role="img" aria-label="warning">
                ⚠️
              </span>
              ️ Inactive {bobjectName}
            </Text>
          </Tooltip>
        </div>
      )}
      {isOpenTargetMarketsModal && (
        <React.Suspense fallback={<div>Loading</div>}>
          <TargetMarketsModal handleCloseModal={closeTargetMarketsModal} />
        </React.Suspense>
      )}
      {isOpenBuyerPersonasModal && (
        <BuyerPersonasModal handleCloseModal={closeBuyerPersonasModal} />
      )}
    </div>
  );
};

export default InfoCardTemplate;
