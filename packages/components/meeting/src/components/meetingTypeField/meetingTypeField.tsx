import React, { useState } from 'react';

import { Label, Dropdown, Spinner, useVisible } from '@bloobirds-it/flamingo-ui';
import { usePicklist, useDataModel, useMeetingReportResult } from '@bloobirds-it/hooks';
import {
  Bobject,
  BobjectTypes,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  MIXPANEL_EVENTS,
} from '@bloobirds-it/types';
import { getFieldByLogicRole } from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';

interface MeetingTypeFieldProps {
  activity: Bobject<BobjectTypes>;
  styles?: any;
  onUpdate?: (cb) => void;
}

export const MeetingTypeField = ({ activity, styles, onUpdate }: MeetingTypeFieldProps) => {
  const mainTypeLR = ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE;
  const mainTypeField = getFieldByLogicRole(activity, mainTypeLR);

  const { data: meetingTypes } = usePicklist(mainTypeField?.name);
  const types = meetingTypes?.filter(i => i.enabled).sort((a, b) => a.ordering - b.ordering);
  const { visible, setVisible, ref } = useVisible();
  const dataModel = useDataModel();
  const { reportResult } = useMeetingReportResult(dataModel, mainTypeField?.value);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState(null);

  const setMeetingType = (value: string) => {
    setVisible(false);
    setIsLoading(true);

    reportResult(activity, value).then(() => {
      mixpanel.track(MIXPANEL_EVENTS.CLICK_EDIT_MEETING_TYPE_FROM_TAB_OTO);

      setType(types?.find(i => i.id === value));

      onUpdate?.(() => setIsLoading(false));

      window.dispatchEvent(
        new CustomEvent('ACTIVE_BOBJECT_UPDATED', {
          detail: { type: BobjectTypes.Activity },
        }),
      );
    });
  };

  if (!mainTypeField?.value || !types) {
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
              color: 'var(--peanut)',
              ...styles,
            }}
            uppercase={false}
            size="small"
          >
            {isLoading ? (
              <Spinner color="darkBloobirds" name="dots" size={10} />
            ) : (
              type?.value || mainTypeField?.text
            )}
          </Label>
        </div>
      }
    >
      <div style={{ display: 'flex', padding: '0px 8px', gap: '8px', flexDirection: 'column' }}>
        {types.map(({ id, value }) => (
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
              overrideStyle={{
                color: 'var(--peanut)',
              }}
              uppercase={false}
              size="small"
              selected={value === (type?.value || mainTypeField?.text)}
              value={id}
              onClick={setMeetingType}
            >
              {value}
            </Label>
          </div>
        ))}
      </div>
    </Dropdown>
  );
};
