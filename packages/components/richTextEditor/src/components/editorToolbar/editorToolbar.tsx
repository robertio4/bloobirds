import { Fragment, useEffect, useRef, useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Button,
  ColorType,
  Dropdown,
  Icon,
  IconButton,
  Input,
  Item,
  Radio,
  RadioGroup,
  Section,
  Select,
  Text,
  Toolbar,
  ToolbarButton,
  ToolbarMenu,
  ToolbarSection,
  useToasts,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import {
  useActiveUserId,
  useBaseEmailVariables,
  useBaseEmailVariableValue,
  useMeetingLinks,
  useUserSearch,
} from '@bloobirds-it/hooks';
import { api, recoverScrollOfBox, removeScrollOfBox, toTitleCase } from '@bloobirds-it/utils';
import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_LINK,
  ELEMENT_OL,
  ELEMENT_PARAGRAPH,
  ELEMENT_UL,
  focusEditor,
  getPluginType,
  insertNodes,
  isCollapsed,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  select,
  someNode,
  toggleList,
  toggleNodeType,
  triggerFloatingLink,
  useEventPlateId,
} from '@udecode/plate';

import { MyEditor, useMyPlateEditorRef } from '../../config/typescript';
import { insertTemplateVariable, insertImage, ELEMENT_MEETING_LINK } from '../../plugins';
import { ColorPickerToolbarDropdown } from './ColorPickerToolbarDropdown';
import { MarkToolbarButton } from './MarkToolbarButton';
import { SelectSignatureDropdown } from './SelectSignatureDropdown';
import { SizeDropdownMenu } from './SizeDropdownMenu';
import styles from './editorToolbar.module.css';

export const EditorToolbar = ({
  children,
  backgroundColor = 'bloobirds',
  disabled = false,
}: {
  children: React.ReactNode;
  backgroundColor?: ColorType;
  disabled?: boolean;
}) => {
  const isLinkedinPage = window.location.href.includes('linkedin');

  return (
    <Toolbar
      disabled={disabled}
      backgroundColor={backgroundColor as ColorType}
      className={isLinkedinPage && styles.toolbar}
    >
      {children}
    </Toolbar>
  );
};

export const EditorToolbarControlsSection = ({ color }: { color?: ColorType }) => {
  const editor = useMyPlateEditorRef(useEventPlateId());

  return (
    <ToolbarSection>
      <ToolbarButton
        icon="undoRevert"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          editor?.undo();
          focusEditor(editor);
        }}
        color={color}
      />
      <ToolbarButton
        icon="redoReload"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          editor?.redo();
          focusEditor(editor);
        }}
        color={color}
      />
    </ToolbarSection>
  );
};

export const EditorToolbarFontStylesSection = ({
  color,
  enableChangeSize = false,
}: {
  color?: ColorType;
  enableChangeSize?: boolean;
}) => {
  const editor = useMyPlateEditorRef(useEventPlateId());
  const hasSelection = !!editor?.selection;

  return (
    <ToolbarSection>
      {enableChangeSize && <SizeDropdownMenu color={color || 'white'} />}
      <ToolbarButton
        icon="header1"
        active={hasSelection && someNode(editor, { match: { type: ELEMENT_H1 } })}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          toggleNodeType(editor, { activeType: ELEMENT_H1 });
          focusEditor(editor);
        }}
        color={color || 'white'}
      />
      <ToolbarButton
        icon="header2"
        active={hasSelection && someNode(editor, { match: { type: ELEMENT_H2 } })}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          toggleNodeType(editor, { activeType: ELEMENT_H2 });
          focusEditor(editor);
        }}
        color={color || 'white'}
      />
      <ToolbarButton
        icon="quote"
        active={hasSelection && someNode(editor, { match: { type: ELEMENT_BLOCKQUOTE } })}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          toggleNodeType(editor, { activeType: ELEMENT_BLOCKQUOTE });
          focusEditor(editor);
        }}
        color={color || 'white'}
      />
    </ToolbarSection>
  );
};

