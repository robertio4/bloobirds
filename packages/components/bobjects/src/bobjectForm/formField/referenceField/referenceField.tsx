import { useEffect, useMemo, useState } from 'react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ColorType, Dropdown, Icon, Item, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import {
  useCompanies,
  useCompanyCreationEnabled,
  useObjectCreationSettings,
} from '@bloobirds-it/hooks';
import { useDebounce } from 'use-debounce';

import { FormGroup, FormLabel } from '../../formGroup/formGroup';
import { FormFieldProps, Input } from '../baseInput/baseInput';
import styles from './referenceField.module.css';

type FieldDescription = {
  color: ColorType;
  text: string;
};

export const ReferenceField = ({
  control,
  logicRole,
  name,
  id,
  style,
  size = 'small',
}: FormFieldProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'bobjects.bobjectForm.referenceField' });
  const {
    field: { value: companyName, onChange: setCompanyName },
  } = useController({
    control,
    name: 'companyName',
  });

  const {
    field: { value: createCompany, onChange: setCreateCompany },
  } = useController({
    control,
    name: 'createCompany',
  });

  const {
    field: { value: companyId, onChange, onBlur },
    fieldState: { error },
  } = useController({
    control,
    name: `fields.${id}`,
  });

  const { companies, isLoading } = useCompanies(companyName);
  const [companyFound, setCompanyFound] = useState(false);
  const [focused, setFocused] = useState(false);
  const [companiesFoundCount, setCompaniesFoundCount] = useState(0);
  const isCompanyCreationEnabled = useCompanyCreationEnabled();
  const { companyRequiredFromExtension } = useObjectCreationSettings();
  const [visible] = useDebounce(focused && !isLoading && companyName.length > 0, 200);

  useEffect(() => {
    if (!isLoading) {
      setCreateCompany(false);
      const company = companies.find(company => company.name === companyName);
      if (company) {
        setCompanyFound(true);
        onChange(company.id.value);
        setCompaniesFoundCount(companies.length);
      } else if (companies.length > 0) {
        setCompanyFound(false);
        onChange('');
        setCompaniesFoundCount(companies.length);
      } else {
        setCompanyFound(false);
        onChange('');
        setCompaniesFoundCount(0);
      }
    }
  }, [companyName, isLoading]);

  const description = useMemo<FieldDescription>(() => {
    if (createCompany) {
      return {
        text: t('createCompany', { companyName }),
        color: style === 'gradient' ? 'white' : 'bloobirds',
      };
    }
    if (!companyFound) {
      if (companiesFoundCount > 0) {
        return {
          text: t('possibleMatch', { count: companiesFoundCount || 0 }),
          color: style === 'gradient' ? 'white' : 'tangerine',
        };
      }
      return {
        text: t('noMatchingCompany'),
        color: style === 'gradient' ? 'white' : 'tangerine',
      };
    }
    return {
      text: t('matchingCompany', { companyName }),
      color: style === 'gradient' ? 'white' : 'bloobirds',
    };
  }, [companyName, companyFound, createCompany, companiesFoundCount]);

  return (
    <FormGroup size={size}>
      <FormLabel style={style}>
        {name}
        {logicRole === 'LEAD__COMPANY' && (
          <>
            {companyRequiredFromExtension ? (
              '*'
            ) : (
              <Tooltip title={t('referencedTooltip')} position="right">
                <Icon
                  name="infoFilled"
                  color={style === 'gradient' ? 'veryLightBloobirds' : 'darkBloobirds'}
                  size={16}
                />
              </Tooltip>
            )}
          </>
        )}
      </FormLabel>
      <div className={styles.dropdown}>
        <Dropdown
          width={256}
          position="bottom-end"
          arrow={false}
          visible={visible}
          anchor={
            <div className={styles.dropdownInput}>
              <Input
                size={size}
                placeholder={t('companiesPlaceholder')}
                value={companyName}
                onChange={setCompanyName}
                error={error?.message}
                onFocus={() => {
                  setFocused(true);
                }}
                onBlur={() => {
                  setFocused(false);
                  onBlur();
                }}
              />
              <Icon name="search" color="bloobirds" size={14} className={styles.searchIcon} />
            </div>
          }
        >
          {companies.length === 0 ? (
            <Text className={styles.empty} color="softPeanut" size="s">
              {t('noResults')}
            </Text>
          ) : (
            <>
              <Text className={styles.empty} color="softPeanut" size="s">
                {t('searchResults')}
              </Text>
              {companies.map(company => (
                <Item
                  key={company.id.value}
                  onClick={() => {
                    setCompanyName(company.name);
                    setCompanyFound(true);
                    setFocused(false);
                  }}
                >
                  {company.name}
                </Item>
              ))}
            </>
          )}
          {isCompanyCreationEnabled && !companyId ? (
            <div
              className={styles.item}
              role="button"
              onClick={() => {
                setCreateCompany(true);
              }}
            >
              <Text color="bloobirds" size="s">
                {t('createNewCompany', { companyName })}
              </Text>
            </div>
          ) : null}
        </Dropdown>
        <Text className={styles.description} color={description.color} size="xxs">
          {description.text}
        </Text>
      </div>
    </FormGroup>
  );
};
