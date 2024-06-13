import { ToolbarButton } from '@bloobirds-it/flamingo-ui';
import {
  focusEditor,
  isMarkActive,
  MarkToolbarButtonProps,
  toggleMark,
  useEventPlateId,
  usePlateEditorState,
  Value,
} from '@udecode/plate';

export const MarkToolbarButton = <V extends Value>({
  id,
  type,
  clear,
  ...props
}: MarkToolbarButtonProps<V>) => {
  const editor = usePlateEditorState(useEventPlateId(id));

  return (
    <>
      {/* @ts-ignore */}
      <ToolbarButton
        active={!!editor?.selection && isMarkActive(editor, type!)}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();

          toggleMark(editor, { key: type!, clear });
          focusEditor(editor);
        }}
        {...props}
      />
    </>
  );
};
