export const createStopPropagationPlugin = () => {
  return {
    onKeyDown: editor => (event: any) => {
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    },
    onKeyPress: editor => (event: any) => {
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    },
    onKeyUp: editor => (event: any) => {
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    },
    onScroll: editor => (event: any) => {
      event.preventDefault();
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    },
  };
};
