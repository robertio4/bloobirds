import {
  TASK_AUTOMATED_ERROR_LOGIC_ROLE,
  TASK_AUTOMATED_PAUSED_REASONS_LOGIC_ROLE,
} from '@bloobirds-it/types';

export const AUTOMATION_ERRORS_MESSAGE = {
  [TASK_AUTOMATED_ERROR_LOGIC_ROLE.MISSING_EMAIL]:
    'Cannot find the recipient’s email in the field ##EMAIL_FIELD##, please add this information and retry',
  [TASK_AUTOMATED_ERROR_LOGIC_ROLE.OPT_OUT_ENABLED]:
    'This person has been opted out by requesting not to be contacted again. You cannot send them emails while they are marked as opt up yes.',
  [TASK_AUTOMATED_ERROR_LOGIC_ROLE.PAUSED_MORE_THAN_7_DAYS]:
    'The email has been paused for more than 7 days try to solve the issue and retry',
  [TASK_AUTOMATED_ERROR_LOGIC_ROLE.STOPPED_ACCOUNT]:
    'Your mail account has been disconnected, you should go to Connections and re-authenticate the account to be able to send your emails.',
  [TASK_AUTOMATED_ERROR_LOGIC_ROLE.UNKNOWN_ERROR]:
    'The email could not be delivered because of an issue on the sender server',
  [TASK_AUTOMATED_ERROR_LOGIC_ROLE.VARIABLE_NOT_RESOLVED]:
    'One or more variables in the email can not be replaced with the data from the ##BOBJECT##. Edit the template to continue',
  [TASK_AUTOMATED_ERROR_LOGIC_ROLE.DAILY_LIMIT_EXCEEDED]:
    'This email failed because the daily limit of emails has been reached.',
  [TASK_AUTOMATED_ERROR_LOGIC_ROLE.INVALID_RECIPIENT]:
    "This email could not be sent because the recipient's email address is not valid",
};

export const AUTOMATION_PAUSED_REASON_MESSAGE = {
  [TASK_AUTOMATED_PAUSED_REASONS_LOGIC_ROLE.OVERDUE]:
    'Paused ##DATE## because this cadence has overdue not completed tasks',
  [TASK_AUTOMATED_PAUSED_REASONS_LOGIC_ROLE.TOUCH]:
    'Paused ##DATE## because this ##OBJECT## previously contacted you ',
};

export const AUTOMATION_RESCHEDULED_MESSAGE =
  'Re-scheduled to send ##DATE## Delayed due to sending limits';
