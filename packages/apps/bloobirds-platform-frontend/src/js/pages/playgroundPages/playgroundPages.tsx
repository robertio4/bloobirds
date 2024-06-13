import React, { useContext, useState } from 'react';

import {
  Button, Chip,
  Icon,
  IconButton,
  Item,
  Select,
  Tab,
  TabGroup,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { PicklistField } from '@bloobirds-it/types';
import { AxiosResponse } from 'axios';
import clsx from 'clsx';
import spacetime from 'spacetime';
import useSWR from 'swr';

import { api } from '../../utils/api';
import styles from './playgroundPages.module.css';
import { useAccountId } from '@bloobirds-it/bloobirds-chrome-extension/src/hooks/useAccountId';

const mockInsights = [
  {
    id: '2Rn4dlqz8YQFXgst',
    accountId: 'ITLCIOpIV8bs0STg',
    insightType: 'GENERATION',
    prompt:
      "Review the provided call transcript to assess the sales representative's discussion regarding several critical concepts: artificial intelligence (AI), WhatsApp, and productivity. The analysis should focus on:\n\nIdentifying any instances where the sales representative mentions or asks about artificial intelligence. Determine how AI is presented in the context of the product or service.\n\nChecking for mentions of WhatsApp. This could include discussions about WhatsApp integrations, usage, or advantages in the context of the product or service offered.\n\nExamining how the concept of productivity is addressed. Look for mentions of productivity improvements, tools, or features, and how these are tied into the overall value proposition of the product or service.\n\nYour goal is to provide a comprehensive analysis of whether the sales representative effectively incorporates these critical concepts into their pitch, thereby enhancing the lead's understanding and interest in the product or service.\n\n{format_instructions}\nDo it in {language}",
    activityField: null,
    searchWords: null,
    temperature: 0.0,
    title: 'QA Value proposition / Propuesta de valor',
    version: 6,
    versionIdentifier: 'ljqnliy6xdwb1lRb',
    activityType: 'All',
    activitySubtype: null,
  },
  {
    id: 'Nn0e7HV6zCr1qdOZ',
    accountId: 'ITLCIOpIV8bs0STg',
    insightType: 'EXTRACTION',
    prompt:
      "Based on the conversation, check if one or several words from this JSON formatted list are mentioned. The possible values could respond to the following topics:\n\nTopics:\n\nArtificial Intelligence:\n\nSearch for direct mentions of 'artificial intelligence', 'AI', or in Spanish, 'Inteligencia artificial', and related technologies. Note how AI is related to the product or service under discussion.\n\nWhatsApp:\n\nSearch for direct mentions of 'WhatsApp' or unique features indicative of the platform, such as 'end-to-end encryption'. Avoid assuming WhatsApp usage from general communication discussions.\n\nProductivity:\n\nSearch for direct mentions of 'Productivity' or in Spanish, 'Productividad'. Look for discussions about productivity, including tools or features that enhance efficiency or workflow.\n\nKeywords:\n{search_words}\n\nRules:\n\n- You must return a new list of words that only includes the keywords mentioned in the conversation.\n- You are analysing a transcript, so you can select values that have an editing distance of 2 or 3 from the value of the list.\n- The topics might not be mentioned directly. Consider the entire conversation as context and answer the question always taking into consideration what 'lead_name' says, with the id of the value.",
    activityField: null,
    searchWords: 'Artificial intelligence,WhatsApp,Productivity',
    temperature: 0.0,
    title: 'Have key terms been mentioned? / ¿Se han mencionado términos clave?',
    version: 21,
    versionIdentifier: 'J8uZEToEEtMX0fAI',
    activityType: 'All',
    activitySubtype: null,
  },
  {
    id: 'nydwY3vMcAlRh4sd',
    accountId: 'ITLCIOpIV8bs0STg',
    insightType: 'DECISION',
    prompt:
      "Based on the conversation, check if one value from this JSON formatted list is mentioned. The possible values answer the following question:\n\nQuestion:\n¿Se ha mencionado que somos una aplicación de Salesforce?\n\nValues:\n{values}\n\nRules! Take into account that:\n\n- You must return the id of the value that is mentioned.\n- You are analysing a transcript so you can select values that have an editing distance of 2 or 3 to the value of the list.\n- The question will not be asked directly, you must take the whole conversation as context and answer the question you always taking into consideration what 'lead_name' says, with the id of the value.",
    activityField: '0xHmIJvWeBSNaZCY',
    searchWords: null,
    temperature: 0.0,
    title: 'Have you asked about the CRM? /¿Se ha preguntado por el CRM?',
    version: 11,
    versionIdentifier: '2Utz2DZyxHAHLZVT',
    activityType: 'All',
    activitySubtype: null,
  },
];

const mockTestRuns = [
  {
    pk: '01HR6TJGKBYJCWSBP1B3SCANKX',
    account_id: 'ITLCIOpIV8bs0STg',
    test_set_id: '01HQTWH175944BM75GVMT9B75R',
    created_at: '2024-03-05T08:09:40.203135',
    insight_version_id: 'eN3mlMYB07F62QdA',
    insight_id: 'J8uZEToEEtMX0fAI',
    results: {
      HXG8vEYraIpG1Xa0: {
        pk: '01HR6TJJBDF35K9MQ3BJJRBQNS',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'HXG8vEYraIpG1Xa0',
        created_at: '2024-03-05T08:09:41.997369',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
    },
    status: 'COMPLETED',
  },
  {
    pk: '01HRCX4WW9JQW6RZ8EV2R4SDD2',
    account_id: 'ITLCIOpIV8bs0STg',
    test_set_id: '01HR4YX8T1HWVKHGF170SNDP06',
    created_at: '2024-03-07T16:50:06.345561',
    insight_version_id: 'eN3mlMYB07F62QdA',
    insight_id: 'J8uZEToEEtMX0fAI',
    results: {
      qctT3QBLxI48iFiU: {
        pk: '01HRCX4YEDK874WPX9R90PF5YB',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'qctT3QBLxI48iFiU',
        created_at: '2024-03-07T16:50:07.949929',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      Ox9DhZoXCwxl7V1C: {
        pk: '01HRCX4ZPM03M10220DEAEWNFJ',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'Ox9DhZoXCwxl7V1C',
        created_at: '2024-03-07T16:50:09.236883',
        result: ['Productividad'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      Jzfpd2JFXLTWBSgr: {
        pk: '01HRCX50W9WW253QYB4Z02WZ3Z',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'Jzfpd2JFXLTWBSgr',
        created_at: '2024-03-07T16:50:10.441798',
        result: ['Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      sGtxIa3RgUqIFWPK: {
        pk: '01HRCX524E0PY0D2M5GBDN2VKC',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'sGtxIa3RgUqIFWPK',
        created_at: '2024-03-07T16:50:11.726083',
        result: ['Inteligencia artificial'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      NU8gJVbyOpcPjUGU: {
        pk: '01HRCX53J5VTKZS5D8N0GJ1AFB',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'NU8gJVbyOpcPjUGU',
        created_at: '2024-03-07T16:50:13.189188',
        result: ['Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      EwhlwfrnBbtNVjoe: {
        pk: '01HRCX54T4P5K1GM34D242PK71',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'EwhlwfrnBbtNVjoe',
        created_at: '2024-03-07T16:50:14.468550',
        result: ['Productividad'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      Hvh6xDcSCiaOZS54: {
        pk: '01HRCX55XXRS037Z8KGA7RJ2M3',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'Hvh6xDcSCiaOZS54',
        created_at: '2024-03-07T16:50:15.612824',
        result: ['Productividad'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      xRBdkQJT06V8koWq: {
        pk: '01HRCX57NJA14SJG3D8TZ2P73H',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'xRBdkQJT06V8koWq',
        created_at: '2024-03-07T16:50:17.394838',
        result: ['WhatsApp', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      '1fjRNjSyOqqOhO0P': {
        pk: '01HRCX58VWE4JBHR7H5JS459EX',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: '1fjRNjSyOqqOhO0P',
        created_at: '2024-03-07T16:50:18.620211',
        result: ['WhatsApp'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      mXBiEkgw6fNlRlSf: {
        pk: '01HRCX5A124G1TZDWB25EDF8W1',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'mXBiEkgw6fNlRlSf',
        created_at: '2024-03-07T16:50:19.810134',
        result: ['Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      '4kIBlqrQRfnxgRbt': {
        pk: '01HRCX5BJTAB4VWX0SEP74NMYE',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: '4kIBlqrQRfnxgRbt',
        created_at: '2024-03-07T16:50:21.402661',
        result: ['Productividad'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      WSORYMDR6tIXN3Sw: {
        pk: '01HRCX5CTENT93R0MAACRGDNKD',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'WSORYMDR6tIXN3Sw',
        created_at: '2024-03-07T16:50:22.670209',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      Mv8Jhz3RQJ7OYbAO: {
        pk: '01HRCX5EAE2C6QXSVG18D2CGB0',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'Mv8Jhz3RQJ7OYbAO',
        created_at: '2024-03-07T16:50:24.206781',
        result: ['Artificial intelligence'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      M0mFVjXxDqtUoevX: {
        pk: '01HRCX5FNPRHZ6XJ7C19NDQZ0C',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'M0mFVjXxDqtUoevX',
        created_at: '2024-03-07T16:50:25.590762',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      PQgVgxbjcgbem1If: {
        pk: '01HRCX5H09HE23ZRDT0H0648BE',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'PQgVgxbjcgbem1If',
        created_at: '2024-03-07T16:50:26.953095',
        result: ['Artificial intelligence', 'WhatsApp', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      cNtOw9skH8KpWlKK: {
        pk: '01HRCX5J6273Z6RCVVG3C2G2HG',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'cNtOw9skH8KpWlKK',
        created_at: '2024-03-07T16:50:28.162275',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      QdBTBhhUjSvX7jXu: {
        pk: '01HRCX5KJ38ZPV940705S3J55J',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'QdBTBhhUjSvX7jXu',
        created_at: '2024-03-07T16:50:29.570959',
        result: [
          'Artificial intelligence',
          'Inteligencia artificial',
          'AI',
          'Productividad',
          'WhatsApp',
        ],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      KCDnmvwNNCY3ugUs: {
        pk: '01HRCX5MVCJG5B6BWW1NGSNZXX',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'KCDnmvwNNCY3ugUs',
        created_at: '2024-03-07T16:50:30.892395',
        result: ['WhatsApp'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      LvTgclxhyBjTXslI: {
        pk: '01HRCX5P2H4DAEM0KW2DXJ7NQR',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'LvTgclxhyBjTXslI',
        created_at: '2024-03-07T16:50:32.145357',
        result: ['Inteligencia artificial'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      GDTUaGgRNR9bdbxd: {
        pk: '01HRCX5QB7QTZW2MTHF2ED9K72',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'GDTUaGgRNR9bdbxd',
        created_at: '2024-03-07T16:50:33.447827',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      goES6aOdQStftqn0: {
        pk: '01HRCX5S0G8CWNCK26PJZ27XHN',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'goES6aOdQStftqn0',
        created_at: '2024-03-07T16:50:35.152249',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      p3LsWKPixee7fl16: {
        pk: '01HRCX5TPSEHYEPAJGPGPNNHKT',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'p3LsWKPixee7fl16',
        created_at: '2024-03-07T16:50:36.887883',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      U67vSIAtL8olOcOH: {
        pk: '01HRCX5VZX1WBFYQFENAHVM8CE',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'U67vSIAtL8olOcOH',
        created_at: '2024-03-07T16:50:38.205566',
        result: ['Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      bx0A015ogIEZcAMM: {
        pk: '01HRCX5X1XBADQQ0RAWR6QYNH5',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'bx0A015ogIEZcAMM',
        created_at: '2024-03-07T16:50:39.293349',
        result: ['Inteligencia artificial'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      t5SEiKHNfGymKpMK: {
        pk: '01HRCX5Y6CVK3G3EM8JJMZ6P0R',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 't5SEiKHNfGymKpMK',
        created_at: '2024-03-07T16:50:40.460485',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      BokECAJeNjBi7Xrz: {
        pk: '01HRCX5ZCS57MA65W331DJF7Y3',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'BokECAJeNjBi7Xrz',
        created_at: '2024-03-07T16:50:41.689572',
        result: ['Productividad'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      g59hJ4VYEN2yARDT: {
        pk: '01HRCX60RHYA2REM4PJFY1DS9C',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'g59hJ4VYEN2yARDT',
        created_at: '2024-03-07T16:50:43.089617',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      '66kkdJi0qd9AY4Mb': {
        pk: '01HRCX624MPDXW0E9P62MRQRKY',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: '66kkdJi0qd9AY4Mb',
        created_at: '2024-03-07T16:50:44.499926',
        result: ['WhatsApp'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      jNEz0gHqxclIyjct: {
        pk: '01HRCX63JY5VEF973CGJ22KKN6',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'jNEz0gHqxclIyjct',
        created_at: '2024-03-07T16:50:45.981956',
        result: ['Artificial intelligence', 'AI', 'Inteligencia artificial', 'Productividad'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      RYEb3mnGYSOD0Zk3: {
        pk: '01HRCX64SK9CX63YK4E5HXR6F4',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'RYEb3mnGYSOD0Zk3',
        created_at: '2024-03-07T16:50:47.218979',
        result: ['Inteligencia artificial', 'WhatsApp', 'Productividad'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      PFu1NJD0EuMmjErz: {
        pk: '01HRCX662C2YNQ8RPR4P054KPD',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'PFu1NJD0EuMmjErz',
        created_at: '2024-03-07T16:50:48.524365',
        result: ['Artificial intelligence', 'AI', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      Z4xEmgE9UT6maim8: {
        pk: '01HRCX677GHQ2Y8JS45J50DD6P',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'Z4xEmgE9UT6maim8',
        created_at: '2024-03-07T16:50:49.712612',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      hOIqD492yWljyKaq: {
        pk: '01HRCX68FJC2KEXSRTPZ2XHWDA',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'hOIqD492yWljyKaq',
        created_at: '2024-03-07T16:50:50.994736',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      mpIMHFKMvEunCN1X: {
        pk: '01HRCX69QNW4ZEJPDJQNSKDN13',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'mpIMHFKMvEunCN1X',
        created_at: '2024-03-07T16:50:52.277117',
        result: ['Artificial intelligence', 'WhatsApp'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      '7Su9eEstVDcEoPuw': {
        pk: '01HRCX6ATD15EVSGQJABVSN9Y0',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: '7Su9eEstVDcEoPuw',
        created_at: '2024-03-07T16:50:53.389459',
        result: ['WhatsApp'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      VHtuEtfRNZ9AZhuJ: {
        pk: '01HRCX6C68MWJ4MWG9S4BPW0A5',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'VHtuEtfRNZ9AZhuJ',
        created_at: '2024-03-07T16:50:54.792199',
        result: ['Artificial intelligence', 'WhatsApp', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      '0WDcY1QCrFBQsJFa': {
        pk: '01HRCX6ETJT3W9DJ39P7JGYK1Y',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: '0WDcY1QCrFBQsJFa',
        created_at: '2024-03-07T16:50:57.490513',
        result: ['WhatsApp'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      ucMdEVbfFkrtnAFM: {
        pk: '01HRCX6G5CJ8RK2JEV11YS603G',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'ucMdEVbfFkrtnAFM',
        created_at: '2024-03-07T16:50:58.860923',
        result: ['WhatsApp'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      DPj1oUzj4FZjfyBv: {
        pk: '01HRCX6HMJ7N5YGA4EHXXA8RNG',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'DPj1oUzj4FZjfyBv',
        created_at: '2024-03-07T16:51:00.370672',
        result: ['Artificial intelligence', 'AI', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      A6lRSMYWwGuxe7vi: {
        pk: '01HRCX6K1377YQ3JQGNMGKQC78',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'A6lRSMYWwGuxe7vi',
        created_at: '2024-03-07T16:51:01.795658',
        result: ['Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
    },
    status: 'COMPLETED',
  },
  {
    pk: '01HR4E95GT1B70BP99099NDJVP',
    account_id: 'ITLCIOpIV8bs0STg',
    test_set_id: '01HQTWH175944BM75GVMT9B75R',
    created_at: '2024-03-04T09:56:22.169981',
    insight_version_id: '2Rn4dlqz8YQFXgst',
    insight_id: 'ljqnliy6xdwb1lRb',
    results: {
      HXG8vEYraIpG1Xa0: {
        pk: '01HR4E97DXRQCSYKGF3Z9D2T44',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'HXG8vEYraIpG1Xa0',
        created_at: '2024-03-04T09:56:24.125493',
        result:
          'No se menciona inteligencia artificial, WhatsApp ni productividad en la conversación entre Natalia Tepper y Ferran Amil Cornudella.',
        error: null,
        insight_version_id: '2Rn4dlqz8YQFXgst',
        insight_id: 'ljqnliy6xdwb1lRb',
      },
    },
    status: 'COMPLETED',
  },
  {
    pk: '01HRCX2XTNK27VNQRQ6HBPCY3Q',
    account_id: 'ITLCIOpIV8bs0STg',
    test_set_id: '01HR4YX8T1HWVKHGF170SNDP06',
    created_at: '2024-03-07T16:49:01.781346',
    insight_version_id: 'eN3mlMYB07F62QdA',
    insight_id: 'J8uZEToEEtMX0fAI',
    results: {
      qctT3QBLxI48iFiU: {
        pk: '01HRCX2ZB9QGQBG1A09T19HFCZ',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'qctT3QBLxI48iFiU',
        created_at: '2024-03-07T16:49:03.336873',
        result: ['Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      Ox9DhZoXCwxl7V1C: {
        pk: '01HRCX30MD7P3B4D0WQB187SQ2',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'Ox9DhZoXCwxl7V1C',
        created_at: '2024-03-07T16:49:04.653275',
        result: ['Inteligencia artificial'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      Jzfpd2JFXLTWBSgr: {
        pk: '01HRCX31TFTJWBDGJVDGSRHQKB',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'Jzfpd2JFXLTWBSgr',
        created_at: '2024-03-07T16:49:05.871892',
        result: ['Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      sGtxIa3RgUqIFWPK: {
        pk: '01HRCX332FN5X5TAM180CRW5Y9',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'sGtxIa3RgUqIFWPK',
        created_at: '2024-03-07T16:49:07.151661',
        result: ['Artificial intelligence'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      NU8gJVbyOpcPjUGU: {
        pk: '01HRCX34B36ZKDVCVQ64QD7YYB',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'NU8gJVbyOpcPjUGU',
        created_at: '2024-03-07T16:49:08.451459',
        result: ['Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      EwhlwfrnBbtNVjoe: {
        pk: '01HRCX35FM170E9XQVJ82CMN77',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'EwhlwfrnBbtNVjoe',
        created_at: '2024-03-07T16:49:09.620010',
        result: ['Productividad'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      Hvh6xDcSCiaOZS54: {
        pk: '01HRCX36R7WHG3B6DEVRXSR1QX',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'Hvh6xDcSCiaOZS54',
        created_at: '2024-03-07T16:49:10.919670',
        result: ['Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      xRBdkQJT06V8koWq: {
        pk: '01HRCX3839M37GR12WQTJH2XQ7',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'xRBdkQJT06V8koWq',
        created_at: '2024-03-07T16:49:12.297263',
        result: ['WhatsApp', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      '1fjRNjSyOqqOhO0P': {
        pk: '01HRCX39AK1D1K89HYRQDMXA3N',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: '1fjRNjSyOqqOhO0P',
        created_at: '2024-03-07T16:49:13.555551',
        result: ['Artificial intelligence', 'WhatsApp'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      mXBiEkgw6fNlRlSf: {
        pk: '01HRCX3AEC6JXD4WBF6C2FFQTZ',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'mXBiEkgw6fNlRlSf',
        created_at: '2024-03-07T16:49:14.700085',
        result: ['Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      '4kIBlqrQRfnxgRbt': {
        pk: '01HRCX3BNFF1GPF134MEXRVE2B',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: '4kIBlqrQRfnxgRbt',
        created_at: '2024-03-07T16:49:15.951466',
        result: ['Productividad'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      WSORYMDR6tIXN3Sw: {
        pk: '01HRCX3CWE6MXE4DM0SZBPK2EF',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'WSORYMDR6tIXN3Sw',
        created_at: '2024-03-07T16:49:17.198477',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      Mv8Jhz3RQJ7OYbAO: {
        pk: '01HRCX3EJS12ZYNGDD32S8FFK4',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'Mv8Jhz3RQJ7OYbAO',
        created_at: '2024-03-07T16:49:18.937320',
        result: ['Artificial intelligence', 'WhatsApp'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      M0mFVjXxDqtUoevX: {
        pk: '01HRCX3G2WTQWDP2G9XTWC5FQA',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'M0mFVjXxDqtUoevX',
        created_at: '2024-03-07T16:49:20.475945',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      PQgVgxbjcgbem1If: {
        pk: '01HRCX3HAVK4R36Y9AVANFS4V5',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'PQgVgxbjcgbem1If',
        created_at: '2024-03-07T16:49:21.755553',
        result: ['Artificial intelligence', 'WhatsApp', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      cNtOw9skH8KpWlKK: {
        pk: '01HRCX3JNVW8GETG8RKTRS4A97',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'cNtOw9skH8KpWlKK',
        created_at: '2024-03-07T16:49:23.131777',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      QdBTBhhUjSvX7jXu: {
        pk: '01HRCX3M7J7DDC0AYXP5JX31MV',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'QdBTBhhUjSvX7jXu',
        created_at: '2024-03-07T16:49:24.722526',
        result: [
          'Artificial intelligence',
          'Inteligencia artificial',
          'AI',
          'Productividad',
          'WhatsApp',
        ],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      KCDnmvwNNCY3ugUs: {
        pk: '01HRCX3NKHHDCTDJT3B5WCJKHA',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'KCDnmvwNNCY3ugUs',
        created_at: '2024-03-07T16:49:26.129412',
        result: ['Inteligencia artificial'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      LvTgclxhyBjTXslI: {
        pk: '01HRCX3PR4E86WTTV9AJWK07JE',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'LvTgclxhyBjTXslI',
        created_at: '2024-03-07T16:49:27.300212',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      GDTUaGgRNR9bdbxd: {
        pk: '01HRCX3QWZ5FWGCKTXPE1HKGQ1',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'GDTUaGgRNR9bdbxd',
        created_at: '2024-03-07T16:49:28.479006',
        result: ['Productividad'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      goES6aOdQStftqn0: {
        pk: '01HRCX3S2N57AX5DPMJ7KBY3CF',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'goES6aOdQStftqn0',
        created_at: '2024-03-07T16:49:29.685065',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      p3LsWKPixee7fl16: {
        pk: '01HRCX3TFM9DMG93RBAFAQ2KJ7',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'p3LsWKPixee7fl16',
        created_at: '2024-03-07T16:49:31.124458',
        result: ['Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      U67vSIAtL8olOcOH: {
        pk: '01HRCX3VP20TDN65Y1X7MX1VRK',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'U67vSIAtL8olOcOH',
        created_at: '2024-03-07T16:49:32.354656',
        result: ['Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      bx0A015ogIEZcAMM: {
        pk: '01HRCX3X4XEKRZ6S1QPDNESM0Z',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'bx0A015ogIEZcAMM',
        created_at: '2024-03-07T16:49:33.853012',
        result: ['Inteligencia artificial'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      t5SEiKHNfGymKpMK: {
        pk: '01HRCX3YEEPB0DAE9J8PYB0BYT',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 't5SEiKHNfGymKpMK',
        created_at: '2024-03-07T16:49:35.182415',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      BokECAJeNjBi7Xrz: {
        pk: '01HRCX3ZQJMG070BJPVA9N039E',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'BokECAJeNjBi7Xrz',
        created_at: '2024-03-07T16:49:36.498634',
        result: ['Productividad'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      g59hJ4VYEN2yARDT: {
        pk: '01HRCX41BQRB73F3GPHAEYH38D',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'g59hJ4VYEN2yARDT',
        created_at: '2024-03-07T16:49:38.167174',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      '66kkdJi0qd9AY4Mb': {
        pk: '01HRCX42KEEC33VRMN85D8MG4C',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: '66kkdJi0qd9AY4Mb',
        created_at: '2024-03-07T16:49:39.438388',
        result: ['Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      jNEz0gHqxclIyjct: {
        pk: '01HRCX43R6XR6KXS2KST19MHV2',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'jNEz0gHqxclIyjct',
        created_at: '2024-03-07T16:49:40.614587',
        result: ['Inteligencia artificial'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      RYEb3mnGYSOD0Zk3: {
        pk: '01HRCX4508HRZFMGRP2SSC8WZC',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'RYEb3mnGYSOD0Zk3',
        created_at: '2024-03-07T16:49:41.896286',
        result: ['Inteligencia artificial', 'WhatsApp', 'Productividad'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      PFu1NJD0EuMmjErz: {
        pk: '01HRCX46C1JEM35F1TCGS5ES8F',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'PFu1NJD0EuMmjErz',
        created_at: '2024-03-07T16:49:43.297402',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      Z4xEmgE9UT6maim8: {
        pk: '01HRCX47JPWRA8D9M80EG6RV5R',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'Z4xEmgE9UT6maim8',
        created_at: '2024-03-07T16:49:44.534817',
        result: ['AI', 'WhatsApp', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      hOIqD492yWljyKaq: {
        pk: '01HRCX497W79VQCQKYK8B4EV9Y',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'hOIqD492yWljyKaq',
        created_at: '2024-03-07T16:49:46.236752',
        result: ['Productividad'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      mpIMHFKMvEunCN1X: {
        pk: '01HRCX4AMBXKA054B8RPB9MWAG',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'mpIMHFKMvEunCN1X',
        created_at: '2024-03-07T16:49:47.659409',
        result: ['Artificial intelligence', 'WhatsApp'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      '7Su9eEstVDcEoPuw': {
        pk: '01HRCX4BRBBC5TBYBT7KS2B0D2',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: '7Su9eEstVDcEoPuw',
        created_at: '2024-03-07T16:49:48.811318',
        result: ['WhatsApp'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      VHtuEtfRNZ9AZhuJ: {
        pk: '01HRCX4DBH76B5SQY0ESRBP1NX',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'VHtuEtfRNZ9AZhuJ',
        created_at: '2024-03-07T16:49:50.449623',
        result: ['WhatsApp', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      '0WDcY1QCrFBQsJFa': {
        pk: '01HRCX4F7Y784X6540T6V61KT6',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: '0WDcY1QCrFBQsJFa',
        created_at: '2024-03-07T16:49:52.382362',
        result: ['WhatsApp'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      ucMdEVbfFkrtnAFM: {
        pk: '01HRCX4GBWY44H38EKV0291JCV',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'ucMdEVbfFkrtnAFM',
        created_at: '2024-03-07T16:49:53.532375',
        result: ['WhatsApp'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      DPj1oUzj4FZjfyBv: {
        pk: '01HRCX4HGTENCBKBZ3BYYS5EFP',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'DPj1oUzj4FZjfyBv',
        created_at: '2024-03-07T16:49:54.714152',
        result: ['Artificial intelligence', 'AI', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      A6lRSMYWwGuxe7vi: {
        pk: '01HRCX4JRNEN71RWS6XADP2RMG',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'A6lRSMYWwGuxe7vi',
        created_at: '2024-03-07T16:49:55.989304',
        result: ['Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
    },
    status: 'COMPLETED',
  },
  {
    pk: '01HR9FNAK20QXKMCTFBM5W56FD',
    account_id: 'ITLCIOpIV8bs0STg',
    test_set_id: '01HR4YX8T1HWVKHGF170SNDP06',
    created_at: '2024-03-06T08:56:41.314874',
    insight_version_id: 'eN3mlMYB07F62QdA',
    insight_id: 'J8uZEToEEtMX0fAI',
    results: {
      qctT3QBLxI48iFiU: {
        pk: '01HR9FNC1HP0B11TWMYDC3199J',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'qctT3QBLxI48iFiU',
        created_at: '2024-03-06T08:56:42.801733',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      Ox9DhZoXCwxl7V1C: {
        pk: '01HR9FNDARDSSP58AEAZFG14GG',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'Ox9DhZoXCwxl7V1C',
        created_at: '2024-03-06T08:56:44.120033',
        result: ['Inteligencia artificial'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      Jzfpd2JFXLTWBSgr: {
        pk: '01HR9FNEDQ6H0D72RCX1JQ7QE8',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'Jzfpd2JFXLTWBSgr',
        created_at: '2024-03-06T08:56:45.239381',
        result: ['Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      sGtxIa3RgUqIFWPK: {
        pk: '01HR9FNJ0B03AEZ14XCX3VMGA6',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'sGtxIa3RgUqIFWPK',
        created_at: '2024-03-06T08:56:48.907791',
        result: ['Artificial intelligence', 'Inteligencia artificial', 'WhatsApp', 'Productividad'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      NU8gJVbyOpcPjUGU: {
        pk: '01HR9FNK2A0ZE80ATCT9SMFJX9',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'NU8gJVbyOpcPjUGU',
        created_at: '2024-03-06T08:56:49.994096',
        result: ['Productividad'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      EwhlwfrnBbtNVjoe: {
        pk: '01HR9FNM8AWYGCY5JQFEYCFR6N',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'EwhlwfrnBbtNVjoe',
        created_at: '2024-03-06T08:56:51.210041',
        result: ['Productividad'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      Hvh6xDcSCiaOZS54: {
        pk: '01HR9FNN9QKNGMQWYDT5DV6T9F',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'Hvh6xDcSCiaOZS54',
        created_at: '2024-03-06T08:56:52.279515',
        result: ['Productividad'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      xRBdkQJT06V8koWq: {
        pk: '01HR9FNPVYZ2K8AN84SNKK0BPQ',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'xRBdkQJT06V8koWq',
        created_at: '2024-03-06T08:56:53.886780',
        result: ['WhatsApp', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      '1fjRNjSyOqqOhO0P': {
        pk: '01HR9FNR311QP8DRXJ0HG782ZS',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: '1fjRNjSyOqqOhO0P',
        created_at: '2024-03-06T08:56:55.137475',
        result: ['WhatsApp'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      mXBiEkgw6fNlRlSf: {
        pk: '01HR9FNS70WWFY71T9K952KWDT',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'mXBiEkgw6fNlRlSf',
        created_at: '2024-03-06T08:56:56.288237',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      '4kIBlqrQRfnxgRbt': {
        pk: '01HR9FNTNXQ0GY6JZ5DP3XPET8',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: '4kIBlqrQRfnxgRbt',
        created_at: '2024-03-06T08:56:57.789390',
        result: ['Productividad'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      WSORYMDR6tIXN3Sw: {
        pk: '01HR9FNVVYYW9SKSCKDX2V8FCW',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'WSORYMDR6tIXN3Sw',
        created_at: '2024-03-06T08:56:59.006385',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      Mv8Jhz3RQJ7OYbAO: {
        pk: '01HR9FNWZFRE2WHRCVBX346E6X',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'Mv8Jhz3RQJ7OYbAO',
        created_at: '2024-03-06T08:57:00.143752',
        result: ['Artificial intelligence', 'WhatsApp'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      M0mFVjXxDqtUoevX: {
        pk: '01HR9FNY2N0832GY03NMDK4JXT',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'M0mFVjXxDqtUoevX',
        created_at: '2024-03-06T08:57:01.269657',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      PQgVgxbjcgbem1If: {
        pk: '01HR9FP06GD0C6JSNC68Z5H1QT',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'PQgVgxbjcgbem1If',
        created_at: '2024-03-06T08:57:03.440205',
        result: ['Artificial intelligence', 'WhatsApp', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      cNtOw9skH8KpWlKK: {
        pk: '01HR9FP191Z57J0C26V05VQ7T1',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'cNtOw9skH8KpWlKK',
        created_at: '2024-03-06T08:57:04.545779',
        result: ['WhatsApp'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      QdBTBhhUjSvX7jXu: {
        pk: '01HR9FP2W3E0MYVP5WCCNVHFKC',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'QdBTBhhUjSvX7jXu',
        created_at: '2024-03-06T08:57:06.179605',
        result: [
          'Artificial intelligence',
          'Inteligencia artificial',
          'AI',
          'Productividad',
          'WhatsApp',
        ],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      KCDnmvwNNCY3ugUs: {
        pk: '01HR9FP4A576ADKKNEF2BFRG1Q',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'KCDnmvwNNCY3ugUs',
        created_at: '2024-03-06T08:57:07.653507',
        result: ['WhatsApp'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      LvTgclxhyBjTXslI: {
        pk: '01HR9FP5JTSM0GBRG8KV7RK6XG',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'LvTgclxhyBjTXslI',
        created_at: '2024-03-06T08:57:08.954416',
        result: ['Inteligencia artificial'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      GDTUaGgRNR9bdbxd: {
        pk: '01HR9FP6PFYHGK3RKG4JEK0GTF',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'GDTUaGgRNR9bdbxd',
        created_at: '2024-03-06T08:57:10.094950',
        result: ['Artificial intelligence'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      goES6aOdQStftqn0: {
        pk: '01HR9FP7TN42VXW6EKKCCQM0BA',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'goES6aOdQStftqn0',
        created_at: '2024-03-06T08:57:11.253033',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      p3LsWKPixee7fl16: {
        pk: '01HR9FP91WTQJ2GGZF4DVTX625',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'p3LsWKPixee7fl16',
        created_at: '2024-03-06T08:57:12.507989',
        result: ['Productividad'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      U67vSIAtL8olOcOH: {
        pk: '01HR9FPA9TGT4Q0J8R3TB5KMBJ',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'U67vSIAtL8olOcOH',
        created_at: '2024-03-06T08:57:13.786790',
        result: ['Productividad'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      bx0A015ogIEZcAMM: {
        pk: '01HR9FPBE2XX89SYRSN710P6YE',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'bx0A015ogIEZcAMM',
        created_at: '2024-03-06T08:57:14.946489',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      t5SEiKHNfGymKpMK: {
        pk: '01HR9FPCJNHFVPHKJKFK991ZDP',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 't5SEiKHNfGymKpMK',
        created_at: '2024-03-06T08:57:16.117565',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      BokECAJeNjBi7Xrz: {
        pk: '01HR9FPDPJ4BT5JFHMSRA313PT',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'BokECAJeNjBi7Xrz',
        created_at: '2024-03-06T08:57:17.265901',
        result: ['Productividad'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      g59hJ4VYEN2yARDT: {
        pk: '01HR9FPESKC56YMC2GTBTGE980',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'g59hJ4VYEN2yARDT',
        created_at: '2024-03-06T08:57:18.387549',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      '66kkdJi0qd9AY4Mb': {
        pk: '01HR9FPG084TB7R11SEFP168NQ',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: '66kkdJi0qd9AY4Mb',
        created_at: '2024-03-06T08:57:19.624062',
        result: ['WhatsApp'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      jNEz0gHqxclIyjct: {
        pk: '01HR9FPHCJP8H5HFXENGRF4XH7',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'jNEz0gHqxclIyjct',
        created_at: '2024-03-06T08:57:21.042774',
        result: ['Artificial intelligence', 'AI', 'Inteligencia artificial', 'Productividad'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      RYEb3mnGYSOD0Zk3: {
        pk: '01HR9FPJW5K46ZFZRT6N3JD0BT',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'RYEb3mnGYSOD0Zk3',
        created_at: '2024-03-06T08:57:22.565606',
        result: ['Inteligencia artificial', 'WhatsApp', 'Productividad'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      PFu1NJD0EuMmjErz: {
        pk: '01HR9FPM0ASPKRHM0J949010QC',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'PFu1NJD0EuMmjErz',
        created_at: '2024-03-06T08:57:23.722562',
        result: ['Artificial intelligence', 'AI', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      Z4xEmgE9UT6maim8: {
        pk: '01HR9FPN3DZ4E21PYZQFZ5W05K',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'Z4xEmgE9UT6maim8',
        created_at: '2024-03-06T08:57:24.844776',
        result: ['Artificial intelligence', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      hOIqD492yWljyKaq: {
        pk: '01HR9FPP85XK600HTE55JE1YHY',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'hOIqD492yWljyKaq',
        created_at: '2024-03-06T08:57:26.021642',
        result: ['Productividad'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      mpIMHFKMvEunCN1X: {
        pk: '01HR9FPQBY9AQ96N6J45X6M9R6',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'mpIMHFKMvEunCN1X',
        created_at: '2024-03-06T08:57:27.166586',
        result: ['Artificial intelligence', 'WhatsApp'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      '7Su9eEstVDcEoPuw': {
        pk: '01HR9FPRJHH6ASBKWDAC37MYKF',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: '7Su9eEstVDcEoPuw',
        created_at: '2024-03-06T08:57:28.401411',
        result: ['WhatsApp'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      VHtuEtfRNZ9AZhuJ: {
        pk: '01HR9FPSQ9YCX8BX3P4337VEBM',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'VHtuEtfRNZ9AZhuJ',
        created_at: '2024-03-06T08:57:29.577845',
        result: ['WhatsApp', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      '0WDcY1QCrFBQsJFa': {
        pk: '01HR9FPVCHY9J6ZECS1GWWB242',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: '0WDcY1QCrFBQsJFa',
        created_at: '2024-03-06T08:57:31.281114',
        result: ['WhatsApp'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      ucMdEVbfFkrtnAFM: {
        pk: '01HR9FPWJRG6XM6TMSVXMFP1EA',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'ucMdEVbfFkrtnAFM',
        created_at: '2024-03-06T08:57:32.504263',
        result: ['WhatsApp'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      DPj1oUzj4FZjfyBv: {
        pk: '01HR9FPY3DHJZDMACCZ0RQ63RR',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'DPj1oUzj4FZjfyBv',
        created_at: '2024-03-06T08:57:34.061389',
        result: ['Artificial intelligence', 'AI', 'Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
      A6lRSMYWwGuxe7vi: {
        pk: '01HR9FPZ7HV19BTVWF1VT3KNS1',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'A6lRSMYWwGuxe7vi',
        created_at: '2024-03-06T08:57:35.217306',
        result: ['Productivity'],
        error: null,
        insight_version_id: 'eN3mlMYB07F62QdA',
        insight_id: 'J8uZEToEEtMX0fAI',
      },
    },
    status: 'COMPLETED',
  },
  {
    pk: '01HRCXA3ZKX30RRZCTMHPSPWS1',
    account_id: 'ITLCIOpIV8bs0STg',
    test_set_id: '01HR4YX8T1HWVKHGF170SNDP06',
    created_at: '2024-03-07T16:52:57.459336',
    insight_version_id: 'nydwY3vMcAlRh4sd',
    insight_id: '2Utz2DZyxHAHLZVT',
    results: {
      qctT3QBLxI48iFiU: {
        pk: '01HRCXA5SYN7HK924R10FSCQ3K',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'qctT3QBLxI48iFiU',
        created_at: '2024-03-07T16:52:59.326367',
        result: ['cRldKTxh6GPkthiG'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      Ox9DhZoXCwxl7V1C: {
        pk: '01HRCXA85ACZ2W25PZ12487VH6',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'Ox9DhZoXCwxl7V1C',
        created_at: '2024-03-07T16:53:01.738117',
        result: ['kV4qE2GQ8J66Q8PA'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      Jzfpd2JFXLTWBSgr: {
        pk: '01HRCXA9XK17VN67MYJPTA11YS',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'Jzfpd2JFXLTWBSgr',
        created_at: '2024-03-07T16:53:03.539483',
        result: ['kV4qE2GQ8J66Q8PA'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      sGtxIa3RgUqIFWPK: {
        pk: '01HRCXABJ21AKRJSKVT05XZ1W0',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'sGtxIa3RgUqIFWPK',
        created_at: '2024-03-07T16:53:05.217927',
        result: ['No'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      NU8gJVbyOpcPjUGU: {
        pk: '01HRCXADMSBHS12MXSN3XDMN6K',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'NU8gJVbyOpcPjUGU',
        created_at: '2024-03-07T16:53:07.352932',
        result: ['kV4qE2GQ8J66Q8PA'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      EwhlwfrnBbtNVjoe: {
        pk: '01HRCXAF63MY2SY8TES8NBPVW0',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'EwhlwfrnBbtNVjoe',
        created_at: '2024-03-07T16:53:08.931193',
        result: ['cRldKTxh6GPkthiG'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      Hvh6xDcSCiaOZS54: {
        pk: '01HRCXAH470ZPJ71BYGTYR9GFG',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'Hvh6xDcSCiaOZS54',
        created_at: '2024-03-07T16:53:10.917279',
        result: ['kV4qE2GQ8J66Q8PA'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      xRBdkQJT06V8koWq: {
        pk: '01HRCXAKCC9955J2R6F7M08W5D',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'xRBdkQJT06V8koWq',
        created_at: '2024-03-07T16:53:13.228150',
        result: ['kV4qE2GQ8J66Q8PA'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      '1fjRNjSyOqqOhO0P': {
        pk: '01HRCXAMV41EKH53CW3QQGCWNX',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: '1fjRNjSyOqqOhO0P',
        created_at: '2024-03-07T16:53:14.724543',
        result: ['No'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      mXBiEkgw6fNlRlSf: {
        pk: '01HRCXAQQ9SCWGDFVFJYBBCKFY',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'mXBiEkgw6fNlRlSf',
        created_at: '2024-03-07T16:53:17.673799',
        result: ['kV4qE2GQ8J66Q8PA'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      '4kIBlqrQRfnxgRbt': {
        pk: '01HRCXASH8MVT63B6VKTJN54MB',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: '4kIBlqrQRfnxgRbt',
        created_at: '2024-03-07T16:53:19.528707',
        result: ['kV4qE2GQ8J66Q8PA'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      WSORYMDR6tIXN3Sw: {
        pk: '01HRCXAV8B3AV13YKZD3HNBV3G',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'WSORYMDR6tIXN3Sw',
        created_at: '2024-03-07T16:53:21.290966',
        result: ['cRldKTxh6GPkthiG'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      Mv8Jhz3RQJ7OYbAO: {
        pk: '01HRCXAWZ1ZTV23M0C6YR7RDBK',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'Mv8Jhz3RQJ7OYbAO',
        created_at: '2024-03-07T16:53:23.041793',
        result: ['cRldKTxh6GPkthiG'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      M0mFVjXxDqtUoevX: {
        pk: '01HRCXAYPBTC3QV6VETHXXGD0W',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'M0mFVjXxDqtUoevX',
        created_at: '2024-03-07T16:53:24.811425',
        result: ['cRldKTxh6GPkthiG'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      PQgVgxbjcgbem1If: {
        pk: '01HRCXB0CC9PWEXH1DX3NFBRXY',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'PQgVgxbjcgbem1If',
        created_at: '2024-03-07T16:53:26.540209',
        result: ['kV4qE2GQ8J66Q8PA'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      cNtOw9skH8KpWlKK: {
        pk: '01HRCXB23EWKQFY3BH2D5XFDSS',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'cNtOw9skH8KpWlKK',
        created_at: '2024-03-07T16:53:28.302700',
        result: ['Sí'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      QdBTBhhUjSvX7jXu: {
        pk: '01HRCXB5XW3YSV2ZZY4EPMT4QR',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'QdBTBhhUjSvX7jXu',
        created_at: '2024-03-07T16:53:32.220259',
        result: ['kV4qE2GQ8J66Q8PA'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      KCDnmvwNNCY3ugUs: {
        pk: '01HRCXB8CSWJ8M16BRY1H0923S',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'KCDnmvwNNCY3ugUs',
        created_at: '2024-03-07T16:53:34.745475',
        result: ['cRldKTxh6GPkthiG'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      LvTgclxhyBjTXslI: {
        pk: '01HRCXBA36PD0FBP513RV9VG98',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'LvTgclxhyBjTXslI',
        created_at: '2024-03-07T16:53:36.486101',
        result: ['kV4qE2GQ8J66Q8PA'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      GDTUaGgRNR9bdbxd: {
        pk: '01HRCXBBZCB8F7FBTGPA2R6VP4',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'GDTUaGgRNR9bdbxd',
        created_at: '2024-03-07T16:53:38.412305',
        result: ['No'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      goES6aOdQStftqn0: {
        pk: '01HRCXBE444F2NQ4XGK8HDDJVP',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'goES6aOdQStftqn0',
        created_at: '2024-03-07T16:53:40.611924',
        result: ['kV4qE2GQ8J66Q8PA'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      p3LsWKPixee7fl16: {
        pk: '01HRCXBFYTV348DFZF8FX7TAJ1',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'p3LsWKPixee7fl16',
        created_at: '2024-03-07T16:53:42.490286',
        result: ['kV4qE2GQ8J66Q8PA'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      U67vSIAtL8olOcOH: {
        pk: '01HRCXBHQ87ATJ8AJZEH7PPFTQ',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'U67vSIAtL8olOcOH',
        created_at: '2024-03-07T16:53:44.295978',
        result: ['No'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      bx0A015ogIEZcAMM: {
        pk: '01HRCXBKKJ466838TK6PS6YEBF',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'bx0A015ogIEZcAMM',
        created_at: '2024-03-07T16:53:46.226254',
        result: ['No'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      t5SEiKHNfGymKpMK: {
        pk: '01HRCXBNDMDQ8DH2PA4CMDP00V',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 't5SEiKHNfGymKpMK',
        created_at: '2024-03-07T16:53:48.083708',
        result: ['cRldKTxh6GPkthiG'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      BokECAJeNjBi7Xrz: {
        pk: '01HRCXBQ9845RAJV63X1CC6CBH',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'BokECAJeNjBi7Xrz',
        created_at: '2024-03-07T16:53:49.992151',
        result: ['cRldKTxh6GPkthiG'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      g59hJ4VYEN2yARDT: {
        pk: '01HRCXBS7T2VH96JH71FE3V48P',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'g59hJ4VYEN2yARDT',
        created_at: '2024-03-07T16:53:51.994592',
        result: ['cRldKTxh6GPkthiG'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      '66kkdJi0qd9AY4Mb': {
        pk: '01HRCXBTXXSTR6C6FGKG4HPYR2',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: '66kkdJi0qd9AY4Mb',
        created_at: '2024-03-07T16:53:53.725666',
        result: ['cRldKTxh6GPkthiG'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      jNEz0gHqxclIyjct: {
        pk: '01HRCXBWHV82EYKR54D51C4RWX',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'jNEz0gHqxclIyjct',
        created_at: '2024-03-07T16:53:55.387560',
        result: ['kV4qE2GQ8J66Q8PA'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      RYEb3mnGYSOD0Zk3: {
        pk: '01HRCXBYMX0JMD7RMNJEX88FQK',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'RYEb3mnGYSOD0Zk3',
        created_at: '2024-03-07T16:53:57.532806',
        result: ['kV4qE2GQ8J66Q8PA'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      PFu1NJD0EuMmjErz: {
        pk: '01HRCXC0CJAZPFHRMXD5V0XJBH',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'PFu1NJD0EuMmjErz',
        created_at: '2024-03-07T16:53:59.314682',
        result: ['Sí'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      Z4xEmgE9UT6maim8: {
        pk: '01HRCXC29QSXWHP7RVVK1SW70Z',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'Z4xEmgE9UT6maim8',
        created_at: '2024-03-07T16:54:01.271001',
        result: ['Ggp3AyxINUqpHsNu'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      hOIqD492yWljyKaq: {
        pk: '01HRCXC43NGJV124Z63BW5ZZ8R',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'hOIqD492yWljyKaq',
        created_at: '2024-03-07T16:54:03.125811',
        result: ['kV4qE2GQ8J66Q8PA'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      mpIMHFKMvEunCN1X: {
        pk: '01HRCXC5X8YB5JRJN7WC91BT3T',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'mpIMHFKMvEunCN1X',
        created_at: '2024-03-07T16:54:04.968473',
        result: ['kV4qE2GQ8J66Q8PA'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      '7Su9eEstVDcEoPuw': {
        pk: '01HRCXC7K4SKR0HJYS9RY6DDSP',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: '7Su9eEstVDcEoPuw',
        created_at: '2024-03-07T16:54:06.692425',
        result: ['Ggp3AyxINUqpHsNu'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      VHtuEtfRNZ9AZhuJ: {
        pk: '01HRCXC9CPCZAFYZ5RVQ624C4X',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'VHtuEtfRNZ9AZhuJ',
        created_at: '2024-03-07T16:54:08.534396',
        result: ['cRldKTxh6GPkthiG'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      '0WDcY1QCrFBQsJFa': {
        pk: '01HRCXCBY0M62NPY5V82EVA36A',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: '0WDcY1QCrFBQsJFa',
        created_at: '2024-03-07T16:54:11.136241',
        result: ['kV4qE2GQ8J66Q8PA'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      ucMdEVbfFkrtnAFM: {
        pk: '01HRCXCDGBK19MMNX05B7HADDP',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'ucMdEVbfFkrtnAFM',
        created_at: '2024-03-07T16:54:12.747006',
        result: ['No'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      DPj1oUzj4FZjfyBv: {
        pk: '01HRCXCF46DFGTZ6DRMV7230CE',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'DPj1oUzj4FZjfyBv',
        created_at: '2024-03-07T16:54:14.406357',
        result: ['Ggp3AyxINUqpHsNu'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
      A6lRSMYWwGuxe7vi: {
        pk: '01HRCXCGZ13YSJP21YMKN0ZT40',
        account_id: 'ITLCIOpIV8bs0STg',
        activity_id: 'A6lRSMYWwGuxe7vi',
        created_at: '2024-03-07T16:54:16.289014',
        result: ['kV4qE2GQ8J66Q8PA'],
        error: null,
        insight_version_id: 'nydwY3vMcAlRh4sd',
        insight_id: '2Utz2DZyxHAHLZVT',
      },
    },
    status: 'COMPLETED',
  },
  {
    pk: '01HWMNWAJD9PCJTTPJ786QVB2X',
    account_id: 'ITLCIOpIV8bs0STg',
    test_set_id: '01HWMNS9P5M6T2CME1N6GWYG1T',
    created_at: '2024-04-29T10:19:48.173141',
    insight_version_id: 'Nn0e7HV6zCr1qdOZ',
    insight_id: 'J8uZEToEEtMX0fAI',
    results: {
      ICCBQV8piXKY2M0D: null,
      jGmUzKCX1Mb6IvrR: null,
      yOUdIZQqO3pJCpwI: null,
      '0lMXYOg6QBk8TJRd': null,
      abgTpHY1Jn0mYH2Y: null,
      '32JFzyL0dyKMn0Is': null,
      bvt0vrrbS3f8NzHJ: null,
      HeKHc1fHkWkrSpRX: null,
      '7DBdBJhaLcS4IMpG': null,
      kF440UkbBaJngart: null,
      fc7jV7I0W4xekBcs: null,
      FwCdHlZnQVptQDWk: null,
      fb2jnPQNQvbES54d: null,
      Gsd6arOz4gqHEeSV: null,
      z38VhDZY5NK2OSoD: null,
      HG6TFUzRWKYazUG3: null,
      VNUm7Ap4PK4FDTMm: null,
      '8GQkGIuF7Z08oaQ3': null,
      xxWkCbf8bIAVEShb: null,
      ltrq4iIHX1CsjR6V: null,
      WKnqn5LaTLONaQKF: null,
      VOHtftsCqbCChEs2: null,
      '8xCQOQz3JmRMGpRp': null,
      bhzCwY4sNVNaXKJ1: null,
      uC7KITPSv4cD43Vr: null,
      BfYsbgpMhH6ZJ56R: null,
      BcXS5nXjO7UeCSl0: null,
      wiS5bfWAhJzRKK6H: null,
      ECiKUVJ8YiqwWimK: null,
      Xq28s692DtmMfIYf: null,
      h0ZqANrtsxWm7hTa: null,
      JLEdNm0ETqFHAVoS: null,
      UDDOHG2aMzNXPkmc: null,
      r4MFXtTdm1idsvR7: null,
      OqneGTMWSciQY42e: null,
      I92eCNK7mgAiqL5V: null,
      Xzr5z1PKXK1DFrN8: null,
      yIb7g4vun8szbtrH: null,
      DqD5tus3TdW9zOVs: null,
      ffT2WtdacsJZ6pzC: null,
      PrwgTYMEyhDZd60X: null,
      '1BHKPCeNquCT5V2x': null,
      wQWGNwvrySsrSQKY: null,
      '8nIKwPfTBynoy17H': null,
      HHnmAluEamUFSffs: null,
      '1RKY5Qv6t4OwgN43': null,
      FiN19ws3ulAqcOaB: null,
      '4hwhdXalLWtCWxhP': null,
      b2CAEu7CeRiKFrkH: null,
      QDDiml1rW4PKOqCy: null,
      WUYkRo1etnihQA6d: null,
      NfwfX6opDNauFSvR: null,
      yxso36R5Co8LppvG: null,
      C64GGYBMab6rHC3i: null,
      RiZybbWjH9DnZ97l: null,
      lHhKXC77iL4cpqiR: null,
      YcDnDXlokKkzZJ0p: null,
      GmjkQZygauxNGK2X: null,
      SPlgRYfdK3j5I2Bw: null,
      bmxOAFb2GZ2guh6x: null,
      oevMiIaIywv0YowJ: null,
      IVGfc2XnSRIKG5pB: null,
      TkQDzm31iffFKNWW: null,
      '3UZMS9j8daa5UQnI': null,
      PllJdaT4GXlwDZsE: null,
      LevTt7TOXJdfJlVK: null,
      fDx8KtnFYNaRLjLr: null,
      tY9DQ81SKrIABcSI: null,
      Rf0vZ2B9qR7fxmKw: null,
      '27P9U91d5NTUfBVb': null,
      x2Q5TGoRDENVjSU3: null,
      '2C7aJzBquVUsT51o': null,
      NCPjCBYCf9olNEpe: null,
      v8jry9jztJ8MAXgG: null,
      G53KR8d5AbrKED5t: null,
      '9RzUK9HHpmlU47ki': null,
      fmIIHpDm7MGQ9Uq7: null,
      UEk1ZskuhHrsCmwL: null,
      '84hrhtDLNQJjGYwh': null,
      jSNU37yKIUc4gkmW: null,
      '0RO66iNWc2aoTrFz': null,
      hBWjglGYfRJMoUGc: null,
      V5FXafDzT3aD6Mte: null,
      vocMtksAPpHwnkG6: null,
      '8LJIs3haWDnzmqc1': null,
      '097YcHtPpsRNFCn5': null,
    },
    status: 'NOT_STARTED',
  },
  {
    pk: '01HWMP4TBVTA59MX4ZJS3D55Z2',
    account_id: 'ITLCIOpIV8bs0STg',
    test_set_id: '01HWMNS9P5M6T2CME1N6GWYG1T',
    created_at: '2024-04-29T10:24:26.491409',
    insight_version_id: 'Nn0e7HV6zCr1qdOZ',
    insight_id: 'J8uZEToEEtMX0fAI',
    results: {
      ICCBQV8piXKY2M0D: null,
      jGmUzKCX1Mb6IvrR: null,
      yOUdIZQqO3pJCpwI: null,
      '0lMXYOg6QBk8TJRd': null,
      abgTpHY1Jn0mYH2Y: null,
      '32JFzyL0dyKMn0Is': null,
      bvt0vrrbS3f8NzHJ: null,
      HeKHc1fHkWkrSpRX: null,
      '7DBdBJhaLcS4IMpG': null,
      kF440UkbBaJngart: null,
      fc7jV7I0W4xekBcs: null,
      FwCdHlZnQVptQDWk: null,
      fb2jnPQNQvbES54d: null,
      Gsd6arOz4gqHEeSV: null,
      z38VhDZY5NK2OSoD: null,
      HG6TFUzRWKYazUG3: null,
      VNUm7Ap4PK4FDTMm: null,
      '8GQkGIuF7Z08oaQ3': null,
      xxWkCbf8bIAVEShb: null,
      ltrq4iIHX1CsjR6V: null,
      WKnqn5LaTLONaQKF: null,
      VOHtftsCqbCChEs2: null,
      '8xCQOQz3JmRMGpRp': null,
      bhzCwY4sNVNaXKJ1: null,
      uC7KITPSv4cD43Vr: null,
      BfYsbgpMhH6ZJ56R: null,
      BcXS5nXjO7UeCSl0: null,
      wiS5bfWAhJzRKK6H: null,
      ECiKUVJ8YiqwWimK: null,
      Xq28s692DtmMfIYf: null,
      h0ZqANrtsxWm7hTa: null,
      JLEdNm0ETqFHAVoS: null,
      UDDOHG2aMzNXPkmc: null,
      r4MFXtTdm1idsvR7: null,
      OqneGTMWSciQY42e: null,
      I92eCNK7mgAiqL5V: null,
      Xzr5z1PKXK1DFrN8: null,
      yIb7g4vun8szbtrH: null,
      DqD5tus3TdW9zOVs: null,
      ffT2WtdacsJZ6pzC: null,
      PrwgTYMEyhDZd60X: null,
      '1BHKPCeNquCT5V2x': null,
      wQWGNwvrySsrSQKY: null,
      '8nIKwPfTBynoy17H': null,
      HHnmAluEamUFSffs: null,
      '1RKY5Qv6t4OwgN43': null,
      FiN19ws3ulAqcOaB: null,
      '4hwhdXalLWtCWxhP': null,
      b2CAEu7CeRiKFrkH: null,
      QDDiml1rW4PKOqCy: null,
      WUYkRo1etnihQA6d: null,
      NfwfX6opDNauFSvR: null,
      yxso36R5Co8LppvG: null,
      C64GGYBMab6rHC3i: null,
      RiZybbWjH9DnZ97l: null,
      lHhKXC77iL4cpqiR: null,
      YcDnDXlokKkzZJ0p: null,
      GmjkQZygauxNGK2X: null,
      SPlgRYfdK3j5I2Bw: null,
      bmxOAFb2GZ2guh6x: null,
      oevMiIaIywv0YowJ: null,
      IVGfc2XnSRIKG5pB: null,
      TkQDzm31iffFKNWW: null,
      '3UZMS9j8daa5UQnI': null,
      PllJdaT4GXlwDZsE: null,
      LevTt7TOXJdfJlVK: null,
      fDx8KtnFYNaRLjLr: null,
      tY9DQ81SKrIABcSI: null,
      Rf0vZ2B9qR7fxmKw: null,
      '27P9U91d5NTUfBVb': null,
      x2Q5TGoRDENVjSU3: null,
      '2C7aJzBquVUsT51o': null,
      NCPjCBYCf9olNEpe: null,
      v8jry9jztJ8MAXgG: null,
      G53KR8d5AbrKED5t: null,
      '9RzUK9HHpmlU47ki': null,
      fmIIHpDm7MGQ9Uq7: null,
      UEk1ZskuhHrsCmwL: null,
      '84hrhtDLNQJjGYwh': null,
      jSNU37yKIUc4gkmW: null,
      '0RO66iNWc2aoTrFz': null,
      hBWjglGYfRJMoUGc: null,
      V5FXafDzT3aD6Mte: null,
      vocMtksAPpHwnkG6: null,
      '8LJIs3haWDnzmqc1': null,
      '097YcHtPpsRNFCn5': null,
    },
    status: 'NOT_STARTED',
  },
];

const mockTestSets = [
  {
    pk: '01HR4YX8T1HWVKHGF170SNDP06',
    account_id: 'ITLCIOpIV8bs0STg',
    name: 'Test set 2',
    created_at: '2024-03-04T14:46:58.113773',
    activity_type: 'Call',
    activities: {
      qctT3QBLxI48iFiU: {},
      Ox9DhZoXCwxl7V1C: {},
      Jzfpd2JFXLTWBSgr: {},
      sGtxIa3RgUqIFWPK: {},
      NU8gJVbyOpcPjUGU: {},
      EwhlwfrnBbtNVjoe: {},
      Hvh6xDcSCiaOZS54: {},
      xRBdkQJT06V8koWq: {},
      '1fjRNjSyOqqOhO0P': {},
      mXBiEkgw6fNlRlSf: {},
      '4kIBlqrQRfnxgRbt': {},
      WSORYMDR6tIXN3Sw: {},
      Mv8Jhz3RQJ7OYbAO: {},
      M0mFVjXxDqtUoevX: {},
      PQgVgxbjcgbem1If: {},
      cNtOw9skH8KpWlKK: {},
      QdBTBhhUjSvX7jXu: {},
      KCDnmvwNNCY3ugUs: {},
      LvTgclxhyBjTXslI: {},
      GDTUaGgRNR9bdbxd: {},
      goES6aOdQStftqn0: {},
      p3LsWKPixee7fl16: {},
      U67vSIAtL8olOcOH: {},
      bx0A015ogIEZcAMM: {},
      t5SEiKHNfGymKpMK: {},
      BokECAJeNjBi7Xrz: {},
      g59hJ4VYEN2yARDT: {},
      '66kkdJi0qd9AY4Mb': {},
      jNEz0gHqxclIyjct: {},
      RYEb3mnGYSOD0Zk3: {},
      PFu1NJD0EuMmjErz: {},
      Z4xEmgE9UT6maim8: {},
      hOIqD492yWljyKaq: {},
      mpIMHFKMvEunCN1X: {},
      '7Su9eEstVDcEoPuw': {},
      VHtuEtfRNZ9AZhuJ: {},
      '0WDcY1QCrFBQsJFa': {},
      ucMdEVbfFkrtnAFM: {},
      DPj1oUzj4FZjfyBv: {},
      A6lRSMYWwGuxe7vi: {},
    },
  },
  {
    pk: '01HQTWH175944BM75GVMT9B75R',
    account_id: 'ITLCIOpIV8bs0STg',
    name: 'Test set 1',
    created_at: '2024-02-29T16:52:55.653033',
    activity_type: 'Call',
    activities: {
      HXG8vEYraIpG1Xa0: {
        ljqnliy6xdwb1lRb: {
          pk: '01HR4XX1BNG5E2CDS5MG3GTYS0',
          account_id: 'ITLCIOpIV8bs0STg',
          activity_id: 'HXG8vEYraIpG1Xa0',
          result: 'Some text',
          insight_id: 'ljqnliy6xdwb1lRb',
        },
      },
    },
  },
  {
    pk: '01HWMNS9P5M6T2CME1N6GWYG1T',
    account_id: 'ITLCIOpIV8bs0STg',
    name: 'First calls test',
    created_at: '2024-04-29T10:18:08.965809',
    activity_type: 'Call',
    activities: {
      ICCBQV8piXKY2M0D: {},
      jGmUzKCX1Mb6IvrR: {},
      yOUdIZQqO3pJCpwI: {},
      '0lMXYOg6QBk8TJRd': {},
      abgTpHY1Jn0mYH2Y: {},
      '32JFzyL0dyKMn0Is': {},
      bvt0vrrbS3f8NzHJ: {},
      HeKHc1fHkWkrSpRX: {},
      '7DBdBJhaLcS4IMpG': {},
      kF440UkbBaJngart: {},
      fc7jV7I0W4xekBcs: {},
      FwCdHlZnQVptQDWk: {},
      fb2jnPQNQvbES54d: {},
      Gsd6arOz4gqHEeSV: {},
      z38VhDZY5NK2OSoD: {},
      HG6TFUzRWKYazUG3: {},
      VNUm7Ap4PK4FDTMm: {},
      '8GQkGIuF7Z08oaQ3': {},
      xxWkCbf8bIAVEShb: {},
      ltrq4iIHX1CsjR6V: {},
      WKnqn5LaTLONaQKF: {},
      VOHtftsCqbCChEs2: {},
      '8xCQOQz3JmRMGpRp': {},
      bhzCwY4sNVNaXKJ1: {},
      uC7KITPSv4cD43Vr: {},
      BfYsbgpMhH6ZJ56R: {},
      BcXS5nXjO7UeCSl0: {},
      wiS5bfWAhJzRKK6H: {},
      ECiKUVJ8YiqwWimK: {},
      Xq28s692DtmMfIYf: {},
      h0ZqANrtsxWm7hTa: {},
      JLEdNm0ETqFHAVoS: {},
      UDDOHG2aMzNXPkmc: {},
      r4MFXtTdm1idsvR7: {},
      OqneGTMWSciQY42e: {},
      I92eCNK7mgAiqL5V: {},
      Xzr5z1PKXK1DFrN8: {},
      yIb7g4vun8szbtrH: {},
      DqD5tus3TdW9zOVs: {},
      ffT2WtdacsJZ6pzC: {},
      PrwgTYMEyhDZd60X: {},
      '1BHKPCeNquCT5V2x': {},
      wQWGNwvrySsrSQKY: {},
      '8nIKwPfTBynoy17H': {},
      HHnmAluEamUFSffs: {},
      '1RKY5Qv6t4OwgN43': {},
      FiN19ws3ulAqcOaB: {},
      '4hwhdXalLWtCWxhP': {},
      b2CAEu7CeRiKFrkH: {},
      QDDiml1rW4PKOqCy: {},
      WUYkRo1etnihQA6d: {},
      NfwfX6opDNauFSvR: {},
      yxso36R5Co8LppvG: {},
      C64GGYBMab6rHC3i: {},
      RiZybbWjH9DnZ97l: {},
      lHhKXC77iL4cpqiR: {},
      YcDnDXlokKkzZJ0p: {},
      GmjkQZygauxNGK2X: {},
      SPlgRYfdK3j5I2Bw: {},
      bmxOAFb2GZ2guh6x: {},
      oevMiIaIywv0YowJ: {},
      IVGfc2XnSRIKG5pB: {},
      TkQDzm31iffFKNWW: {},
      '3UZMS9j8daa5UQnI': {},
      PllJdaT4GXlwDZsE: {},
      LevTt7TOXJdfJlVK: {},
      fDx8KtnFYNaRLjLr: {},
      tY9DQ81SKrIABcSI: {},
      Rf0vZ2B9qR7fxmKw: {},
      '27P9U91d5NTUfBVb': {},
      x2Q5TGoRDENVjSU3: {},
      '2C7aJzBquVUsT51o': {},
      NCPjCBYCf9olNEpe: {},
      v8jry9jztJ8MAXgG: {},
      G53KR8d5AbrKED5t: {},
      '9RzUK9HHpmlU47ki': {},
      fmIIHpDm7MGQ9Uq7: {},
      UEk1ZskuhHrsCmwL: {},
      '84hrhtDLNQJjGYwh': {},
      jSNU37yKIUc4gkmW: {},
      '0RO66iNWc2aoTrFz': {},
      hBWjglGYfRJMoUGc: {},
      V5FXafDzT3aD6Mte: {},
      vocMtksAPpHwnkG6: {},
      '8LJIs3haWDnzmqc1': {},
      '097YcHtPpsRNFCn5': {},
    },
  },
];

type Activity = {
  [key: string]: {
    [key: string]:
      | {
          pk: string;
          account_id: string;
          activity_id: string;
          result: string;
          insight_id: string;
        }
      | {};
  };
};

type TestSet = {
  pk: string;
  account_id: string;
  name: string;
  created_at: string;
  activity_type: string;
  activities: Activity;
};

type TestSets = TestSet[];

export const PlaygroundContext = React.createContext();

export function usePlayground() {
  const context = useContext(PlaygroundContext);
  if (!context) {
    throw new Error(`usePlayground must be used within a PlaygroundProvider`);
  }
  return context;
}

export function PlaygroundProvider({ children }) {
  const { data: testSets } = useSWR<AxiosResponse<TestSets>>('/api/test-sets', () =>
    api.get('/copilot/playground/test-set'),
  );
  const [selectedTestSetId, setSelectedTestSetId] = useState(null);
  const { data: testRunsData } = useSWR(
    selectedTestSetId ? '/api/test-runs/' + selectedTestSetId : null,
    () => api.get(`/copilot/playground/test-set/${selectedTestSetId}/runs`),
  );
  const [selectedRunId, setSelectedRunId] = useState(null);

  const { data: insights } = useSWR('api/insights', () =>
    api.get('/utils/service/copilot-insights'),
  );

  const selectedTestSet = testSets?.data.find(testSet => testSet.pk === selectedTestSetId);
  const selectedRun = testRunsData?.data.find(run => run.pk === selectedRunId);

  console.log('selectedRunId', selectedRunId);
  console.log('selectedRun', selectedRun);
  console.log('insights', insights?.data);

  const value = {
    testSets: testSets?.data || [],
    selectedTestSet,
    selectedTestSetId,
    setSelectedTestSet: setSelectedTestSetId,
    testRuns: testRunsData?.data || [],
    insights: insights?.data || [],
    selectedRun,
    selectedRunId,
    setSelectedRun: setSelectedRunId,
  };

  return <PlaygroundContext.Provider value={value}>{children}</PlaygroundContext.Provider>;
}

function TestSets() {
  const { setSelectedTestSet, testSets, selectedTestSetId } = usePlayground();

  const handleAddTestSet = () => {
    console.log('Add test set');
  };

  return (
    <div className={styles.testSets_container}>
      <div className={styles.test_header}>
        <div>
          <Icon name="test" size={20} color="softPeanut" />
          <Text size="l" color="softPeanut" weight="bold">
            Test sets
          </Text>
        </div>
        <IconButton name="add" color="peanut" onClick={handleAddTestSet} />
      </div>
      {testSets && testSets.length > 0 ? (
        <div className={styles.test_list}>
          {testSets.map(testSet => {
            const classNames = clsx(styles.testSets_testSet, {
              [styles.active]: testSet.pk === selectedTestSetId,
            });
            return (
              <div
                key={testSet.pk}
                className={classNames}
                onClick={() => setSelectedTestSet(testSet.pk)}
              >
                {testSet.name}
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.test_empty}>
          <Icon name="searchNone" size={32} color="peanut" />
          <Text size="m" color="peanut" weight="bold">
            No test sets yet
          </Text>
          <Text size="s" color="peanut" align="center">
            Choose the activities with you want to create a set to test your prompts with.
          </Text>
          <Button size="small" color="lightPurple" onClick={handleAddTestSet}>
            Create new test set
          </Button>
        </div>
      )}
    </div>
  );
}

function TestRuns() {
  const { testRuns, setSelectedRun, selectedRunId } = usePlayground();
  const handleAddTestRun = () => {
    console.log('Add test run');
  };

  return (
    <div className={styles.testRuns_container}>
      <div className={styles.test_header}>
        <div>
          <Icon name="repeat" size={20} color="softPeanut" />
          <Text size="l" color="softPeanut" weight="bold">
            Test runs
          </Text>
        </div>
        <IconButton name="add" color="peanut" onClick={handleAddTestRun} />
      </div>
      {testRuns && testRuns.length > 0 ? (
        <div className={styles.test_list}>
          {testRuns.map(testRun => {
            const classes = clsx(styles.testRuns_testRun, {
              [styles.active]: testRun.pk === selectedRunId,
            });
            return (
              <div key={testRun.pk} className={classes} onClick={() => setSelectedRun(testRun.pk)}>
                <div>Run {spacetime(testRun.created_at).format('nice')}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.test_empty}>
          <span>🏃‍♀</span>
          <Text size="m" color="peanut" weight="bold">
            No test runs yet
          </Text>
          <Text size="s" color="peanut" align="center">
            Run a test set to see how the prompts are working.
          </Text>
          <Button size="small" color="lightPurple" onClick={handleAddTestRun}>
            Run a test set
          </Button>
        </div>
      )}
    </div>
  );
}

function PromptTab() {
  const { selectedRunId, selectedRun, insights } = usePlayground();
  const selectedInsight = insights?.find(insight => insight.id === selectedRun?.insight_version_id);

  return (
    <div className={styles.testRun_prompt}>
      <div className={styles.testRun_prompt_header}>
        <Text size="l" color="softPeanut" weight="bold">
          Prompt
        </Text>
        <Text size="m" color="softPeanut">
          Version: {selectedInsight?.version}
        </Text>
        <Button size="small" color="peanut" variant="secondary" iconLeft="edit">
          Edit prompt
        </Button>
      </div>
      <div className={styles.testRun_prompt_text}>
        <Text size="m" color="peanut">
          {selectedInsight?.prompt}
        </Text>
      </div>
    </div>
  );
}

function ActivityTab() {
  const { selectedRun, insights } = usePlayground();
  const selectedInsight = insights?.find(insight => insight.id === selectedRun?.insight_version_id);

  const { data: picklistField } = useSWR<PicklistField>(
    `/utils/picklists/${selectedInsight?.activityField}/type`,
    key => api.get<PicklistField>(key).then(res => res.data),
  );

  return (
    <table className={styles.testRun_activities}>
      <tr>
        <th>Activity</th>
        <th>Result</th>
        <th>Expected</th>
      </tr>
      <tbody>
        {Object.keys(selectedRun?.results).map(activityId => {
          const activityResults = selectedRun?.results[activityId];
          let results;
          if (selectedInsight?.insightType === 'DECISION') {
            const values = picklistField?.values.map(pv => ({
              text: pv.value,
              active: activityResults?.result.includes(pv.id),
            }));
            results = values;
          } else if (selectedInsight?.insightType === 'EXTRACTION') {
            results = activityResults?.result?.map(result => <Chip key={result} label={result} />);
          } else if (selectedInsight?.insightType === 'GENERATION') {
            results = activityResults?.result;
          }
          console.log(activityId, results);
          return (
            <tr key={activityId}>
              <td>{activityId}</td>
              <td>{results}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function ResultTab() {
  return <></>;
}

function TestResults() {
  const { selectedRunId, selectedRun, insights } = usePlayground();
  const selectedinsight = insights?.find(insight => insight.id === selectedRun?.insight_version_id);
  const [selectedTab, setSelectedTab] = useState('prompt');
  const [selectedInsight, setSelectedInsight] = useState(selectedinsight);

  console.log('insights', insights);
  console.log('selectedInsight', selectedInsight);

  return (
    <div className={styles.testRun_container}>
      <div className={styles.test_header}>
        <div>
          <Text size="l" color="peanut" weight="bold">
            Run {spacetime(selectedRun?.created_at).format('nice')}
          </Text>
          <Select size="small" value={selectedInsight} onChange={setSelectedInsight}>
            {insights.map(insight => (
              <Item key={insight.id} value={insight.id}>
                {insight.title}
              </Item>
            ))}
          </Select>
        </div>
      </div>
      <TabGroup value={selectedTab} onClick={setSelectedTab}>
        <Tab color="purple" name="Prompt">
          <PromptTab />
        </Tab>
        <Tab color="purple" name="Activities">
          <ActivityTab />
        </Tab>
        <Tab color="purple" name="Result">
          <ResultTab />
        </Tab>
      </TabGroup>
    </div>
  );
}

function PlaygroundPages() {
  return (
    <PlaygroundProvider>
      <div className={styles.playground_background}>
        <div className={styles.playground_container}>
          <TestSets />
          <TestRuns />
          <TestResults />
        </div>
      </div>
    </PlaygroundProvider>
  );
}

export default PlaygroundPages;
