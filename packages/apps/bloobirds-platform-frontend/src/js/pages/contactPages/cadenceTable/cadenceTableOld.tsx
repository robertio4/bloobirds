import React, { useEffect, useRef, useState } from 'react';
import { useVirtual } from 'react-virtual';

import {
  Button,
  Dropdown,
  Icon,
  Item,
  Label,
  Select,
  Text,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { Bobject, FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import clsx from 'clsx';
import spacetime from 'spacetime';

import { STEPS } from '../../../components/cadenceControlModal/cadenceControlModal.machine';
import { getTimetableItems } from '../../../components/timetable/getTimetableItems';
import Timetable from '../../../components/timetable/timetable';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../constants/lead';
import { useMediaQuery, useRouter } from '../../../hooks';
import { useCadenceTable } from '../../../hooks/useCadenceTable';
import { useHasCadenceStarted } from '../../../hooks/useHasCadenceStarted';
import { useTimetableFilters } from '../../../hooks/useTimetable';
import {
  bobjectPlurals,
  getTextFromLogicRole,
  getValueFromLogicRole,
  isOpportunity,
} from '../../../utils/bobjects.utils';
import { isLeadWithoutCompanyPage } from '../../../utils/pages.utils';
import { AutoAssignCadenceDropdown } from '../components/autoAssignCadenceDropdown';
import { useContactBobjects } from '../contactPageContext';
import styles from './cadenceTable.module.css';
import Filters from './filters/filters';

export const getCadenceNameColor = (hasCadence, hasStarted) => {
  if (!hasCadence) {
    return 'softPeanut';
  }
  return hasStarted ? 'bloobirds' : 'peanut';
};

export const getCadenceName = (cadence: { name: string }) => {
  if (!cadence) {
    return 'No cadence assigned';
  }
  return cadence?.name || 'Unnamed cadence';
};

interface CadenceTableInterface {
  handleClickTitle: (bobject: Bobject) => void;
  bobject: Bobject;
  offsetDays: number;
}

const CadenceTableOld = ({ handleClickTitle, bobject, offsetDays = 0 }: CadenceTableInterface) => {
  const [timetableLoaded, setTimetableLoaded] = useState(false);
  const { cadence: bobjectCadence, defaultCadence } = useCadenceTable(bobject);
  const { isSmallDesktop } = useMediaQuery();
  const { leads } = useContactBobjects();
  const { pathname } = useRouter();
  const showLeadFilter = !isLeadWithoutCompanyPage(pathname);
  const { leadFilter, setLeadFilter, timeWindowFilter, clickedDate } = useTimetableFilters();
  const { hasStarted } = useHasCadenceStarted(bobject);
  const cadence = bobjectCadence || defaultCadence;
  const bobjectType = bobject?.id.typeName;
  const { ref: dropdownRef, setVisible: setDropdownVisible, visible: dropdownVisible } = useVisible(
    false,
  );

  const isAssigned = !!getValueFromLogicRole(bobject, FIELDS_LOGIC_ROLE[bobjectType]?.ASSIGNED_TO);
  const timeTableItems = getTimetableItems(timeWindowFilter);
  const bobjectName = isOpportunity(bobject)
    ? bobjectPlurals[bobject?.id?.typeName].toLowerCase()
    : bobject?.id?.typeName.toLowerCase();

  const sliderRef = useRef();
  const columnVirtualizer = useVirtual({
    horizontal: true,
    size: timeTableItems?.length || 0,
    parentRef: sliderRef,
    estimateSize: React.useCallback(() => 110, []),
    overscan: 5,
  });

  const scrollToDate = ({ date, align }) => {
    const dateIndex = timeTableItems.findIndex(item => {
      const [start, end] = item.split('/');
      if (!end) {
        return item === date;
      }
      return spacetime(date).isBetween(spacetime(start), spacetime(end), true);
    });
    columnVirtualizer.scrollToIndex(dateIndex, { align });
  };

  useEffect(() => {
    if (timetableLoaded) {
      const today = spacetime.now().format('iso-short');
      scrollToDate({ date: clickedDate || today, align: clickedDate ? 'start' : 'center' });
    }
  }, [timeWindowFilter, timetableLoaded, clickedDate]);

  return (
    <div data-intercom="visual-cadence-component">
      <div className={styles._title__wrapper}>
        <div className={styles._name__wrapper}>
          <Label
            uppercase={false}
            inline={false}
            overrideStyle={{ padding: '3px 12px', letterSpacing: 0 }}
            color="white"
            icon="statusCircle"
            iconColor={hasStarted ? 'grape' : 'softPeanut'}
            iconSize={11}
          >
            <div
              data-test="cadence-name-wrapper"
              className={clsx(styles._link, {
                [styles._link_disabled]: !hasStarted,
              })}
              onClick={() => hasStarted && handleClickTitle()}
            >
              <Text
                dataTest={`Button-CadenceName-${cadence?.name || defaultCadence?.name || 'None'}`}
                size="s"
                color={getCadenceNameColor(!!cadence, hasStarted)}
                inline
              >
                {getCadenceName(cadence)}
              </Text>
              {hasStarted && <Icon dataTest="Cadence-Gear" name="settings" size={16} />}
            </div>
          </Label>
          {!hasStarted && (
            <div className={styles._button_wrapper}>
              <Dropdown
                ref={dropdownRef}
                width="100%"
                visible={dropdownVisible}
                arrow={true}
                anchor={
                  <Button
                    dataTest="Cadence-Start"
                    size="small"
                    variant="secondary"
                    iconLeft="play"
                    onClick={() => {
                      isAssigned
                        ? handleClickTitle(STEPS.CONFIGURE_CADENCE)
                        : setDropdownVisible(!dropdownVisible);
                    }}
                    className={clsx({ [styles._compact_button]: isSmallDesktop })}
                  >
                    {!isSmallDesktop && 'Start'}
                  </Button>
                }
              >
                <AutoAssignCadenceDropdown
                  bobject={bobject}
                  setDropdownVisible={setDropdownVisible}
                />
              </Dropdown>
            </div>
          )}
          {showLeadFilter && (
            <div className={styles._filter_wrapper}>
              <Select
                onChange={setLeadFilter}
                placeholder="Cadence & activity from"
                size="small"
                value={leadFilter}
                variant="filters"
                width="275px"
              >
                <Item value="any">{`All ${bobjectName} & leads`}</Item>
                <Item value="__MATCH_EMPTY_ROWS__">
                  <em>No lead assigned</em>
                </Item>
                {leads?.map(lead => (
                  <Item value={lead.id.value} key={`${lead.id.value}`}>
                    {getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME)}
                  </Item>
                ))}
              </Select>
            </div>
          )}
        </div>
        <Filters
          timetableLoaded={timetableLoaded}
          onTodayClick={() =>
            scrollToDate({ date: spacetime.now().format('iso-short'), align: 'center' })
          }
        />
      </div>
      <Timetable
        ref={sliderRef}
        columnVirtualizer={columnVirtualizer}
        timeTableItems={timeTableItems}
        offsetDays={offsetDays}
        bobject={bobject}
        timeWindow={timeWindowFilter}
        isLoaded={setTimetableLoaded}
        onScrollTo={date => {
          scrollToDate({ date: spacetime(date).format('iso-short'), align: 'center' });
        }}
      />
    </div>
  );
};

export default CadenceTableOld;
