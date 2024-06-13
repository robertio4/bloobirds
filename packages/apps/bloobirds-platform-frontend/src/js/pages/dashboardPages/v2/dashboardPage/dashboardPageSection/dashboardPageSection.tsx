import React, { useEffect, useState } from 'react';

import { DashboardSection } from '../../../../../constants/newDashboards';
import { useNewMeetingChartsEnabled } from '../../../../../hooks/useFeatureFlags';
import { Section } from '../../../v1/Section/Section';
import { DashboardPanel } from '../../dashboardPanel/dashboardPanel';
import { FunnelPanel } from '../../funnelPanel/funnelPanel';
import StatsPanel from '../../statsPanel/statsPanel';

const DashboardPageSection = ({ section }: { section: DashboardSection }) => {
  const [hasStats, setHasStats] = useState(false);

  useEffect(() => {
    setHasStats(!!section.statsPanel);
  }, []);
  const [multiPanelIndex, setMultiPanelIndex] = useState(0);

  const meetingChartsNew = ['MEETINGS_CREATED', 'MEETINGS_RESULTS', 'MEETINGS_CHANNEL'];
  const isNewMeetingChartsEnabled = useNewMeetingChartsEnabled();
  return (
    <Section
      title={section.title}
      isNew={section.new}
      isBeta={section.beta}
      stats={hasStats ? <StatsPanel definition={section.statsPanel} /> : undefined}
    >
      {section.panels.map(panelDefinition => {
        if (panelDefinition.isFunnel) {
          return <FunnelPanel panelDefinition={panelDefinition} />;
        } else {
          if (isNewMeetingChartsEnabled && meetingChartsNew.includes(panelDefinition.report)) {
            panelDefinition.report = panelDefinition.report + '_NEW';
          }
          return (
            <DashboardPanel
              key={panelDefinition.title}
              panelDefinition={panelDefinition}
              hasPriority={
                panelDefinition.type === 'MultiPanel' &&
                panelDefinition.panels[0].type === 'BarChartPanel'
              }
              parentMultiPanelIndex={multiPanelIndex}
              setParentMultiPanelIndex={setMultiPanelIndex}
            />
          );
        }
      })}
    </Section>
  );
};

export default DashboardPageSection;
