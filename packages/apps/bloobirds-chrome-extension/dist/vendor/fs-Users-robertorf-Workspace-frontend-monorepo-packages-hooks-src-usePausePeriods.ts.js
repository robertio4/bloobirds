import { useToasts } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import __vite__cjsImport1_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport1_react["useEffect"]; const useState = __vite__cjsImport1_react["useState"];
import { atom, useRecoilState } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
import { api, getISODate } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
const fetchPeriods = (userId) => {
  const accountId = sessionStorage.getItem("accountId");
  return api.get(
    `/entities/pausedCadencePeriods?user.id=${userId}&account.id=${accountId}&page=0&size=1000&sort=id%2Casc`
  ).then(({ data }) => data);
};
const addPeriodRequest = (period) => api.post("/messaging/pausePeriods", {
  startDate: getISODate(new Date(period.startDate)),
  endDate: getISODate(new Date(period.endDate)),
  name: period.pauseName
});
const updatePeriodRequest = (id, period) => api.put(`/messaging/pausePeriods/${id}`, {
  startDate: getISODate(new Date(period.startDate)),
  endDate: getISODate(new Date(period.endDate)),
  name: period.pauseName
});
const removePeriodRequest = (id) => api.delete(`/messaging/pausePeriods/${id}/cancel`, {
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  },
  data: {}
});
const getDaysArray = (start, end) => {
  let arr;
  let dt;
  for (arr = [], dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push(getISODate(new Date(dt)));
  }
  return arr;
};
const getLastActiveEndDate = (periods) => periods.reduce((lastEndDate, period) => {
  const endDate = new Date(period.endDate);
  if (period.isActive && endDate > lastEndDate) {
    lastEndDate = endDate;
  }
  return lastEndDate;
}, new Date());
const pausePeriodsAtom = atom({
  key: "pausePeriods",
  default: {
    list: [],
    loaded: false,
    uniqueDates: null,
    pausedUserId: "",
    isUserCurrentlyPaused: false,
    currentPausedPeriod: []
  }
});
const pauseModalAtom = atom({
  key: "pauseModal",
  default: {
    mode: "CREATE",
    ...{}
  }
});
const pauseModalVisibility = atom({
  key: "pauseModalVisibility",
  default: false
});
const cachedUserIdAtom = atom({
  key: "cachedPauseUserId",
  default: null
});
export const usePausePeriodsModal = () => {
  const [pausePeriod, setPausePeriod] = useRecoilState(pauseModalAtom);
  const [open, setOpen] = useRecoilState(pauseModalVisibility);
  const handleClose = () => {
    setOpen(false);
  };
  const openEditPauseModal = (period) => {
    setPausePeriod({
      mode: "EDIT",
      ...period
    });
    setOpen(true);
  };
  const openCreatePauseModal = () => {
    setPausePeriod({
      mode: "CREATE",
      ...{}
    });
    setOpen(true);
  };
  return {
    openEditPauseModal,
    openCreatePauseModal,
    handleClose,
    open,
    pausePeriod
  };
};
export const usePausePeriods = (props) => {
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
      fetchPeriods(userId).then((response) => {
        const periodsList = response?._embedded?.pausedCadencePeriods;
        let pausedDates = [];
        periodsList.forEach((period, i) => {
          const startDate = new Date(
            new Date(period.startDate).getTime() + new Date(period.startDate).getTimezoneOffset() * 6e4
          );
          const endDate = new Date(
            new Date(period.endDate).getTime() + new Date(period.endDate).getTimezoneOffset() * 6e4
          );
          const today = new Date();
          const dates = getDaysArray(startDate, endDate);
          pausedDates = [...pausedDates, ...dates];
          periodsList[i].finished = new Date(endDate.setHours(23, 59, 59, 999)) < today;
          periodsList[i].isActive = new Set(dates).has(todayIso);
        });
        const uniqueDates = pausedDates.length > 0 ? new Set(pausedDates) : void 0;
        const lastActiveEndDate = getLastActiveEndDate(periodsList);
        setRefreshPeriods(false);
        setPeriods({
          list: periodsList,
          loaded: true,
          uniqueDates,
          pausedUserId: userId,
          isUserCurrentlyPaused: periodsList.filter((period) => period.isActive && period.user === userId).length > 0,
          currentPausedPeriod: periodsList.reduce((lastEndDate, period) => {
            const endDate = new Date(period.endDate);
            const startDate = new Date(period.startDate);
            if (startDate < lastEndDate && endDate > lastEndDate) {
              lastEndDate = endDate;
            }
            return lastEndDate;
          }, lastActiveEndDate)
        });
      });
    }
  }, [userId, refreshPeriods]);
  const addNewPeriod = async (data) => {
    setIsSubmitting(true);
    await addPeriodRequest(data).then((response) => {
      setRefreshPeriods(!refreshPeriods);
      setIsSubmitting(false);
      createToast({ type: "success", message: "Pause Period successfully created" });
      return response;
    }).catch(() => {
      setIsSubmitting(false);
      createToast({
        type: "error",
        message: "There was an error creating your Pause Period"
      });
    });
  };
  const cancelPeriod = (id) => {
    setIsSubmitting(true);
    return removePeriodRequest(id).then(() => {
      setIsSubmitting(false);
      setRefreshPeriods(!refreshPeriods);
      createToast({ type: "success", message: "Pause Period successfully removed" });
    }).catch(() => {
      setIsSubmitting(false);
      createToast({
        type: "error",
        message: "There was an error pausing your cadences, please try again later"
      });
    });
  };
  const updatePeriod = (id, period) => {
    setIsSubmitting(true);
    return updatePeriodRequest(id, period).then((response) => {
      setRefreshPeriods(!refreshPeriods);
      setIsSubmitting(false);
      createToast({ type: "success", message: "Pause Cadence Updated" });
      return response;
    }).catch(() => {
      setIsSubmitting(false);
      createToast({
        type: "error",
        message: "There was an error pausing your cadences, please try again later"
      });
    });
  };
  return {
    periods,
    addNewPeriod,
    cancelPeriod,
    updatePeriod,
    isSubmitting
  };
};
