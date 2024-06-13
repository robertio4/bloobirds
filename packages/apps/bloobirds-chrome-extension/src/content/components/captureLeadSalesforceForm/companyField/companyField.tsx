import { useEffect, useMemo, useState } from 'react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormFieldProps } from '@bloobirds-it/bobjects';
import { ColorType, Dropdown, Icon, Input, Item, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useCompanies, useCompanyCreationEnabled } from '@bloobirds-it/hooks';
import { useDebounce } from 'use-debounce';

import styles from './companyField.module.css';

type FieldDescription = {
  color: ColorType;
  text: string;
};

export const CompanyField = ({ control, logicRole, name, id, style }: FormFieldProps) => {
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

  const { t } = useTranslation('translation', {
    keyPrefix: 'extension.salesforcePages.companyField',
  });

  const { companies, isLoading } = useCompanies(companyName);
  const [companyFound, setCompanyFound] = useState(false);
  const [focused, setFocused] = useState(false);
  const [companiesFoundCount, setCompaniesFoundCount] = useState(0);
  const isCompanyCreationEnabled = useCompanyCreationEnabled();
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
        text: t('description.createCompany', { companyName }),
        color: style === 'gradient' ? 'white' : 'bloobirds',
      };
    }
    if (!companyFound) {
      if (companiesFoundCount > 1) {
        return {
          text: t('description.foundCompanies', { count: companiesFoundCount }),
          color: style === 'gradient' ? 'white' : 'tangerine',
        };
      }
      return {
        text: t('description.noMatches'),
        color: style === 'gradient' ? 'white' : 'tangerine',
      };
    }
    return {
      text: t('description.matchingCompany', { companyName }),
      color: style === 'gradient' ? 'white' : 'bloobirds',
    };
  }, [companyName, companyFound, createCompany, companiesFoundCount]);

  return (
    <div className={styles.container}>
      <div className={styles.company_label}>
        {name}
        {logicRole === 'LEAD__COMPANY' && (
          <Tooltip title={t('tooltip')} position="right">
            <Icon
              name="infoFilled"
              color={style === 'gradient' ? 'veryLightBloobirds' : 'darkBloobirds'}
              size={16}
            />
          </Tooltip>
        )}
      </div>
      <div className={styles.dropdown}>
        <Dropdown
          width={256}
          position="bottom-end"
          arrow={false}
          visible={visible}
          anchor={
            <div className={styles.dropdownInput}>
              <Input
                placeholder={t('searchPlaceholder')}
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
                size="small"
              />
              <Icon name="search" color="bloobirds" size={14} className={styles.searchIcon} />
            </div>
          }
        >
          {companies.length === 0 ? (
            <Text className={styles.empty} color="softPeanut" size="s">
              {t('notFound')}
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
    </div>
  );
};
