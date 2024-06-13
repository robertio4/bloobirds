import { Suspense, useCallback, useEffect, useRef, useState } from 'react';

import { Spinner } from '@bloobirds-it/flamingo-ui';
import { LinkedInLead } from '@bloobirds-it/types';
import { RecoilRoot } from 'recoil';
import { SWRConfig } from 'swr';

import { Actions } from '../../types/messages';
import { TemplateSelectorPlaces } from '../../types/messagingTemplates';
import { normalizeUrl } from '../../utils/url';
import { TemplateSelectorLoading } from './templatesSelector/components/templateSelectorLoading';
import TemplateSelectorWrapper from './templatesSelector/templateSelectorWrapper';

const useDebouncedCallback = (func, wait) => {
  // Use a ref to store the timeout between renders
  // and prevent changes to it from causing re-renders
  const timeout = useRef();

  return useCallback(
    (...args) => {
      const later = () => {
        clearTimeout(timeout.current);
        func(...args);
      };

      clearTimeout(timeout.current);
      // @ts-ignore
      timeout.current = setTimeout(later, wait);
    },
    [func, wait],
  );
};

export const TemplateSelectorApp = ({
  place,
  parentForm,
  bubbleContext,
}: {
  place: TemplateSelectorPlaces;
  parentForm?: HTMLFormElement;
  bubbleContext?: Element;
}) => {
  const url = normalizeUrl(window.location.href);
  const [currentPage, setCurrentPage] = useState(url);
  const [lead, setLead] = useState<LinkedInLead>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [canRenderTemplate, setCanRenderTemplate] = useState<boolean>(true);

  function pageChangeHandler(message) {
    if (message.type === Actions.HistoryUpdate) {
      setLead(null);
      setLoading(true);
      setCurrentPage(normalizeUrl(window.location.href));
      if (
        place === TemplateSelectorPlaces.SalesNavigator ||
        place === TemplateSelectorPlaces.Linkedin
      ) {
        setCanRenderTemplate(false);
        setTimeout(() => {
          setCanRenderTemplate(true);
        }, 1000);
      }
    }
  }

  const debouncedPageChangeHandler =
    place === TemplateSelectorPlaces.SalesNavigator
      ? useDebouncedCallback(pageChangeHandler, 1000)
      : pageChangeHandler;

  useEffect(() => {
    chrome?.runtime?.onMessage.addListener(debouncedPageChangeHandler);
    return () => {
      chrome?.runtime?.onMessage.removeListener(debouncedPageChangeHandler);
    };
  }, []);

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
      }}
    >
      <RecoilRoot key="bb-chrome-extension-template-selector">
        {canRenderTemplate && url === currentPage ? (
          <Suspense fallback={<Spinner name="loadingCircle" size={18} />}>
            <TemplateSelectorWrapper
              place={place}
              parentForm={parentForm}
              bubbleEl={bubbleContext}
              lead={lead}
              loading={loading}
              setLead={setLead}
              setLoading={setLoading}
              bubbleContext={bubbleContext}
              currentPage={currentPage}
            />
          </Suspense>
        ) : (
          <TemplateSelectorLoading />
        )}
      </RecoilRoot>
    </SWRConfig>
  );
};
