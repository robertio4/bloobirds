import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Dropdown,
  Radio,
  RadioGroup,
  Text,
  IconButton,
  useVisible,
} from '@bloobirds-it/flamingo-ui';

import styles from './ChangeLanguage.module.css';

export const fetchLanguages = async () => {
  const result = await fetch(
    `https://delivery.localazy.com/_a7714004326121177803f2a33b98/_e0.json`,
  );

  const data = await result.json();
  const languages = [];

  for (const key in Object.values(data)) {
    const item = Object.values(data)[key];
    const locales = item['locales'];

    locales.forEach(locale => {
      let langCode = locale.language;
      if (locale.region) {
        langCode = langCode + '-' + locale.region;
      }

      if (!languages.includes(langCode)) {
        languages.push(langCode);
      }
    });
  }

  return languages;
};

const ChangeLanguage = () => {
  const { t, i18n } = useTranslation();
  const { ref, visible, setVisible } = useVisible(false);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    fetchLanguages().then(languages => {
      setLanguages(languages);
    });
  }, []);

  return (
    <Dropdown
      ref={ref}
      visible={visible}
      anchor={<IconButton name="language" size={36} onClick={() => setVisible(true)} />}
      onClose={() => setVisible(false)}
    >
      <div className={styles.languageSelect}>
        <Text size="m" color="peanut">
          {t('languages.selectALanguage')}
        </Text>
        <RadioGroup
          value={i18n.language}
          onChange={value => {
            i18n.changeLanguage(value);
          }}
          defaultValue={i18n.language}
        >
          {languages.map(language => (
            <Radio key={language} size="small" value={language}>
              <span className={styles.languageOption}>{t(`languages.${language}`)}</span>
            </Radio>
          ))}
        </RadioGroup>
      </div>
    </Dropdown>
  );
};

export default ChangeLanguage;
