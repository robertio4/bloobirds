import React, { useEffect } from 'react';
import { ColorType, IconType, Text, Timeline, TimelineItem } from '@bloobirds-it/flamingo-ui';
import { format as formatDate } from 'date-fns';
import InfiniteScroll from 'react-infinite-scroll-component';
import mixpanel from 'mixpanel-browser';
import { useWorkflowsLogs } from '../../useAutomationsEdition';
import { useBobjectDetails, useEntity } from '../../../../../hooks';
import styles from '../../workflowsPage/workflowsPage.module.css';
import { SearchLogs } from '../../../../../../assets/svg';
import { moduleTranslator } from '../actionsTabFolder/actions/modules/moduleTranslator';
import { useWorkflow } from '../context/workflowsContext';
import { LogsFilters } from './logsFilters';
import { getText, LogsPlaceholder } from './logs.utils';
import { useQueryParam } from '../../../../../hooks/useQueryParams';
import { MIXPANEL_EVENTS } from '../../../../../constants/mixpanel';

const logIconTranslator: { [key: string]: IconType } = {
  ENABLE: 'playOutline',
  CREATE: 'flagFilled',
  DISABLE: 'pause',
  UPDATE: 'edit',
};

const WorkflowLogsPage = () => {
  const editingWorkflowId = useQueryParam('workflow');
  const bobjectFields = useEntity('bobjectFields');
  const { openBobjectDetails } = useBobjectDetails();
  const {
    state: { trigger, logsFilters },
  } = useWorkflow();
  const { workflowLogs, isValidating, hasNextPage, loadNextPage } = useWorkflowsLogs({
    id: editingWorkflowId,
    dateRange: logsFilters?.dateTime,
    showEditionOnly: logsFilters?.showEditionOnly,
    associatedBobjects: logsFilters?.associatedBobjects,
  });

  const users = useEntity('users');
  const getActionColor = logStatus => {
    return logStatus === 'SUCCESS'
      ? { iconColor: 'extraCall', color: 'verySoftMelon' }
      : {
          iconColor: 'tomato',
          color: 'verySoftTomato',
        };
  };

  useEffect(() => {
    mixpanel.track(MIXPANEL_EVENTS.WORKFLOW_CLICKED_ON_LOGS_PAGE);
  }, []);

  return (
    <div className={styles._logs_container}>
      <LogsFilters bobjectType={trigger?.bobjectType} />
      {isValidating ? (
        <LogsPlaceholder />
      ) : workflowLogs?.length > 0 ? (
        <>
          <div id="logsContent" className={styles._logs_timeline}>
            <Timeline>
              <InfiniteScroll
                dataLength={workflowLogs?.length}
                hasMore={hasNextPage}
                className={styles._list_wrapper}
                next={loadNextPage}
                scrollThreshold={0.75}
                scrollableTarget="logsContent"
                loader={<LogsPlaceholder />}
              >
                {workflowLogs?.map((log: any, index: number) => {
                  const options = {
                    // @ts-ignore
                    targetUserName: undefined,
                  };
                  const userName = users?.find((user: { id: string }) => user.id === log?.author)
                    ?.name;
                  const userId = log?.dataChange && Object.values(JSON.parse(log?.dataChange))[0];
                  options.targetUserName =
                    userId && users?.find((user: any) => user.id === userId)?.name;

                  const data = {
                    icon: (log?.log !== 'action'
                      ? logIconTranslator[log?.event]
                      : moduleTranslator(log?.action)?.icon) as IconType,
                    iconColor: (log?.log !== 'action'
                      ? 'softPeanut'
                      : getActionColor(log?.logType)?.iconColor) as ColorType,
                    color: (log?.log !== 'action'
                      ? 'verySoftPeanut'
                      : getActionColor(log?.logType)?.color) as ColorType,
                    description: formatDate(new Date(log?.time), 'MMMM do, yyyy HH:mm '),
                  };

                  return (
                    <TimelineItem
                      key={log?.id}
                      data={data}
                      endDisplayDivider={index + 1 !== workflowLogs?.length}
                      startDisplayDivider={index !== 0}
                      backgroundColor="white"
                    >
                      {log?.log !== 'action' ? (
                        <div className={styles._log_text_block}>
                          <Text size="s">
                            Workflow <b>{log.event?.toLowerCase()}d</b> by{' '}
                          </Text>
                          <Text size="s" color="bloobirds">
                            {userName}.
                          </Text>
                        </div>
                      ) : (
                        getText(log, bobjectFields, options, openBobjectDetails)
                      )}
                    </TimelineItem>
                  );
                })}
              </InfiniteScroll>
            </Timeline>
          </div>
        </>
      ) : (
        <div className={styles._no_logs_placeholder}>
          <SearchLogs className={styles._no_results__img} />
          <Text
            size="xl"
            weight="bold"
            align="center"
            color="softPeanut"
            className={styles._no_logs_placeholder_title}
          >
            No logs have been recorded yet
          </Text>
          <Text
            size="m"
            align="center"
            color="softPeanut"
            className={styles._no_logs_placeholder_subtitle}
          >
            There has been no actions performed by this workflow.
          </Text>
        </div>
      )}
    </div>
  );
};

export default WorkflowLogsPage;
