import { ELEMENT_IMAGE } from '@udecode/plate';
import { getAboveNode, TEditableProps, useEditorRef } from '@udecode/plate-core';
import {
  LaunchIcon,
  LinkIcon,
  LinkOffIcon,
  ShortTextIcon,
  TLinkElement,
  useFloatingLinkSelectors,
} from '@udecode/plate-link';
import {
  FloatingIconWrapper,
  FloatingInputWrapper,
  FloatingVerticalDivider,
} from '@udecode/plate-ui-toolbar';
import { FloatingLink } from './FloatingLink';
import styles from './PlateFloatingLink.module.css';

export const PlateFloatingLink = ({ readOnly }: TEditableProps) => {
  const isEditing = useFloatingLinkSelectors().isEditing();

  const editor = useEditorRef();
  const linkAbove = getAboveNode<TLinkElement>(editor);

  if (readOnly) return null;
  const input = (
    <div className={styles.container}>
      <FloatingInputWrapper>
        <FloatingIconWrapper>
          <LinkIcon width={18} />
        </FloatingIconWrapper>

        <FloatingLink.UrlInput className={styles.floatingInputCss} placeholder="Paste link" />
      </FloatingInputWrapper>

      <div className={styles.line} />

      {linkAbove?.[0].type !== ELEMENT_IMAGE && (
        <FloatingInputWrapper>
          <FloatingIconWrapper>
            <ShortTextIcon width={18} />
          </FloatingIconWrapper>
          <FloatingLink.TextInput
            className={styles.floatingInputCss}
            placeholder="Text to display"
          />
        </FloatingInputWrapper>
      )}
    </div>
  );

  const editContent = !isEditing ? (
    <div className={styles.floatingRowCss}>
      <FloatingLink.EditButton className={styles.plateButtonCss}>Edit link</FloatingLink.EditButton>

      <FloatingVerticalDivider />

      <FloatingLink.OpenLinkButton className={styles.floatingButtonCss}>
        <LaunchIcon width={18} />
      </FloatingLink.OpenLinkButton>

      <FloatingVerticalDivider />

      <FloatingLink.UnlinkButton className={styles.floatingButtonCss}>
        <LinkOffIcon width={18} />
      </FloatingLink.UnlinkButton>
    </div>
  ) : (
    input
  );

  return (
    <>
      <FloatingLink.InsertRoot className={styles.floatingRootCss}>{input}</FloatingLink.InsertRoot>

      <FloatingLink.EditRoot className={styles.floatingRootCss}>
        {editContent}
      </FloatingLink.EditRoot>
    </>
  );
};
