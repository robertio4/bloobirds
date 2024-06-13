import React, { useState } from 'react';
import {
  Button,
  Carousel,
  Chip,
  CircularBadge,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalFooterButtons,
  ModalHeader,
  ModalTitle,
  Text,
} from '@bloobirds-it/flamingo-ui';
import useSWR from 'swr';
import styles from './buyerPersonasModal.module.css';
import { useBuyerPersonasList } from '../../hooks/useBuyerPersonasList';
import { getFieldByLogicRole } from '../../utils/bobjects.utils';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../constants/company';
import { ServiceApi } from '../../misc/api/service';
import { APP_PLAYBOOK_BUYER_PERSONAS } from '../../app/_constants/routes';
import { useRouter } from '../../hooks';
import { serialize, useRichTextEditorPlugins } from '@bloobirds-it/rich-text-editor';
import { Bobject, BobjectField } from '../../typings/bobjects';

const selectedBadgeStyle = {
  width: '100px',
  height: '100px',
  fontSize: '30px',
  border: '1px solid var(--white)',
};

const BuyerPersonaItem = ({ buyer, selected, onClick }) => (
  <div
    className={styles._buyer_persona_wrapper}
    key={buyer?.id}
    onClick={onClick}
    style={{ marginTop: selected ? '0' : '-10px' }}
  >
    <CircularBadge backgroundColor={buyer?.color} style={selected ? selectedBadgeStyle : {}}>
      {buyer?.shortName}
    </CircularBadge>
    {selected && (
      <div className={styles._buyer_persona__name}>
        <Text>{buyer?.name}</Text>
      </div>
    )}
  </div>
);

interface ExtendedBobjectField extends BobjectField {
  fieldValueConditions: Array<{
    fieldValuesToDisplay: Array<BobjectField>;
    childField: BobjectField;
  }>;
}

const BuyerPersonasModal = ({
  handleCloseModal,
  company,
}: {
  handleCloseModal: () => void;
  company?: Bobject;
}) => {
  const [selectedBuyer, setSelectedBuyer] = useState(0);
  const { history } = useRouter();
  const { buyerPersonas } = useBuyerPersonasList();
  const companyTargetMarket = getFieldByLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET);
  const { data: targetMarkets } = useSWR<Array<ExtendedBobjectField>>('/targetMarket', () =>
    ServiceApi.request({
      url: '/service/view/targetMarket',
      method: 'GET',
    }),
  );
  const selectedTargetMarket =
    companyTargetMarket &&
    targetMarkets?.find(targetMarket => targetMarket?.id === companyTargetMarket?.value);
  const targetMarketBuyerPersonas = selectedTargetMarket?.fieldValueConditions?.find(
    condition => condition?.childField?.label === 'ICP',
  )?.fieldValuesToDisplay;
  const targetMarketBuyerPersonasIds = targetMarketBuyerPersonas?.map(
    targetMarketBuyer => targetMarketBuyer.name,
  );
  const buyerPersonasToRender = targetMarketBuyerPersonas
    ? buyerPersonas?.filter((buyer: BobjectField) =>
        targetMarketBuyerPersonasIds.includes(buyer?.id),
      )
    : buyerPersonas;
  const selectedBuyerPersona = buyerPersonasToRender && buyerPersonasToRender[selectedBuyer];
  const hasSegmentation = selectedBuyerPersona?.fieldValueConditions.length > 0;
  const plugins = useRichTextEditorPlugins({
    rawHTMLBlock: true,
  });

  return (
    <Modal open width={620} onClose={handleCloseModal} variant="gradient">
      <ModalHeader variant="gradient" icon="people" color="purple">
        <ModalTitle variant="gradient" icon="people">
          {`My Buyer Personas ${
            companyTargetMarket?.text ? `for "${companyTargetMarket?.text}"` : ''
          }`}
        </ModalTitle>
        <ModalCloseIcon variant="gradient" onClick={handleCloseModal} />
      </ModalHeader>
      <ModalContent dataTest="modal-buyer-personas" className={styles._wrapper}>
        <div className={styles._buyer_persona_carousel}>
          {buyerPersonasToRender && (
            <Carousel
              activeSlide={selectedBuyer}
              onChange={slideIndex => setSelectedBuyer(slideIndex)}
            >
              {buyerPersonasToRender
                ?.filter(bp => bp?.enabled)
                .map((buyer, index) => (
                  <BuyerPersonaItem
                    key={buyer?.id}
                    buyer={buyer}
                    onClick={() => {
                      setSelectedBuyer(index);
                    }}
                  />
                ))}
            </Carousel>
          )}
        </div>
        <div className={styles._content}>
          {selectedBuyerPersona?.description && (
            <div className={styles._section}>
              <Text size="m" color="softPeanut" htmlTag="h4">
                Description
              </Text>
              <div
                className={styles._description}
                dangerouslySetInnerHTML={{
                  __html: serialize(selectedBuyerPersona?.description, { format: 'HTML', plugins }),
                }}
              />
            </div>
          )}
          {hasSegmentation && (
            <div className={styles._section}>
              <Text size="m" color="softPeanut" htmlTag="h4">
                Segmentation
              </Text>
              <ul className={styles._segmentations}>
                {selectedBuyerPersona?.fieldValueConditions?.map(condition => (
                  <li className={styles._segmentation_item} key={condition?.childField?.name}>
                    <Text size="xs">{condition?.childField?.label}:</Text>
                    <div className={styles._segmentation_item_values}>
                      {condition?.fieldValuesToDisplay?.map(value => (
                        <Chip size="small" key={value?.title} disabled>
                          {value?.label}
                        </Chip>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!hasSegmentation && !selectedTargetMarket?.description && (
            <div className={styles._empty_message}>
              <Text htmlTag="span" color="softPeanut" size="m" align="center">
                This Buyer Persona has no description. You can edit it in{' '}
                <span
                  className={styles._playbook_link}
                  onClick={() => {
                    history.push(APP_PLAYBOOK_BUYER_PERSONAS);
                  }}
                >
                  Playbook set-up
                </span>
              </Text>
            </div>
          )}
        </div>
      </ModalContent>
      <ModalFooter>
        <ModalFooterButtons>
          <div className={styles._footer}>
            <Button variant="secondary" onClick={handleCloseModal}>
              Accept
            </Button>
          </div>
        </ModalFooterButtons>
      </ModalFooter>
    </Modal>
  );
};

export default BuyerPersonasModal;
