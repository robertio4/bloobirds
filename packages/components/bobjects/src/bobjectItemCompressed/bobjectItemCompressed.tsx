import {
  ClickElementFunctionCompanyType,
  ClickElementFunctionType,
  SearchBobjectType,
} from '@bloobirds-it/types';
import clsx from 'clsx';

import { SearchCardLeft } from '../bobjectItem/components/bobjectCardComponents';
import styles from './bobjectItemCompressed.module.css';

interface BobjectItemCompressedProps {
  bobject: SearchBobjectType;
  handleClick?: ClickElementFunctionType;
  handleCompanyClicked: ClickElementFunctionCompanyType;
  hoverLight?: boolean;
}

/**
 * Compressed Bobject Item Card - For Displaying Last Visited Bobjects (from the Search Bar)
 * @param bobject
 * @param handleClick
 * @param handleCompanyClicked
 * @param isBubbleHomePage
 * @param hoverLight
 * @constructor
 */
export function BobjectItemCompressed({
  bobject,
  handleClick,
  handleCompanyClicked,
  hoverLight = false,
}: BobjectItemCompressedProps) {
  return (
    <div
      className={clsx(styles.bobjectItemCompressed, {
        [styles.bobjectItemCompressedHover]: hoverLight,
      })}
      // @ts-ignore
      onClick={e => handleClick(bobject, e)}
    >
      <SearchCardLeft
        bobject={bobject}
        hits={undefined}
        handleCompanyClicked={handleCompanyClicked}
      />
    </div>
  );
}
