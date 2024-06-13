import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { BobjectItemCompressed } from '@bloobirds-it/bobjects';
import { Button, useHover } from '@bloobirds-it/flamingo-ui';
import {
  Bobject,
  BobjectId,
  BobjectTypes,
  ExtensionBobject,
  SearchBobjectType,
} from '@bloobirds-it/types';
import { bobjectPlurals, getExtensionBobjectByIdFields } from '@bloobirds-it/utils';
import clsx from 'clsx';

import { api } from '../../../utils/api';
import { useExtensionContext } from '../context';
import { useFloatingMenuContext } from '../floatingMenu/floatingMenuContext';
import styles from './linkBobjectCard.module.css';

export interface LinkBobjectCardProps {
  bobject: ExtensionBobject | SearchBobjectType | Bobject;
  linkedInUrl?: string;
  salesNavigatorURL?: string;
  setCurrentBobject?: (bobject: ExtensionBobject[]) => void;
  setExactMatch?: (exactMatch: boolean) => void;
  dataToUpdate?: { [x: string]: string };
}

function parseLongIdIntoIdFields(value: BobjectId['value']) {
  if (!value) {
    return {};
  }
  const [accountId, typeName, objectId] = value.split('/');

  return {
    value,
    typeName: typeName as BobjectTypes,
    objectId,
    accountId,
  };
}

export function LinkBobjectCard({
  bobject,
  dataToUpdate,
  linkedInUrl,
  salesNavigatorURL,
  setExactMatch,
  setCurrentBobject,
}: LinkBobjectCardProps) {
  const { useGetSidePeekEnabled, setActiveBobject } = useExtensionContext();
  const { setShowBackButton, setIsDuplicatePage } = useFloatingMenuContext();
  const isBubbleHomepage = !useGetSidePeekEnabled();
  const linkableBobjectClasses = clsx(styles.linkableBobject, {
    [styles.linkableItemSidePeek]: !isBubbleHomepage,
  });
  const bobjectIdValue =
    bobject && 'id' in bobject && bobject?.id?.value ? bobject.id.value : bobject?.rawBobject?.id;
  const [ref, isHovering] = useHover();
  const [loading, setLoading] = useState(false);
  const [bobjectId, setBobjectId] = useState<Partial<BobjectId>>(
    parseLongIdIntoIdFields(bobjectIdValue),
  );
  const { t } = useTranslation();

  useEffect(() => {
    setBobjectId(parseLongIdIntoIdFields(bobjectIdValue));
  }, [bobject]);

  const handleLink = () => {
    setLoading(true);
    getExtensionBobjectByIdFields(bobjectId).then(
      async ({ data: bobjectToSet }: { data: ExtensionBobject }) => {
        try {
          if (linkedInUrl || salesNavigatorURL) {
            if (bobjectId?.typeName) {
              await api.put(
                `/linkedin/${bobjectPlurals[bobjectId?.typeName]?.toLowerCase()}/` +
                  bobjectToSet.id.objectId,
                {
                  salesNavigatorUrl: salesNavigatorURL,
                  linkedInUrl: linkedInUrl,
                },
              );
            }
          } else if (dataToUpdate) {
            if (bobjectToSet?.id?.value) {
              await api.patch(`/bobjects/${bobjectToSet?.id?.value}/raw`, {
                contents: {
                  ...dataToUpdate,
                },
                params: {},
              });
            }
          }
          if (bobjectToSet) {
            setCurrentBobject?.([bobjectToSet]);
            setActiveBobject(bobjectToSet);
            setExactMatch?.(true);
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      },
    );
  };

  const handleRedirect = () => {
    setLoading(true);
    getExtensionBobjectByIdFields(bobjectId).then(({ data: bobjectToSet }) => {
      if (bobjectToSet) {
        setActiveBobject(bobjectToSet);
        setShowBackButton(true);
        setIsDuplicatePage(true);
      }
      setLoading(false);
    });
  };

  return (
    <div ref={ref} className={linkableBobjectClasses} key={bobjectId?.value}>
      <BobjectItemCompressed
        bobject={
          {
            ...bobject,
            url: null,
            bobjectType:
              bobject && 'bobjectType' in bobject
                ? bobject?.bobjectType
                : (bobjectId?.typeName as
                    | BobjectTypes.Company
                    | BobjectTypes.Lead
                    | BobjectTypes.Opportunity),
          } as SearchBobjectType
        }
        handleCompanyClicked={() => null}
        handleClick={handleRedirect}
        key={bobjectId?.value}
        hoverLight
      />
      {isHovering && (
        <div className={styles._hoverButtons}>
          <Button
            variant="secondary"
            iconLeft="bloobirds"
            size="small"
            onClick={handleRedirect}
            disabled={loading}
          />
          <Button
            iconLeft={linkedInUrl || salesNavigatorURL ? 'linkedin' : 'salesforce'}
            size="small"
            onClick={handleLink}
            disabled={loading}
            uppercase={false}
          >
            {t('link')}
          </Button>
        </div>
      )}
    </div>
  );
}
