import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import { useUserHelpers } from '@bloobirds-it/hooks';
import { CustomUserHelperKeys, ExtensionBobject } from '@bloobirds-it/types';
import { isSalesforcePage, normalizeUrl } from '@bloobirds-it/utils';
import clsx from 'clsx';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { mutate } from 'swr';

import { ExtendedContextTypes } from '../../../../../types/extendedContext';
import {
  ContactDetailsSource,
  Source,
} from '../../../contactDetails/contactDetailSource/contactDetailSource';
import { useExtensionContext } from '../../../context';
import { BloobirdsDetails } from './components/bloobirdsDetails';
import { SalesforceDetails } from './components/salesforceDetails';
import styles from './contactViewDetails.module.css';

export function ContactViewDetails({ bobject }: { bobject: ExtensionBobject }) {
  const { useGetSettings } = useExtensionContext();
  const settings = useGetSettings();
  const salesforceInstance = settings?.account?.salesforceInstance;
  if (!bobject) return null;
  return salesforceInstance ? (
    <ContactViewAllDetails bobject={bobject} />
  ) : (
    <ContactViewBloobirdsDetails bobject={bobject} />
  );
}

const { persistAtom } = recoilPersist();

const sourceAtom = atom({
  key: 'sourceAtom',
  default: isSalesforcePage(normalizeUrl(window.location.href))
    ? Source.salesforce
    : Source.bloobirds,
  effects_UNSTABLE: [persistAtom],
});

function ContactViewAllDetails({ bobject }: { bobject: ExtensionBobject }) {
  const { useGetSettings, useGetSidePeekEnabled } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const settings = useGetSettings();
  const salesforceInstance = settings?.account?.salesforceInstance;
  const [source, setSource] = useRecoilState<Source>(sourceAtom);
  const resetSource = useResetRecoilState(sourceAtom);
  const [mutated, setMutated] = useState(false);
  const { setExtendedContext } = useExtensionContext();
  const { t } = useTranslation();
  // Handle default with helpers
  const { get } = useUserHelpers();
  const helperKey = CustomUserHelperKeys.HAVE_SAVED_FIELDS_CUSTOM_ORDER;
  const helperValue: string[] = get(helperKey) ? JSON.parse(get(helperKey)) : [];
  const helperValueKey = source + bobject.id.typeName;
  const openExtendedScreen = () =>
    setExtendedContext({
      type: ExtendedContextTypes.ORDER_CONTACT_DETAILS,
      extensionBobject: bobject,
      extraInfo: {
        source,
        setSource: () => undefined,
      },
      mutate: () => {
        mutate(
          `/linkedin/externalObject/SALESFORCE/${source.toUpperCase()}/${bobject.id.typeName.toUpperCase()}`,
        );
        if (source === Source.salesforce) mutate(`/utils/service/salesforce/query`);
      },
    });

  useEffect(() => {
    if (!salesforceInstance) resetSource();
  }, []);

  const detailHeaderClasses = clsx(styles.detail_header, {
    [styles.detail_header_sidePeek]: sidePeekEnabled,
  });

  return (
    <div className={styles.detail_container}>
      <div className={detailHeaderClasses}>
        <Text size="xs" color="softPeanut" weight="bold">
          {t('sidePeek.overview.fields.dataFrom')}
        </Text>
        <ContactDetailsSource
          source={source}
          setSource={(src: Source) => {
            setSource(source => {
              if (source !== src) {
                return src;
              } else return source;
            });
            // next lines are necessary to force re-fetching when changing source
            // even if we don't know if data has been changed
            if (mutated) {
              setMutated(false);
            }
          }}
        />
        <div className={styles.detail_header_row} onClick={openExtendedScreen}>
          <Icon name="settings" color="bloobirds" size={18} />
        </div>
      </div>
      <ContactViewDetailsFields
        hasHelper={helperValue.includes(helperValueKey)}
        source={source}
        bobject={bobject}
        openExtendedScreen={openExtendedScreen}
      />
    </div>
  );
}

function ContactViewBloobirdsDetails({ bobject }: { bobject: ExtensionBobject }) {
  const { setExtendedContext, useGetSidePeekEnabled } = useExtensionContext();

  // Handle default with helpers
  const { get } = useUserHelpers();
  const helperKey = CustomUserHelperKeys.HAVE_SAVED_FIELDS_CUSTOM_ORDER;
  const helperValue: string[] = get(helperKey) ? JSON.parse(get(helperKey)) : [];
  const helperValueKey = Source.bloobirds + bobject.id.typeName;
  const hasHelper = helperValue.includes(helperValueKey);
  const sidePeekEnabled = useGetSidePeekEnabled();
  const { t } = useTranslation();

  const openExtendedScreen = () =>
    setExtendedContext({
      type: ExtendedContextTypes.ORDER_CONTACT_DETAILS,
      extensionBobject: bobject,
      extraInfo: { source: Source.bloobirds },
      mutate: () =>
        mutate(
          `/linkedin/externalObject/SALESFORCE/BLOOBIRDS/${bobject.id.typeName.toUpperCase()}`,
        ),
    });

  const detailHeaderClasses = clsx(styles.detail_header, {
    [styles.detail_header_sidePeek]: sidePeekEnabled,
  });

  return (
    <div className={styles.detail_container}>
      <div className={detailHeaderClasses}>
        <Text size="xs" color="softPeanut" weight="bold">
          {t('sidePeek.overview.fields.dataFrom')}
        </Text>
        <ContactDetailsSource source={Source.bloobirds} setSource={() => null} />
        <div className={styles.detail_header_row} onClick={openExtendedScreen}>
          <Icon name="settings" color="bloobirds" size={18} />
        </div>
      </div>
      <ContactViewDetailsFields
        hasHelper={hasHelper}
        source={Source.bloobirds}
        bobject={bobject}
        openExtendedScreen={openExtendedScreen}
      />
    </div>
  );
}

interface ContactViewDetailsFieldsProps {
  hasHelper: boolean;
  source: Source;
  bobject: ExtensionBobject;
  openExtendedScreen: () => void;
}
function ContactViewDetailsFields(props: ContactViewDetailsFieldsProps) {
  const { source } = props;
  switch (source) {
    case Source.bloobirds:
      return <BloobirdsDetails {...props} />;
    case Source.salesforce:
      return <SalesforceDetails {...props} />;
  }
}