export const EditorToolbarLink = ({ color, editor }: { color?: ColorType; editor?: MyEditor }) => {
  const myPlateEditor = useMyPlateEditorRef(useEventPlateId()) || editor;
  const type = getPluginType(editor, ELEMENT_LINK);
  const hasSelection = !!editor?.selection;

  return (
    <ToolbarButton
      icon="link"
      color={color || 'white'}
      active={hasSelection && someNode(myPlateEditor, { match: { type } })}
      onMouseDown={async event => {
        if (!myPlateEditor) return;

        event.preventDefault();
        event.stopPropagation();

        focusEditor(myPlateEditor, myPlateEditor.selection ?? myPlateEditor.prevSelection!);

        setTimeout(() => {
          triggerFloatingLink(myPlateEditor, { focused: true });
        }, 0);
      }}
    />
  );
};

export const EditorToolbarSnippet = ({ onClick }: { onClick: () => void }) => {
  const editor = useMyPlateEditorRef(useEventPlateId());

  return (
    <ToolbarButton
      icon="snippet"
      color="white"
      onMouseDown={async event => {
        if (!editor) return;
        onClick?.();
        event.preventDefault();
        event.stopPropagation();
        focusEditor(editor, editor?.selection ?? editor?.prevSelection);
      }}
    />
  );
};

export const EditorToolbarTextMarksSection = ({
  color,
  editor,
  enableChangeColor = false,
}: {
  color?: ColorType;
  editor?: MyEditor;
  enableChangeColor?: boolean;
}) => {
  const myPlateEditor = useMyPlateEditorRef() || editor;

  return (
    <ToolbarSection>
      <MarkToolbarButton
        type={getPluginType(myPlateEditor, MARK_BOLD)}
        icon="textBold"
        color={color || 'white'}
        actionHandler="onMouseDown"
      />
      <MarkToolbarButton
        type={getPluginType(myPlateEditor, MARK_ITALIC)}
        icon="textItalic"
        color={color || 'white'}
        actionHandler="onMouseDown"
      />
      <MarkToolbarButton
        type={getPluginType(myPlateEditor, MARK_UNDERLINE)}
        icon="textUnderlined"
        color={color || 'white'}
        actionHandler="onMouseDown"
      />
      {enableChangeColor && <ColorPickerToolbarDropdown color={color || 'white'} />}
      <EditorToolbarLink color={color} editor={myPlateEditor} />
    </ToolbarSection>
  );
};

export const EditorToolbarListsSection = ({ color }: { color?: ColorType }) => {
  const editor = useMyPlateEditorRef(useEventPlateId());
  const hasSelection = !!editor?.selection;

  return (
    <ToolbarSection>
      <ToolbarButton
        icon="textBulletList"
        color={color || 'white'}
        active={hasSelection && someNode(editor, { match: { type: ELEMENT_UL } })}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          toggleList(editor, { type: ELEMENT_UL });
          focusEditor(editor);
        }}
      />
      <ToolbarButton
        icon="textOrderedList"
        color={color || 'white'}
        active={hasSelection && someNode(editor, { match: { type: ELEMENT_OL } })}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          toggleList(editor, { type: ELEMENT_OL });
          focusEditor(editor);
        }}
      />
    </ToolbarSection>
  );
};

export const EditorToolbarSection = ({ children }) => <ToolbarSection>{children}</ToolbarSection>;

