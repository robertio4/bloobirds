import { useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Button, ModalContent, ModalFooter, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { Bobject, COMPANY_FIELDS_LOGIC_ROLE, ExtensionBobject } from '@bloobirds-it/types';

import { api } from '../../../../../../utils/api';
import styles from '../contactRelatedCompanies.module.css';
import { EVENTS, STATES } from './relatedBobject.machine';
import { RelatedBobjectSelector } from './relatedBobjectSelector/relatedBobjectSelector';
import { SearchItem } from './searchItem/searchItem';

export const InitialModalBody = ({
  send,
  companyName,
}: {
  send: (state: STATES) => void;
  companyName: string;
}) => {
  const { t } = useTranslation();
  return (
    <>
      <ModalContent className={styles._add_related_company_content}>
        <div className={styles._modal_content_text}>
          <Text size="m" align="center">
            {t('sidePeek.contactRelatedCompanies.addParentOrChildCompany') + ' '}
            <Text htmlTag="span" size="m" color="bloobirds">
              {companyName}
            </Text>
          </Text>
          <Text size="s" align="center">
            {t('sidePeek.contactRelatedCompanies.selectTypeCompany')}
          </Text>
        </div>
      </ModalContent>
      <ModalFooter className={styles._add_related_company_footer_content}>
        <div>
          <Button
            onClick={() => send(STATES.PARENT)}
            className={styles._add_related_company_button}
            uppercase
          >
            {t('sidePeek.contactRelatedCompanies.parentCompany')}
          </Button>
        </div>
        <div>
          <Button
            className={styles._add_related_company_button}
            onClick={() => send(STATES.CHILD)}
            uppercase
          >
            {t('sidePeek.contactRelatedCompanies.childCompany')}
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};

export const AddRelatedBobjectBody = ({
  send,
  type,
  context: { company, parentCompany, childCompanies, siblingCompanies, handleClose },
}: {
  send: (state: STATES, params?: { [key: string]: string }) => void;
  context: any;
  type: 'PARENT' | 'CHILD';
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [children, setChildren] = useState(childCompanies);
  const childrenToDelete = useRef([]);
  const isChild = type === 'CHILD';
  const { t } = useTranslation();

  const handleSaveChildren = () => {
    setIsSubmitting(true);
    const childrenToAssignReq = children.reduce((acc, curr) => {
      return {
        ...acc,
        [curr?.id?.value]: {
          [COMPANY_FIELDS_LOGIC_ROLE.COMPANY_PARENT]: company?.id?.value,
        },
      };
    }, {});
    const childrenToDeleteReq = childrenToDelete.current.reduce((acc, curr) => {
      return {
        ...acc,
        [curr?.id?.value]: {
          [COMPANY_FIELDS_LOGIC_ROLE.COMPANY_PARENT]: null,
        },
      };
    }, {});
    return api.patch(`/bobjects/${company.id.accountId}/Company/bulk`, {
      ...childrenToAssignReq,
      ...childrenToDeleteReq,
    });
  };

  function handleOnClick(value) {
    switch (type) {
      case STATES.PARENT:
        return send(STATES.CONFIRM, { dataToAssign: value });
      default:
        setChildren(children ? [...children, value] : [value]);
    }
  }

  function handleDelete(child) {
    const newChildren = children.filter(c => c.id.value !== child.id.value);
    setChildren(newChildren);
    childrenToDelete.current.push(child);
  }

  return (
    <>
      <ModalContent className={styles._modal_content}>
        {parentCompany && !isChild && (
          <Text size="m">
            <Trans i18nKey="sidePeek.contactRelatedCompanies.existingRelatedCompany" />
          </Text>
        )}
        <Text size="m">
          {t('sidePeek.contactRelatedCompanies.searchAndSelect') +
            ' ' +
            (isChild
              ? t('sidePeek.contactRelatedCompanies.child')
              : t('sidePeek.contactRelatedCompanies.parent')) +
            ' ' +
            t('sidePeek.contactRelatedCompanies.company')}
        </Text>
        <RelatedBobjectSelector
          company={company}
          data={{ parentCompany, childCompanies, siblingCompanies }}
          handleOnClick={handleOnClick}
        />
        <Text className={styles._search_input_text} size="xs" color="softPeanut">
          {t('sidePeek.contactRelatedCompanies.searchByName')}
        </Text>
        <div className={styles._display_child_companies}>
          {isChild &&
            children
              ?.filter((childCompany: any) => !childCompany.delete)
              .map((childCompany: any) => (
                <SearchItem
                  company={childCompany}
                  key={childCompany?.id.value}
                  handleDelete={() => handleDelete(childCompany)}
                />
              ))}
        </div>
      </ModalContent>
      {isChild && (
        <ModalFooter className={styles._modal_footer}>
          <Button variant="clear" onClick={handleClose} uppercase>
            {t('common.cancel')}
          </Button>
          <Button
            onClick={() => {
              handleSaveChildren().then(() => {
                setIsSubmitting(false);
                handleClose();
              });
            }}
            uppercase
          >
            {isSubmitting ? (
              <Spinner color="white" name="loadingCircle" />
            ) : (
              t('sidePeek.contactRelatedCompanies.saveChanges')
            )}
          </Button>
        </ModalFooter>
      )}
    </>
  );
};

export const ConfirmationBody = ({
  send,
  context: { company, parentCompany, dataToAssign },
}: {
  send: (state: STATES | EVENTS) => void;
  context: { company: Bobject; parentCompany: Bobject; dataToAssign: ExtensionBobject };
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const parentCompanyName = dataToAssign.name;
  const { t } = useTranslation();
  function handleSave() {
    setIsSubmitting(true);
    return api.patch(`/bobjects/${company?.id?.value}/raw`, {
      [COMPANY_FIELDS_LOGIC_ROLE.COMPANY_PARENT]: dataToAssign.id.value,
    });
  }

  return (
    <>
      <ModalContent className={styles._confirm_modal_content}>
        <div>
          <Text size="m">
            {t('sidePeek.contactRelatedCompanies.confirmSetCompany') + ' '}
            <Text size="m" color="bloobirds" inline weight="bold">
              {parentCompanyName}
            </Text>{' '}
            {t('sidePeek.contactRelatedCompanies.asParentCompany')}
          </Text>
          {parentCompany && (
            <Text size="m">
              <Trans i18nKey="sidePeek.contactRelatedCompanies.confirmSetAndRemoveCompany" />
            </Text>
          )}
        </div>
      </ModalContent>
      <ModalFooter className={styles._modal_footer}>
        <div>
          <Button variant="clear" onClick={() => send(EVENTS.CANCEL)} uppercase>
            {dataToAssign
              ? t('sidePeek.contactRelatedCompanies.discardChanges')
              : t('common.cancel')}
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              handleSave().then(() => {
                setIsSubmitting(false);
                send(EVENTS.NEXT);
              });
            }}
            uppercase
          >
            {isSubmitting ? <Spinner color="white" name="loadingCircle" /> : t('common.confirm')}
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};

export const DeleteParent = ({
  send,
  context: { company, parentCompany },
}: {
  send: (state: STATES | EVENTS) => void;
  context: { company: Bobject; parentCompany: ExtensionBobject };
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const parentCompanyName = parentCompany.name;
  const { t } = useTranslation();
  function handleSave() {
    setIsSubmitting(true);
    return api.patch(`/bobjects/${company?.id?.value}/raw`, {
      [COMPANY_FIELDS_LOGIC_ROLE.COMPANY_PARENT]: null,
    });
  }

  return (
    <>
      <ModalContent className={styles._confirm_modal_content}>
        <div>
          <Text size="m">
            {t('sidePeek.contactRelatedCompanies.goingToRemove') + ' '}
            <Text size="m" color="bloobirds" inline weight="bold">
              {parentCompanyName}
            </Text>
            {' ' + t('sidePeek.contactRelatedCompanies.goingToRemoveConfirm')}
          </Text>
        </div>
      </ModalContent>
      <ModalFooter className={styles._modal_footer}>
        <div>
          <Button variant="clear" onClick={() => send(EVENTS.CANCEL)} uppercase>
            {t('common.cancel')}
          </Button>
        </div>
        <div>
          <Button
            color="tomato"
            onClick={() => {
              handleSave().then(() => {
                setIsSubmitting(false);
                send(EVENTS.NEXT);
              });
            }}
            uppercase
          >
            {isSubmitting ? <Spinner color="white" name="loadingCircle" /> : t('common.delete')}
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};
