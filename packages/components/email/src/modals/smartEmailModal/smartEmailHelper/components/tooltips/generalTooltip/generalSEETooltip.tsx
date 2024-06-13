import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TooltipContentBlock, TooltipContentHTML } from '@bloobirds-it/discovery-tooltips';
import { Button, DiscoveryTooltip, Icon, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { useGetInfoDisplayBlockByKey, useUserHelpers } from '@bloobirds-it/hooks';
import { ExtensionHelperKeys } from '@bloobirds-it/types';
import clsx from 'clsx';

import styles from './generalSEETooltip.module.css';

export const GeneralSEETooltip = ({
  visible,
  hasBeenSaved,
}: {
  visible: boolean;
  hasBeenSaved: boolean;
}) => {
  const { saveCustom } = useUserHelpers();
  const [imageLoaded, setImageLoaded] = useState(false);
  const { tooltipContent } = useGetInfoDisplayBlockByKey(ExtensionHelperKeys.SEE_GENERAL_TOOLTIP);
  const shouldShowTooltip = visible && tooltipContent;
  const { t } = useTranslation('translation', { keyPrefix: 'tooltips' });

  useEffect(() => {
    const imgElement = new Image();
    imgElement.src = tooltipContent?.image;

    imgElement.addEventListener('load', () => {
      setImageLoaded(true);
    });

    return () => {
      imgElement.removeEventListener('load', () => {
        setImageLoaded(true);
      });
    };
  }, [tooltipContent?.image]);

  return shouldShowTooltip ? (
    <DiscoveryTooltip
      anchor={
        <Button
          size="medium"
          color="lightestPurple"
          variant="primary"
          iconLeft="book"
          uppercase={false}
          className={styles.anchorButton}
        ></Button>
      }
      position="left-end"
      color="verySoftPurple"
      className={styles.left_bar_tooltip}
      customStyles={{ marginRight: '24px' }}
      arrowCustomStyles={{
        opacity: 0,
      }}
      width="392px"
      height="586px"
      isPersistent
      visible={!hasBeenSaved}
    >
      <>
        <Text size="l" color="purple" weight="heavy" align="center" className={styles.title}>
          <TooltipContentHTML str={tooltipContent?.title} />
        </Text>
        {tooltipContent?.bodyBlocks
          .sort((a, b) => a.order - b.order)
          .map(bodyBlockProps => (
            <TooltipContentBlock
              key={bodyBlockProps.order + bodyBlockProps.icon}
              {...bodyBlockProps}
            />
          ))}
      </>
      <DiscoveryTooltip.TooltipImage className={styles.image}>
        {imageLoaded ? (
          <img
            src={tooltipContent?.image}
            alt="see-preview-image"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              window.open(tooltipContent?.buttonUrl, '_blank');
            }}
          />
        ) : (
          <Spinner name="dots" color="lightestPurple" />
        )}
      </DiscoveryTooltip.TooltipImage>
      <DiscoveryTooltip.TooltipFooter footerColor="softPurple">
        <div>
          <Text size="xs" color="white" align="center" className={styles.footer}>
            <TooltipContentHTML str={tooltipContent?.footer} />
          </Text>
          <div className={styles.buttonsWrapper}>
            <DiscoveryTooltip.TooltipButton
              isMainButton
              onClick={() => {
                if (!hasBeenSaved) {
                  saveCustom({
                    key: ExtensionHelperKeys.SEE_GENERAL_TOOLTIP,
                    data: new Date().toISOString(),
                  });
                }
              }}
              variant="secondary"
              color="white"
              className={clsx(styles.footerButton, styles.secondaryButton)}
              uppercase={false}
            >
              {t('ok')}
            </DiscoveryTooltip.TooltipButton>
            <DiscoveryTooltip.TooltipButton
              isMainButton
              color="purple"
              variant="tertiary"
              className={clsx(styles.footerButton, styles.mainButton)}
              uppercase={false}
              onClick={() => {
                window.open(tooltipContent?.buttonUrl, '_blank');
                if (!hasBeenSaved) {
                  saveCustom({
                    key: ExtensionHelperKeys.SEE_GENERAL_TOOLTIP,
                    data: new Date().toISOString(),
                  });
                }
              }}
            >
              <>
                <Icon name="book" color="purple" size={16} /> {tooltipContent?.buttonText}
              </>
            </DiscoveryTooltip.TooltipButton>
          </div>
        </div>
      </DiscoveryTooltip.TooltipFooter>
    </DiscoveryTooltip>
  ) : (
    <div></div>
  );
};