export const EditorToolbarImage = ({
  color = 'white',
  editor,
}: {
  color?: ColorType;
  editor?: MyEditor;
}) => {
  const myPlateEditorRef = useMyPlateEditorRef(useEventPlateId());
  const myPlateEditor = myPlateEditorRef || editor;
  const lastSelection = useRef(null);
  const { createToast } = useToasts();
  const { t } = useTranslation('translation', { keyPrefix: 'richTextEditor.toasts' });

  const isFocused =
    !!myPlateEditorRef && !!myPlateEditor?.selection && isCollapsed(myPlateEditor.selection);

  useEffect(() => {
    const handleSelectionChange = () => {
      if (myPlateEditor?.selection) {
        lastSelection.current = myPlateEditor.selection;
      }
    };
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, [myPlateEditor]);

  const addImage = async event => {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('visible', 'true');

    const response = await api.post('/messaging/mediaFiles', formData, {
      validateStatus: () => true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 201) {
      if (!isFocused) {
        const newNode = {
          type: ELEMENT_PARAGRAPH,
          children: [{ text: '' }],
        };

        // @ts-ignore
        insertNodes(editor, newNode, {
          at: [0],
        });

        insertImage(myPlateEditor, response.data.url, {
          at: [0],
        });
      } else {
        if (lastSelection.current) {
          select(myPlateEditor, lastSelection.current);
        }

        insertImage(myPlateEditor, response.data.url);
      }
    } else if (
      response.status === 500 &&
      response.data?.message.includes('SizeLimitExceededException')
    ) {
      createToast({
        message: t('sizeError'),
        type: 'error',
      });
    } else {
      createToast({ message: t('uploadAttachmentError'), type: 'error' });
    }
  };

  // This allows selecting the same image twice
  const resetSelectedImage = event => {
    event.target.value = null;
  };

  return (
    <label className={styles.label} htmlFor="insert-image">
      <Icon name="image" size={20} color={color} />
      <input
        type="file"
        id="insert-image"
        name="insert-image"
        data-test="insert-image"
        onClick={resetSelectedImage}
        onChange={addImage}
        className={styles.input}
        accept=".png, .jpeg, .gif, .jpg"
        multiple={false}
      />
    </label>
  );
};

export const TemplateEditorToolbarImage = ({ color = 'white' }: { color?: ColorType }) => {
  const eventPlateId = useEventPlateId();
  const myPlateEditor = useMyPlateEditorRef(eventPlateId);
  const lastSelection = useRef(null);
  const { createToast } = useToasts();
  const { t } = useTranslation('translation', { keyPrefix: 'richTextEditor.toasts' });

  useEffect(() => {
    const handleSelectionChange = () => {
      if (myPlateEditor?.selection) {
        lastSelection.current = myPlateEditor.selection;
      }
    };
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, [myPlateEditor]);

  const addImage = async event => {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('visible', 'true');

    const response = await api.post('/messaging/mediaFiles', formData, {
      validateStatus: () => true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 201) {
      if (lastSelection?.current) {
        select(myPlateEditor, lastSelection.current);
      }
      insertImage(myPlateEditor, response.data.url);
    } else if (
      response.status === 500 &&
      response.data?.message.includes('SizeLimitExceededException')
    ) {
      createToast({
        message: t('sizerError'),
        type: 'error',
      });
    } else {
      createToast({ message: t('uploadAttachmentError'), type: 'error' });
    }
  };

  // This allows selecting the same image twice
  const resetSelectedImage = event => {
    event.target.value = null;
  };

  return (
    <label className={styles.label} htmlFor="insert-image-2">
      <Icon name="image" size={20} color={color} />
      <input
        type="file"
        id="insert-image-2"
        name="insert-image-2"
        data-test="insert-image-2"
        onClick={event => resetSelectedImage(event)}
        onChange={addImage}
        className={styles.input}
        accept=".png, .jpeg, .gif, .jpg"
        multiple={false}
      />
    </label>
  );
};

export const EditorToolbarFileAttachment = ({
  color = 'white',
  onAttachment,
}: {
  color?: ColorType;
  onAttachment: (files: Array<any>) => void;
}) => (
  <label className={styles.label} htmlFor="file-attachment">
    <Icon name="paperclip" size={20} color={color} />
    <input
      type="file"
      id="file-attachment"
      name="file-attachment"
      data-test="file-attachment"
      onChange={event => {
        onAttachment(Array.from(event.target.files));
        event.target.value = null;
      }}
      className={styles.input}
      multiple={true}
    />
  </label>
);

export const EditorToolbarTimeSlots = ({
  color = 'white',
  toggleTimeSlots,
}: {
  color?: ColorType;
  toggleTimeSlots: () => void;
}) => {
  return (
    <div className={styles.timeSlotsButton}>
      <IconButton name="meetingSlots" color={color} size={20} onClick={toggleTimeSlots} />
    </div>
  );
};

export const TemplateEditorToolbarFileAttachment = ({
  color = 'white',
  onAttachment,
}: {
  color?: ColorType;
  onAttachment: (files: Array<any>) => void;
}) => (
  <label className={styles.label} htmlFor="file-attachment-2">
    <Icon name="paperclip" size={20} color={color} />
    <input
      type="file"
      id="file-attachment-2"
      name="file-attachment-2"
      data-test="file-attachment-2"
      onChange={event => {
        onAttachment(Array.from(event.target.files));
        event.target.value = null;
      }}
      className={styles.input}
      multiple={true}
    />
  </label>
);

export const EditorToolbarTemplateVariable = ({
  disableEmpty = false,
  editor,
}: {
  disableEmpty?: boolean;
  editor?: MyEditor;
}) => {
  const myPlateEditorRef = useMyPlateEditorRef(useEventPlateId());
  const myPlateEditor = myPlateEditorRef || editor;
  const { ref, visible, setVisible } = useVisible(false);
  const emailVariables = useBaseEmailVariables();
  const emailValues = useBaseEmailVariableValue();
  const isDisableVariable = (group, variable) => {
    return disableEmpty && !emailValues[group]?.find(value => variable.id === value.id).value;
  };
  const { t } = useTranslation('translation', { keyPrefix: 'richTextEditor.variables' });

  const isFocused =
    !!myPlateEditorRef && !!myPlateEditor?.selection && isCollapsed(myPlateEditor.selection);

  useEffect(() => {
    if (visible) {
      removeScrollOfBox();
    }

    if (!visible) {
      recoverScrollOfBox();
    }
  }, [visible]);

  return (
    <div className={styles.templateVariable}>
      <ToolbarMenu
        ref={ref}
        icon="textVariable"
        width={200}
        visible={visible}
        // @ts-ignore
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();
          setVisible(!visible);
        }}
      >
        <div className={styles.variableList}>
          {emailVariables &&
            Object.entries(emailVariables).map(([group, variables]) => (
              <Fragment key={group}>
                <Section>{toTitleCase(t(group.toLowerCase()))}</Section>
                {/* @ts-ignore */}
                {variables.map(variable => (
                  <Item
                    key={variable.id}
                    disabled={isDisableVariable(group, variable)}
                    onMouseDown={event => {
                      if (!isDisableVariable(group, variable)) {
                        event.preventDefault();
                        event.stopPropagation();
                        if (!isFocused) {
                          insertTemplateVariable(
                            myPlateEditor,
                            {
                              id: variable.id,
                              name: variable.name,
                              group: variable.type,
                            },
                            {
                              at: [0, 0],
                            },
                          );
                        } else {
                          insertTemplateVariable(myPlateEditor, {
                            id: variable.id,
                            name: variable.name,
                            group: variable.type,
                          });
                        }
                        setVisible(false);
                      }
                    }}
                  >
                    {variable.name}
                  </Item>
                ))}
              </Fragment>
            ))}
        </div>
      </ToolbarMenu>
    </div>
  );
};

export const FloatingTemplateVariable = ({
  disableEmpty = false,
  editor,
}: {
  disableEmpty?: boolean;
  editor: MyEditor;
}) => {
  const { ref, visible, setVisible } = useVisible(false);
  const emailVariables = useBaseEmailVariables();
  const emailValues = useBaseEmailVariableValue();
  const { t } = useTranslation('translation', { keyPrefix: 'richTextEditor.variables' });

  const isDisableVariable = (group, variable) => {
    return disableEmpty && !emailValues[group]?.find(value => variable.id === value.id).value;
  };

  useEffect(() => {
    if (visible) {
      removeScrollOfBox();
    }

    if (!visible) {
      recoverScrollOfBox();
    }
  }, [visible]);

  return (
    <Dropdown
      ref={ref}
      visible={visible}
      position="bottom"
      width={200}
      anchor={
        <IconButton
          className={styles.floatingTemplateVariable}
          name="textVariable"
          onClick={event => {
            event.preventDefault();
            event.stopPropagation();
            setVisible(!visible);
          }}
        />
      }
    >
      <div className={styles.variableList}>
        {emailVariables &&
          Object.entries(emailVariables).map(([group, variables]) => (
            <Fragment key={group}>
              <Section>{toTitleCase(t(group.toLowerCase()))}</Section>
              {/* @ts-ignore */}
              {variables.map(variable => (
                <Item
                  key={variable.id}
                  disabled={isDisableVariable(group, variable)}
                  onMouseDown={event => {
                    if (!isDisableVariable(group, variable)) {
                      event.preventDefault();
                      event.stopPropagation();
                      insertTemplateVariable(editor, {
                        id: variable.id,
                        name: variable.name,
                        group: variable.type,
                      });
                      setVisible(false);
                    }
                  }}
                >
                  {variable.name}
                </Item>
              ))}
            </Fragment>
          ))}
      </div>
    </Dropdown>
  );
};

function getDefaultLink(meetingLinks, t) {
  if (!meetingLinks || meetingLinks?.length === 0) return t('noMeetingLinks');
  return meetingLinks?.find(meetingLink => meetingLink.defaultLink);
}

export const EditorToolbarMeetingLink = ({
  color = 'white',
  editor,
}: {
  color?: ColorType;
  editor?: MyEditor;
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // @ts-ignore
  const { users } = useUserSearch() || [];
  const activeUserId = useActiveUserId();
  const activeUsers = users?.filter(({ active, id }) => active && activeUserId !== id);
  const [linkOwner, setLinkOwner] = useState(true);
  const myPlateEditorRef = useMyPlateEditorRef(useEventPlateId());
  const myPlateEditor = myPlateEditorRef || editor;
  const type = getPluginType(myPlateEditor, ELEMENT_MEETING_LINK);
  const { ref, visible, setVisible } = useVisible(false);
  const [selectedUser, setSelectedUser] = useState();
  const { getUserMeetingLinks } = useMeetingLinks();
  const meetingLinks = getUserMeetingLinks(selectedUser || activeUserId);
  const { t } = useTranslation('translation', { keyPrefix: 'richTextEditor.meetingLinks' });
  const defaultLink = getDefaultLink(meetingLinks, t);

  const isFocused =
    !!myPlateEditorRef && !!myPlateEditor?.selection && isCollapsed(myPlateEditor.selection);

  function resetValues() {
    reset({ displayText: '' });
    setLinkOwner(true);
    setSelectedUser(undefined);
  }
  useEffect(() => {
    if (visible) {
      removeScrollOfBox();
    }

    if (!visible) {
      resetValues();
      recoverScrollOfBox();
    }
  }, [visible]);

  const {
    field: { ref: textRef, ...textField },
  } = useController({
    control,
    name: 'displayText',
    rules: {
      required: true,
    },
  });

  const {
    field: { value: meetingLink, onChange: meetingLinkOnChange },
  } = useController({
    control,
    name: 'meetingLink',
    rules: {
      required: true,
    },
  });

  useEffect(() => {
    reset({ meetingLink: defaultLink?.id });
  }, [defaultLink, visible]);

  const handleAddMeetingLink = async (data, event) => {
    if (!myPlateEditor) return;
    event.preventDefault();

    const meetingLink = {
      type,
      userId: selectedUser || '__me__',
      linkId:
        data?.meetingLink === defaultLink?.id && !selectedUser ? '__default__' : data?.meetingLink,
      children: [{ text: data?.displayText }],
    };

    if (!isFocused) {
      focusEditor(myPlateEditor);

      setTimeout(() => {
        // @ts-ignore
        insertNodes(myPlateEditorRef, meetingLink);
      }, 100);
    } else {
      // @ts-ignore
      insertNodes(myPlateEditor, meetingLink);
    }

    setVisible(false);
  };

  return (
    <div className={styles.meetingLinkButton}>
      <Dropdown
        ref={ref}
        visible={visible}
        anchor={
          <IconButton
            name="calendar"
            color={color}
            size={20}
            onClick={() => setVisible(!visible)}
          />
        }
      >
        <form>
          <div className={styles.meetingLinksDropdownWrapper}>
            <Text size="m" className={styles.meetingLinksHeader}>
              {t('title')}
            </Text>
            <div className={styles.meetingLinksTextDisplayInput}>
              <Input
                ref={textRef as any}
                placeholder={t('placeholder')}
                size="small"
                width={'273px'}
                error={errors?.displayText && t('required')}
                {...textField}
              />
            </div>
            <Text size="m" className={styles.meetingLinksHeader}>
              {t('linkTo')}
            </Text>
            <div className={styles.radioGroup}>
              <RadioGroup
                defaultValue={linkOwner}
                onChange={value => {
                  setLinkOwner(value);
                  if (value) setSelectedUser(activeUserId);
                }}
              >
                <Radio size="small" value={true} expand>
                  <Text size="s">{t('myMeetingLinks')}</Text>
                </Radio>
                <Radio size="small" value={false} expand>
                  <Text size="s">{t('otherMeetingLinks')}</Text>
                </Radio>
              </RadioGroup>
            </div>
            <div className={styles.dropdownSelects}>
              {!linkOwner && (
                <Select
                  placeholder={t('user')}
                  size="small"
                  borderless={false}
                  width={'273px'}
                  value={selectedUser}
                  onChange={setSelectedUser}
                >
                  {activeUsers?.map(({ id, name }) => (
                    <Item key={id} value={id}>
                      {name}
                    </Item>
                  ))}
                </Select>
              )}
              {typeof defaultLink === 'string' && selectedUser ? (
                <Text size="s">{defaultLink}</Text>
              ) : (
                <Select
                  placeholder={t('meetingLink')}
                  size="small"
                  borderless={false}
                  width={'273px'}
                  disabled={!selectedUser && !linkOwner}
                  error={errors?.meetingLink && t('required')}
                  value={meetingLink}
                  onChange={meetingLinkOnChange}
                >
                  {meetingLinks?.map(({ id, title }) => (
                    <Item key={id} value={id}>
                      {title}
                    </Item>
                  ))}
                </Select>
              )}
            </div>
            <div className={styles.addButton}>
              <Button
                size="small"
                disabled={
                  (errors && Object.keys(errors)?.length > 0) || typeof defaultLink === 'string'
                }
                onClick={handleSubmit(handleAddMeetingLink)}
              >
                {t('add')}
              </Button>
            </div>
          </div>
        </form>
      </Dropdown>
    </div>
  );
};

export const TemplateEditorToolbarMeetingLink = ({ color = 'white' }: { color?: ColorType }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // @ts-ignore
  const { users } = useUserSearch() || [];
  const activeUserId = useActiveUserId();
  const activeUsers = users?.filter(({ active }) => active);
  const [linkOwner, setLinkOwner] = useState(true);
  const editor = useMyPlateEditorRef(useEventPlateId());
  const type = getPluginType(editor, ELEMENT_MEETING_LINK);
  const { ref, visible, setVisible } = useVisible(false);
  const [selectedUser, setSelectedUser] = useState();
  const { getUserMeetingLinks } = useMeetingLinks();
  const meetingLinks = getUserMeetingLinks(selectedUser || activeUserId);
  const { t } = useTranslation('translation', { keyPrefix: 'richTextEditor.meetingLinks' });
  const defaultLink = getDefaultLink(meetingLinks, t);

  function resetValues() {
    reset({ displayText: '' });
    setLinkOwner(true);
    setSelectedUser(undefined);
  }

  useEffect(() => {
    if (visible) {
      removeScrollOfBox();
    }

    if (!visible) {
      resetValues();
      recoverScrollOfBox();
    }
  }, [visible]);

  const {
    field: { ref: textRef, ...textField },
  } = useController({
    control,
    name: 'displayText',
    rules: {
      required: true,
    },
  });

  const {
    field: { value: meetingLink, onChange: meetingLinkOnChange },
  } = useController({
    control,
    name: 'meetingLink',
  });

  useEffect(() => {
    reset({ meetingLink: defaultLink?.id });
  }, [defaultLink]);

  useEffect(() => {
    if (!linkOwner && selectedUser && meetingLinks?.length > 0) {
      meetingLinkOnChange(meetingLinks[0]?.id);
    }
  }, [meetingLinks?.length, linkOwner, selectedUser]);

  useEffect(() => {
    setSelectedUser(activeUserId);
  }, [activeUserId]);

  const handleAddMeetingLink = async (data, event) => {
    if (!editor) return;

    event.preventDefault();

    const meetingLink = {
      type,
      userId: selectedUser || '__me__',
      linkId:
        data?.meetingLink === defaultLink?.id && !selectedUser ? '__default__' : data?.meetingLink,
      children: [{ text: data?.displayText }],
    };
    setVisible(false);
    // @ts-ignore
    insertNodes(editor, meetingLink);
  };

  return (
    <div className={styles.meetingLinkButton}>
      <Dropdown
        ref={ref}
        visible={visible}
        width={321}
        anchor={
          <IconButton
            name="calendar"
            color={color}
            size={20}
            onClick={() => {
              reset();
              setVisible(!visible);
            }}
          />
        }
      >
        <form>
          <div className={styles.templateMeetingLinksDropdownWrapper}>
            <Text size="m" className={styles.meetingLinksHeader}>
              {t('title')}
            </Text>
            <div className={styles.meetingLinksTextDisplayInput}>
              <Input
                placeholder={t('placeholder')}
                size="small"
                width={'273px'}
                ref={textRef as any}
                error={errors?.displayText && t('required')}
                {...textField}
              />
            </div>
            <Text size="m" className={styles.meetingLinksHeader}>
              {t('linkTo')}
            </Text>
            <div className={styles.radioGroup}>
              <RadioGroup
                defaultValue={linkOwner}
                onChange={value => {
                  setLinkOwner(value);
                  if (value) setSelectedUser(activeUserId);
                }}
              >
                <Radio size="small" value={true} expand>
                  <Text size="s">{t('sendersMeetingLinks')}</Text>
                </Radio>
                <Radio size="small" value={false} expand>
                  <Text size="s">{t('specificUsersMeetingLinks')}</Text>
                </Radio>
              </RadioGroup>
            </div>
            <div className={styles.dropdownSelects}>
              {!linkOwner && (
                <>
                  <Select
                    placeholder={t('user')}
                    size="small"
                    borderless={false}
                    width={'273px'}
                    value={selectedUser}
                    onChange={setSelectedUser}
                  >
                    {activeUsers?.map(({ id, name }) => (
                      <Item key={id} value={id}>
                        {id === activeUserId ? `${name} (${t('you')})` : name}
                      </Item>
                    ))}
                  </Select>
                  <Select
                    placeholder={t('meetingLink')}
                    size="small"
                    borderless={false}
                    width={'273px'}
                    disabled={meetingLinks.length === 0 || (!selectedUser && !linkOwner)}
                    error={errors?.meetingLink && t('required')}
                    value={meetingLink}
                    onChange={meetingLinkOnChange}
                  >
                    {meetingLinks?.map(({ id, title }) => (
                      <Item key={id} value={id}>
                        {title}
                      </Item>
                    ))}
                  </Select>
                </>
              )}
            </div>
            <div className={styles.templateMeetingLinkCallout}>
              <Icon name="alertTriangle" color="banana" size={24} />
              <Text size="xs">{t('alertMessage')}</Text>
            </div>
            <div className={styles.addButton}>
              <Button
                size="small"
                disabled={
                  (errors && Object.keys(errors)?.length > 0) ||
                  (linkOwner && (!defaultLink || typeof defaultLink === 'string')) ||
                  (!linkOwner && !meetingLink)
                }
                onClick={handleSubmit(handleAddMeetingLink)}
              >
                {t('add')}
              </Button>
            </div>
          </div>
        </form>
      </Dropdown>
    </div>
  );
};

export const EditorToolbarSelectSignatureSection = ({ color }: { color?: ColorType }) => {
  return (
    <div style={{ marginLeft: '8px', display: 'flex' }}>
      <SelectSignatureDropdown color={color || 'white'} />
    </div>
  );
};
