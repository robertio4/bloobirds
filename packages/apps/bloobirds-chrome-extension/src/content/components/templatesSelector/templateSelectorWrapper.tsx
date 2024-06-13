import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import {
  Dropdown,
  Icon,
  IconButton,
  Spinner,
  Text,
  Tooltip,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings, useDataModel } from '@bloobirds-it/hooks';
import { HandleTemplateModal } from '@bloobirds-it/playbook/src';
import { Environment } from '@bloobirds-it/playbook/src/types/playbook';
import { DataModelResponse, LinkedInLead } from '@bloobirds-it/types';
import { replaceWithContent, serializeMessagingTemplate } from '@bloobirds-it/utils';

import { TemplateSelectorPlaces } from '../../../types/messagingTemplates';
import {
  fetchLead,
  scrapAndSync,
} from '../../../utils/scrapper/messages/templateSelector/metaScrapper';
import { normalizeUrl, removeQueryParams } from '../../../utils/url';
import BloobirdsLogo from '../bloobirds';
import { TemplateSelector } from './templateSelector';
import styles from './templatesSelector.module.css';

function ResyncMessagesButton({ bubbleEl, place, lead, leadSetRef }) {
  const [scrapping, setScrapping] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'templateSelector.resync' });
  async function scrap() {
    if (!scrapping) {
      setScrapping(true);
      await scrapAndSync(
        normalizeUrl(window.location.href),
        bubbleEl,
        place,
        lead?.id?.value,
        leadSetRef,
      );
      setScrapping(false);
    }
  }

  return (
    <div className={styles.resyncButtonContainer} id="resync-bb-msg-btn">
      <Tooltip title={t('tooltip')} position="top">
        <div className={styles.resyncButton} onClick={() => !scrapping && scrap()}>
          {scrapping ? (
            <Spinner name="loadingCircle" color="bloobirds" size={16} />
          ) : (
            <>
              <Icon name="refresh" color="bloobirds" size={20} />
              <Text size="s" color="peanut" weight="bold">
                {t('resync')}
              </Text>
            </>
          )}
        </div>
      </Tooltip>
    </div>
  );
}

function ResyncMessages({ bubbleEl, place, lead, leadSetRef }) {
  const element = document.querySelector(
    place === TemplateSelectorPlaces.Linkedin
      ? 'div.msg-form__attachment-previews'
      : '.compose-form__container',
  );

  const [divToAppend, setDivToAppend] = useState<HTMLDivElement>(null);

  useEffect(() => {
    if (element) {
      const divElement = document.createElement('div');
      divElement.id = 'resync-bb-msg-btn-container';
      const elementSelector =
        place === TemplateSelectorPlaces.Linkedin ? element : element.parentElement;
      elementSelector?.insertBefore(
        divElement,
        place === TemplateSelectorPlaces.Linkedin ? element.firstChild : element,
      );
      setDivToAppend(divElement);
    }
    return () => {
      const btn = document.getElementById('resync-bb-msg-btn-container');
      btn?.remove();
    };
  }, [element]);

  if (!element) {
    return null;
  }

  return (
    divToAppend !== null &&
    createPortal(
      <ResyncMessagesButton
        bubbleEl={bubbleEl}
        place={place}
        lead={lead}
        leadSetRef={leadSetRef}
      />,
      divToAppend,
    )
  );
}

function useFetchLead(
  lead: LinkedInLead,
  place: TemplateSelectorPlaces,
  bubbleContext: Element,
  setLead: (lead: LinkedInLead) => void,
  setLoading: (loading: boolean) => void,
  currentPage: string,
  leadSetRef: React.MutableRefObject<boolean>,
) {
  const currentTemplateRef = useRef(true);
  useEffect(() => {
    if (
      lead === null &&
      currentTemplateRef.current &&
      currentPage === normalizeUrl(window.location.href)
    ) {
      leadSetRef.current = false;
      setLoading(true);
      fetchLead(place, bubbleContext, setLead, setLoading, currentPage, currentTemplateRef)
        .catch(er => console.log(er))
        .then(() => (leadSetRef.current = true));
    }
  }, [lead]);

  useEffect(() => {
    return () => {
      setLead(null);
      currentTemplateRef.current = false;
    };
  }, []);
}

