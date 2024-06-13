import {
  createPlateUI,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_UL,
  ELEMENT_PARAGRAPH,
  StyledElement,
  withProps,
  ELEMENT_OL,
  ELEMENT_IMAGE,
} from '@udecode/plate';

import { ELEMENT_SLOTS_FORM } from '../plugins';
import { ELEMENT_IMAGE_LINK } from '../plugins/imagePlugin/defaults';
import { ELEMENT_MEETING_LINK, ELEMENT_MISSING_MEETING_LINK } from '../plugins/meetingLinkPlugin';
import { ELEMENT_RAW_HTML_BLOCK } from '../plugins/rawHTMLBlockPlugin';
import { ELEMENT_REPLY_HISTORY } from '../plugins/replyHistoryPlugin';
import {
  ELEMENT_MISSING_VARIABLE,
  ELEMENT_TEMPLATE_VARIABLE,
} from '../plugins/templateVariablesPlugin';
import styles from './element.module.css';
import { ImageElement } from './imageLink/Image';
import ImageLink from './imageLink/imageLink';
import MeetingLink from './meetingLink/meetingLink';
import MissingMeetingLink from './meetingLink/missingMeetingLink';
import RawHTMLBlock from './rawHTMLBlock/rawHTMLBlock';
import ReplyHistory from './replyHistory/replyHistory';
import SlotsBlock from './slotsBlock/slotsBlock';
import MissingVariable from './templateVariable/missingVariable';
import TemplateVariable from './templateVariable/templateVariable';

const components = createPlateUI({
  [ELEMENT_TEMPLATE_VARIABLE]: TemplateVariable,
  [ELEMENT_MISSING_VARIABLE]: MissingVariable,
  [ELEMENT_MISSING_MEETING_LINK]: MissingMeetingLink,
  [ELEMENT_MEETING_LINK]: MeetingLink,
  [ELEMENT_RAW_HTML_BLOCK]: RawHTMLBlock,
  [ELEMENT_SLOTS_FORM]: SlotsBlock,
  [ELEMENT_REPLY_HISTORY]: ReplyHistory,
  [ELEMENT_IMAGE]: ImageElement,
  [ELEMENT_IMAGE_LINK]: ImageLink,
  [ELEMENT_H1]: withProps(StyledElement, {
    as: 'h1',
    className: styles.h1,
  }),
  [ELEMENT_H2]: withProps(StyledElement, {
    as: 'h2',
    className: styles.h2,
  }),
  [ELEMENT_UL]: withProps(StyledElement, {
    as: 'ul',
    className: styles.ul,
  }),
  [ELEMENT_OL]: withProps(StyledElement, {
    as: 'ol',
    className: styles.ol,
  }),
  [ELEMENT_PARAGRAPH]: withProps(StyledElement, {
    as: 'div',
    className: styles.p,
  }),
});

export default components;
export * from './editorToolbar/editorToolbar';
