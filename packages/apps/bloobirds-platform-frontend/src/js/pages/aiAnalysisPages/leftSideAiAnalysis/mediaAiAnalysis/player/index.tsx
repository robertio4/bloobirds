import React, { useRef, useEffect, KeyboardEvent, memo } from 'react';

import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import 'videojs-hotkeys';
import 'videojs-wavesurfer/dist/videojs.wavesurfer.js';
import 'wavesurfer.js';

require('!style-loader!css-loader!video.js/dist/video-js.css');
require('!style-loader!css-loader!@videojs/themes/dist/forest/index.css');
require('!style-loader!css-loader!./video-js.css');
require('!style-loader!css-loader!videojs-wavesurfer/dist/css/videojs.wavesurfer.css');

interface PlayerOptions {
  controls: boolean;
  fluid: boolean;
  controlBar: {
    playToggle: boolean;
    volumePanel: boolean;
    currentTimeDisplay: boolean;
    timeDivider: boolean;
    durationDisplay: boolean;
    progressControl: boolean;
    pictureInPictureToggle: boolean;
    remainingTimeDisplay: boolean;
  };
  plugins: {
    hotkeys: {
      volumeStep: number;
      seekStep: number;
      alwaysCaptureHotkeys: boolean;
      captureDocumentHotkeys: boolean;
      documentHotkeysFocusElementFilter: (e: HTMLElement) => boolean;
      enableFullscreen: boolean;
      forwardKey: (event: KeyboardEvent, player: Player) => boolean;
      customKeys: {
        [key: string]: {
          key: (event: KeyboardEvent) => boolean;
          handler: (player: Player, options: any, event: KeyboardEvent) => void;
        };
      };
    };
  };
}

const initialOptions = (
  onChangeIntervention: (player: Player, time: number) => void,
): PlayerOptions => {
  return {
    fluid: true,
    controls: true,
    controlBar: {
      playToggle: false,
      volumePanel: false,
      currentTimeDisplay: false,
      timeDivider: false,
      durationDisplay: false,
      progressControl: false,
      pictureInPictureToggle: false,
      remainingTimeDisplay: false,
    },
    plugins: {
      hotkeys: {
        volumeStep: 0.1,
        seekStep: 10,
        alwaysCaptureHotkeys: true,
        enableFullscreen: false,
        forwardKey: (event, player) => {
          return event.key === 'ArrowRight' && !event.shiftKey;
        },
        customKeys: {
          // Create custom hotkeys
          shiftArrowRightKey: {
            key: event => {
              return event.shiftKey && event.key === 'ArrowRight';
            },
            handler: (player, options, event) => {
              onChangeIntervention(player, player.currentTime());
            },
          },
        },
      },
    },
  };
};

export const VideoJS = ({
  source,
  onReady,
  onChangeIntervention,
  options = {},
}: {
  source: {
    src: string;
    type: string;
  };
  onReady?: (player: Player) => void;
  onChangeIntervention: (player: Player, time: number) => void;
  options?: PlayerOptions | object;
}) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement('video-js');

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(
        videoElement,
        {
          ...initialOptions(onChangeIntervention),
          ...options,
        },
        () => {
          videojs.log('player is ready');

          onReady?.(player);
        },
      ));

      player.addClass('vjs-theme-forest');

      player.src(source);

      //window.player = player;
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <>
      <div data-vjs-player>
        <div ref={videoRef} />
      </div>
    </>
  );
};

export default VideoJS;
