import React from 'react';

import useSWR from 'swr';

import { HomeMetricsResponse } from '../typings/home';

export const useActivityEvolution = (timeWindow: string) => {
  const url = '/statistics/metrics/home/Tasks/ACTIVITY?timeWindow=' + timeWindow;
  const { data, error } = useSWR<HomeMetricsResponse>(url);

  return {
    data,
    error,
  };
};
export const useCustomActivityStatistics = (timeWindow: string) => {
  const url = '/statistics/metrics/home/Tasks/CUSTOM_ACTIVITY?timeWindow=' + timeWindow;
  const { data, error } = useSWR<HomeMetricsResponse>(url);

  return {
    data,
    error,
  };
};

export const useLinkedInStatistics = (timeWindow: string) => {
  const url = '/statistics/metrics/home/Tasks/LINKEDIN?timeWindow=' + timeWindow;
  const { data, error } = useSWR<HomeMetricsResponse>(url);

  return {
    data,
    error,
  };
};

export const useCallsStatistics = (timeWindow: string) => {
  const url = '/statistics/metrics/home/Tasks/CALLS?timeWindow=' + timeWindow;
  const { data, error } = useSWR<HomeMetricsResponse>(url);

  return {
    data,
    error,
  };
};

export const useEmailsStatistics = (timeWindow: string) => {
  const url = '/statistics/metrics/home/Tasks/EMAILS?timeWindow=' + timeWindow;
  const { data, error } = useSWR<HomeMetricsResponse>(url);

  return {
    data,
    error,
  };
};

export const useEmailsAutoStatistics = (timeWindow: string) => {
  const url = '/statistics/metrics/home/Tasks/AUTOEMAILS?timeWindow=' + timeWindow;
  const { data, error } = useSWR<HomeMetricsResponse>(url);

  return {
    data,
    error,
  };
};

export const useTasksStatistics = (timeWindow: string) => {
  const url = '/statistics/metrics/home/Tasks/TASKS?timeWindow=' + timeWindow;
  const { data, error } = useSWR<HomeMetricsResponse>(url);

  return {
    data,
    error,
  };
};
