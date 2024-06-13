import { useToasts } from '@bloobirds-it/flamingo-ui';
import { useEffect, useState } from 'react';
import { atom, useRecoilState } from 'recoil';
import { api, getISODate } from '@bloobirds-it/utils';

const fetchPeriods = userId => {
  const accountId = sessionStorage.getItem('accountId');
  return api
    .get(
      `/entities/pausedCadencePeriods?user.id=${userId}&account.id=${accountId}&page=0&size=1000&sort=id%2Casc`,
    )
    .then(({ data }) => data);
};

export interface PeriodType {
  account: string;
  createdBy: string;
  creationDatetime: string;
  endDate: string | number | Date;
  finished: boolean;
  id: string;
  isActive: boolean;
  mode: 'EDIT' | 'CREATE';
  pauseName: string;
  startDate: string | number | Date;
  updateDatetime: string;
  updatedBy: string;
  user: string;
}

const addPeriodRequest = (period: PeriodType) =>
  api.post('/messaging/pausePeriods', {
    startDate: getISODate(new Date(period.startDate)),
    endDate: getISODate(new Date(period.endDate)),
    name: period.pauseName,
  });

const updatePeriodRequest = (id: string, period: PeriodType) =>
  api.put(`/messaging/pausePeriods/${id}`, {
    startDate: getISODate(new Date(period.startDate)),
    endDate: getISODate(new Date(period.endDate)),
    name: period.pauseName,
  });

const removePeriodRequest = (id: string) =>
  api.delete(`/messaging/pausePeriods/${id}/cancel`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: {},
  });

const getDaysArray = (start: Date, end: Date) => {
  let arr;
  let dt;
  for (arr = [], dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push(getISODate(new Date(dt)));
  }
  return arr;
};

const getLastActiveEndDate = (periods: PeriodType[]) =>
  periods.reduce((lastEndDate, period) => {
    const endDate = new Date(period.endDate);
    if (period.isActive && endDate > lastEndDate) {
      lastEndDate = endDate;
    }
    return lastEndDate;
  }, new Date());

const pausePeriodsAtom = atom({
  key: 'pausePeriods',
  default: {
    list: [] as PeriodType[],
    loaded: false,
    uniqueDates: null,
    pausedUserId: '',
    isUserCurrentlyPaused: false,
    currentPausedPeriod: [] as [] | Date,
  },
});

const pauseModalAtom = atom({
  key: 'pauseModal',
  default: {
    mode: 'CREATE',
    ...({} as PeriodType),
  },
});

const pauseModalVisibility = atom({
  key: 'pauseModalVisibility',
  default: false,
});

const cachedUserIdAtom = atom({
  key: 'cachedPauseUserId',
  default: null,
});

export const usePausePeriodsModal = () => {
  const [pausePeriod, setPausePeriod] = useRecoilState(pauseModalAtom);
  const [open, setOpen] = useRecoilState(pauseModalVisibility);

  const handleClose = () => {
    setOpen(false);
  };

  const openEditPauseModal = (period: PeriodType) => {
    setPausePeriod({
      mode: 'EDIT',
      ...period,
    });
    setOpen(true);
  };

  const openCreatePauseModal = () => {
    setPausePeriod({
      mode: 'CREATE',
      ...({} as PeriodType),
    });
    setOpen(true);
  };

  return {
    openEditPauseModal,
    openCreatePauseModal,
    handleClose,
    open,
    pausePeriod,
  };
};

export const usePausePeriods = (props: { userId: any }) => {
  const [periods, setPeriods] = useRecoilState(pausePeriodsAtom);
  const [cachedUserId, setCachedUserId] = useRecoilState(cachedUserIdAtom);
  const { createToast } = useToasts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshPeriods, setRefreshPeriods] = useState(false);
  const userId = props?.userId;
  const todayIso = getISODate(new Date());

  useEffect(() => {
    if (userId && (userId !== cachedUserId || refreshPeriods)) {
      setCachedUserId(userId);
      fetchPeriods(userId).then((response: any) => {
        const periodsList: PeriodType[] = response?._embedded?.pausedCadencePeriods;
        let pausedDates: string[] = [];
        periodsList.forEach((period: PeriodType, i: number) => {
          const startDate = new Date(
            new Date(period.startDate).getTime() +
              new Date(period.startDate).getTimezoneOffset() * 60000,
          );
          const endDate = new Date(
            new Date(period.endDate).getTime() +
              new Date(period.endDate).getTimezoneOffset() * 60000,
          );
          const today = new Date();
          const dates = getDaysArray(startDate, endDate);
          pausedDates = [...pausedDates, ...dates];
          periodsList[i].finished = new Date(endDate.setHours(23, 59, 59, 999)) < today;
          periodsList[i].isActive = new Set(dates).has(todayIso);
        });
        const uniqueDates = pausedDates.length > 0 ? new Set(pausedDates) : undefined;
        const lastActiveEndDate = getLastActiveEndDate(periodsList);
        setRefreshPeriods(false);
        setPeriods({
          list: periodsList,
          loaded: true,
          uniqueDates,
          pausedUserId: userId,
          isUserCurrentlyPaused:
            periodsList.filter(period => period.isActive && period.user === userId).length > 0,
          currentPausedPeriod: periodsList.reduce((lastEndDate, period) => {
            const endDate = new Date(period.endDate);
            const startDate = new Date(period.startDate);
            if (startDate < lastEndDate && endDate > lastEndDate) {
              lastEndDate = endDate;
            }
            return lastEndDate;
          }, lastActiveEndDate),
        });
      });
    }
  }, [userId, refreshPeriods]);

  const addNewPeriod = async (data: PeriodType) => {
    setIsSubmitting(true);
    await addPeriodRequest(data)
      .then(response => {
        setRefreshPeriods(!refreshPeriods);
        setIsSubmitting(false);
        createToast({ type: 'success', message: 'Pause Period successfully created' });
        return response;
      })
      .catch(() => {
        setIsSubmitting(false);
        createToast({
          type: 'error',
          message: 'There was an error creating your Pause Period',
        });
      });
  };

  const cancelPeriod = (id: string) => {
    setIsSubmitting(true);
    return removePeriodRequest(id)
      .then(() => {
        setIsSubmitting(false);
        setRefreshPeriods(!refreshPeriods);
        createToast({ type: 'success', message: 'Pause Period successfully removed' });
      })
      .catch(() => {
        setIsSubmitting(false);
        createToast({
          type: 'error',
          message: 'There was an error pausing your cadences, please try again later',
        });
      });
  };

  const updatePeriod = (id: string, period: PeriodType) => {
    setIsSubmitting(true);
    return updatePeriodRequest(id, period)
      .then(response => {
        setRefreshPeriods(!refreshPeriods);
        setIsSubmitting(false);
        createToast({ type: 'success', message: 'Pause Cadence Updated' });
        return response;
      })
      .catch(() => {
        setIsSubmitting(false);
        createToast({
          type: 'error',
          message: 'There was an error pausing your cadences, please try again later',
        });
      });
  };

  return {
    periods,
    addNewPeriod,
    cancelPeriod,
    updatePeriod,
    isSubmitting,
  };
};
