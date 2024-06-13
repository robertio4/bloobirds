import { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

import { useToasts } from '@bloobirds-it/flamingo-ui';
import { useDebouncedCallback, useIsB2CAccount } from '@bloobirds-it/hooks';
import {
  PermissionType,
  Bobject,
  BobjectId,
  BobjectTypes,
  ContactViewSubTab,
  LogicRoleType,
  MessagesEvents,
  WhatsappLead,
  LEAD_FIELDS_LOGIC_ROLE,
  ExtensionOpportunity,
  MIXPANEL_EVENTS,
} from '@bloobirds-it/types';
import { api, getTextFromLogicRole, getExtensionBobjectByIdFields } from '@bloobirds-it/utils';
import { TFunction } from 'i18next';
import debounce from 'lodash/debounce';
import mixpanel from 'mixpanel-browser';

import { getValueFromLogicRole } from '../../../utils/bobjects.utils';
import { useExtensionContext } from '../context';
import { WhatsappTemplateSelector } from '../templatesSelector/whatsappTemplateSelector';
import WhatsappButton from './components/WhatsappButton';
import {
  MessageProps,
  PortalType,
  Status,
  StatusType,
  getContactNumber,
  extractWhatsappMessageElements,
  extractContactName,
  processMessage,
} from './utils/whatsappRenderer.utils';

const injectTemplateSelector = (leadId: BobjectId['value']) => {
  const templateSelector = document.querySelector('[data-bb-template-selector]');
  if (templateSelector) {
    return;
  }

  const buttonsBox = document.querySelector(
    '#main > footer > div.copyable-area > div > span:nth-child(2) > div > div',
  );
  const newDiv = document.createElement('div');
  newDiv.setAttribute('data-bb-template-selector', 'true');
  buttonsBox.appendChild(newDiv);

  ReactDOM.render(<WhatsappTemplateSelector leadId={leadId} />, newDiv);
};

const WhatsappRenderer = () => {
  const isB2CAccount = useIsB2CAccount();
  const { useGetSettings } = useExtensionContext();
  const { user: userSettings } = useGetSettings();
  const autoSyncPermission = userSettings?.autoSyncWhatsappPermission;
  const opportunityAsMainBobject = userSettings?.showOpportunityInWhatsapp;
  const enableAutoSync =
    autoSyncPermission === PermissionType.ENABLED || autoSyncPermission === PermissionType.FORCED;

  const { createToast } = useToasts();
  const { useGetWhatsappLead, setWhatsappLead, setForcedActiveSubTab } = useExtensionContext();
  const whatsappLead = useGetWhatsappLead();

  const wsContactName = useRef('');
  const wsLead = useRef<WhatsappLead>(null);
  const messageElements = useRef([]);
  const messagesRef = useRef<MessageProps[]>([]);
  const portals = useRef<
    { source: PortalType; name: string; anchor: HTMLDivElement; children: JSX.Element }[]
  >([]);
  /*   const conversationPortals = useRef<
    { source: PortalType; name: string; anchor: HTMLDivElement; children: JSX.Element }[]
  >([]); */

  const [, rerender] = useState(0); // eslint-disable-line no-unused-vars

  const { t } = useTranslation();

  const updatePortal = (
    t: TFunction,
    portals: any,
    newDiv: HTMLDivElement,
    status: StatusType,
    type: 'conversation' | 'message' = 'message',
    propagate = true,
  ) => {
    // find in portals and update
    const portal = portals.current.find(portal => portal.anchor === newDiv);

    if (!portal) {
      return;
    }

    portal.children = (
      <WhatsappButton
        t={t}
        {...portal.children.props}
        leadName={wsLead.current?.name}
        type={type}
        status={status}
      />
    );

    if (propagate && type === 'conversation') {
      portals.current
        .filter(portal => portal.source === 'message')
        .forEach(portal => {
          const message = messagesRef.current.find(message => message.id === portal.name);
          portal.children = (
            <WhatsappButton
              {...portal.children.props}
              t={t}
              type={'message'}
              leadName={wsLead.current?.name}
              status={message.status !== Status.SUCCESS ? status : message.status}
            />
          );
        });
    }

    rerender(prev => prev + 1);
  };

  const handleOnClick = async (
    messages: MessageProps[],
    newDiv: HTMLDivElement,
    type: 'conversation' | 'message' = 'message',
  ) => {
    if (wsLead.current && newDiv) {
      if (!messages) messages = messagesRef.current;
      try {
        updatePortal(t, portals, newDiv, Status.LOADING, type);
        await api.post(
          '/messaging/whatsapp',
          messages.map(message => ({
            ...message,
            leadId: wsLead.current?.id,
          })),
        );

        newDiv.setAttribute('data-bb-synced', 'true');

        updatePortal(t, portals, newDiv, Status.SUCCESS, type);
        createToast({
          message: t('whatsapp.toast.success', {
            name: wsLead.current?.name,
            count: messages.length,
          }),
          type: 'success',
        });

        window.dispatchEvent(
          new CustomEvent(MessagesEvents.SubTabUpdated, {
            detail: { subTab: ContactViewSubTab.ACTIVITIES },
          }),
        );
      } catch (e) {
        updatePortal(t, portals, newDiv, Status.ERROR, type);
        createToast({
          message: t('whatsapp.toast.error', {
            name: wsLead.current?.name,
            count: messages.length,
          }),
          type: 'error',
        });
      }
    }
  };

  const checkMessagesStatus = async () => {
    // Get all the messages id and check if they are synced
    const messagesIds = messagesRef.current.map(element => element.id);
    const response = await api.post('/messaging/whatsapp/checkMessageIds', [...messagesIds]);

    // Update the status of the messages
    messagesRef.current = messagesRef.current.map(message => {
      const synced = response?.data[message.id] ?? false;
      return { ...message, status: synced ? Status.SUCCESS : Status.ENABLED };
    });
  };

  const loadMessages = async () => {
    extractWhatsappMessageElements(document.body, element => {
      messageElements.current.push(element);
    });
    messageElements.current.forEach(element => {
      processMessage(element, wsLead.current, messageElements, messagesRef);
    });

    if (wsLead.current) {
      await checkMessagesStatus();
    }

    messagesRef.current.forEach(message => {
      // Find portal and update or create
      const portal = portals.current.find(portal => portal.name === message.id);
      if (portal) {
        portal.children = (
          <WhatsappButton
            t={t}
            type={'message'}
            leadName={wsLead.current?.name}
            status={wsLead.current ? message.status : 'disabled'}
            onClick={async () => {
              if (message) {
                handleOnClick([message], message?.div, 'message');
                mixpanel.track(MIXPANEL_EVENTS.WHATSAPP_SYNC_MESSAGE);
              }
            }}
          />
        );
      } else {
        portals.current.push({
          source: 'message',
          name: message?.id,
          anchor: message?.div,
          children: (
            <WhatsappButton
              t={t}
              type={'message'}
              leadName={wsLead.current?.name}
              status={wsLead.current ? message.status : 'disabled'}
              onClick={async () => {
                if (message) {
                  handleOnClick([message], message?.div, 'message');
                  mixpanel.track(MIXPANEL_EVENTS.WHATSAPP_SYNC_MESSAGE);
                }
              }}
            />
          ),
        });
      }
    });
  };

  const getLeadFromNumber = async (number: string, wsName: string): Promise<WhatsappLead> => {
    let wsOppId;
    let wsLeadId;
    let name;
    try {
      if (!number || number.includes('-')) throw 'Invalid number';
      const includeTypes = isB2CAccount
        ? ['LEAD', 'OPPORTUNITY']
        : ['COMPANY', 'LEAD', 'OPPORTUNITY'];
      const response = await api.post('/calls/whiteLabel/search', {
        phoneNumber: '+' + number,
        includeTypes,
      });
      if (response.status === 200) {
        let bobjects: Bobject[] | ExtensionOpportunity[] = response.data;

        if (bobjects.length === 1) {
          const bobject = bobjects[0] as Bobject;
          wsLeadId = bobject.id.value;
          const type = bobject.id.typeName;
          const isLead = type === BobjectTypes.Lead;
          const opportunitiesIds =
            isLead && getValueFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.OPPORTUNITIES);

          name = getTextFromLogicRole(
            bobject,
            (type.toUpperCase() + (isLead ? '__FULL_NAME' : '__NAME')) as LogicRoleType<
              BobjectTypes.Company | BobjectTypes.Lead
            >,
          );

          if (opportunityAsMainBobject && opportunitiesIds) {
            if (!Array.isArray(opportunitiesIds)) {
              wsOppId = opportunitiesIds;
            } else {
              const result = await Promise.all(
                opportunitiesIds?.map(o =>
                  getExtensionBobjectByIdFields({
                    typeName: BobjectTypes.Opportunity,
                    objectId: o?.split('/')[2],
                  }),
                ) || [],
              );

              wsOppId = null;
              bobjects = result.map(r => r.data) as ExtensionOpportunity[];
            }
          }
        }

        window.dispatchEvent(
          new CustomEvent(MessagesEvents.SubTabUpdated, {
            detail: { subTab: ContactViewSubTab.OVERVIEW },
          }),
        );
        window.dispatchEvent(
          new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: { type: BobjectTypes.Activity },
          }),
        );
        if (wsOppId || wsLeadId) {
          window.dispatchEvent(
            new CustomEvent(MessagesEvents.ForceOpenExtension, {
              detail: { bobjectId: wsOppId || wsLeadId },
            }),
          );
        } else {
          window.dispatchEvent(
            new CustomEvent(MessagesEvents.ForceOpenExtension, {
              detail: {
                source: 'WHATSAPP',
                bobjects: bobjects,
                info: {
                  name: wsName,
                  number: '+' + number,
                  validatePhone: true,
                  onCreate: bobjectId => {
                    setWhatsappLead({
                      id: bobjectId,
                      name: wsName,
                      number: '+' + number,
                    });
                    setForcedActiveSubTab(ContactViewSubTab.ACTIVITIES);
                  },
                },
              },
            }),
          );
        }
      }
    } catch (e) {
      console.log(e);
    }

    if (!wsLeadId) {
      return null;
    }

    return {
      id: wsLeadId,
      name,
      number,
    };
  };

  const insertButtonSyncConversation = (contactName: string, whatsappLead: WhatsappLead) => {
    // Find the specific child element that corresponds to the desired insertion point
    const header = document.querySelector('#main > header');

    if (!header) {
      return;
    }

    const isSingleChat =
      header.querySelector('[role="button"]:nth-child(2) > div > div')?.firstElementChild
        .tagName === 'DIV';
    if (!isSingleChat) {
      return;
    }

    const headerElementButtons = header.querySelector('div:nth-child(3) > div');

    //We'll only create the div if it does not exist
    if (headerElementButtons?.querySelector('[data-bloobirds-button]')) {
      return;
    }
    // Create the new div and set its properties
    const newDiv = document.createElement('div');
    newDiv.setAttribute('data-bloobirds-button', 'true');

    // Insert the new div before the insertion point
    headerElementButtons?.insertBefore(newDiv, headerElementButtons.firstElementChild);

    // Create the portal
    portals.current.push({
      source: 'conversation',
      name: contactName,
      anchor: newDiv,
      children: (
        <WhatsappButton
          t={t}
          type={'conversation'}
          leadName={whatsappLead?.name}
          status={whatsappLead ? 'enabled' : 'disabled'}
          onClick={async () => {
            const messages = messagesRef.current;
            if (messages?.length > 0) {
              handleOnClick(messages, newDiv, 'conversation');
              mixpanel.track(MIXPANEL_EVENTS.WHATSAPP_SYNC_CONVERSATION);
            }
          }}
        />
      ),
    });
  };

  /*   function insertBloobirdsIcon(element: Element) {
    // The message is a child with dir ltr or rtl and selectable-text
    if (!element) {
      return;
    }
    //get the name div
    const leadNameElement = element.querySelector('[role="gridcell"] > div:first-child');
    //hack to know if it is a group or a contact right now contacts have an additional nested div
    const isContact = leadNameElement?.firstElementChild.tagName === 'DIV';

    //We'll only create the div if it does not exist or its a group chat
    if (leadNameElement?.querySelector('[user-bloobirds-button]') || !isContact) {
      return;
    }
    // Create the new div and set its properties
    const newDiv = document.createElement('div');
    newDiv.setAttribute('user-bloobirds-button', 'true');
    newDiv.setAttribute('style', 'padding-right: 2px; display: flex; align-items: center');
    newDiv.setAttribute('innerText', leadNameElement.textContent);
    // Insert the new div after the chat name
    leadNameElement?.insertBefore(newDiv, leadNameElement.firstElementChild);
    element.setAttribute('data-bb-processed', 'true');

    // Create the portal
    conversationPortals.current.push({
      source: 'leadName',
      name: leadNameElement.textContent,
      anchor: newDiv,
      children: (
        <Tooltip
          title={
            whatsappLead
              ? t('whatsapp.lead', { name: whatsappLead.name })
              : t('whatsapp.messages.noContactMatch')
          }
          position="top"
        >
          <IconButton
            name="bloobirds"
            color="bloobirds"
            size={16}
            onClick={async () => {
              const contactNumber = getContactNumber();
              const whatsappLead = await getLeadFromNumber(contactNumber);
              if (whatsappLead) {
                // Call the endpoint that @Carlos created
                console.log('syncing message');
                console.log('whatsappLead', leadName);
              }
            }}
          />
        </Tooltip>
      ),
    });
  } */

  const debouncedExtractMessages = useDebouncedCallback(
    async () => {
      let contactLead;
      const contactName = extractContactName();
      const nMessages = messagesRef.current.length;

      if (contactName !== wsContactName.current) {
        // If the contact name has changed, we need to update the whatsappLead
        const contactNumber = getContactNumber();
        if (!contactNumber) {
          window.dispatchEvent(
            new CustomEvent(MessagesEvents.ForceOpenExtension, {
              detail: { resetAll: true },
            }),
          );
          setWhatsappLead(null);
          wsContactName.current = contactName;
          return;
        }
        contactLead = await getLeadFromNumber(contactNumber, contactName);
        setWhatsappLead(contactLead);
        wsLead.current = contactLead;

        // If the contact name has changed, we need to reset the messageElements and portals
        messageElements.current = [];
        portals.current = portals.current.filter(portal => portal.source === 'leadName');
        messagesRef.current = [];

        document.querySelectorAll('[data-bloobirds-button]').forEach(element => {
          element.remove();
        });

        document.querySelectorAll('[data-bb-processed]').forEach(element => {
          element.removeAttribute('data-bb-processed');
        });

        // Insert button in header to sync conversation
        insertButtonSyncConversation(contactName, contactLead);
      }

      await loadMessages();

      // If there are new messages, we need to update the conversation button
      if (wsLead.current && nMessages !== messagesRef.current.length) {
        const divButton: HTMLDivElement = document.querySelector(
          '#main > header [data-bloobirds-button]',
        );
        if (divButton) {
          updatePortal(t, portals, divButton, Status.ENABLED, 'conversation', false);
        }
      }

      // If there are lead and no messages/portals, try again in 1 second
      setTimeout(() => {
        if (contactLead && messagesRef.current.length === 0) {
          document
            .querySelectorAll('[data-bloobirds-button]:not(#main > header [data-bloobirds-button])')
            .forEach(element => {
              element.remove();
            });

          document.querySelectorAll('[data-bb-processed]').forEach(element => {
            element.removeAttribute('data-bb-processed');
          });

          const divButton: HTMLDivElement = document.querySelector(
            '#main > header [data-bloobirds-button]',
          );
          if (divButton) {
            updatePortal(t, portals, divButton, Status.DISABLED, 'conversation', false);
          }

          loadMessages();
        }
      }, 1000);

      // If auto sync is enabled, sync the messages
      if (
        enableAutoSync &&
        (contactName !== wsContactName.current || nMessages !== messagesRef.current.length)
      ) {
        const conversationDiv: HTMLDivElement = document.querySelector(
          '#main > header [data-bloobirds-button]',
        );

        const syncMessages = debounce(async () => {
          await handleOnClick(null, conversationDiv, 'conversation');

          await loadMessages();

          rerender(prev => prev + 1);
        }, 1500);

        await syncMessages();
      }

      wsContactName.current = contactName;

      rerender(prev => prev + 1);
    },
    250,
    [],
  );

  const mutationObserver = useMemo(() => {
    return new MutationObserver(async mutationsList => {
      const hasConversationChanged = mutationsList.some(mutation => {
        /*//for future management of the b over the contacts
        if (mutation.removedNodes.length > 0)
          if (Array.from(mutation.removedNodes).map(node => node.textContent)[0].length > 0) {
            const removedNodeText = Array.from(mutation.removedNodes).map(
              node => node.textContent,
            )[0];
            console.log('mutation from node removal ', mutation.removedNodes, removedNodeText);
            console.log('Portal on removal', portals.current);
            if (conversationPortals.current?.filter(portal => portal.name === removedNodeText)) {
              console.log(
                'removing this portal ',
                conversationPortals.current.find(portal => portal.name === removedNodeText),
              );
              conversationPortals.current = conversationPortals.current.filter(
                portal => portal.name !== removedNodeText,
              );
            }
          }
        if (mutation.addedNodes.length > 0)
          if (Array.from(mutation.addedNodes).map(node => node.textContent)[0].length > 0) {
            console.log(
              'node siblings',
              Array.from(mutation.addedNodes)[0].parentNode,
              Array.from(mutation.addedNodes)[0].parentNode?.childElementCount,
              'if this is true weve added a group, dont mutate:',
              Array.from(Array.from(mutation.addedNodes)[0].parentNode?.children).some(
                child => child.tagName === 'SPAN',
              ),
            );
            console.log(
              'mutation from node addition',
              mutation.addedNodes,
              Array.from(mutation.addedNodes).map(node => node.textContent),
              Array.from(mutation.addedNodes).map(node => node.parentNode?.childNodes),
            );
            if (
              !Array.from(Array.from(mutation.addedNodes)[0].parentNode?.children).some(
                child => child.tagName === 'SPAN',
              )
            ) {
              console.log(Array.from(mutation.addedNodes)[0].parentNode?.children[0]);
              insertBloobirdsIcon(Array.from(mutation.addedNodes)[0].parentElement?.parentElement);
              console.log('RERENDERING for contact added');
              rerender(prev => prev + 1);
            }
          }*/
        const addedNodes = Array.from(mutation.addedNodes);
        return [...addedNodes, mutation.target].some(node => {
          // if the added node has main as id and has new rows, then it is a new conversation
          if (node instanceof Element) {
            const mainElement = node.querySelector('#main');
            if (mainElement) {
              return true;
            }
          }
          // if the added node is an application and has new rows, then it is a new conversation (when scroll up)
          if (node instanceof Element && node.role === 'application') {
            const mainElement = node.querySelector('#main div[role="row"]');
            if (mainElement) {
              return true;
            }
          }
          return false;
        });
      });
      if (hasConversationChanged) {
        debouncedExtractMessages();
      }
    });
  }, [isB2CAccount]);

  useEffect(() => {
    if (isB2CAccount !== undefined) {
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
    return () => {
      mutationObserver.disconnect();
    };
  }, [isB2CAccount]);

  //const whatsappChatList = document.querySelector('div#pane-side [role="grid"]');
  /*useEffect(() => {
    console.log('whatsappChatList effect');
    whatsappChatList
      ?.querySelectorAll('[role="listitem"]')
      .forEach(element => insertBloobirdsIcon(element));
    rerender(prev => prev + 1);
  }, [whatsappChatList?.children?.length]); */

  useEffect(() => {
    const fetchData = async () => {
      if (portals.current?.length === 0) return;

      const oldLead = wsLead.current;

      // Change the lead to the current one
      wsLead.current = whatsappLead;
      messagesRef.current = messagesRef.current.map(message => {
        return { ...message, leadId: whatsappLead?.id };
      });

      if (enableAutoSync && !oldLead) {
        const conversationDiv: HTMLDivElement = document.querySelector(
          '#main > header [data-bloobirds-button]',
        );

        await handleOnClick(null, conversationDiv, 'conversation');
      }

      await loadMessages();

      updatePortal(
        t,
        portals,
        document.querySelector('#main > header [data-bloobirds-button]'),
        Status.ENABLED,
        'conversation',
        true,
      );

      rerender(prev => prev + 1);
    };

    if (whatsappLead) {
      fetchData();

      injectTemplateSelector(whatsappLead?.id);
    }
  }, [whatsappLead?.id]);

  return (
    <>
      {portals.current.map(({ children, anchor }) => {
        return ReactDOM.createPortal(children, anchor);
      })}
      {/* {conversationPortals.current.map(({ children, anchor }) => {
        return ReactDOM.createPortal(children, anchor);
      })}*/}
    </>
  );
};

export default WhatsappRenderer;
