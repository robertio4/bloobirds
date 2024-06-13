import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import WelcomeScreens from './welcomeScreens';
import { useIsAccountAdmin } from '../../hooks/usePermissions';
import { useUserHelpers } from '../../hooks/useUserHelpers';
import { useUserSettings } from '../userPermissions/hooks';
jest.mock('../../hooks/usePermissions');
jest.mock('../../hooks/useUserHelpers');
jest.mock('../userPermissions/hooks');

describe('Welcome screens component', () => {
  // @ts-ignore
  useUserSettings.mockReturnValue({
    settings: {
      gmailConnectButtonEnabled: true,
      microsoftConnectButtonEnabled: true,
    },
    user: {
      timeZone: 'Europe/Madrid',
      remindersEnabled: true,
      remindersBeforeMinutes: 1,
    },
  });

  // @ts-ignore
  useUserHelpers.mockReturnValue({ save: jest.fn() });

  it('Render the welcome screens', () => {
    // @ts-ignore
    useUserHelpers.mockReturnValue({ save: jest.fn() });

    render(<WelcomeScreens />);

    expect(screen.queryByText(/The only sales engagement/i)).toBeInTheDocument();
  });

  it('When the user is no admin carousel should be 5 slides', async () => {
    // @ts-ignore
    useIsAccountAdmin.mockReturnValue(true);

    render(<WelcomeScreens />);

    let goToNextSlide = screen.getByText(/tell me more/i);
    fireEvent.click(goToNextSlide);

    expect(screen.queryByText(/continue/i)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(4);

    expect(screen.queryByText(/Bloobirds assists your/i)).toBeInTheDocument();
    goToNextSlide = screen.getByText(/continue/i);
    fireEvent.click(goToNextSlide);

    expect(screen.queryByText(/guides Sales Reps/i)).toBeInTheDocument();
    goToNextSlide = screen.getByText(/continue/i);
    fireEvent.click(goToNextSlide);

    expect(screen.queryByText(/Strategic Metrics Pro/i)).toBeInTheDocument();
    goToNextSlide = screen.getByText(/Let's start/i);
    fireEvent.click(goToNextSlide);

    expect(screen.queryByText(/Let's get things started/i)).toBeInTheDocument();
    goToNextSlide = screen.getByText(/Start using bloobirds/i);

    expect(screen.queryByTestId('lastScreen')).toBeInTheDocument();
  });

  it('When the user is admin carousel should be 4 slides', async () => {
    // @ts-ignore
    useIsAccountAdmin.mockReturnValue(false);

    render(<WelcomeScreens />);

    let goToNextSlide = screen.getByText(/tell me more/i);
    fireEvent.click(goToNextSlide);

    expect(screen.queryByText(/continue/i)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(5);

    expect(screen.queryByText(/Automated tasks/i)).toBeInTheDocument();
    goToNextSlide = screen.getByText(/continue/i);
    fireEvent.click(goToNextSlide);

    expect(screen.queryByText(/contactability tools/i)).toBeInTheDocument();
    goToNextSlide = screen.getByText(/continue/i);
    fireEvent.click(goToNextSlide);

    expect(screen.queryByText(/Know exactly/i)).toBeInTheDocument();
    goToNextSlide = screen.getByText(/continue/i);
    fireEvent.click(goToNextSlide);

    expect(screen.queryByText(/correct contact flow/i)).toBeInTheDocument();
    goToNextSlide = screen.getByText(/Let's start/i);
    fireEvent.click(goToNextSlide);

    expect(screen.queryByText(/Let's get things started/i)).toBeInTheDocument();
    goToNextSlide = screen.getByText(/Start using bloobirds/i);

    expect(screen.queryByTestId('lastScreen')).toBeInTheDocument();
  });
});
