const settingsDetector = {
  name: "settingsDetector",
  lookup(options) {
    if (options.lookupSettings) {
      return options.lookupSettings;
    }
    return void 0;
  }
};
export default settingsDetector;
