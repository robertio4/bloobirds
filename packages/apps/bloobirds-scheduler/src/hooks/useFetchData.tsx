import { useReducer, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import spacetime from 'spacetime';

import { getWebApiUrl } from '../utils/urls';

interface State<T> {
  data?: T;
  error?: Error;
  create?: (dataToCreate: T, slotSelected) => void;
}

type Cache<T> = { [url: string]: T };

type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error };

interface SlotsInterface {
  slots: {
    [key: string]: any;
  };
  userName: string;
  timeZone: string;
  slotBooked: any;
  title: string;
  userId: string;
}

function orderSlotsByHour(slots) {
  return slots.sort((a, b) => {
    const startA = spacetime(a.startDateTime);
    const startB = spacetime(b.startDateTime);
    return startA.isBefore(startB) ? -1 : 1;
  });
}

function orderSlots({ slots }) {
  const keys = Object.keys(slots).sort();
  const orderedSlots = {};
  keys.forEach(date => {
    orderedSlots[date] = orderSlotsByHour(slots[date]);
  });
  return orderedSlots;
}

export function useFetchData<T = unknown>(): State<T> {
  const { token } = useParams();

  const url = `${getWebApiUrl()}/messaging/meetingSlots/${token}`;

  const { t } = useTranslation('translation', { keyPrefix: 'scheduler' });
  const cache = useRef<Cache<T>>({});
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
  };

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState };
      case 'fetched':
        return { ...initialState, data: action.payload };
      case 'error':
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'loading' });

      if (cache.current[url]) {
        dispatch({ type: 'fetched', payload: cache.current[url] });
        return;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || t('error'));
        }

        let data = (await response.json()) as T;
        cache.current[url] = data;
        if (cancelRequest.current) return;
        data = {
          ...data,
          slots: orderSlots(data as SlotsInterface),
        };

        dispatch({ type: 'fetched', payload: data });
      } catch (error) {
        if (cancelRequest.current) return;

        dispatch({ type: 'error', payload: error as Error });
      }
    };

    fetchData();
  }, []);

  const create = async (dataToCreate, slotSelected) => {
    const url = `${getWebApiUrl()}/messaging/meetingSlots/createMeeting`;

    dispatch({ type: 'loading' });

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ ...dataToCreate, token }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || t('error'));
      }

      dispatch({
        type: 'fetched',
        payload: {
          ...state.data,
          slotBooked: slotSelected,
        },
      });
    } catch (error) {
      dispatch({ type: 'error', payload: error as Error });
    }
  };

  return { ...state, create };
}
