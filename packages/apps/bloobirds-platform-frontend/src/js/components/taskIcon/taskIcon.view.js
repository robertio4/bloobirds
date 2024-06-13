import React from 'react';
import { Icon } from '@bloobirds-it/flamingo-ui';

const icons = {
  START_CADENCE: {
    name: 'flag',
    color: 'bloobirds',
  },
  PROSPECT_CADENCE: {
    name: 'phone',
    color: 'seagreen',
  },
  NEXT_STEP: {
    name: 'clock',
    color: 'melon',
  },
  CONTACT_BEFORE_MEETING: {
    name: 'calendar',
    color: 'tomato',
  },
  CONTACT: {
    name: 'phone',
    color: 'seagreen',
  },
  ALLOCATE_QC: {
    name: 'company',
    color: 'tangerine',
  },
  ADD_LEADS_TO_QC: {
    name: 'people',
    color: 'tangerine',
  },
  MEETING: {
    name: 'calendar',
    color: 'tomato',
  },
  SCHEDULED_EMAIL: {
    name: 'scheduleMail',
    color: 'tangerine',
  },
  AUTOMATED_EMAIL: {
    name: 'autoMail',
    color: 'tangerine',
  },
};

const TaskIcon = ({ type, ...props }) => <Icon {...icons[type]} {...props} />;

export default TaskIcon;
