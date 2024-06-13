import { CustomDetector, DetectorOptions } from 'i18next-browser-languagedetector';

interface SettingsDetectorOptions extends DetectorOptions {
  lookupSettings?: string;
}

const settingsDetector: CustomDetector = {
  name: 'settingsDetector',

  lookup(options: SettingsDetectorOptions) {
    if (options.lookupSettings) {
      return options.lookupSettings;
    }
    return undefined;
  },
};

export default settingsDetector;
