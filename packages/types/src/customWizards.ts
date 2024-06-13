export interface ButtonsStepConfig {
  nextButtonTitle: string;
  nextButtonAlternativeTitle: string;
  previousButtonTitle: string;
  showSkipButton: boolean;
  openCadenceOnSkip: boolean;
  hasPreviousStep: boolean;
}

export interface WizardsModalProps {
  handleBack?: () => void;
  handleSkip?: (openCadenceControlOnClose: boolean) => void;
  buttonsConfig?: ButtonsStepConfig;
}
