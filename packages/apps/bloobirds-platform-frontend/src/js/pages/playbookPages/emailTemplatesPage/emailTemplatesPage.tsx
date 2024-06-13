import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Icon,
  IconType,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { FORM_MODES, TEMPLATE_TYPES } from '@bloobirds-it/types';
import classNames from 'classnames';

import { APP_PLAYBOOK_MESSAGING_EMAIL_FORM } from '../../../app/_constants/routes';
import MessagingMineSwitch from '../../../components/messagingTemplates/messagingMineSwitch/messagingMineSwitch';
import MessagingOfficialFilterSwitch from '../../../components/messagingTemplates/messagingOfficialFilterSwitch/messagingOfficialFilterSwitch';
import { useRouter } from '../../../hooks';
import { useAllowHTMLTemplates } from '../../../hooks/useFeatureFlags';
import MessagingTemplatesLayout from '../../../layouts/messagingSectionLayout';
import MessagingTemplateCollection from '../../../layouts/messagingSectionLayout/messagingTemplateCollection';
import styles from './emailTemplatesPage.module.css';

const ModalOption = ({
  logo,
  name,
  onChange,
  checked,
  description,
}: {
  logo: IconType;
  name: string;
  onChange: () => void;
  checked: boolean;
  description: string;
}) => {
  return (
    <div
      className={classNames(styles._box__container, {
        [styles._box__container__checked]: checked,
      })}
      onClick={() => onChange()}
    >
      <Icon className={styles._logo} name={logo} size={40} color="softBloobirds" />
      <Text size="s" align="center" className={styles._name__container}>
        {name}
      </Text>
      <Text size="xs" className={styles._text__container}>
        {description}
      </Text>
    </div>
  );
};

const EmailTemplateCreationModal = ({ onClose, history, open }) => {
  const [templateType, setTemplateType] = React.useState<'HTML' | 'AST'>('AST');
  const { t } = useTranslation();
  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader size="small" color="veryLightBloobirds">
        <ModalTitle>
          <div className={styles._title__container}>
            <Icon size={24} color="softBloobirds" name="assignBoard" />
            <Text size="m" color="peanut">
              New template
            </Text>
          </div>
        </ModalTitle>
        <ModalCloseIcon onClick={onClose} size="small" color="bloobirds" />
      </ModalHeader>
      <ModalContent>
        <Text size="l" color="peanut">
          {t('emailTemplatePage.modal.title')}
        </Text>
        <Text size="m" color="softPeanut" inline={true}>
          {t('emailTemplatePage.modal.description')}
        </Text>
        <div className={styles._bobject_selector_wrapper}>
          <ModalOption
            logo="bloobirds"
            name={'Bloobirds template'}
            onChange={() => setTemplateType('AST')}
            checked={templateType === 'AST'}
            description={t('emailTemplatePage.modal.bloobirdsTemplateDescription')}
          />
          <ModalOption
            logo="coding"
            name={'HTML template'}
            onChange={() => setTemplateType('HTML')}
            checked={templateType === 'HTML'}
            description={t('emailTemplatePage.modal.htmlTemplateDescription')}
          />
        </div>
      </ModalContent>
      <ModalFooter>
        <Button variant="clear" onClick={onClose} color="softBloobirds">
          {t('common.cancel')}
        </Button>
        <Button
          onClick={e => {
            if (templateType === 'HTML') {
              history.push(
                `${APP_PLAYBOOK_MESSAGING_EMAIL_FORM}?mode=${FORM_MODES.CREATION}&templateType=HTML`,
                {
                  event: e,
                },
              );
            } else {
              history.push(
                `${APP_PLAYBOOK_MESSAGING_EMAIL_FORM}?mode=${FORM_MODES.CREATION}&templateType=AST`,
                {
                  event: e,
                },
              );
            }
          }}
          color="bloobirds"
        >
          {t('common.continue')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const EmailTemplatesPage = () => {
  const { history } = useRouter();
  const ref = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const canCreateHTMLTemplates = useAllowHTMLTemplates();

  const config = {
    actionName: 'Create template',
    onClickAction: (e: any) => {
      if (!canCreateHTMLTemplates) {
        history.push(`${APP_PLAYBOOK_MESSAGING_EMAIL_FORM}?mode=${FORM_MODES.CREATION}`, {
          event: e,
        });
      } else {
        setOpen(true);
      }
    },
    searchPlaceholder: 'Search',
  };

  return (
    <>
      <MessagingTemplatesLayout
        dataIntercom="account-settings-email-template-page"
        parentRef={ref}
        body={<MessagingTemplateCollection templateType={TEMPLATE_TYPES.EMAIL} parentRef={ref} />}
        actions={
          <>
            <MessagingOfficialFilterSwitch />
            <MessagingMineSwitch />
          </>
        }
        id="EMAIL_MESSAGING_TEMPLATES"
        title="Email Templates"
        createConfig={config}
        pluralEntityName="Email templates"
      />
      {canCreateHTMLTemplates && (
        <EmailTemplateCreationModal
          onClose={() => {
            setOpen(false);
          }}
          history={history}
          open={open}
        />
      )}
    </>
  );
};

export default EmailTemplatesPage;
