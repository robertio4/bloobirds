import React, { useState } from 'react';

import { Label, Dropdown, useVisible, Spinner } from '@bloobirds-it/flamingo-ui';
import { useMeetingReportResult, useDataModel } from '@bloobirds-it/hooks';
import {
  Bobject,
  BobjectTypes,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  MIXPANEL_EVENTS,
} from '@bloobirds-it/types';
import { getFieldByLogicRole } from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';

interface MeetingResultFieldProps {
  activity: Bobject<BobjectTypes>;
  styles?: any;
  onUpdate?: (cb) => void;
}

export const MeetingResultField = ({ activity, styles, onUpdate }: MeetingResultFieldProps) => {
  const meetingResultLR = ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT;
  const meetingResultField = getFieldByLogicRole(activity, meetingResultLR);
  const meetingResultValueLogicRole = meetingResultField?.valueLogicRole;

  const mainTypeLR = ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE;
  const mainTypeField = getFieldByLogicRole(activity, mainTypeLR);

  const { visible, setVisible, ref } = useVisible();
  const dataModel = useDataModel();
  const { reportResult, meetingResults } = useMeetingReportResult(dataModel, mainTypeField?.value);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const setMeetingResult = (value: string) => {
    setVisible(false);
    setIsLoading(true);

    reportResult(activity, mainTypeField?.value, value).then(() => {
      mixpanel.track(MIXPANEL_EVENTS.CLICK_EDIT_MEETING_RESULT_FROM_TAB_OTO);

      setResult(meetingResults?.find(i => i.value === value));

      onUpdate?.(() => setIsLoading(false));

      window.dispatchEvent(
        new CustomEvent('ACTIVE_BOBJECT_UPDATED', {
          detail: { type: BobjectTypes.Activity },
        }),
      );
    });
  };

  if (!mainTypeField?.text || !meetingResults) {
    return null;
  }

  return (
    <Dropdown
      ref={ref}
      visible={visible}
      position="top-start"
      arrow={false}
      anchor={
        <div
          style={{
            cursor: 'pointer',
          }}
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            setVisible(!visible);
          }}
        >
          <Label
            overrideStyle={{
              minWidth: '80px',
              minHeight: '18px',
              display: 'flex',
              color:
                meetingResultValueLogicRole === 'ACTIVITY__MEETING_RESULT__CANCELLED'
                  ? 'var(--tomato)'
                  : 'var(--extraCall)',

              backgroundColor:
                meetingResultValueLogicRole === 'ACTIVITY__MEETING_RESULT__CANCELLED'
                  ? 'var(--verySoftTomato)'
                  : 'var(--verySoftMelon)',
              borderColor:
                meetingResultValueLogicRole === 'ACTIVITY__MEETING_RESULT__CANCELLED'
                  ? 'var(--verySoftTomato)'
                  : 'var(--verySoftMelon)',
              ...styles,
            }}
            uppercase={false}
            size="small"
            onClick={() => {
              setVisible(!visible);
            }}
          >
            {isLoading ? (
              <Spinner color="darkBloobirds" name="dots" size={10} />
            ) : (
              result?.name || meetingResultField?.text
            )}
          </Label>
        </div>
      }
    >
      <div style={{ display: 'flex', padding: '0px 8px', gap: '8px', flexDirection: 'column' }}>
        {meetingResults.map(({ id, name }) => (
          <div
            key={id}
            style={{
              cursor: 'pointer',
            }}
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <Label
              key={id}
              overrideStyle={{
                color: 'var(--peanut)',
              }}
              uppercase={false}
              size="small"
              selected={name === (result?.name || meetingResultField?.text)}
              value={id}
              onClick={setMeetingResult}
            >
              {name}
            </Label>
          </div>
        ))}
      </div>
    </Dropdown>
  );
};
