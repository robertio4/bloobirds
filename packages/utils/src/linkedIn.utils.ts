export const addTemplateInLinkedIn = ({
  parentForm,
  content,
  callback,
}: {
  parentForm: HTMLFormElement;
  content: any;
  callback?: () => void;
}) => {
  const div: HTMLDivElement = parentForm.querySelector('.msg-form__contenteditable');
  const placeHolderDiv: HTMLDivElement = parentForm.querySelector(
    'div[class^="msg-form__placeholder"]',
  );
  if (div) {
    // Add template to textbox
    div.childNodes.forEach(node => div.removeChild(node));
    if (placeHolderDiv) {
      // Remove the placeholder div to not overlay the "Write new message.." text.
      placeHolderDiv.remove();
    }
    div.innerHTML = content
      .replaceAll('</div>', '</p>')
      .replaceAll('<div>', '<p>')
      .replaceAll('<br>', '<p><br></p>');
    div.dispatchEvent(new KeyboardEvent('input', { bubbles: true, cancelable: true }));
    callback?.();
  }
};

export const addTemplateInSalesNav = ({
  parentForm,
  content,
  callback,
}: {
  parentForm: HTMLFormElement;
  content: any;
  callback?: () => void;
}) => {
  const textArea: HTMLTextAreaElement = parentForm.querySelector('.compose-form__message-field');
  if (textArea) {
    textArea.value = content.replace(/<(?:br|\/div|\/p)>/g, '\n').replace(/<.*?>/g, '');
    textArea.focus();
    callback?.();
  }
};
