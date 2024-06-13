import { Label, Spinner } from '@bloobirds-it/flamingo-ui';
import { ACTIVITY_FIELDS_LOGIC_ROLE, PITCH_DONE_VALUES_LOGIC_ROLE } from '@bloobirds-it/types';
import { getFieldByLogicRole } from '@bloobirds-it/utils';

import styles from '../../callResult.module.css';
import { calculateFirstColumnSize } from '../../callResult.utils';

const CallResultColumn = (activity, callResultStepData, setCallResultStepData, result) => {
  const hasLogicRole = !!result?.logicRole;
  const pitchInfo = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.PITCH)?.value;
  const pitchDone =
    getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.PITCH_DONE)?.valueLogicRole ||
    PITCH_DONE_VALUES_LOGIC_ROLE.NO;

  return (
    <div className={styles._label__content} key={`call-result-${result.id}`}>
      <Label
        value={result.logicRole}
        dataTest={result.logicRole}
        uppercase={false}
        inline={false}
        align="center"
        onClick={() => {
          setCallResultStepData({
            ...callResultStepData,
            callResult: {
              fieldId: result.id,
              value: result.value,
              logicRole: result.logicRole || result.id,
              isCorrectContact: result.isCorrectContact,
            },
            pitch: {
              done: pitchDone,
              // @ts-ignore
              template: pitchInfo,
            },
          });
        }}
        selected={
          hasLogicRole
            ? result.logicRole === callResultStepData?.callResult?.logicRole
            : result.id === callResultStepData?.callResult?.logicRole
        }
      >
        {result.name}
      </Label>
    </div>
  );
};

export const CallResultSelector = ({
  callResultsPicklistValues,
  activity,
  callResultStepDataHandler,
}) => {
  const [callResultStepData, setCallResultStepData] = callResultStepDataHandler;
  const firstColumnSize = calculateFirstColumnSize(callResultsPicklistValues);

  return (
    <div className={styles._labels__wrapper} style={{ maxHeight: firstColumnSize > 6 ? 315 : 250 }}>
      {callResultsPicklistValues?.length ? (
        <>
          <div>
            {callResultsPicklistValues.slice(0, firstColumnSize).map(element => {
              return CallResultColumn(activity, callResultStepData, setCallResultStepData, element);
            })}
          </div>
          <div>
            {callResultsPicklistValues
              .slice(firstColumnSize, callResultsPicklistValues.length + 1)
              .map(element => {
                return CallResultColumn(
                  activity,
                  callResultStepData,
                  setCallResultStepData,
                  element,
                );
              })}
          </div>
        </>
      ) : (
        <Spinner name="loadingCircle" />
      )}
    </div>
  );
};
