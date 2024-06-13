import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Icon,
  Text,
  Card,
  CardHoverButtons,
  CardBody,
  CardButton,
  CardLeft,
  CardRight,
  CardHeader,
  CardContent,
  Item,
  useVisible,
  Dropdown,
  IconButton,
} from '@bloobirds-it/flamingo-ui';
import { useEmailIntegrationMode, useEmailConnections, useSignatures } from '@bloobirds-it/hooks';
import { useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import { formatDistance } from '@bloobirds-it/utils';

import { GoogleSvg, MicrosoftSvg } from '../../../assets/svg';
import { usePhoneConnections } from '../../hooks';
import { AddAliasModal } from '../addAliasModal/addAliasModal';
import { AliasName } from './aliasName/aliasName';
import { ChangeSignatureModal } from './changeSignatureModal/changeSigantureModal';
import styles from './connectionCard.module.css';
import DisconnectModal from './disconnectModal';

function getDate(createdAt) {
  if (createdAt && typeof createdAt === 'string') {
    return new Date(createdAt);
  } else {
    return new Date(
      createdAt.year,
      createdAt.monthValue - 1,
      createdAt.dayOfMonth,
      createdAt.hour,
      createdAt.minute,
      createdAt.second,
    );
  }
}

const ConnectionCard = ({ data, isNylas, isDefault, type = 'email', isQSG = false }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'accountSettings.email.connectionCard',
  });
  const [openSignatureModal, setOpenSignatureModal] = useState(false);
  const { visible, setVisible, ref } = useVisible(false);
  const isEmail = type === 'email';
  const hookType = isEmail ? useEmailConnections : usePhoneConnections;
  const { updateDefaultConnection, disconnectConnection } = hookType();
  const [aliasModalOpen, setAliasModalOpen] = useState();
  const [openModal, setOpenModal] = useState(false);
  const { data: signatures, signature, removeSignatureConnection } = useSignatures(
    isEmail ? data?.id : null,
  );
  const { accountIntegrationMode } = useEmailIntegrationMode();

  const { createdAt, email, phoneNumber: phone, id: connectionId, syncState } = data;
  const isStopped = syncState === 'stopped' || syncState === 'invalid';
  const date = createdAt && isEmail ? getDate(createdAt) : new Date(data?.creationDatetime);
  date.setHours(date.getHours() - new Date().getTimezoneOffset() / 60);

  const getConnectionIcon = useCallback(() => {
    const emailIcon =
      data?.provider === 'gmail' ? (
        <GoogleSvg />
      ) : data?.provider === 'eas' ? (
        <MicrosoftSvg />
      ) : null;
    const icon = !isNylas ? <GoogleSvg /> : emailIcon || <Icon name="mail" color="tangerine" />;

    return !isEmail ? <Icon name="phone" color="melon" /> : icon;
  }, [type]);

  return (
    <>
      <div className={styles._card__container}>
        <Card width={isQSG ? '100%' : 682}>
          <CardHeader>
            <CardLeft>{getConnectionIcon()}</CardLeft>
            <CardBody>
              <Text size="s" color="peanut" inline weight="bold">
                {isEmail ? email : phone}
              </Text>
              {isDefault && <Icon name="starChecked" color="softBanana" size={16} />}
            </CardBody>
            {isEmail && isStopped ? (
              <CardRight>
                <Text size="xs" color="softTomato" inline align="right">
                  {t('requiresToBeReconnected')}
                </Text>
              </CardRight>
            ) : (
              <>
                {date && (
                  <CardRight>
                    <Text size="s" color="softPeanut" inline align="right">
                      {t('addedTime', {
                        dateDistance: useGetI18nSpacetime(new Date()).since(
                          useGetI18nSpacetime(date),
                        ).rounded,
                      })}
                    </Text>
                    {isEmail && !isQSG && (
                      <Dropdown
                        ref={ref}
                        visible={visible}
                        arrow={false}
                        anchor={
                          <IconButton
                            name="moreVertical"
                            onClick={event => {
                              event.stopPropagation();
                              setVisible(!visible);
                            }}
                          />
                        }
                      >
                        {!accountIntegrationMode && (
                          <Item
                            icon="disconnectOutline"
                            onClick={(_value, event) => {
                              event.stopPropagation();
                              setVisible(false);
                              setOpenModal(true);
                            }}
                          >
                            {t('disconnect')}
                          </Item>
                        )}
                        <Item
                          icon="starChecked"
                          onClick={(_value, event) => {
                            event.stopPropagation();
                            setVisible(false);
                            const connection = isEmail ? email : connectionId;
                            updateDefaultConnection(connection);
                          }}
                        >
                          {t('setDefault')}
                        </Item>
                        {!accountIntegrationMode && (
                          <Item
                            icon="persons"
                            onClick={(_value, event) => {
                              event.stopPropagation();
                              setVisible(false);
                              setAliasModalOpen(true);
                            }}
                          >
                            {t('addAlias')}
                          </Item>
                        )}
                        {signatures?.length > 0 &&
                          (signature && !signature.default ? (
                            <>
                              <Item
                                icon="signature"
                                onClick={(_value, event) => {
                                  event.stopPropagation();
                                  setVisible(false);
                                  setOpenSignatureModal(true);
                                }}
                              >
                                {t('changeSignature')}
                              </Item>
                              <Item
                                icon="edit"
                                onClick={(_value, event) => {
                                  event.stopPropagation();
                                  setVisible(false);
                                  removeSignatureConnection(data?.id, signature?.id);
                                }}
                              >
                                {t('removeSignature')}
                              </Item>
                            </>
                          ) : (
                            <Item
                              icon="signature"
                              onClick={(_value, event) => {
                                event.stopPropagation();
                                setVisible(false);
                                setOpenSignatureModal(true);
                              }}
                            >
                              {t('addSignature')}
                            </Item>
                          ))}
                      </Dropdown>
                    )}
                  </CardRight>
                )}
              </>
            )}
            {!isEmail || isStopped ? (
              <CardHoverButtons>
                <CardButton
                  variant="secondary"
                  size="small"
                  onClick={() => {
                    const connection = isEmail ? email : connectionId;
                    updateDefaultConnection(connection);
                  }}
                >
                  {t('setDefault')}
                </CardButton>
                {!accountIntegrationMode && (
                  <CardButton size="small" onClick={() => setOpenModal(true)}>
                    {t('disconnect')}
                  </CardButton>
                )}
              </CardHoverButtons>
            ) : (
              <></>
            )}
          </CardHeader>
          <CardContent>
            <div className={styles._content_container}>
              <div className={styles._signature_container}>
                <Icon name="signature" color="verySoftBloobirds" size={20} />
                {!signatures || signatures.length === 0 ? (
                  <Text size="s" color="softPeanut" inline>
                    {t('createSignature')}
                  </Text>
                ) : !signature || signature.default ? (
                  <Text size="s" color="softPeanut" inline>
                    {t('currentSignature')}
                  </Text>
                ) : (
                  <Text size="s" color="peanut" inline>
                    {signature.name}
                  </Text>
                )}
              </div>
              {data?.nylasAliases?.length > 0 ? (
                <div>
                  <Text size="s" color="softPeanut">
                    Aliases
                  </Text>
                  <div className={styles._alias_list}>
                    {data?.nylasAliases?.map(alias => (
                      <AliasName key={alias?.id} alias={alias} />
                    ))}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      {aliasModalOpen && (
        <AddAliasModal nylasAccount={data} onClose={() => setAliasModalOpen(false)} />
      )}
      {openModal && (
        <DisconnectModal
          open
          type={type}
          handleClose={() => setOpenModal(false)}
          handleConfirm={() => disconnectConnection(connectionId, isNylas)}
          connection={isEmail ? email : phone}
        />
      )}
      {openSignatureModal && (
        <ChangeSignatureModal
          open
          onClose={() => setOpenSignatureModal(false)}
          connectionId={isEmail ? data?.id : null}
        />
      )}
    </>
  );
};

export default ConnectionCard;
