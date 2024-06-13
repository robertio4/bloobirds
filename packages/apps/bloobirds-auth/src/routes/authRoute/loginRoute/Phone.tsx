// @ts-nocheck
import React, { useState, useEffect, useCallback } from 'react';

import SIP from 'sip.js';

interface SIPServerConfig {
  serverURL: string;
  username: string;
  password: string;
}

export const Phone: React.FC = () => {
  const [callStatus, setCallStatus] = useState<string>('Disconnected');
  const [userAgent, setUserAgent] = useState<SIP.UA | null>(null);
  const [currentSession, setCurrentSession] = useState<SIP.InviteSession | null>(null);

  useEffect(() => {
    const userAgentOptions: SIP.UA.Options = {
      uri: `sip:earranzbloobirds@sip.linphone.org`,
      transportOptions: {
        wsServers: ["sip.linphone.org"],
      },
      authorizationUser: "earranzbloobirds",
      password: "ckm1kyp9ykc@rna.BNR",
      sessionDescriptionHandlerFactoryOptions: {
        constraints: {
          audio: true,
          video: false,
        },
      },
    };

    const ua = new SIP.UA(userAgentOptions);
    ua.start();

    setUserAgent(ua);

    ua.on('invite', (session: SIP.InviteSession) => {
      setCurrentSession(session);
      setCallStatus(`Incoming call from ${session.remoteIdentity.uri}`);
      // Add logic to answer or reject the call
    });

    return () => {
      ua.stop();
    };
  }, []);

  const makeCall = useCallback(
    (destination: string) => {
      if (userAgent) {
        const session = userAgent.invite(`sip:${destination}@${SIP_SERVER_CONFIG.serverURL}`, {
          sessionDescriptionHandlerOptions: {
            constraints: {
              audio: true,
              video: false,
            },
          },
        });

        setCurrentSession(session);
        setCallStatus(`Calling ${destination}...`);

        session.on('trackAdded', () => {
          const remoteStream = new MediaStream();
          session.sessionDescriptionHandler.peerConnection.getReceivers().forEach(receiver => {
            remoteStream.addTrack(receiver.track);
          });
        });

        session.on('terminated', () => {
          setCurrentSession(null);
          setCallStatus('Disconnected');
        });
      }
    },
    [userAgent],
  );

  const hangUp = useCallback(() => {
    if (currentSession) {
      currentSession.bye();
      setCurrentSession(null);
      setCallStatus('Disconnected');
    }
  }, [currentSession]);

  return (
    <div>
      <p>Status: {callStatus}</p>
      <button onClick={() => makeCall('test.time@sip5060.net')}>Call 12345</button>
      <button onClick={hangUp}>Hang Up</button>
    </div>
  );
};
