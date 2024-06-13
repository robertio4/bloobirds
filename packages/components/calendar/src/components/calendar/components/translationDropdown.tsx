import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Dropdown, Icon, Radio, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import spacetime from 'spacetime';

const ESP_Dates = {
  days: {
    long: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    short: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  },
  months: {
    long: [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ],
    short: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  },
};

const ENG_Dates = {
  days: {
    long: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    short: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
  },
  months: {
    long: [
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december',
    ],
    short: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
  },
};

export const TranslationDropdown = ({ language, setLanguage }) => {
  const { visible, setVisible } = useVisible();
  const { t } = useTranslation();
  const languages = ['en', 'es'];

  useEffect(() => {
    if (window.navigator.language?.includes('es')) {
      setLanguage('es');
    }
  }, []);

  useEffect(() => {
    if (language === 'es') {
      spacetime.now().i18n({
        ...ESP_Dates,
        useTitleCase: true, // automatically in .format()
      });
    } else {
      spacetime.now().i18n({
        ...ENG_Dates,
        useTitleCase: true, // automatically in .format()
      });
    }
  }, [language]);

  return (
    <Dropdown
      position="top"
      visible={visible}
      anchor={
        <Button
          variant="secondary"
          size="small"
          uppercase={false}
          onClick={() => setVisible(!visible)}
        >
          <Icon name="language" />
        </Button>
      }
    >
      <div
        style={{
          width: '321px',
          height: '175px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '24px',
          gap: '8px',
          boxSizing: 'border-box',
        }}
      >
        <Text size="m" color="peanut">
          {t('languages.selectALanguage')}
        </Text>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {languages.map(lng => (
            <Radio
              key={lng}
              size="small"
              value={lng}
              checked={language === lng}
              onClick={() => setLanguage(lng)}
            >
              {t(`languages.${lng}`)}
            </Radio>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => setVisible(false)}
        >
          <Icon name="save" color="bloobirds" size={16} />
          <Text size="m" color="bloobirds">
            {t('common.save')}
          </Text>
        </div>
      </div>
    </Dropdown>
  );
};
