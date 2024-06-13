import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-dialer.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/dialer.module.css"
const __vite__css = "._container_i8h93_1 {\n  font-family: 'Inter', sans-serif !important;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  z-index: 102;\n  pointer-events: none;\n}\n\n._container_i8h93_1 p {\n  font-family: 'Inter', sans-serif !important;\n}\n\n._floatingBox_i8h93_16 {\n  width: 60px;\n  height: 60px;\n  border: 3px solid #d9f0c0;\n  border-radius: 8px;\n  background-color: #63ba00;\n  box-sizing: border-box;\n  box-shadow: 0 2px 20px rgba(99, 186, 0, 0.33);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  bottom: 16px;\n  left: 64px;\n  pointer-events: initial;\n}\n\n._floatingDragIcon_i8h93_33 {\n  position: absolute;\n  display: block;\n  left: 2px;\n  overflow: hidden;\n  width: 14px;\n}\n\n._floatingBox_i8h93_16:hover {\n  cursor: pointer;\n  box-shadow: 0 2px 20px rgb(99 186 0 / 80%);\n}\n\n._closeButton_i8h93_46 {\n  display: none;\n  position: absolute;\n  top: -8px;\n  right: -8px;\n  height: 16px;\n  width: 16px;\n  border-radius: 50%;\n  background-color: var(--peanut);\n  align-items: center;\n}\n\n._floatingBox_i8h93_16:hover > ._closeButton_i8h93_46 {\n  display: flex;\n}\n\n._content_i8h93_62 {\n  display: inline-block;\n  position: relative;\n  pointer-events: all;\n  z-index: 1;\n}\n\n._contentAircall_i8h93_69 {\n  width: 376px;\n}\n\n._contentBox_i8h93_73 {\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n  border: 1px solid #9acfff;\n  box-shadow: 0px 2px 20px rgba(25, 145, 255, 0.15);\n  border-radius: 8px;\n  background-color: #ffffff;\n}\n\n._contentBoxBloobirds_i8h93_83 {\n  height: 640px;\n  width: 320px;\n}\n\n._contentBoxNumintec_i8h93_88 {\n  height: auto;\n  width: 420px;\n}\n\n._contentBoxRingover_i8h93_93 {\n  height: auto;\n  width: 378px;\n}\n\n._contentBoxOthers_i8h93_98 {\n  height: auto;\n  width: 320px;\n}\n\n._contentBoxAircall_i8h93_103 {\n  width: 376px;\n  height: auto;\n}\n\n._header_i8h93_108 {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 16px;\n}\n\n._header_i8h93_108:hover {\n  cursor: grab;\n}\n\n._header_i8h93_108:active {\n  cursor: grabbing;\n}\n\n._headerIcons_i8h93_123 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n._headerClose_i8h93_129 {\n  cursor: pointer;\n}\n\n._closeDisabled_i8h93_133 {\n  cursor: initial;\n}\n\n._headerTabs_i8h93_137 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n._headerDragger_i8h93_143 {\n  display: none;\n  position: absolute;\n  overflow: hidden;\n  height: 14px;\n  top: 8px;\n  left: calc(50% - 12px);\n}\n\n._feedback_i8h93_152 {\n  height: 16px;\n}\n\n._dialSpinner_i8h93_156 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n._headerDragger_i8h93_143:hover {\n  cursor: grab;\n}\n\n._headerDragger_i8h93_143:active {\n  cursor: grabbing;\n}\n\n._header_i8h93_108:hover > ._headerDragger_i8h93_143 {\n  display: block;\n}\n\n._headerTab_i8h93_137 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 2px 4px 2px 2px;\n  cursor: pointer;\n}\n\n._headerTab_i8h93_137 > p {\n  display: none;\n}\n\n._headerTab_active_i8h93_186 {\n  border-bottom: 2px solid var(--bloobirds);\n}\n\n._headerTab_active_i8h93_186 > p {\n  display: block;\n}\n\n._headerTab_disabled_i8h93_194 {\n  cursor: initial;\n}\n\n/*Dial*/\n._dial_i8h93_156 {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  padding: 16px;\n}\n\n._dialInput_i8h93_206 {\n  width: 100%;\n  height: 48px;\n  box-sizing: border-box;\n  border-radius: 4px;\n  background-color: #edf1f5;\n  padding: 0 12px;\n  font-style: normal;\n  font-weight: 500;\n  font-size: 25px;\n  line-height: 32px;\n  color: var(--bloobirds);\n  margin-bottom: 8px;\n  border: none;\n}\n\n._dialInput_i8h93_206::placeholder {\n  color: var(--softPeanut);\n  font-weight: 400;\n  font-size: 13px;\n  line-height: 24px;\n  position: relative;\n  bottom: 3px;\n}\n\n._dialInput_i8h93_206:focus {\n  outline: none;\n}\n\n._dialInput_i8h93_206 {\n  box-shadow: none;\n}\n\n._dialInput_i8h93_206:focus {\n  box-shadow: none;\n}\n\n._dialInput_i8h93_206:hover {\n  box-shadow: none;\n}\n\n._dialHelpText_i8h93_247 > p {\n  font-size: 11px;\n}\n\n._dialHelpTextNotConfig_i8h93_251 > p {\n  font-size: 13px;\n}\n\n._dialMatchText_i8h93_255 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n}\n\n/*DialerStatusHeader*/\n._statusHeader_i8h93_263 {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 16px 4px;\n}\n\n._headerButton_i8h93_270 {\n  color: var(--peanut) !important;\n}\n\n._headerButtons_i8h93_274 {\n  display: flex;\n  gap: 4px;\n}\n\n._pitchButtonActivated_i8h93_279 {\n  background-color: var(--verySoftPurple);\n}\n\n._notesButtonActivated_i8h93_283 {\n  background-color: var(--verySoftBanana);\n}\n\n._actionsPanel_i8h93_287 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  padding: 8px 16px;\n}\n\n/*DialerRingHangButton*/\n._ringHangupButton_i8h93_296 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 60px;\n  width: 60px;\n  border-radius: 50%;\n  /* extra/call */\n  background: #63ba00;\n  /* extra/call-very-soft */\n  border: 2px solid #d9f0c0;\n  cursor: pointer;\n}\n\n._ringHangupButton_hangup_i8h93_310 {\n  /* extra/meeting */\n  background: #f53158;\n  /* extra/meeting-very-soft */\n  border: 2px solid #ffb3c2;\n}\n\n._ringHangupButton_loading_i8h93_317 {\n  background: #ff8433;\n  border: 2px solid #ffd9c2;\n}\n\n._ringHangupButton_animate_i8h93_322:before {\n  content: '';\n  position: absolute;\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  border: 1px solid #d9f0c0;\n  animation: _animateRingButton_i8h93_1 1.5s linear infinite;\n}\n\n._ringHangupButton_animate_i8h93_322:after {\n  content: '';\n  position: absolute;\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  border: 2px solid #d9f0c0;\n  animation: _animateRingButton_i8h93_1 1.5s linear infinite;\n  animation-delay: 0.4s;\n}\n\n._ringHangupButton_hangup_i8h93_310._ringHangupButton_animate_i8h93_322:before {\n  border: 1px solid #ffb3c2;\n}\n\n._ringHangupButton_hangup_i8h93_310._ringHangupButton_animate_i8h93_322:after {\n  border: 2px solid #ffb3c2;\n}\n\n._ringHangupButton_disabled_i8h93_351 {\n  opacity: 50%;\n  cursor: default;\n}\n\n@keyframes _animateRingButton_i8h93_1 {\n  0% {\n    transform: scale(0.5);\n    opacity: 0;\n  }\n  50% {\n    transform: scale(1);\n    opacity: 1;\n  }\n  100% {\n    transform: scale(1.4);\n    opacity: 0;\n  }\n}\n\n._ringHangupButtonContainer_i8h93_371 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 16px;\n}\n\n/* DialerConnectionHint */\n._connectionHint_i8h93_379 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 8px;\n  gap: 8px;\n}\n\n._textAuthorizing_i8h93_387 > p {\n  font-size: 11px;\n}\n\n._hintIcon_i8h93_391 {\n  height: 8px;\n  width: 8px;\n  background-color: var(--extraCall);\n  border-radius: 50%;\n}\n\n._hintIcon_yellow_i8h93_398 {\n  background-color: #ff8433;\n}\n\n/* DialerHelpMessage */\n._helpMessage_i8h93_403 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n\n._helpMessage_i8h93_403 > p {\n  font-size: 10px;\n}\n\n/*DialerUserPhoneSelector */\n._userPhoneSelector_i8h93_415 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n  margin-top: 8px;\n}\n\n._userPhoneSelector_disabled_i8h93_423 {\n  cursor: default;\n}\n\n._userPhoneSelectorLabels_i8h93_427 {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n}\n\n._userPhoneSelectorLabels_i8h93_427 > p {\n  font-size: 10px;\n}\n\n/* DialPad */\n._dialPad_i8h93_439 {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  width: 100%;\n  padding: 16px 60px;\n  box-sizing: border-box;\n  gap: 8px;\n}\n\n._dialPadRow_i8h93_449 {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n}\n\n._dialPadRow_i8h93_449:is(:last-child) {\n  justify-content: space-evenly;\n  margin-top: 8px;\n}\n\n._dialPadButton_i8h93_460 {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 40px;\n  cursor: pointer;\n}\n\n._dialPadButton_i8h93_460 > svg {\n  margin: auto;\n}\n\n._dialPadButton_i8h93_460 > p:not(:first-child) {\n  font-size: 10px;\n}\n\n/* DialerCallDirection */\n._callDirectionContainer_i8h93_477 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  gap: 8px;\n  padding: 4px;\n}\n\n._callDirection_i8h93_477 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n\n._directionSelector_i8h93_493 {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  background-color: var(--bloobirds);\n  border-radius: 8px;\n  width: 30px;\n  height: 16px;\n}\n\n._directionSelector_i8h93_493 > div {\n  background-color: white;\n  height: 12px;\n  width: 12px;\n  border-radius: 50%;\n  margin: 2px;\n}\n\n._directionSelector__left_i8h93_511 {\n  justify-content: flex-start;\n}\n\n._directionSelector__right_i8h93_515 {\n  justify-content: flex-end;\n}\n\n._callDirectionLabel_i8h93_519 {\n  display: flex;\n  align-items: center;\n  width: 68px;\n}\n\n._callDirectionLabel_i8h93_519 > p {\n  width: 100%;\n}\n\n/* LogCallButton */\n._logCallButton_i8h93_530 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: calc(100% - 32px);\n  height: 40px;\n  background-color: var(--extraCall);\n  color: white;\n  border-radius: 4px;\n  padding: 12px 16px;\n  box-sizing: border-box;\n  cursor: pointer;\n  margin: 16px;\n  font-size: 13px;\n  gap: 4px;\n}\n\n._logCallButton__disabled_i8h93_547,\n._dialPadButton__disabled_i8h93_548 {\n  opacity: 50%;\n  cursor: default;\n}\n\n._spacer_i8h93_553 {\n  flex-grow: 1;\n}\n\n/* DialerErrorWarning */\n._errorWarning_i8h93_558 {\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n  gap: 16px;\n  border-radius: 28px;\n  width: 304px;\n  box-sizing: border-box;\n  left: 8px;\n  top: 8px;\n  z-index: 1;\n}\n\n._errorWarning_error_i8h93_574 {\n  background-color: #f53158;\n}\n\n._errorWarning_warning_i8h93_578 {\n  background-color: #ffbd19;\n}\n\n._errorWarning_i8h93_558 > div {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n\n._errorWarning_i8h93_558 > div > p {\n  font-size: 15px;\n}\n\n._errorWarning_i8h93_558 > div > svg {\n  flex-shrink: 0;\n}\n\n._errorWarning_i8h93_558 > button {\n  position: absolute;\n  top: 12px;\n  right: 16px;\n}\n\n/* NotePanel */\n._notePanel_i8h93_605 {\n  position: absolute;\n  bottom: 1px;\n  height: 300px;\n  background-color: white;\n  border-radius: 0 0 8px 8px;\n  width: calc(100% - 2px);\n  overflow-y: hidden;\n  border-top: 1px solid #d4e0f1;\n  overflow-x: hidden;\n}\n\n._notePanelManual_i8h93_617 {\n  height: 220px;\n  bottom: 92px;\n}\n\n._editorContent_i8h93_622 {\n  overflow-y: auto;\n  overflow-x: hidden;\n  padding-top: 12px;\n  padding-bottom: 12px;\n}\n\neditorContent {\n  height: calc(100% - 35px);\n  position: relative;\n}\n\n._notePanelManual_i8h93_617 ._editorContent_i8h93_622 {\n  height: 100%;\n}\n\n._closeNotePanel_i8h93_638 {\n  position: absolute;\n  right: 12px;\n  top: 12px;\n  cursor: pointer;\n  z-index: 10;\n}\n\n._toolbar_i8h93_646 {\n  position: fixed;\n  bottom: 1px;\n  border-top: 1px solid #d4e0f1;\n  width: 100%;\n}\n\n._notePanelManual_i8h93_617 ._toolbar_i8h93_646 {\n  width: calc(100% - 2px);\n}\n\n._toolbarManual_i8h93_657 {\n  bottom: 60px;\n}\n\n._notePanelButton_i8h93_661 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  margin: 0;\n}\n\n._notePanelButton_i8h93_661 > button {\n  border: 1px solid var(--peanut);\n  border-radius: 4px;\n  font-size: 10px;\n}\n\n._dialResults_i8h93_675 {\n  margin-top: -6px;\n}\n\n._noConfig_i8h93_679 {\n  margin-bottom: 40px;\n}\n\n._warning_i8h93_683 {\n  display: flex;\n}\n\n._warning_i8h93_683 > span {\n  height: 20px;\n  width: 20px;\n  padding: 2px;\n}\n\n._warning_i8h93_683 path {\n  fill: var(--peanut);\n}\n\n._bobject_i8h93_697 {\n  min-width: 0;\n}\n\n._bobject_i8h93_697 > div {\n  display: flex;\n}\n\n._bobject_i8h93_697 > div > p {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.__bobjectName_i8h93_711:hover {\n  cursor: pointer;\n  color: var(--darkBloobirds);\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const container = "_container_i8h93_1";
export const floatingBox = "_floatingBox_i8h93_16";
export const floatingDragIcon = "_floatingDragIcon_i8h93_33";
export const closeButton = "_closeButton_i8h93_46";
export const content = "_content_i8h93_62";
export const contentAircall = "_contentAircall_i8h93_69";
export const contentBox = "_contentBox_i8h93_73";
export const contentBoxBloobirds = "_contentBoxBloobirds_i8h93_83";
export const contentBoxNumintec = "_contentBoxNumintec_i8h93_88";
export const contentBoxRingover = "_contentBoxRingover_i8h93_93";
export const contentBoxOthers = "_contentBoxOthers_i8h93_98";
export const contentBoxAircall = "_contentBoxAircall_i8h93_103";
export const header = "_header_i8h93_108";
export const headerIcons = "_headerIcons_i8h93_123";
export const headerClose = "_headerClose_i8h93_129";
export const closeDisabled = "_closeDisabled_i8h93_133";
export const headerTabs = "_headerTabs_i8h93_137";
export const headerDragger = "_headerDragger_i8h93_143";
export const feedback = "_feedback_i8h93_152";
export const dialSpinner = "_dialSpinner_i8h93_156";
export const headerTab = "_headerTab_i8h93_137";
export const headerTab_active = "_headerTab_active_i8h93_186";
export const headerTab_disabled = "_headerTab_disabled_i8h93_194";
export const dial = "_dial_i8h93_156";
export const dialInput = "_dialInput_i8h93_206";
export const dialHelpText = "_dialHelpText_i8h93_247";
export const dialHelpTextNotConfig = "_dialHelpTextNotConfig_i8h93_251";
export const dialMatchText = "_dialMatchText_i8h93_255";
export const statusHeader = "_statusHeader_i8h93_263";
export const headerButton = "_headerButton_i8h93_270";
export const headerButtons = "_headerButtons_i8h93_274";
export const pitchButtonActivated = "_pitchButtonActivated_i8h93_279";
export const notesButtonActivated = "_notesButtonActivated_i8h93_283";
export const actionsPanel = "_actionsPanel_i8h93_287";
export const ringHangupButton = "_ringHangupButton_i8h93_296";
export const ringHangupButton_hangup = "_ringHangupButton_hangup_i8h93_310";
export const ringHangupButton_loading = "_ringHangupButton_loading_i8h93_317";
export const ringHangupButton_animate = "_ringHangupButton_animate_i8h93_322";
export const animateRingButton = "_animateRingButton_i8h93_1";
export const ringHangupButton_disabled = "_ringHangupButton_disabled_i8h93_351";
export const ringHangupButtonContainer = "_ringHangupButtonContainer_i8h93_371";
export const connectionHint = "_connectionHint_i8h93_379";
export const textAuthorizing = "_textAuthorizing_i8h93_387";
export const hintIcon = "_hintIcon_i8h93_391";
export const hintIcon_yellow = "_hintIcon_yellow_i8h93_398";
export const helpMessage = "_helpMessage_i8h93_403";
export const userPhoneSelector = "_userPhoneSelector_i8h93_415";
export const userPhoneSelector_disabled = "_userPhoneSelector_disabled_i8h93_423";
export const userPhoneSelectorLabels = "_userPhoneSelectorLabels_i8h93_427";
export const dialPad = "_dialPad_i8h93_439";
export const dialPadRow = "_dialPadRow_i8h93_449";
export const dialPadButton = "_dialPadButton_i8h93_460";
export const callDirectionContainer = "_callDirectionContainer_i8h93_477";
export const callDirection = "_callDirection_i8h93_477";
export const directionSelector = "_directionSelector_i8h93_493";
export const directionSelector__left = "_directionSelector__left_i8h93_511";
export const directionSelector__right = "_directionSelector__right_i8h93_515";
export const callDirectionLabel = "_callDirectionLabel_i8h93_519";
export const logCallButton = "_logCallButton_i8h93_530";
export const logCallButton__disabled = "_logCallButton__disabled_i8h93_547";
export const dialPadButton__disabled = "_dialPadButton__disabled_i8h93_548";
export const spacer = "_spacer_i8h93_553";
export const errorWarning = "_errorWarning_i8h93_558";
export const errorWarning_error = "_errorWarning_error_i8h93_574";
export const errorWarning_warning = "_errorWarning_warning_i8h93_578";
export const notePanel = "_notePanel_i8h93_605";
export const notePanelManual = "_notePanelManual_i8h93_617";
export const editorContent = "_editorContent_i8h93_622";
export const closeNotePanel = "_closeNotePanel_i8h93_638";
export const toolbar = "_toolbar_i8h93_646";
export const toolbarManual = "_toolbarManual_i8h93_657";
export const notePanelButton = "_notePanelButton_i8h93_661";
export const dialResults = "_dialResults_i8h93_675";
export const noConfig = "_noConfig_i8h93_679";
export const warning = "_warning_i8h93_683";
export const bobject = "_bobject_i8h93_697";
export const _bobjectName = "__bobjectName_i8h93_711";
export default {
	container: container,
	floatingBox: floatingBox,
	floatingDragIcon: floatingDragIcon,
	closeButton: closeButton,
	content: content,
	contentAircall: contentAircall,
	contentBox: contentBox,
	contentBoxBloobirds: contentBoxBloobirds,
	contentBoxNumintec: contentBoxNumintec,
	contentBoxRingover: contentBoxRingover,
	contentBoxOthers: contentBoxOthers,
	contentBoxAircall: contentBoxAircall,
	header: header,
	headerIcons: headerIcons,
	headerClose: headerClose,
	closeDisabled: closeDisabled,
	headerTabs: headerTabs,
	headerDragger: headerDragger,
	feedback: feedback,
	dialSpinner: dialSpinner,
	headerTab: headerTab,
	headerTab_active: headerTab_active,
	headerTab_disabled: headerTab_disabled,
	dial: dial,
	dialInput: dialInput,
	dialHelpText: dialHelpText,
	dialHelpTextNotConfig: dialHelpTextNotConfig,
	dialMatchText: dialMatchText,
	statusHeader: statusHeader,
	headerButton: headerButton,
	headerButtons: headerButtons,
	pitchButtonActivated: pitchButtonActivated,
	notesButtonActivated: notesButtonActivated,
	actionsPanel: actionsPanel,
	ringHangupButton: ringHangupButton,
	ringHangupButton_hangup: ringHangupButton_hangup,
	ringHangupButton_loading: ringHangupButton_loading,
	ringHangupButton_animate: ringHangupButton_animate,
	animateRingButton: animateRingButton,
	ringHangupButton_disabled: ringHangupButton_disabled,
	ringHangupButtonContainer: ringHangupButtonContainer,
	connectionHint: connectionHint,
	textAuthorizing: textAuthorizing,
	hintIcon: hintIcon,
	hintIcon_yellow: hintIcon_yellow,
	helpMessage: helpMessage,
	userPhoneSelector: userPhoneSelector,
	userPhoneSelector_disabled: userPhoneSelector_disabled,
	userPhoneSelectorLabels: userPhoneSelectorLabels,
	dialPad: dialPad,
	dialPadRow: dialPadRow,
	dialPadButton: dialPadButton,
	callDirectionContainer: callDirectionContainer,
	callDirection: callDirection,
	directionSelector: directionSelector,
	directionSelector__left: directionSelector__left,
	directionSelector__right: directionSelector__right,
	callDirectionLabel: callDirectionLabel,
	logCallButton: logCallButton,
	logCallButton__disabled: logCallButton__disabled,
	dialPadButton__disabled: dialPadButton__disabled,
	spacer: spacer,
	errorWarning: errorWarning,
	errorWarning_error: errorWarning_error,
	errorWarning_warning: errorWarning_warning,
	notePanel: notePanel,
	notePanelManual: notePanelManual,
	editorContent: editorContent,
	closeNotePanel: closeNotePanel,
	toolbar: toolbar,
	toolbarManual: toolbarManual,
	notePanelButton: notePanelButton,
	dialResults: dialResults,
	noConfig: noConfig,
	warning: warning,
	bobject: bobject,
	_bobjectName: _bobjectName
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))