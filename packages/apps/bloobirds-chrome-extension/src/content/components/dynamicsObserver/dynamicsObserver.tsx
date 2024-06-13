import { useEffect, useMemo, useRef, useState } from 'react';

import { isElementLoaded } from '@bloobirds-it/utils';

import { useExtensionContext } from '../context';

const DynamicsObserver = () => {
  const isDynamics = !!document.location.href.match('^.*://.*.crm4.dynamics.com.*');

  const [isObserverConfigured, setIsObserverConfigured] = useState(false);
  const [previousSelectedElement, setPreviousSelectedElement] = useState(null);
  const listNode = useRef(null);

  const {
    useGetCurrentPage,
    setCurrentPage,
    setActiveBobject,
    setExtendedContext,
    setCustomPage,
  } = useExtensionContext();

  const currentPage = useGetCurrentPage();

  useEffect(() => {
    if (isDynamics) {
      isElementLoaded('.ms-List').then(el => {
        if (!el) return;
        listNode.current = el;
        if (!isObserverConfigured) {
          mutationObserverDynamicsFocusView.observe(el, {
            childList: true,
            subtree: true,
            attributes: true,
          });
          setIsObserverConfigured(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (isDynamics && previousSelectedElement) {
      const idArray = previousSelectedElement.split('-');
      idArray?.shift();
      const recordid = idArray?.join('-');
      const dynamicsUrl = new URL(document.location.href);
      const resource = dynamicsUrl.origin;
      const urlSearchParams = new URLSearchParams(window.location.search);
      const bobjectDynamicsType = urlSearchParams?.get('etn');
      const appId = urlSearchParams?.get('appid');
      const newPage = `${resource}/main.aspx?appid=${appId}&etn=${bobjectDynamicsType}&pagetype=entityrecord&id=${recordid}`;

      if (currentPage !== newPage) {
        setCurrentPage(newPage);
        setExtendedContext(null);
        setCustomPage(null);
        setActiveBobject(null);
      }
    }
  }, [previousSelectedElement, currentPage]);

  function isListElement(element) {
    return element === listNode.current;
  }

  function processDynamicsFocusView(mutationsList) {
    for (const mutationElement of mutationsList) {
      if (mutationElement.type === 'childList') {
        for (const removedElement of mutationElement.removedNodes) {
          if (isListElement(removedElement)) {
            setIsObserverConfigured(false);
            mutationObserverDynamicsFocusView.disconnect();
            setCurrentPage(null);
            setExtendedContext(null);
            setCustomPage(null);
            setActiveBobject(null);
            listNode.current = null;
            return undefined;
          }
        }
      }
    }
    const elementSelected = document.querySelector(
      '[class*=" SelectedWrapperCardStyle"]  span[id]',
    );
    if (elementSelected) {
      if (elementSelected.id !== previousSelectedElement) {
        setPreviousSelectedElement(elementSelected.id);
        return elementSelected;
      }
    } else {
      setPreviousSelectedElement(null);
    }

    return undefined;
  }

  const debouncedProcessDynamicsFocusView = mutationsList => {
    setTimeout(() => {
      processDynamicsFocusView(mutationsList);
    }, 550);
  };

  const mutationObserverDynamicsFocusView = useMemo(() => {
    return new MutationObserver(mutationsList => {
      debouncedProcessDynamicsFocusView(mutationsList);
    });
  }, []);

  return <></>;
};

export default DynamicsObserver;
