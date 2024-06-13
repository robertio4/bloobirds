import 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Modal, ModalHeader, ModalTitle, ModalContent, Text, ModalFooter, Button } from '@bloobirds-it/flamingo-ui';
import { useMinimizableModals, useMinimizableModal } from '@bloobirds-it/hooks';
import { jsxs, jsx } from 'react/jsx-runtime';

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;
  if (!css || typeof document === 'undefined') {
    return;
  }
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".confirmCloseModal-module__content__oZ9GS {\n  margin-bottom: 32px;\n}\n\n.confirmCloseModal-module__content__oZ9GS > p:first-child {\n  margin-bottom: 8px;\n}\n";
var styles = {"_content":"confirmCloseModal-module__content__oZ9GS"};
styleInject(css_248z);

var ConfirmCloseModal = function ConfirmCloseModal() {
  var _useMinimizableModals = useMinimizableModals(),
    confirmationModal = _useMinimizableModals.confirmationModal;
  var open = confirmationModal.open,
    id = confirmationModal.id;
  var _useMinimizableModal = useMinimizableModal(id),
    closeModal = _useMinimizableModal.closeModal,
    type = _useMinimizableModal.type,
    cancelConfirmModal = _useMinimizableModal.cancelConfirmModal;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var handleDelete = function handleDelete() {
    cancelConfirmModal();
    closeModal();
  };
  return /*#__PURE__*/jsxs(Modal, {
    width: 600,
    open: open,
    onClose: cancelConfirmModal,
    children: [/*#__PURE__*/jsx(ModalHeader, {
      children: /*#__PURE__*/jsx(ModalTitle, {
        children: t('confirmCloseModal.close')
      })
    }), /*#__PURE__*/jsx(ModalContent, {
      children: /*#__PURE__*/jsxs("div", {
        className: styles._content,
        children: [/*#__PURE__*/jsx(Text, {
          size: "m",
          children: t('confirmCloseModal.title', {
            type: t("minimizableModals.".concat(type))
          })
        }), /*#__PURE__*/jsx(Text, {
          size: "m",
          children: /*#__PURE__*/jsx(Trans, {
            i18nKey: "confirmCloseModal.subtitle"
          })
        })]
      })
    }), /*#__PURE__*/jsxs(ModalFooter, {
      children: [/*#__PURE__*/jsx(Button, {
        variant: "tertiary",
        onClick: cancelConfirmModal,
        children: t('confirmCloseModal.cancel')
      }), /*#__PURE__*/jsx(Button, {
        variant: "primary",
        color: "tomato",
        dataTest: "deleteModalDeleteButton",
        onClick: handleDelete,
        children: t('confirmCloseModal.discard')
      })]
    })]
  });
};

export { ConfirmCloseModal };
//# sourceMappingURL=index.js.map