export const TemplateSelectorWrapper = ({
  parentForm,
  place,
  bubbleEl,
  lead,
  loading,
  setLead,
  setLoading,
  bubbleContext,
  currentPage,
}: {
  place: TemplateSelectorPlaces;
  parentForm?: HTMLFormElement;
  bubbleEl: Element;
  lead: LinkedInLead;
  loading: boolean;
  setLead: (lead: LinkedInLead) => void;
  setLoading: (loading: boolean) => void;
  bubbleContext: Element;
  currentPage: string;
}) => {
  const leadSetRef = useRef(lead?.id?.value !== null);
  const { visible, setVisible, ref } = useVisible(false);
  const { t } = useTranslation('translation', { keyPrefix: 'templateSelector' });
  const { settings: userData } = useActiveUserSettings();
  const dataModel: DataModelResponse = useDataModel();
  const stage = dataModel?.findValueById(lead?.stage);
  const [editModal, setEditModal] = useState({ template: null, open: false });

  useFetchLead(lead, place, bubbleContext, setLead, setLoading, currentPage, leadSetRef);

  const addTemplateToTextArea = (content: any) => {
    if (
      place === TemplateSelectorPlaces.SalesNavigator ||
      place === TemplateSelectorPlaces.SalesNavigatorChat
    ) {
      const textArea: HTMLTextAreaElement = parentForm.querySelector(
        '.compose-form__message-field',
      );
      if (textArea) {
        textArea.value = content.replace(/<(?:br|\/div|\/p)>/g, '\n').replace(/<.*?>/g, '');
        textArea.focus();
        setVisible(false);
      }
    } else if (
      place === TemplateSelectorPlaces.Linkedin ||
      place === TemplateSelectorPlaces.LinkedinChat
    ) {
      const div: HTMLDivElement = parentForm.querySelector('.msg-form__contenteditable');
      const placeHolderDiv: HTMLDivElement = parentForm.querySelector(
        'div[class^="msg-form__placeholder"]',
      );
      if (div) {
        // Add template to textbox
        div.childNodes.forEach(node => div.removeChild(node));
        if (placeHolderDiv) {
          // Remove the placeholder div to not overlay the "Write new message.." text.
          placeHolderDiv.remove();
        }
        div.innerHTML = content
          .replaceAll('</div>', '</p>')
          .replaceAll('<div>', '<p>')
          .replaceAll('<br>', '<p><br></p>');
        div.dispatchEvent(new KeyboardEvent('input', { bubbles: true, cancelable: true }));
        setVisible(false);
      }
    }
  };

  const handleAdd = ({
    id,
    fallbackContent,
    leadIdValue,
    companyIdValue,
  }: {
    id: string;
    fallbackContent: any;
    closeDropdown?: boolean;
    leadIdValue?: string;
    companyIdValue?: string;
  }) => {
    if (lead?.id || leadIdValue) {
      serializeMessagingTemplate(
        id,
        leadIdValue || lead?.id?.objectId,
        companyIdValue || lead?.companyId,
      )
        .then(data => {
          const content = data?.data?.serializedTemplate;
          addTemplateToTextArea(
            replaceWithContent(
              content,
              lead?.nameTo,
              lead?.jobTitle,
              lead?.companyName,
              userData?.user?.name,
            ),
          );
        })
        .catch(() => {
          addTemplateToTextArea(
            replaceWithContent(
              fallbackContent,
              lead?.nameTo,
              lead?.jobTitle,
              lead?.companyName,
              userData?.user?.name,
            ),
          );
        });
      removeQueryParams();
    } else {
      addTemplateToTextArea(
        replaceWithContent(
          fallbackContent,
          lead?.nameTo,
          lead?.jobTitle,
          lead?.companyName,
          userData?.user?.name,
        ),
      );
      removeQueryParams();
    }
    setVisible(false);
  };

  useEffect(() => {
    if (editModal?.open) setVisible(false);
  }, [editModal?.open]);

  return (
    <div>
      <div className={styles.templateSelectorDropdown}>
        {lead?.id?.value &&
          (place === TemplateSelectorPlaces.Linkedin ||
            place === TemplateSelectorPlaces.SalesNavigator) && (
            <ResyncMessages bubbleEl={bubbleEl} place={place} lead={lead} leadSetRef={leadSetRef} />
          )}
        <Dropdown
          width={424}
          ref={ref}
          visible={visible}
          zIndex={20000}
          style={{ height: 620, padding: 0 }}
          anchor={
            <div className={styles.templateSelectorContainer} onClick={() => setVisible(!visible)}>
              {loading ? (
                <Spinner name="loadingCircle" color="softPeanut" size={12} />
              ) : (
                <>
                  {lead && lead?.id ? (
                    <Tooltip
                      title={t('tooltipWithLead', {
                        lead: lead?.fullName?.split(' ')?.[0] || t('common.lead'),
                      })}
                      position="top"
                    >
                      <Icon name="circle" color="melon" />
                    </Tooltip>
                  ) : (
                    <Tooltip title={t('tooltipWithoutLead')} position="top">
                      <Icon name="circle" color="tangerine" />
                    </Tooltip>
                  )}
                </>
              )}
              <BloobirdsLogo width={20} height={20} fill="#1991FF" />
            </div>
          }
        >
          <div className={styles.templateSelectorWrapper}>
            <TemplateSelector
              environment={Environment.LINKEDIN_TEMPLATE_SELECTOR}
              handleAdd={handleAdd}
              setEditModal={setEditModal}
              lead={lead}
              closeDropdown={() => setVisible(false)}
            />
          </div>
        </Dropdown>
      </div>
      {editModal?.open && (
        <HandleTemplateModal
          template={editModal?.template}
          handleClose={() => {
            setVisible(true);
            setEditModal({ template: null, open: false });
          }}
          contextValues={{
            onSaveCallback: () => {
              setVisible(true);
            },
            onDeleteCallback: () => {
              setVisible(true);
              setEditModal({ template: null, open: false });
            },
            ...(stage ? { stage } : {}),
          }}
        />
      )}
    </div>
  );
};

export default TemplateSelectorWrapper;
