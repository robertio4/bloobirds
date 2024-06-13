import React from 'react';
import { render, screen } from '@testing-library/react';
import * as useRouter from '../../../hooks/useRouter';
import * as sessionManagers from '../../../misc/session';
import * as useSidebar from '../../../hooks/useSidebar';
import PlaybookSidebar from './sidebar';
import * as useUserSettings from '../../../components/userPermissions/hooks';

jest.spyOn(useRouter, 'useRouter').mockReturnValue({});

describe('Playbook sidebar', () => {
  it('displays certain sections if user is account admin', async () => {
    jest.spyOn(useSidebar, 'useSidebar').mockReturnValue({
      isCollapsed: false,
      toggle: jest.fn(),
      collapse: jest.fn(),
      expand: jest.fn(),
    });
    jest.spyOn(sessionManagers, 'default').mockReturnValue({
      getRoleManager() {
        return {
          isAccountAdmin() {
            return true;
          },
        };
      },
    });
    jest.spyOn(useUserSettings, 'useUserSettings').mockReturnValue({
      user: {
        permissions: [
          'VIEW_ADD_QC_TAB',
          'VIEW_CADENCES',
          'EDIT_ALL',
          'VIEW_INBOUND_TAB',
          'DOWNLOAD_LIST',
          'VIEW_SALES_TAB',
          'VIEW_PROSPECT_TAB',
          'VIEW_DASHBOARDS_TAB',
          'VIEW_INBOX',
        ],
      },
    });

    render(<PlaybookSidebar />);

    expect(screen.queryByText(/target markets/i)).toBeInTheDocument();
    expect(screen.queryByText(/buyer personas/i)).toBeInTheDocument();
    expect(screen.queryByText(/scenarios/i)).toBeInTheDocument();
    expect(screen.queryByText(/messaging segmentation/i)).toBeInTheDocument();
    expect(screen.queryByText(/pitches and snippets/i)).toBeInTheDocument();
    expect(screen.queryByText(/email templates/i)).toBeInTheDocument();
    expect(screen.queryByText(/linkedin templates/i)).toBeInTheDocument();
    expect(screen.queryByText(/qualifying questions/i)).toBeInTheDocument();
  });

  it('hides certain sections if user is not account admin', async () => {
    jest.spyOn(useSidebar, 'useSidebar').mockReturnValue({
      isCollapsed: false,
      toggle: jest.fn(),
      collapse: jest.fn(),
      expand: jest.fn(),
    });
    jest.spyOn(sessionManagers, 'default').mockReturnValue({
      getRoleManager() {
        return {
          isAccountAdmin() {
            return false;
          },
        };
      },
    });

    render(<PlaybookSidebar />);

    expect(screen.queryByText(/target markets/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/buyer personas/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/scenarios/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/messaging segmentation/i)).not.toBeInTheDocument();
  });
});
