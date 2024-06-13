import React, { useEffect, useMemo, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { ActivityTimelineItem } from '@bloobirds-it/activity-timeline-item';
import { Icon, IconButton, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { useCustomTasks, useQuickLogActivity, useActiveUserSettings } from '@bloobirds-it/hooks';
import { Bobject, DataModelResponse } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import clsx from 'clsx';
import WaveSurfer from 'wavesurfer.js';

import { MessagesPerDay } from './whatsappDetail';
import styles from './whatsappDetail.module.css';

export interface DetailsActivityProps {
  activity: Bobject;
  dataModel: DataModelResponse;
  messagesPerDay: MessagesPerDay;
  totalMatching: number;
  fetchNextPage: () => void;
  isLoading: boolean;
}

function getReadableMimeType(mimeType: string): string {
  switch (mimeType) {
    case 'application/pdf':
      return 'PDF';
    case 'image/jpeg':
    case 'image/png':
    case 'image/gif':
    case 'image/webp':
    case 'image/svg+xml':
      return 'Image';
    case 'application/zip':
    case 'application/x-rar-compressed':
    case 'application/x-7z-compressed':
      return 'Archive';
    case 'text/plain':
      return 'Text';
    case 'text/html':
      return 'HTML';
    case 'application/json':
      return 'JSON';
    case 'application/javascript':
      return 'JavaScript';
    case 'application/xml':
      return 'XML';
    case 'video/mp4':
    case 'video/mpeg':
    case 'video/ogg':
    case 'video/webm':
      return 'Video';
    case 'audio/mpeg':
    case 'audio/ogg':
    case 'audio/*':
      return 'Audio';
    default:
      return 'File';
  }
}

function getTotalMessagesCount(groupedByDay: MessagesPerDay) {
  return Object.values(groupedByDay).reduce(
    (total, groupedMessages) => total + groupedMessages?.messages?.length,
    0,
  );
}

//Transform the isoDate string into a Date object and get the hours and minutes
const getHoursAndMinutes = (isoDate: string) => {
  const date = new Date(isoDate);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  // Pad the minutes with a 0 if it's less than 10
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};

function AudioPlayer({ activityId, hasTranscription }) {
  const waveRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [audio, setAudio] = useState(undefined);
  const [transcription, setTranscription] = useState(undefined);

  useEffect(() => {
    if (waveRef.current) {
      // @ts-ignore
      waveRef?.current?.destroy();
      setIsLoading(true);
    }
    waveRef.current = WaveSurfer.create({
      container: '#waveform' + activityId,
      waveColor: '#D4E0F1',
      progressColor: '#94A5BA',
      barGap: 3,
      barWidth: 4,
      barHeight: 3,
      barRadius: 4,
      cursorWidth: 2,
      cursorColor: '#1991FF',
      width: 184,
      height: 42,
    });
    // @ts-ignore
    if (!waveRef.current?.handlers?.ready) {
      // @ts-ignore
      waveRef.current?.on('ready', () => {
        setIsLoading(false);
      });
    }
    // @ts-ignore
    if (!waveRef.current?.handlers?.error) {
      // @ts-ignore
      waveRef.current?.on('error', function (e) {
        console.warn(e);
      });
    }
    return () => {
      // @ts-ignore
      waveRef.current.destroy();
    };
  }, []);

  useEffect(() => {
    if (activityId) {
      api
        .get(`/messaging/whatsapp/${activityId}/media`, { responseType: 'blob' })
        .then(res => setAudio(res.data));
    }
  }, [activityId]);

  useEffect(() => {
    if (audio && audio?.size !== 0) {
      // @ts-ignore
      waveRef.current?.loadBlob(audio);
    }
  }, [audio]);

  const buttonProps = isPlaying
    ? {
        name: 'pause',
        onClick: () => {
          setIsPlaying(false);
          // @ts-ignore
          waveRef?.current?.pause();
        },
      }
    : {
        name: 'play',
        onClick: () => {
          setIsPlaying(true);
          // @ts-ignore
          waveRef?.current?.play();
        },
      };

  async function getTranscription() {
    const response = await api.get(`/copilot/transcript/audioMessage/${activityId}`);
    setTranscription(response.data);
    /*setTranscription({
      pk: '01HSDW4DT76TVG65GRPSRV72F3',
      accountId: '7VA3TbSzLkrOE3Ud',
      transcript: [
        {
          text:
            'Tú que eres el que más disfruta de los cacatones, esa es la casa de Toni cuando...',
          start: 0,
          speaker: 'Eudald Arranz',
          isLead: true,
          end: 0,
        },
      ],
      activityId: 'HoJx2wDGcQ6VRVba',
      status: 'GENERATED',
      language: 'es',
      error: null,
      generation_started_at: '2024-03-20T12:07:30.656048',
      generated_at: null,
      activity_type: null,
    });*/
  }

  return (
    <>
      <div className={styles._audio_player}>
        {/*@ts-ignore*/}
        <IconButton {...buttonProps} size={36} color="softPeanut" />
        <div id={`waveform${activityId}`} className={styles._waveform}></div>
        {isLoading && (
          <div className={styles.loader}>
            <Spinner name="loadingCircle" />
          </div>
        )}
      </div>
      {hasTranscription && (
        <div className={styles._transcription_wrapper}>
          {!transcription && (
            <div className={styles.display_transcription} onClick={getTranscription}>
              <Icon name="alignLeft" size={12} color="bloobirds" />
              <Text size="xs" color="bloobirds">
                Get transcription
              </Text>
            </div>
          )}
          {transcription && (
            <div className={styles.transcription_box}>
              <div className={styles.display_transcription}>
                <Icon name="alignLeft" size={12} color="softPeanut" />
                <Text size="xs" color="bloobirds">
                  Transcription
                </Text>
              </div>
              <Text size="xs" color="peanut">
                {transcription?.transcript[0]?.text || 'Transcription not available'}
              </Text>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function WhatsappMessageMedia({ activityId, media, onClick, hasTranscription }) {
  const readableMimeType = getReadableMimeType(media.contentType);
  const isAudio = readableMimeType === 'Audio';
  const isImage = readableMimeType === 'Image';

  if (isAudio) {
    return <AudioPlayer activityId={activityId} hasTranscription={hasTranscription} />;
  }

  if (isImage) {
    return (
      <div>
        <img src={media.url} alt="media" className={styles._media_image} />
      </div>
    );
  }

  return (
    <div className={styles._media_wrapper}>
      <div className={styles._media_title}>
        <Icon name="file" size={32} color="softPeanut" />
        <div className={styles._media_text}>
          <Text size="s">{media.name}</Text>
          <Text size="xs" color="softPeanut">
            {media.size ? `${media.size} - ` : ''} {readableMimeType}
          </Text>
        </div>
      </div>
      <IconButton name="download" size={32} color="bloobirds" onClick={onClick} />
    </div>
  );
}

function WhatsappMessage({ messagesPerDay, day, message, index, handleDownload }) {
  const previousMessage = messagesPerDay[day].messages[index - 1];
  const previousIsDifferentDirection = previousMessage
    ? previousMessage.direction !== message.direction
    : false;

  const media = message.media?.[0];

  return (
    <div key={message?.id}>
      <div
        className={clsx(styles._message, {
          [styles._message_incoming]: message.direction === 'INCOMING',
          [styles._message_outgoing]: message.direction === 'OUTGOING',
          [styles._last_message]: previousIsDifferentDirection || index === 0,
        })}
      >
        <div className={styles._message_body}>
          <div
            className={clsx(styles._svg_wrapper, {
              [styles._svg_incoming]: message.direction === 'INCOMING',
              [styles._svg_outgoing]: message.direction === 'OUTGOING',
            })}
          ></div>
          {!media && (message.body === 'undefined' || message.body === '' || !message.body) ? (
            <Text size="s" className={styles._message_text} color={'softPeanut'}>
              Message could not be parsed into Bloobirds
            </Text>
          ) : (
            <Text size="s" className={styles._message_text}>
              {message.body}
            </Text>
          )}
          {media && (
            <WhatsappMessageMedia
              activityId={message.id?.split('/')[2]}
              hasTranscription={message.hasTranscription}
              media={media}
              onClick={() => handleDownload(media)}
            />
          )}
          <span className={styles._message_date}>{getHoursAndMinutes(message.isoDate)}</span>
        </div>
      </div>
    </div>
  );
}

export const WhatsappDetailedActivity = ({
  activity,
  dataModel,
  messagesPerDay,
  totalMatching,
  fetchNextPage,
  isLoading,
}: DetailsActivityProps) => {
  const ref = useRef();
  const { customTasks } = useCustomTasks();
  const { openQuickLogModal } = useQuickLogActivity();
  const totalMessages = getTotalMessagesCount(messagesPerDay);
  const { settings } = useActiveUserSettings();

  const hasNextPage = useMemo(() => {
    return false;
  }, [totalMessages, totalMatching]);

  if (!messagesPerDay || isLoading) {
    return (
      <div className={styles.loading}>
        <Spinner name="loadingCircle" />
      </div>
    );
  }

  function handleDownload(media) {
    window.open(media.url, '_blank');
  }

  const handleClickOnCase = caseId => {
    window.open(settings?.account?.salesforceInstance + '/' + caseId, '_blank');
  };

  return (
    <>
      <ActivityTimelineItem
        activity={activity}
        key={activity?.id?.value}
        startDisplayDivider={false}
        endDisplayDivider={false}
        extended
        alternativeDescription
        activeHover={false}
        dataModel={dataModel}
        customTasks={customTasks}
        openQuickLogModal={openQuickLogModal}
      />
      <div className={styles._messages_wrapper} id="conversationContent" ref={ref}>
        <InfiniteScroll
          dataLength={totalMessages}
          hasMore={hasNextPage}
          next={fetchNextPage}
          inverse={true}
          height="100%"
          scrollThreshold={0.75}
          scrollableTarget="conversationContent"
          loader={
            <div className={styles.loading}>
              <Spinner name="dots" />
            </div>
          }
          style={{ display: 'flex', flexDirection: 'column-reverse' }}
        >
          <div key={`${activity?.id?.value}-list`} className={styles._conversation_wrapper}>
            {Object.keys(messagesPerDay).map((key: string, indexGroup: number) => (
              <>
                {messagesPerDay[key].messages.map((data: any, index) => {
                  // If the message has case Id and the previous mage has not the same case id or is the first message, we show the case id
                  const nextMessage =
                    index === messagesPerDay[key].messages.length - 1 &&
                    Object.keys(messagesPerDay)[indexGroup + 1]
                      ? messagesPerDay[Object.keys(messagesPerDay)[indexGroup + 1]].messages[0]
                      : messagesPerDay[key].messages[index + 1];
                  const shouldShowCaseId =
                    data?.caseId && (!nextMessage || nextMessage?.caseId !== data.caseId);
                  return (
                    <div className={styles.messageBox} key={data?.id?.value}>
                      {data?.caseId && shouldShowCaseId && (
                        <div className={styles.case_id_wrapper}>
                          <Text size="s" color="softPeanut">
                            New case created
                          </Text>
                          <div
                            onClick={() => handleClickOnCase(data?.caseId)}
                            style={{ cursor: 'pointer' }}
                          >
                            <Icon name="briefcase" size={16} color="bloobirds" />
                            <Text size="s" color="bloobirds">
                              {data?.caseNumber || data?.caseId}
                            </Text>
                          </div>
                        </div>
                      )}
                      <WhatsappMessage
                        messagesPerDay={messagesPerDay}
                        day={key}
                        message={data}
                        index={index}
                        handleDownload={handleDownload}
                      />
                    </div>
                  );
                })}
                <div className={styles._date_wrapper}>
                  <Text size="m">{messagesPerDay[key].formattedDate}</Text>
                </div>
              </>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};
