import React from 'react';

import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import { capitalize } from 'lodash';

import { ExtendedFunnelNode } from '../../../../constants/newDashboards';
import styles from './sankeyTooltip.module.css';

const lightOrDark = (color: any) => {
  let b, g, r;

  if (color?.match(/^rgb/)) {
    color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    color = +('0x' + color?.slice(1)?.replace(color.length < 5 && /./g, '$&$&'));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }

  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  if (hsp > 175.5) {
    return 'light';
  } else {
    return 'dark';
  }
};

interface SankeyTooltip {
  items?: number;
  sourcePayload: ExtendedFunnelNode;
  targetPayload: ExtendedFunnelNode;
  extra: { [key: string]: any };
}

export const buildSankeyTooltipForEntity = (entity: string) => (
  props: SankeyTooltip,
): React.ReactElement => {
  const finalEntity = entity === 'Activity' ? 'Meeting' : entity;
  const pluralizeLabel = (text: string) => {
    if (text[text.length - 1] === 'y') {
      const newLabel = text.split('').slice(0, text.length - 1);
      newLabel.push('ies');
      return newLabel.join('');
    }

    const newLabel = text.split('');
    newLabel.push('s');
    return newLabel.join('');
  };
  return (
    <>
      <div>
        <Text weight="heavy" size="xxs">{`${props?.items} ${capitalize(
          pluralizeLabel(finalEntity),
        )}`}</Text>
      </div>
      <div className={styles.tooltipChangeDescription}>
        {!props?.sourcePayload?.isCreationNode && (
          <>
            <Icon name="repeat" size={16} className={styles.tooltipIcon} />
            <Text inline={true} size="xxs" align="center">
              Changed from{' '}
              <span
                style={{ backgroundColor: props?.sourcePayload?.color }}
                className={styles.nodeValue}
              >
                <Text
                  inline={true}
                  size="xs"
                  color={lightOrDark(props?.sourcePayload?.color) === 'light' ? 'peanut' : 'white'}
                >
                  {props?.sourcePayload?.name ?? 'No Value'}
                </Text>
              </span>{' '}
              to{' '}
              <span
                style={{ backgroundColor: props?.targetPayload?.color }}
                className={styles.nodeValue}
              >
                <Text
                  inline={true}
                  size="xs"
                  color={lightOrDark(props?.targetPayload?.color) === 'light' ? 'peanut' : 'white'}
                >
                  {props?.targetPayload?.name ?? 'No Value'}
                </Text>
              </span>
            </Text>
          </>
        )}
        {props?.sourcePayload?.isCreationNode && (
          <>
            <Icon name="logIn" size={16} className={styles.tooltipIcon} />
            <Text inline={true} size="xxs" align="center">
              Created directly {entity === 'Activity' ? 'with result' : 'on status'}{' '}
              <span
                style={{ backgroundColor: props?.sourcePayload?.color }}
                className={styles.nodeValue}
              >
                <Text
                  inline={true}
                  size="xs"
                  color={lightOrDark(props?.sourcePayload?.color) === 'light' ? 'peanut' : 'white'}
                >
                  {props?.sourcePayload?.customName}
                </Text>
              </span>
            </Text>
          </>
        )}
      </div>
      <div className={styles.tooltipChangeDescription}>
        {!props?.sourcePayload?.isCreationNode && (
          <>
            <Icon name="clock" size={16} className={styles.tooltipIcon} />
            <Text inline={true} size="xxs" align="center">
              In average took {props?.extra?.days} days
            </Text>
          </>
        )}
      </div>
    </>
  );
};
