import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import { BobjectApi } from '../misc/api/bobject';

export const activeTaskAtom = atom({
  key: 'activeTaskAtom',
  default: {
    data: undefined,
    loaded: false,
    isFetching: false,
  },
});

const fetchTask = companyId => BobjectApi.request().Task().getForm(companyId);

export const useActiveTask = () => {
  const [taskState, setTaskState] = useRecoilState(activeTaskAtom);
  const resetActiveTask = useResetRecoilState(activeTaskAtom);

  const updateActiveTask = (taskId, onError) => {
    if (!taskState.isFetching) {
      setTaskState(
        taskId === taskState.data?.id.objectId
          ? { ...taskState, isFetching: true }
          : { ...taskState, loaded: false, isFetching: true },
      );
      fetchTask(taskId)
        .then(response => {
          setTaskState({
            data: response,
            loaded: true,
            isFetching: false,
          });
        })
        .catch(error => {
          setTaskState({
            isFetching: false,
          });
          onError(error);
        });
    }
  };

  const setActiveTask = task => {
    setTaskState({
      data: task,
      loaded: true,
      isFetching: false,
    });
  };

  return {
    task: taskState.data,
    isLoaded: taskState.loaded,
    isFetching: taskState.isFetching,
    setActiveTask,
    updateActiveTask,
    resetActiveTask,
  };
};
