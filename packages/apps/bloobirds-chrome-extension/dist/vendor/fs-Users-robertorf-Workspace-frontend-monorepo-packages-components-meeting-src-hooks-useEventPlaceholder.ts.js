import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"];
import { useFormContext } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import __vite__cjsImport2_lodash_throttle from "/vendor/.vite-deps-lodash_throttle.js__v--7a0691ef.js"; const throttle = __vite__cjsImport2_lodash_throttle.__esModule ? __vite__cjsImport2_lodash_throttle.default : __vite__cjsImport2_lodash_throttle;
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState
} from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
import spacetime from "/vendor/.vite-deps-spacetime.js__v--14e7d295.js";
const eventPlaceholderAtom = atom({
  key: "eventPlaceholderAtom",
  default: null
});
const isMouseDownAtom = atom({
  key: "eventPlaceholderIsMouseDownAtom",
  default: false
});
export const useMouseEvents = () => {
  const [isMouseDown, setIsMouseDown] = useRecoilState(isMouseDownAtom);
  return {
    isMouseDown,
    setIsMouseDown
  };
};
export const useGeneratePlaceHolder = () => {
  const setEventPlaceholder = useSetRecoilState(eventPlaceholderAtom);
  const isMouseDown = useRecoilValue(isMouseDownAtom);
  const methods = useFormContext();
  const dateTime = methods?.watch("dateTime");
  const duration = methods?.watch("duration");
  const generatePlaceHolder = throttle((date, duration2) => {
    const title = methods?.watch("title");
    setEventPlaceholder({
      duration: duration2,
      type: "placeholder",
      startTime: date,
      endTime: null,
      id: "event-placeholder",
      title: title || "Untitled Event",
      collisions: 0,
      collisionNumber: 0,
      day: spacetime(date).format("iso-short"),
      participants: [],
      calendarId: "eventPlaceholder"
    });
  }, 250);
  useEffect(() => {
    if (dateTime && duration && !isMouseDown) {
      generatePlaceHolder(dateTime, duration || 15);
    }
  }, [dateTime, duration]);
  return;
};
export const useEventPlaceholder = (setMeetingDuration) => {
  const [eventPlaceholder, setEventPlaceholder] = useRecoilState(eventPlaceholderAtom);
  const resetEventPlaceholder = useResetRecoilState(eventPlaceholderAtom);
  const methods = useFormContext();
  const dateTime = methods?.watch("dateTime");
  const duration = methods?.watch("duration");
  const title = methods?.watch("title");
  useEffect(
    () => () => {
      resetEventPlaceholder();
    },
    []
  );
  const handlePlaceholderCreation = throttle((date, duration2) => {
    setEventPlaceholder({
      duration: duration2,
      type: "placeholder",
      startTime: date,
      endTime: date,
      startTimeTimestamp: null,
      endTimeTimestamp: null,
      id: "event-placeholder",
      title: title || "Untitled Event",
      collisions: 0,
      collisionNumber: 0,
      day: spacetime(date).format("iso-short"),
      participants: [],
      calendarId: "eventPlaceholder"
    });
  }, 250);
  useEffect(() => {
    if (eventPlaceholder?.startTime && spacetime(eventPlaceholder?.startTime).format("iso-utc") !== spacetime(dateTime).format("iso-utc")) {
      methods?.setValue("dateTime", spacetime(eventPlaceholder?.startTime).toNativeDate());
    }
    if (eventPlaceholder?.duration && eventPlaceholder?.duration !== parseInt(duration)) {
      setMeetingDuration(eventPlaceholder?.duration);
      methods?.setValue("duration", eventPlaceholder?.duration);
    }
  }, [eventPlaceholder]);
  return {
    eventPlaceholder,
    onCalendarPlaceholder: handlePlaceholderCreation
  };
};
