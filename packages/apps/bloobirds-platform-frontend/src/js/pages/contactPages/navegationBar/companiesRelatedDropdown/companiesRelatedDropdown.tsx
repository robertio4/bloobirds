import { default as React, FC, RefObject, useMemo, useState } from 'react';

import { Button, CircularBadge, Icon, Label, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { BOBJECT_TYPES } from '@bloobirds-it/types';

import { APP_CL_COMPANIES } from '../../../../app/_constants/routes';
import BobjectName from '../../../../components/bobjectName';
import {
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_HIGH_PRIORITY_LOGIC_ROLE,
} from '../../../../constants/company';
import { useBobjectDetails, useEntity, useHover, useRouter } from '../../../../hooks';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import useParentCompany from '../../../../hooks/useParentCompany';
import { getFieldByLogicRole, getValueFromLogicRole } from '../../../../utils/bobjects.utils';
import { ellipsis } from '../../../../utils/strings.utils';
import styles from './companiesRelatedDropdown.module.css';

interface CompanyCardProps {
  canEdit: boolean;
  company: any;
  toggleDropdownVisibility: () => void;
}

interface CompanyDropdownProps {
  toggleDropdownVisibility: () => void;
}

interface cardUserType {
  name?: string;
  shortname?: string;
  color?: string;
}

const CompanyCard: FC<CompanyCardProps> = ({
  company,
  canEdit = true,
  toggleDropdownVisibility,
}) => {
  const [divRef, isHover] = useHover();
  const { history } = useRouter();
  const users = useEntity('users');
  const { openBobjectDetails } = useBobjectDetails();
  const { isSmallDesktop } = useMediaQuery();

  const parsedCompany = useMemo(
    () => ({
      assignedTo: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO),
      targetMarket: getFieldByLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET),
      nameField: getFieldByLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME),
      status: getFieldByLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.STATUS),
      linkedinUrl: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.LINKEDIN_URL),
      highPriority: getFieldByLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.HIGH_PRIORITY),
      companyUrl: `${APP_CL_COMPANIES}/${company?.id?.objectId}`,
    }),
    [company],
  );
  const targetMarket = useEntity('targetMarkets')?.get(parsedCompany?.targetMarket?.value);
  const cardUser = users ? (users.get(parsedCompany.assignedTo) as cardUserType) : {};
  const isHighPriority =
    parsedCompany?.highPriority?.valueLogicRole === COMPANY_HIGH_PRIORITY_LOGIC_ROLE.YES;

  return (
    <div
      ref={divRef as RefObject<HTMLDivElement>}
      data-test={`company-${parsedCompany.nameField.text}`}
      className={styles._card__container}
      onClick={() => {
        history.push(parsedCompany.companyUrl);
        toggleDropdownVisibility();
      }}
    >
      <div className={styles._card__column}>
        {targetMarket ? (
          <Tooltip title={targetMarket?.name} trigger="hover" position="top">
            <CircularBadge
              size="medium"
              style={{
                backgroundColor: targetMarket?.color || 'var(--verySoftPeanut)',
                color: 'white',
                height: '32px',
                width: '32px',
              }}
            >
              {targetMarket?.shortname || ''}
            </CircularBadge>
          </Tooltip>
        ) : (
          <CircularBadge
            size="medium"
            style={{
              backgroundColor: 'var(--verySoftPeanut)',
              color: 'white',
              fontSize: 20,
              height: '32px',
              width: '32px',
            }}
          >
            ?
          </CircularBadge>
        )}
        <div className={styles._name__container}>
          <BobjectName
            field={parsedCompany.nameField}
            bobject={company}
            type={BOBJECT_TYPES.LEAD}
            toggleDropdown={toggleDropdownVisibility}
            canEdit={canEdit}
          />
        </div>
        {isHover && canEdit && (
          <Button
            onClick={e => {
              e.stopPropagation();
              openBobjectDetails({ id: company?.id.value });
              toggleDropdownVisibility();
            }}
            className={styles._preview__button__wrapper}
            size="small"
            variant="secondary"
            uppercase={false}
            iconLeft={isSmallDesktop ? 'eye' : null}
          >
            {isSmallDesktop ? '' : 'Preview'}
          </Button>
        )}
      </div>
      <div className={styles._card__status}>
        {isHighPriority && (
          <div className={styles._icon__container}>
            <Tooltip title="High priority" position="top">
              <Icon name="zap" size={18} color="banana" />
            </Tooltip>
          </div>
        )}
        {parsedCompany?.linkedinUrl && (
          <div
            className={styles._icon__container}
            onClick={() => window.open(parsedCompany.linkedinUrl, '_blank')}
          >
            <Tooltip title="LinkedIn profile" position="top">
              <Icon name="linkedin" size={18} color="darkBloobirds" />
            </Tooltip>
          </div>
        )}
        {parsedCompany?.assignedTo && (
          <div className={styles._icon__container}>
            <Tooltip title={cardUser?.name} position="top">
              <CircularBadge
                size="s"
                style={{
                  backgroundColor: cardUser?.color || 'var(--lightPeanut)',
                  border: 'var(--white)',
                  color: 'white',
                }}
              >
                {cardUser?.shortname || 'U'}
              </CircularBadge>
            </Tooltip>
          </div>
        )}
        {parsedCompany?.status?.text && (
          <Label
            overrideStyle={{
              color: parsedCompany.status.valueTextColor,
              backgroundColor: parsedCompany.status.valueBackgroundColor,
              borderColor: parsedCompany.status.valueBackgroundColor,
            }}
          >
            {ellipsis(parsedCompany.status.text, 26)}
          </Label>
        )}
      </div>
    </div>
  );
};

