import React from 'react';

import { GeneralSearchBar } from '@bloobirds-it/general-search-bar';
import { useDataModel } from '@bloobirds-it/hooks';
import {
  LEAD_FIELDS_LOGIC_ROLE,
  SearchAction,
  SearchActionType,
  SearchBobjectType,
} from '@bloobirds-it/types';
import { openWhatsAppWeb } from '@bloobirds-it/utils';

import { useRouter } from '../../hooks';

function GeneralSearchBarWrapper() {
  const { history } = useRouter();
  const dataModel = useDataModel();

  const handleMainBobjectClick = (
    event: MouseEvent | React.MouseEvent<HTMLElement, MouseEvent>,
    bobject: SearchBobjectType,
  ) => {
    if (event?.metaKey || (navigator.appVersion.indexOf('Mac') == -1 && event?.ctrlKey)) {
      window.open(bobject.url, '_blank');
    } else {
      history.push(bobject.url + '?fromSearchBar=true');
    }
  };

  const handleActionOnClick = (
    event: MouseEvent | React.MouseEvent<HTMLElement, MouseEvent>,
    action: SearchActionType,
    bobject: SearchBobjectType,
  ) => {
    const phoneFieldId = dataModel.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.PHONE)?.id;
    if (action === SearchAction.WhatsApp) {
      openWhatsAppWeb(true, bobject.rawBobject.contents[phoneFieldId]);
      return;
    }
    if (event.metaKey || (navigator.appVersion.indexOf('Mac') == -1 && event.ctrlKey)) {
      window.open(`${bobject.url}?action=${action}`, '_blank');
    } else {
      history.push(`${bobject.url}?action=${action}`);
    }
  };

  return <GeneralSearchBar actions={{ handleMainBobjectClick, handleActionOnClick }} isWebapp />;
}

export default GeneralSearchBarWrapper;
