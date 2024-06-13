import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { FormProvider, useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { BobjectSelector } from '@bloobirds-it/bobjects';
import { Button, IconButton, Spinner } from '@bloobirds-it/flamingo-ui';
import { useMinimizableModal, useMinimizableModals } from '@bloobirds-it/hooks';
import { useRichTextEditorPlugins } from '@bloobirds-it/rich-text-editor';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  BobjectTypes,
  ExtensionBobject,
  LinkedInLead,
  MIXPANEL_EVENTS,
} from '@bloobirds-it/types';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import { useDraggablePosition } from '../../../hooks/useDraggablePosition';
import { ExtendedContextTypes } from '../../../types/extendedContext';
import { BubbleWindow } from '../bubbleWindow/bubbleWindow';
import { useExtensionContext } from '../context';
import { DraggableTopBar } from '../draggableTopBar/draggableTopBar';
import useNoteData from '../extendedScreen/pages/noteDetail/useNoteData';
import NoteContentEditor from './noteContentEditor';
import styles from './noteModal.module.css';

interface NoteModalProps {
  lead: LinkedInLead;
  opportunity: ExtensionBobject;
  company: ExtensionBobject;
  bobjectId: string;
  originallyMainNote: boolean;
  location: 'bubble' | 'leftBar';
  related: string;
  relatedName: string;
}

export const NoteModal = ({ id }: { id: string }) => {
  const { closeModal, minimize, data, onSave } = useMinimizableModal<NoteModalProps>(id);
  const { location } = data || { location: 'bubble' };
  const {
    useGetExtendedContext,
    setExtendedContext,
    useGetSettings,
    useGetSidePeekEnabled,
    useGetDataModel,
  } = useExtensionContext();
  const isExtendedOpened = useGetExtendedContext()?.open;
  const settings = useGetSettings();
  const accountId = settings?.account?.id;
  const dataModel = useGetDataModel();

  const { minimizableModals } = useMinimizableModals();
  const notesOpened = minimizableModals?.filter(modal => modal?.open && modal?.type === 'note')
    ?.length;

  const methods = useForm();

  const titlePlugins = useRichTextEditorPlugins({
    singleLine: true,
  });
  const plugins = useRichTextEditorPlugins({
    images: false,
    replaceParagraphs: true,
  });

  const {
    defaultName,
    isSubmitting,
    isEditionModal,
    onSubmit,
    isDirty,
    ...defaultValues
  } = useNoteData(
    dataModel,
    accountId,
    data,
    plugins,
    titlePlugins,
    methods.getValues,
    onSave,
    closeModal,
    methods.watch,
  );
  const { t } = useTranslation('translation', { keyPrefix: 'extension.noteModal' });

  const sidePeekEnabled = useGetSidePeekEnabled();
  const [dragging, setDragging] = useState<boolean>();
  const [nameSelected, setNameSelected] = useState<string>(defaultName);

  const { position, setPosition, bounds } = useDraggablePosition(
    id,
    {
      width: 320,
      height: window.innerHeight > 660 ? 592 : window.innerHeight - 40,
    },
    (notesOpened + 1) * 12,
    location,
    isExtendedOpened ? (sidePeekEnabled ? 398 : 348) : 8,
  );

  const {
    field: { value: mainNote, onChange: mainNoteOnChange },
  } = useController({
    control: methods.control,
    name: ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE,
    defaultValue: defaultValues.mainNote,
  });

  const {
    field: { value: related, onChange: relatedOnChange },
  } = useController({
    control: methods.control,
    name: 'related',
    defaultValue: defaultValues.defaultRelated,
  });

  const handleToggleView = () => {
    closeModal();
    setExtendedContext({
      type: ExtendedContextTypes.NOTE_DETAILS,
      bobject: data.bobject,
      extraInfo: {
        ...data,
        [ACTIVITY_FIELDS_LOGIC_ROLE.NOTE]: methods.getValues(ACTIVITY_FIELDS_LOGIC_ROLE.NOTE),
        [ACTIVITY_FIELDS_LOGIC_ROLE.TITLE]: methods.getValues(ACTIVITY_FIELDS_LOGIC_ROLE.TITLE),
        [ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE]: mainNote,
        related,
        relatedName: nameSelected,
        bobjectId: data?.bobjectId,
      },
      actionsDisabled: false,
    });
  };

  useEffect(() => {
    setNameSelected(defaultName);
  }, [defaultName]);

  useEffect(() => {
    mainNoteOnChange(defaultValues?.mainNote);
  }, [defaultValues.mainNote]);

  useEffect(() => {
    relatedOnChange(defaultValues?.defaultRelated);
  }, [defaultValues.defaultRelated]);

  const wrapperClasses = clsx(styles.wrapper, { [styles.dragging]: dragging });

  return (
    <FormProvider {...methods}>
      <div className={wrapperClasses}>
        <Draggable
          handle={'#note' + id}
          position={position}
          bounds={bounds}
          onStart={() => setDragging(true)}
          onStop={() => setDragging(false)}
          onDrag={(e, data) => {
            setPosition({ x: data.x, y: data.y });
          }}
        >
          <div className={styles.container} onClick={event => event.stopPropagation()}>
            <DraggableTopBar
              dragging={dragging}
              id={id}
              onClose={closeModal}
              onMinimize={() => {
                const title =
                  (methods?.getValues(ACTIVITY_FIELDS_LOGIC_ROLE.TITLE) ||
                    defaultValues?.title)?.[0]?.children[0]?.text ||
                  `${t('newNote')}: ${nameSelected}`;
                minimize({
                  title,
                  data: {
                    ...methods.getValues(),
                    [ACTIVITY_FIELDS_LOGIC_ROLE.TITLE]: title,
                    relatedName: nameSelected,
                  },
                });
              }}
              onToggleView={handleToggleView}
              enableTogglePosition={isEditionModal}
            />
            <BubbleWindow>
              <div className={styles.content_container}>
                <NoteContentEditor
                  id={id}
                  plugins={plugins}
                  titlePlugins={titlePlugins}
                  defaultValues={defaultValues}
                >
                  <div className={styles.bottom_bar}>
                    <span className={styles.record_related}>
                      <BobjectSelector
                        accountId={accountId}
                        selected={nameSelected}
                        id={id}
                        onBobjectChange={bobject => {
                          relatedOnChange(bobject?.rawBobject?.id);
                          if (bobject?.bobjectType === BobjectTypes.Company) {
                            setNameSelected(bobject?.companyName);
                          } else if (bobject?.bobjectType === BobjectTypes.Lead) {
                            setNameSelected(bobject?.fullName);
                          } else if (bobject?.bobjectType === BobjectTypes.Opportunity) {
                            setNameSelected(bobject?.name);
                          }
                        }}
                      />
                    </span>
                    <span className={styles.bottom_bar_right}>
                      <IconButton
                        name={mainNote ? 'starChecked' : 'starUnchecked'}
                        onClick={() => {
                          mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_STAR_FROM_NOTE_MODAL);
                          mainNoteOnChange(!mainNote);
                        }}
                        color="bloobirds"
                        size={24}
                        className={styles.mainNote}
                      />
                      <Button
                        size="small"
                        onClick={() => {
                          methods.handleSubmit(onSubmit)();
                        }}
                        disabled={!isDirty || isSubmitting}
                      >
                        {isSubmitting ? <Spinner name="loadingCircle" size={12} /> : t('save')}
                      </Button>
                    </span>
                  </div>
                </NoteContentEditor>
              </div>
            </BubbleWindow>
          </div>
        </Draggable>
      </div>
    </FormProvider>
  );
};
