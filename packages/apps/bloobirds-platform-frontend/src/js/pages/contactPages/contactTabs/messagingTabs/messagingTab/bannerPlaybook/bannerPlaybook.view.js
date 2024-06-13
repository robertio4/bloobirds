import React, { useEffect, useState, Fragment } from 'react';
import { useLocation } from 'react-router';

import { Icon, Item, Text } from '@bloobirds-it/flamingo-ui';

import SimpleSelect from '../../../../../../components/simpleSelect';
import {
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_STAGE_LOGIC_ROLE,
} from '../../../../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE, LEAD_STAGE_LOGIC_ROLE } from '../../../../../../constants/lead';
import { useMessagingFilterOptions, useRouter } from '../../../../../../hooks';
import {
  useActiveMessagingSegmentationValuesFilter,
  useActiveMessagingStageFilter,
} from '../../../../../../hooks/useActiveMessagingFilters';
import { useSelectedLead } from '../../../../../../hooks/useSelectedLead';
import { useSelectedOpportunity } from '../../../../../../hooks/useSelectedOpportunity';
import { useContactBobjects } from "../../../../contactPageContext";
import { getFieldById, getFieldByLogicRole } from '../../../../../../utils/bobjects.utils';
import { isCompanyPage, isLeadWithoutCompanyPage } from '../../../../../../utils/pages.utils';
import styles from './bannerPlaybook.module.css';

const BaseBanner = ({ children }) => (
  <div className={styles._banner_wrapper}>
    <div className={styles._banner_content}>
      <div className={styles._title_wrapper}>
        <Text size="xl" color="purple">
          Playbook
        </Text>
        <Icon name="book" size="20" color="purple" />
      </div>
      <div className={styles._content_wrapper}>
        <Text size="s">This is your recommended messaging based on </Text>
        {children}
      </div>
    </div>
  </div>
);

const BannerPlaybook = () => {
  const currentLocation = useLocation()?.pathname;
  const isCompanyContactPage = isCompanyPage(currentLocation);
  const { company } = useContactBobjects();
  const { selectedLead: lead } = useSelectedLead();
  const { selectedOpportunity: opportunity } = useSelectedOpportunity();
  const companySalesStage =
    getFieldByLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.STAGE)?.valueLogicRole ===
    COMPANY_STAGE_LOGIC_ROLE.SALES;
  const leadSalesStage =
    getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.STAGE)?.valueLogicRole ===
    LEAD_STAGE_LOGIC_ROLE.SALES;
  const stage =
    opportunity ||
    (companySalesStage && isCompanyContactPage) ||
    (companySalesStage && leadSalesStage) ||
    (!company && leadSalesStage)
      ? 'SALES'
      : 'PROSPECT';
  const messagingFilters = useMessagingFilterOptions(stage);
  const [alreadySelected, setAlreadySelected] = useState(false);
  const [selectedLeadInMessage, setSelectedLeadInMessage] = useState();
  const { pathname } = useRouter();

  const {
    segmentationValues,
    setOneSegmentationValue,
    setAllSegmentationValues,
  } = useActiveMessagingSegmentationValuesFilter();

  const [, setStageFilter] = useActiveMessagingStageFilter();

  useEffect(() => {
    const newFiltersValue = {};
    if (!alreadySelected || lead?.id?.value !== selectedLeadInMessage) {
      messagingFilters.forEach(filter => {
        const companyField = getFieldById(company, filter.id)?.value;
        const opportunityField = getFieldById(opportunity, filter.id)?.value;
        const leadField = getFieldById(lead, filter.id)?.value;
        const value = opportunityField || companyField || leadField;
        if (value) {
          newFiltersValue[filter.id] = [value];
        }
      });

      // Prevent qualifying question from updating the filters
      if (Object.keys(newFiltersValue).length !== 0) {
        setAlreadySelected(true);
        setSelectedLeadInMessage(lead?.id?.value);
      }

      setAllSegmentationValues(newFiltersValue);
    }
  }, [company, lead, opportunity, messagingFilters.length]);

  useEffect(() => {
    setStageFilter(stage);
  }, [stage]);

  const filteredMessagingFilters =
    isLeadWithoutCompanyPage(pathname) && !company
      ? messagingFilters?.filter(filter => filter?.bobjectType === 'Lead')
      : messagingFilters;

  return (
    <BaseBanner>
      {filteredMessagingFilters.map((filter, index) => {
        const isPenultimateCriteria = index === filteredMessagingFilters.length - 2;
        const isLastCriteria = index === filteredMessagingFilters.length - 1;
        const isOnlyOneFilter = filteredMessagingFilters.length === 1;

        return (
          <Fragment key={filter.id}>
            <div className={styles._criteria_wrapper}>
              <Text size="s" weight="bold">
                {filter.label}
              </Text>
              <SimpleSelect
                color="purple"
                value={segmentationValues[filter.id] ? segmentationValues[filter.id][0] : 'all'}
                onChange={value => {
                  if (value === 'all') {
                    setOneSegmentationValue(filter.id, null);
                  } else {
                    setOneSegmentationValue(filter.id, value);
                  }
                }}
              >
                <Item value="all">All</Item>
                {filter.values.map(option => (
                  <Item hidden={!option.enabled} key={option.id} value={option?.id}>
                    {option?.name}
                  </Item>
                ))}
              </SimpleSelect>
              {!isOnlyOneFilter && isPenultimateCriteria && (
                <Text className={styles._and_wrapper} size="s">
                  and
                </Text>
              )}
              {!isOnlyOneFilter && !isPenultimateCriteria && !isLastCriteria && (
                <Text size="s">,</Text>
              )}
              {isLastCriteria && <Text size="s">.</Text>}
            </div>
          </Fragment>
        );
      })}
    </BaseBanner>
  );
};

export default BannerPlaybook;
