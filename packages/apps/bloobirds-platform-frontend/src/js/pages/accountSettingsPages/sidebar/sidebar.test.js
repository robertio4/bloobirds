import React from 'react';
import { render, screen } from '@testing-library/react';
import AccountSettingsSidebar from './sidebar.view';
import * as useRouter from '../../../hooks/useRouter';
import * as sessionManagers from '../../../misc/session';
import * as useSidebar from '../../../hooks/useSidebar';

jest.spyOn(useRouter, 'useRouter').mockReturnValue({});

describe('Account settings sidebar', () => {
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

    render(<AccountSettingsSidebar />);

    expect(screen.queryByText(/general settings/i)).toBeInTheDocument();
    expect(screen.queryByText(/sales team/i)).toBeInTheDocument();
    expect(screen.queryByText(/dialers/i)).toBeInTheDocument();
    expect(screen.queryByText(/notifications/i)).toBeInTheDocument();
    expect(screen.queryByText(/views/i)).toBeInTheDocument();
    expect(screen.queryByText(/Fields/i)).toBeInTheDocument();
    expect(screen.queryByText(/dependencies/i)).toBeInTheDocument();
    expect(screen.queryByText(/salesforce/i)).toBeInTheDocument();
    expect(screen.queryByText(/hubspot/i)).toBeInTheDocument();
  });

  it('hides certain sections if user is not account admin', async () => {
    jest.spyOn(sessionManagers, 'default').mockReturnValue({
      getRoleManager() {
        return {
          isAccountAdmin() {
            return false;
          },
        };
      },
    });

    render(<AccountSettingsSidebar />);

    expect(screen.queryByText(/general settings/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/sales team/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/dialers/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/notifications/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/views/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/fields/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/dependencies/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/salesforce/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/hubspot/i)).not.toBeInTheDocument();
  });
});
