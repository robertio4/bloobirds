import { useEffect, useRef, useState } from 'react';

import { IconButton, Spinner } from '@bloobirds-it/flamingo-ui';
import { useActiveAccountId, useNumintecEnabled } from '@bloobirds-it/hooks';
import { api, isUrl } from '@bloobirds-it/utils';
import WaveSurfer from 'wavesurfer.js';

import styles from './callSoundWave.module.css';

export const CallSoundWave = ({ audioSource, callId, setError }) => {
  const waveRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(undefined);
  const [url, setUrl] = useState('');
  //const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const accountId = useActiveAccountId();

  const enabledNumintecDialer = useNumintecEnabled(accountId);

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

  /*function handleIncreasePlaybackSpeed(boo) {
    let speed = playbackSpeed;
    switch (speed) {
      case 0.5:
        speed = boo ? 1 : 0.5;
        break;
      case 1:
        speed = boo ? 1.5 : 0.5;
        break;
      case 1.5:
        speed = boo ? 2 : 1;
        break;
      case 2:
        speed = boo ? 2 : 1.5;
        break;
    }
    waveRef.current.setPlaybackRate(speed);
    setPlaybackSpeed(speed);
  }*/

  useEffect(() => {
    if (waveRef.current) {
      // @ts-ignore
      waveRef?.current?.destroy();
      setIsLoading(true);
    }
    waveRef.current = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#94A5B4',
      progressColor: 'black',
      barWidth: 3,
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
    const getSignedCallRecordingUrl = async () => {
      if (enabledNumintecDialer) {
        try {
          const audio = await api.get(
            `/calls/numintec/recording/${callId?.replace('-', '')?.replace('.', '')}`,
            { responseType: 'blob' },
          );
          return setAudio(audio.data);
        } catch (error) {
          setError(error);
        }
      }
      const oldRecordingRegex = /^(https:\/\/record-calls.bloobirds.com\/)(.{34})/g;
      let callSid = audioSource;
      const itsADeprecatedRecordingLink = audioSource?.match(oldRecordingRegex);
      if (!itsADeprecatedRecordingLink && isUrl(audioSource)) {
        return audioSource;
      }
      if (audioSource && itsADeprecatedRecordingLink) {
        callSid = audioSource.split('/').at(-1);
      } else {
        callSid = audioSource.split('/')[1];
      }
      const signedUrl = await api.get(`/calls/whiteLabel/calls/${callSid}/recording`);
      if (signedUrl.status === 200) {
        return signedUrl.data.url;
      } else {
        throw new Error('Failed to get signed url');
      }
    };
    getSignedCallRecordingUrl().then(url => {
      setUrl(url);
    });
    return () => {
      // @ts-ignore
      waveRef.current.destroy();
    };
  }, [audioSource, callId]);

  useEffect(() => {
    if (url) {
      fetch(url)
        .then(res => res.blob())
        .then(blob => setAudio(blob));
    }
  }, [url, audioSource]);

  useEffect(() => {
    if (audio && audio?.size !== 0) {
      // @ts-ignore
      waveRef.current?.loadBlob(audio);
    }
  }, [audio]);

  return (
    <>
      <div id="waveform" style={{ display: isLoading ? 'hidden' : '' }} />
      {isLoading && (
        <div className={styles.loader}>
          <Spinner name="loadingCircle" />
        </div>
      )}
      <div className={styles.controls}>
        {/*@ts-ignore*/}
        <IconButton {...buttonProps} size={36} />
        {/*<div className={styles.speedControls}>
          <IconButton
            name="minus"
            size={12}
            onClick={() => {
              waveRef.current.skip(0.1);
              handleIncreasePlaybackSpeed(false);
            }}
          />
          <Text size="xs" color="bloobirds">
            {playbackSpeed}x
          </Text>
          <IconButton
            name="plus"
            size={12}
            onClick={() => {
              waveRef.current.skip(-0.07);
              handleIncreasePlaybackSpeed(true);
            }}
          />
        </div>*/}
      </div>
    </>
  );
};
