import { CadenceAutomation, CadenceStep, TemplateSegmentationValues } from '@bloobirds-it/types';

import { FormValues } from './createEditStepModal';

const conditionallyFillFields = (
  propName: keyof FormValues['templates'] & string,
  propValue: string | undefined,
) => {
  if (!propValue) return {};
  return {
    [propName]: {
      id: propValue,
    },
  };
};

function conditionallyParseFields<T>(
  propName: T extends keyof FormValues & string ? T : never,
  propValue: T extends 'emailTemplateSegmentationValues'
    ? TemplateSegmentationValues
    : string | undefined,
  shouldsStringify = false,
) {
  if (!propValue) return {};
  return {
    [propName]: shouldsStringify ? JSON.stringify(propValue) : propValue,
  };
}

export const parseTemplateData = ({
  templates,
  suggestedPitch,
  suggestedLinkedinTemplate,
  emailTemplateId,
  decision,
  ...data
}: FormValues) => {
  return {
    ...data,
    addTemplateConfig: decision === 'create',
    automation: 'DEFAULT' as CadenceAutomation,
    dayNumber: data.dayNumber - 1,
    suggestedLinkedinTemplate: templates?.linkedInTemplate ? templates.linkedInTemplate.id : null,
    suggestedPitch: templates?.pitchTemplate ? templates.pitchTemplate.id : null,
    suggestedWhatsappTemplate: templates?.whatsappTemplate ? templates.whatsappTemplate.id : null,
    emailTemplateId: templates?.emailTemplate ? templates.emailTemplate.id : null,
    ...conditionallyParseFields('emailTemplateName', templates?.emailTemplate?.name),
    ...conditionallyParseFields('emailTemplateBody', templates?.emailTemplate?.body, true),
    ...conditionallyParseFields('emailTemplateSubject', templates?.emailTemplate?.subject, true),
    ...conditionallyParseFields(
      'emailTemplateSegmentationValues',
      templates?.emailTemplate?.segmentationValues,
    ),
  };
};

const prepareTemplates = (step: CadenceStep) => {
  const {
    emailTemplateId,
    suggestedPitch,
    suggestedLinkedinTemplate,
    suggestedWhatsappTemplate,
  } = step;
  const templates = {
    ...conditionallyFillFields('emailTemplate', emailTemplateId),
    ...conditionallyFillFields('linkedInTemplate', suggestedLinkedinTemplate),
    ...conditionallyFillFields('pitchTemplate', suggestedPitch),
    ...conditionallyFillFields('whatsappTemplate', suggestedWhatsappTemplate),
  };
  const hasTemplates = templates && Object.values(templates)?.filter(Boolean).length > 0;
  return hasTemplates
    ? {
        templates,
        checkedSelectTemplates: true,
      }
    : {};
};

export const prepareValues = (step: CadenceStep) => {
  const baseValues = {
    ...step,
    optOutContent: step.optOutContent ? JSON.parse(step.optOutContent) : '',
    dayNumber: (step?.dayNumber || 0) + 1,
    automationEmailThreadMode: step.automationEmailThreadMode || 'NEW_MESSAGE',
  };
  const valuesForAutomatedEmail = {
    ...baseValues,
    ...prepareTemplates(step),
  };

  const valuesForNonAutomatedEmail = {
    ...baseValues,
    automationPauseOverdueEnabled: true,
    automationPauseTouchEnabled: false,
    automationTimeZoneToApply: 'BOBJECT_TIMEZONE',
    optOutEnabled: false,
    startAutomationRange: '09:00',
    endAutomationRange: '18:00',
    ...prepareTemplates(step),
  };

  return step.actionTypes.includes('AUTOMATED_EMAIL')
    ? valuesForAutomatedEmail
    : valuesForNonAutomatedEmail;
};
