import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CheckItem, Item, MultiSelect, Select, Switch, Text } from '@bloobirds-it/flamingo-ui';
import {
  useActiveUserSettings,
  useIsNoStatusPlanAccount,
  usePlaybookSegmentation,
} from '@bloobirds-it/hooks';
import { TemplateStage } from '@bloobirds-it/types';

import styles from './segmentationForm.module.css';
import clsx from "clsx";

const Title = ({ title }: { title: string }) => {
  return (
    <Text weight="bold" size="s">
      {title}
    </Text>
  );
};

const SubTitle = ({ text }: { text: string }) => {
  return (
    <Text color="softPeanut" size="xs">
      {text}
    </Text>
  );
};

const SwitchRow = ({
  text,
  field,
  disabled = false,
}: {
  text: string;
  field: { value; onChange };
  disabled?: boolean;
}) => {
  return (
    <div className={styles.row}>
      <Switch
        color="purple"
        checked={field.value}
        onChange={bool => field.onChange(bool)}
        disabled={disabled}
      />
      <Text size="s" weight="medium">
        {text}
      </Text>
    </div>
  );
};

const SegmentationFieldsByStage = ({
  segmentationFields,
  segmentationField: { value: selectedSegmentation, onChange: setSelectedSegmentation },
  stage,
  withTitle = false,
}: {
  segmentationFields;
  segmentationField;
  stage: TemplateStage;
  withTitle?: boolean;
}) => {
  const { t } = useTranslation();
  if (!segmentationFields[stage] || segmentationFields[stage].length === 0) {
    return null;
  }

  return (
    <div className={clsx(styles.sectionContent, { [styles.withoutTitle]: !withTitle })} >
      {withTitle && (
        <Text size="xs" color="softPeanut">
          {t(`playbook.segmentationFilter.${stage.toLowerCase()}`)}
        </Text>
      )}
      {segmentationFields[stage]?.map(segmentation => {
        const selectedValues = selectedSegmentation[stage]?.[segmentation.id];
        const onChange = (values: any[]) => {
          setSelectedSegmentation({
            ...selectedSegmentation,
            [stage]: {
              ...selectedSegmentation[stage],
              ...(values.length && { [segmentation.id]: values }),
            },
          });
        };
        const renderValue = (values: string[]) => {
          if (values && values.length) {
            const selectedNames = values.map(id => segmentation.values.find(v => v.id === id).name);
            if (selectedNames.length === segmentation.values.length) {
              return t('common.allValuesSelected');
            } else if (selectedNames.length === 1) {
              return selectedNames[0];
            } else {
              return (
                selectedNames.length +
                t('common.selected')?.toLowerCase() +
                ': ' +
                selectedNames?.join(', ')
              );
            }
          } else {
            return t('common.select') + ' ' + segmentation.name;
          }
        };
        return (
          <MultiSelect
            key={segmentation.id}
            size="small"
            value={selectedValues ? selectedValues : []}
            width="100%"
            placeholder={t('common.select') + ' ' + segmentation.name}
            renderDisplayValue={renderValue}
            onChange={onChange}
            selectAllOption
            autocomplete
          >
            {segmentation.values?.map(value => (
              <CheckItem
                key={value.id}
                value={value.id}
                label={value.name}
                checked={selectedValues?.includes(value.id)}
              >
                {value.name}
              </CheckItem>
            ))}
          </MultiSelect>
        );
      })}
    </div>
  );
};

const SegmentationFields = ({
  stage,
  ...props
}: {
  segmentationField;
  segmentationFields;
  stage: TemplateStage;
}) => {
  const stages =
    stage === TemplateStage.All ? [TemplateStage.Prospecting, TemplateStage.Sales] : [stage];
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();

  return (
    <>
      {stages.map(s => (
        <SegmentationFieldsByStage
          key={'SegmentationFieldsByStage' + s}
          stage={s}
          withTitle={stage === TemplateStage.All && !isNoStatusPlanAccount}
          {...props}
        />
      ))}
    </>
  );
};

export const SegmentationForm = ({ canBeBattlecard }: { canBeBattlecard: boolean }) => {
  const { control } = useFormContext();
  const {
    field: { ref: stageRef, ...stageField },
  } = useController({ control, name: 'stage' });

  const { segmentationFields } = usePlaybookSegmentation(stageField.value);

  const { settings } = useActiveUserSettings();
  const { t } = useTranslation('translation', { keyPrefix: 'playbook.segmentationFilter' });
  const isAdmin = settings?.user?.accountAdmin;

  const { field: visibleField } = useController({ control, name: 'visibility' });
  const { field: officialField } = useController({ control, name: 'isOfficial' });
  const { field: battlecardField } = useController({ control, name: 'isBattlecard' });
  const { field: segmentationField } = useController({ control, name: 'segmentationValues' });
  const visibleFieldFunctions = {
    value: visibleField.value === 'PUBLIC',
    onChange: b => visibleField.onChange(b ? 'PUBLIC' : 'PRIVATE'),
  };
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();

  const renderStage = (stage: TemplateStage) => {
    switch (stage) {
      case TemplateStage.All:
        return t('prospectAndSalesStages');
      case TemplateStage.Prospecting:
        return t('prospectStage');
      case TemplateStage.Sales:
        return t('salesStage');
    }
  };

  const showSegmentation =
    segmentationFields &&
    ((stageField.value === TemplateStage.All &&
      (segmentationFields[TemplateStage.Prospecting]?.length > 0 ||
        segmentationFields[TemplateStage.Sales]?.length > 0)) ||
      (stageField.value !== TemplateStage.All && segmentationFields[stageField.value]?.length > 0));

  return (
    <div className={styles.container}>
      {!isNoStatusPlanAccount && (
        <div className={styles.section}>
          <Title title={t('stage')} />
          <Select
            size="small"
            placeholder={t('stage')}
            {...stageField}
            width={'100%'}
            borderless={false}
            renderDisplayValue={renderStage}
          >
            <Item value={TemplateStage.All}>{t('all')}</Item>
            <Item value={TemplateStage.Prospecting}>{t('prospectStage')}</Item>
            <Item value={TemplateStage.Sales}>{t('salesStage')}</Item>
          </Select>
        </div>
      )}
      <div className={styles.section}>
        <Title title={t('options')} />
        <SubTitle text={t('canChooseMoreThanOne')} />
        <div className={styles.sectionContent}>
          <SwitchRow text={t('visibleToAllMembers')} field={visibleFieldFunctions} />
          <SwitchRow text={t('officialPlaybook')} field={officialField} disabled={!isAdmin} />
          {canBeBattlecard && <SwitchRow text={t('playbookBattlecard')} field={battlecardField} />}
        </div>
      </div>
      {showSegmentation && (
        <div className={styles.section}>
          <Title title={t('categorization')} />
          {stageField.value !== TemplateStage.All && <SubTitle text={t('categorizationText')} />}
          {segmentationFields && (
            <SegmentationFields
              segmentationFields={segmentationFields}
              segmentationField={segmentationField}
              stage={stageField.value}
            />
          )}
        </div>
      )}
    </div>
  );
};
