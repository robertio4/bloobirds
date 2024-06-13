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
import { ServiceApi } from '../../misc/api/service';
import styles from './targetMarketsModal.module.css';
import { APP_PLAYBOOK_TARGET_MARKET } from '../../app/_constants/routes';
import { useRouter } from '../../hooks';
import { useRichTextEditorPlugins, serialize } from '@bloobirds-it/rich-text-editor';

const selectedBadgeStyle = {
  width: '100px',
  height: '100px',
  fontSize: '30px',
  border: '1px solid var(--white)',
};

const TargetMarketItem = ({ targetMarket, selected, onClick }) => (
  <div
    className={styles._target_market_wrapper}
    key={targetMarket?.id}
    onClick={onClick}
    style={{ marginTop: selected ? '0' : '-10px' }}
  >
    <CircularBadge backgroundColor={targetMarket?.color} style={selected ? selectedBadgeStyle : {}}>
      {targetMarket?.shortName}
    </CircularBadge>
    {selected && (
      <div className={styles._target_market__name}>
        <Text>{targetMarket?.name}</Text>
      </div>
    )}
  </div>
);

const TargetMarketsModal = ({ handleCloseModal }) => {
  const [selectedTarget, setSelectedTarget] = useState(0);
  const { history } = useRouter();
  const { data: targetMarkets } = useSWR('/targetMarket', () =>
    ServiceApi.request({
      url: '/service/view/targetMarket',
      method: 'GET',
    }),
  );
  const plugins = useRichTextEditorPlugins({
    rawHTMLBlock: true,
  });

  const selectedTargetMarket = targetMarkets && targetMarkets[selectedTarget];
  const hasSegmentation = selectedTargetMarket?.fieldValueConditions.length > 0;

  return (
    <Modal open width={620} onClose={handleCloseModal} variant="gradient">
      <ModalHeader variant="gradient" icon="people" color="purple">
        <ModalTitle variant="gradient" icon="people">
          My Target Markets
        </ModalTitle>
        <ModalCloseIcon variant="gradient" onClick={handleCloseModal} />
      </ModalHeader>
      <ModalContent dataTest="modal-target-markets" className={styles._wrapper}>
        <div className={styles._target_market_carousel}>
          {targetMarkets && (
            <Carousel
              activeSlide={selectedTarget}
              onChange={slideIndex => setSelectedTarget(slideIndex)}
            >
              {targetMarkets
                ?.filter(tm => tm?.enabled)
                .map((targetMarket, index) => (
                  <TargetMarketItem
                    key={targetMarket?.id}
                    targetMarket={targetMarket}
                    onClick={() => {
                      setSelectedTarget(index);
                    }}
                  />
                ))}
            </Carousel>
          )}
        </div>
        <div className={styles._content}>
          {selectedTargetMarket?.description && (
            <div className={styles._section}>
              <Text size="m" color="softPeanut" htmlTag="h4">
                Description
              </Text>
              <div
                className={styles._description}
                dangerouslySetInnerHTML={{
                  __html: serialize(selectedTargetMarket?.description, { format: 'HTML', plugins }),
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
                {selectedTargetMarket?.fieldValueConditions?.map(condition => (
                  <li className={styles._segmentation_item} key={condition?.childField?.name}>
                    <Text size="xs">{condition?.childField?.label}:</Text>
                    <div className={styles._segmentation_item_values}>
                      {condition?.fieldValuesToDisplay?.map(value => (
                        <Chip size="small" key={value?.title}>
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
                This Target Market has no description. You can edit it in{' '}
                <span
                  className={styles._playbook_link}
                  onClick={() => {
                    history.push(APP_PLAYBOOK_TARGET_MARKET);
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

export default TargetMarketsModal;