const CompaniesDropdown: FC<CompanyDropdownProps> = ({ toggleDropdownVisibility }) => {
  const { parentCompany, siblingCompanies, childCompanies } = useParentCompany();
  const siblingLength = siblingCompanies?.length;
  const childLength = childCompanies?.data?.contents?.length;
  const [showAllChild, setShowAllChild] = useState(false);
  const [showAllSibling, setShowAllSibling] = useState(false);
  const { setOpenEditModal, setOpenDeleteModal, setOpenEditChildModal } = useParentCompany();
  return (
    <>
      <div className={styles._dropdown__container}>
        {parentCompany && (
          <div className={styles._parent_company_container}>
            <div className={styles._header__container}>
              <Text size="s" color="softPeanut">
                Parent Company
              </Text>
              <div>
                <Button
                  size="small"
                  className={styles._action_button}
                  variant="clear"
                  color="darkBloobirds"
                  iconLeft="cross"
                  uppercase={false}
                  onClick={() => {
                    setOpenDeleteModal(true);
                    toggleDropdownVisibility();
                  }}
                >
                  Remove relationship
                </Button>
                <Button
                  size="small"
                  uppercase={false}
                  className={styles._action_button}
                  variant="clear"
                  color="darkBloobirds"
                  iconLeft="refresh"
                  onClick={() => {
                    setOpenEditModal(true);
                    toggleDropdownVisibility();
                  }}
                >
                  Replace company
                </Button>
              </div>
            </div>
            <CompanyCard
              company={parentCompany}
              toggleDropdownVisibility={toggleDropdownVisibility}
              key={parentCompany?.id.value}
              canEdit
            />
            {siblingCompanies && siblingLength > 0 && (
              <div className={styles._cards_container}>
                <Icon name="child" color="softPeanut" />
                <Text size="s" color="softPeanut" inline>
                  {siblingLength > 1 ? 'Sibling Companies' : 'Sibling Company'}
                </Text>
                <div className={showAllSibling ? styles._cards_list_long : styles._cards_list}>
                  {siblingCompanies?.map((siblingCompany: any) => (
                    <CompanyCard
                      company={siblingCompany}
                      toggleDropdownVisibility={toggleDropdownVisibility}
                      canEdit={false}
                      key={siblingCompany.id.value}
                    />
                  ))}
                </div>

                {siblingLength > 5 && !showAllSibling && (
                  <div className={styles._show_all_button_wrapper}>
                    <Button
                      onClick={() => setShowAllSibling(!showAllSibling)}
                      size="small"
                      variant="clear"
                      uppercase={false}
                    >
                      Show all
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {childCompanies?.data?.contents && childLength > 0 && (
          <div className={styles._child_companies_container}>
            <div className={styles._header__container}>
              <Text size="s" color="softPeanut">
                {childLength > 1 ? 'Child Companies' : 'Child Company'}
              </Text>
              <div>
                <Button
                  size="small"
                  uppercase={false}
                  className={styles._action_button}
                  variant="clear"
                  color="darkBloobirds"
                  iconLeft="edit"
                  onClick={() => {
                    setOpenEditChildModal(true);
                    toggleDropdownVisibility();
                  }}
                >
                  Edit child companies
                </Button>
              </div>
            </div>
            <div className={showAllChild ? styles._cards_list_long : styles._cards_list}>
              {childCompanies?.data?.contents?.map((childCompany: any) => (
                <CompanyCard
                  company={childCompany}
                  toggleDropdownVisibility={toggleDropdownVisibility}
                  key={childCompany.id.value}
                  canEdit
                />
              ))}
            </div>
            {childLength > 5 && !showAllChild && (
              <Button
                onClick={() => setShowAllChild(!showAllChild)}
                size="small"
                variant="clear"
                uppercase={false}
              >
                Show all
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CompaniesDropdown;
