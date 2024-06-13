import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import {
  CardHoverButtons,
  Dropdown,
  IconButton,
  Item,
  useToasts,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { useSelectAll } from '@bloobirds-it/hooks';
import { Bobject, PluralBobjectTypes } from '@bloobirds-it/types';

import useChangeStatus from '../../../../../components/changeStatusModal/useChangeStatus';
import { useMediaQuery } from '../../../../../hooks';
import useAssignUser from '../../../../../hooks/useAssignUser';
import { useSetCadenceEnabled } from '../../../../../hooks/useFeatureFlags';
import useStopCadence from '../../../../../hooks/useStopCadence';
import { CardAddLeadButton } from '../../../../../layouts/subhomeLayout/subhomeContent/subhomeCard/subhomeCardButtons/addLead';
import { CardAddTaskButton } from '../../../../../layouts/subhomeLayout/subhomeContent/subhomeCard/subhomeCardButtons/addTask';
import { ButtonTypes } from '../../../../../layouts/subhomeLayout/subhomeContent/subhomeCard/subhomeCardButtons/button.types';
import { CardNextStepButton } from '../../../../../layouts/subhomeLayout/subhomeContent/subhomeCard/subhomeCardButtons/nextStep';
import { CardQuickStartButton } from '../../../../../layouts/subhomeLayout/subhomeContent/subhomeCard/subhomeCardButtons/quickStart';
import { CardReassignCompanyButton } from '../../../../../layouts/subhomeLayout/subhomeContent/subhomeCard/subhomeCardButtons/reassignCompany';
import { CardSetCadenceButton } from '../../../../../layouts/subhomeLayout/subhomeContent/subhomeCard/subhomeCardButtons/setcadence';
import { useLocationReturn, useParamsReturn } from '../../../salesPage/salesPage.utils';
import { PROSPECTING_SLUGS, SALES_SLUGS, TAB_BUTTONS } from '../../../subhomes.constants';
import { getMixpanelKey } from '../../../subhomes.utils';

export const MainBobjectButtons = ({
  bobject,
  isHovering,
  extraButtons,
  extraDropdownItems,
}: {
  bobject: Bobject;
  isHovering: boolean;
  extraButtons?: React.ReactNode;
  extraDropdownItems?: React.ReactNode;
}) => {
  const params: useParamsReturn = useParams();
  const location: useLocationReturn = useLocation();
  const pathname = location.pathname;
  const mixpanelKey = getMixpanelKey(params, pathname);
  const bobjectType = bobject?.id?.typeName;
  const { createToast } = useToasts();
  const { selectAllItems, selectedItems } = useSelectAll();
  const { openChangeStatusModal } = useChangeStatus();
  const { openAssignUserModal } = useAssignUser();
  const { openStopCadenceModal } = useStopCadence();
  const { isSmallDesktop } = useMediaQuery();
  const { ref, visible, setVisible } = useVisible(false);
  const { slug, section } = params;
  const sectionIndex = !section || section === 'companies' ? 'default' : section;
  const getButtonArray = (): Array<ButtonTypes> => {
    if (slug?.includes('inactive')) return ['nextStep'];
    return TAB_BUTTONS[slug as PROSPECTING_SLUGS | SALES_SLUGS]
      ? TAB_BUTTONS[slug as PROSPECTING_SLUGS | SALES_SLUGS][sectionIndex]
      : [];
  };
  const buttonArray = getButtonArray();
  const onSaveAction = () => {
    selectAllItems([]);
    createToast({
      type: 'success',
      message:
        selectedItems.length > 1
          ? `${selectedItems.length} ${PluralBobjectTypes[bobjectType]} updated successfully.`
          : `${bobjectType} updated successfully`,
    });
  };
  const buttonElements: React.ReactElement[] = buttonArray.map((buttonType: ButtonTypes) => {
    switch (buttonType) {
      case 'addLead':
        return <CardAddLeadButton key="addLead" />;
      case 'addTask':
        return <CardAddTaskButton key="addTask" />;
      case 'quickStart':
        return <CardQuickStartButton key="quickStart" />;
      case 'reassignCompany':
        return <CardReassignCompanyButton key="reassignCompany" />;
      case 'setCadence':
        return <CardSetCadenceButton key="setCadence" />;
      case 'nextStep':
        return <CardNextStepButton key="nextStep" />;
    }
  });
  const isSetCadenceEnabled = useSetCadenceEnabled();
  const shouldShowStopCadenceOption = slug === PROSPECTING_SLUGS.ALL && isSetCadenceEnabled;

  useEffect(() => {
    if (!isHovering) setVisible(false);
  }, [isHovering]);

  return (
    <CardHoverButtons>
      {buttonElements.map(element =>
        React.cloneElement(element, {
          bobject,
          mixpanelKey,
          isSmallDesktop,
          onSaveAction,
          key: element.key,
        }),
      )}
      {extraButtons}
      <Dropdown
        ref={ref}
        visible={visible}
        arrow={false}
        anchor={
          <IconButton
            name="moreVertical"
            onClick={event => {
              event.stopPropagation();
              setVisible(!visible);
            }}
          />
        }
      >
        <Item
          icon="personAdd"
          onClick={(value, event) => {
            event.stopPropagation();
            setVisible(false);
            openAssignUserModal({ bobject });
          }}
        >
          Reassign
        </Item>
        <Item
          icon="edit"
          onClick={(value, event) => {
            event.stopPropagation();
            setVisible(false);
            openChangeStatusModal(bobject);
          }}
        >
          Change status
        </Item>
        {shouldShowStopCadenceOption && (
          <Item
            icon="slash"
            iconColor="bloobirds"
            onClick={(value, event) => {
              event.stopPropagation();
              setVisible(false);
              openStopCadenceModal({ bobjectToSet: bobject });
            }}
          >
            Stop cadence
          </Item>
        )}
        {extraDropdownItems}
      </Dropdown>
    </CardHoverButtons>
  );
};
