import { useTranslation } from 'react-i18next';

import { Icon, Label, Text } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';
import { TFunction } from 'i18next';

import { useCadenceTable } from '../../../hooks/useCadenceTable';
import { useHasCadenceStarted } from '../../../hooks/useHasCadenceStarted';
import { AutoAssignDropdown } from '../../cadenceControlModal/assignCadenceDropdown/autoAssignDropdown/autoAssignDropdown';
import { STEPS } from '../../cadenceControlModal/cadenceControlModal.machine';
import { CadenceBobject, CadenceLead } from '../cadenceTable.type';
import styles from './cadenceHeader.module.css';

interface CurrentCadenceProps {
  activeUserId: string;
  bobject: CadenceBobject;
  leads?: CadenceLead[];
  openCadenceControl?: (params?: any) => void;
}

export function CurrentCadence(props: CurrentCadenceProps) {
  const { bobject, openCadenceControl, activeUserId } = props;
  const { cadence } = useCadenceTable(bobject);
  const { hasStarted } = useHasCadenceStarted(bobject);
  const { t } = useTranslation('translation', { keyPrefix: 'cadence.cadenceTable.header' });

  return (
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
          className={clsx(styles._link, {
            [styles._link_disabled]: !hasStarted,
          })}
          onClick={() => hasStarted && openCadenceControl()}
        >
          <Text size="s" color={getCadenceNameColor(!!cadence, hasStarted)} inline>
            {getCadenceName(cadence, t)}
          </Text>
          {hasStarted && <Icon name="settings" size={16} />}
        </div>
      </Label>
      {!hasStarted && (
        <AutoAssignDropdown
          activeUserId={activeUserId}
          activeBobject={bobject}
          callback={() => openCadenceControl(STEPS.CONFIGURE_CADENCE)}
          contactBobjects={{ company: bobject, leads: props.leads }}
        />
      )}
    </div>
  );
}

function getCadenceNameColor(hasCadence, hasStarted) {
  if (!hasCadence) {
    return 'softPeanut';
  }
  return hasStarted ? 'bloobirds' : 'peanut';
}

function getCadenceName(cadence: { name: string }, t: TFunction) {
  if (!cadence) {
    return t('noCadenceAssigned');
  }
  return cadence?.name || t('unnamedCadence');
}
