import React from 'react';
import { useParams } from 'react-router';

import { Bobject } from '@bloobirds-it/types';

import CallAnalysis from './callAiAnalysis';
import MeetingAnalysisSkeleton from './infoAiSkeleton';
import MeetingAnalysis from './meetingAiAnalysis';

interface InfoAnalysisProps {
  activity: Bobject;
  isLoading: boolean;
}

const InfoAiAnalysis = ({ activity, isLoading }: InfoAnalysisProps) => {
  const { activityType } = useParams<{ activityType: string }>();
  const isMeeting = activityType === 'meeting';
  const isCall = activityType === 'call';

  if (isLoading || !activity) {
    return <MeetingAnalysisSkeleton />;
  }

  if (isMeeting) {
    return <MeetingAnalysis activity={activity} />;
  }

  if (isCall) {
    return <CallAnalysis activity={activity} />;
  }
};

export default InfoAiAnalysis;
