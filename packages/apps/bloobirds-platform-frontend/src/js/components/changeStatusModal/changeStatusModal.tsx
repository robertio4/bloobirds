import React, { useEffect, useMemo, useState, useRef } from 'react';

import {
  Button,
  ColorType,
  Icon,
  IconType,
  Item,
  Label,
  Modal,
  ModalContent,
  ModalFooter,
  ModalSection,
  Select,
  Spinner,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { BobjectTypes } from '@bloobirds-it/types';
import clsx from 'clsx';

import { useGlobalPicklistValues } from '../../hooks/usePicklistValues';
import { toSentenceCase } from '../../utils/strings.utils';
import { colors } from '../../utils/styles.utils';
import { useBulkActionsFeedbackModal } from '../bobjectTable/bulkActionsPanel/modals/feedbackModal/useBulkActionsFeedbackModal';
import styles from './changeStatusModal.module.css';
import { useCompanyStatus } from './hooks/useCompanyStatus';
import { useLeadStatus } from './hooks/useLeadStatus';
import { useOpportunityStatus } from './hooks/useOpportunityStatus';
import useChangeStatus from './useChangeStatus';

export interface HandleSaveParams {
  selectedStatus: string;
  selectedReason?: any;
  selectedUser?: any;
  closeModal: (shouldOpenBulkModal?: boolean) => void;
  isQueuedBulk: boolean | QueuedBulk;
}

type QueuedBulk = { query: string; totalItems: any };

export function isQueuedBulkQuery(isQueuedBulk: boolean | QueuedBulk): isQueuedBulk is QueuedBulk {
  return typeof isQueuedBulk !== 'boolean' && 'query' in isQueuedBulk;
}

export interface Status {
  name: string;
  logicRole: string;
  backgroundColor: ColorType;
  outlineColor: ColorType;
  textColor: ColorType;
}

interface ModalLayoutOptions {
  bobjectType: string;
  bobjectTypeBulk: string;
  iconTitle: IconType;
  iconBobjectName: IconType;
  labelWidth?: string;
}

export interface Reason {
  id: string;
  label: string;
  value: string;
  logicRole: string;
}

export type Reasons = Reason[];

export type ChangeStatusModalPropsAll = Required<ChangeStatusModalProps>;

export interface ChangeStatusModalProps extends Partial<ChangeStatusModalPropsOptional> {
  handleSave: (save: HandleSaveParams) => void;
  layoutOptions: ModalLayoutOptions;
  bobjectName: string;
  bobjectStatus: string;
  getStatusReason: (status: string) => string;
  isInSalesStage: boolean;
  statuses: Status[];
  getReasons: () => { [key: string]: Reasons };
  getReasonsByStatus: (reasons: { [key: string]: Reasons }, status: string) => Reasons;
  isStatusWithReason: (status: string) => boolean;
  isRequiredAReasonByStatus: (status: string) => boolean;
  reasonPlaceholder: (status: string) => string;
}

interface ChangeStatusModalPropsOptional {
  shouldHaveAssigned: (status: string) => boolean;
  isAssignedToRequired: boolean;
  showUnassignedWarning: (status: string) => boolean;
  showStopCadenceWarning: (status: string) => boolean;
}

const DefaultChangeStatusModalProps: ChangeStatusModalPropsOptional = {
  shouldHaveAssigned: () => false,
  isAssignedToRequired: false,
  showUnassignedWarning: () => false,
  showStopCadenceWarning: () => false,
};

/**
 * @deprecated use the one in @bloobirds-it/change-status
 */
const ChangeStatusModal = ({
  onSave = () => {},
  isQueuedBulk = false,
}: {
  onSave: () => void;
  isQueuedBulk?: boolean | QueuedBulk;
}) => {
  // Modal Utils
  const { bobject, closeChangeStatusModal } = useChangeStatus();
  const [isLoading, setIsLoading] = useState(false);
  const [halfCountStatuses, setHalfCountStatuses] = useState(0);
  const { toggleModalVisibility } = useBulkActionsFeedbackModal();
  const isBulkAction = Array.isArray(bobject);
  const bobjectType = isBulkAction ? bobject[0]?.id.typeName : bobject?.id.typeName;
  const companyStatusFunctions = useCompanyStatus();
  const leadStatusFunctions = useLeadStatus();
  const opportunityStatusFunctions = useOpportunityStatus();
  const {
    handleSave,
    layoutOptions,
    bobjectName,
    bobjectStatus,
    getStatusReason,
    shouldHaveAssigned,
    isAssignedToRequired,
    isInSalesStage,
    statuses,
    showUnassignedWarning,
    showStopCadenceWarning,
    getReasons,
    getReasonsByStatus,
    isStatusWithReason,
    isRequiredAReasonByStatus,
    reasonPlaceholder,
  }: ChangeStatusModalPropsAll = useMemo(() => {
    return {
      ...DefaultChangeStatusModalProps,
      ...((): ChangeStatusModalProps => {
        switch (bobjectType) {
          //review
          default:
          case BobjectTypes.Company:
            return companyStatusFunctions;
          case BobjectTypes.Lead:
            return leadStatusFunctions;
          case BobjectTypes.Opportunity:
            return opportunityStatusFunctions;
        }
      })(),
    };
  }, [bobjectType]);
  // Status
  const [selectedStatusLR, setSelectedStatusLR] = useState(bobjectStatus);
  // Additional Fields
  const users = useGlobalPicklistValues({ logicRole: 'USER' })?.filter((user: any) => user.enabled);
  const [assignedToError, setAssignedToError] = useState(undefined);
  const [selectedUser, setSelectedUser] = useState(undefined);
  // Reasons
  const [selectedReason, setSelectedReason]: [Reason, (reason: Reason) => void] = useState(
    undefined,
  );
  const allReasons = getReasons();
  const reasons = getReasonsByStatus(allReasons, selectedStatusLR);
  const isRequiredAReason = isRequiredAReasonByStatus(selectedStatusLR);
  const isRequiredAReasonAndThereIsAReasonSelected = !!isRequiredAReason && !!selectedReason;
  const canSave =
    !isStatusWithReason(selectedStatusLR) ||
    isRequiredAReasonAndThereIsAReasonSelected ||
    !isRequiredAReason;

  const isFirstRender = useRef(true);
  const reasonsRef = useRef(null);
  const assignedRef = useRef(null);

  useEffect(() => {
    if (isFirstRender?.current) {
      isFirstRender.current = false;
      return;
    }

    if (reasonsRef?.current) {
      reasonsRef?.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (assignedRef?.current) {
      assignedRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedStatusLR]);

  useEffect(() => {
    if (reasons) {
      const statusReason = getStatusReason(selectedStatusLR);
      if (statusReason !== selectedReason?.value) {
        setSelectedReason(reasons?.find((reason: Reason) => reason.value === statusReason));
      }
    }
  }, [reasons]);
  // util for layout
  useEffect(() => {
    if (statuses) {
      const isExactHalf = statuses.length % 2 === 0;
      setHalfCountStatuses(isExactHalf ? statuses.length / 2 : Math.floor(statuses.length / 2) + 1);
    }
  }, [statuses]);
  // Save
  const handleOnSave = () => {
    if (isAssignedToRequired && shouldHaveAssigned(selectedStatusLR) && !selectedUser) {
      setAssignedToError(true);
    } else {
      setIsLoading(true);
      const afterSaving: HandleSaveParams['closeModal'] = (shouldOpenBulkModal = false) => {
        if (shouldOpenBulkModal) {
          toggleModalVisibility();
        }
        setIsLoading(false);
        onSave();
        closeChangeStatusModal();
      };
      handleSave({
        selectedStatus: selectedStatusLR,
        selectedReason,
        selectedUser,
        closeModal: afterSaving,
        isQueuedBulk,
      });
    }
  };

  // Status Label Component
  const StatusLabelButton = (status: Status) => {
    const isSelected = status.logicRole === selectedStatusLR;
    const style = {
      backgroundColor: status.backgroundColor != null ? status.backgroundColor : colors.peanut,
      borderColor: status.backgroundColor != null ? status.backgroundColor : colors.peanut,
      color: status.textColor != null ? status.textColor : 'white',
      width: '100%',
    };
    const overrideStyle = isSelected ? { selectedStyle: style } : { width: '100%' };

    return (
      <div className={styles._status_wrapper} key={`status-${status?.name}`}>
        <Label
          value={status.logicRole}
          dataTest={status.logicRole}
          align="center"
          inline={false}
          key={`status-${status.name}`}
          onClick={value => {
            setSelectedStatusLR(value);
            setSelectedReason(undefined);
          }}
          selected={isSelected}
          hoverStyle={style}
          overrideStyle={{ width: '100%', boxSizing: 'border-box' }}
          {...overrideStyle}
        >
          {status.name}
        </Label>
      </div>
    );
  };

  return (
    <Modal
      open
      onClose={closeChangeStatusModal}
      title={`Update ${
        isBulkAction ? layoutOptions.bobjectTypeBulk : layoutOptions.bobjectType
      } status`}
    >
      {showUnassignedWarning(selectedStatusLR) && (
        <div className={styles._warning__banner}>
          <Icon name="person" color="banana" />
          <Text size="s" color="peanut">
            {`The selected status will leave the ${layoutOptions.bobjectType} unassigned.`}
          </Text>
        </div>
      )}
      {showStopCadenceWarning(selectedStatusLR) && (
        <div className={styles._warning__banner}>
          <Icon name="cadence" color="banana" />
          <Text size="s" color="peanut">
            This selected status will{' '}
            <Text size="s" inline weight="bold">
              stop
            </Text>{' '}
            the cadence!
          </Text>
        </div>
      )}
      <ModalContent>
        <ModalSection
          size="l"
          title={`Do you want to update the ${
            isBulkAction ? layoutOptions.bobjectTypeBulk : layoutOptions.bobjectType
          } status?`}
          icon={layoutOptions.iconTitle}
        >
          <div className={styles._section__wrapper}>
            <div className={styles._content__wrapper}>
              <div className={styles._change_status__wrapper}>
                <div className={styles._name__wrapper}>
                  <Icon color="verySoftPeanut" name={layoutOptions.iconBobjectName} />
                  <Text dataTest="Modal-StatusUpdate" size="m" color="peanut">
                    {isBulkAction
                      ? `Update ${
                          isQueuedBulk && isQueuedBulkQuery(isQueuedBulk)
                            ? isQueuedBulk?.totalItems
                            : bobject?.length
                        } ${layoutOptions?.bobjectTypeBulk}`
                      : bobjectName}
                  </Text>
                </div>
                {isInSalesStage ? (
                  <div className={styles._status}>
                    <div
                      className={styles._status_center_solo}
                      style={{
                        width: layoutOptions.labelWidth ? layoutOptions.labelWidth : '200px',
                      }}
                    >
                      {statuses.map(StatusLabelButton)}
                    </div>
                  </div>
                ) : (
                  <div className={styles._status}>
                    <div className={styles._status_left}>
                      {statuses.slice(0, halfCountStatuses).map(StatusLabelButton)}
                    </div>
                    <div className={styles._status_right}>
                      {statuses.slice(halfCountStatuses, statuses.length).map(StatusLabelButton)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {isStatusWithReason(selectedStatusLR) && (
            <div className={styles._section__wrapper} ref={reasonsRef}>
              <div className={clsx(styles._title__wrapper, styles._title__wrapper__centered)}>
                <Text size="m" weight="medium" color="peanut">
                  What is the reason for the change in status?
                </Text>
              </div>
              <div className={styles._content__wrapper}>
                <div className={styles._reason__wrapper}>
                  <Select
                    value={selectedReason}
                    placeholder={`${toSentenceCase(layoutOptions.bobjectType)} ${reasonPlaceholder(
                      selectedStatusLR,
                    )} reason ${isRequiredAReason ? '*' : ''}`}
                    width="100%"
                    onChange={setSelectedReason}
                  >
                    {reasons?.map((reason: Reason) => (
                      <Item key={reason.value} value={reason}>
                        {reason.label}
                      </Item>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          )}
          {shouldHaveAssigned(selectedStatusLR) && (
            <div className={styles._section__wrapper} ref={assignedRef}>
              <div className={styles._content__wrapper}>
                <div className={styles._reason__wrapper}>
                  {users && (
                    <Select
                      value={selectedUser?.id}
                      placeholder={`Assigned to${isAssignedToRequired ? '*' : ''}`}
                      width="100%"
                      error={assignedToError && !selectedUser && 'You should fill the assigned To'}
                    >
                      {users.map((user: any) => (
                        <Item
                          key={`user-assigned-item-${user?.id}`}
                          value={user?.id}
                          onClick={() => {
                            setSelectedUser(user);
                          }}
                        >
                          {user.value}
                        </Item>
                      ))}
                    </Select>
                  )}
                </div>
              </div>
            </div>
          )}
        </ModalSection>
      </ModalContent>
      <ModalFooter>
        <div className={styles._buttons__wrapper}>
          <Button variant="clear" color="tomato" onClick={closeChangeStatusModal}>
            Cancel
          </Button>
          <Button dataTest="ChangeStatus-Save" onClick={handleOnSave} disabled={!canSave}>
            {isLoading ? <Spinner name="loadingCircle" size={14} color="white" /> : 'SAVE'}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default ChangeStatusModal;
