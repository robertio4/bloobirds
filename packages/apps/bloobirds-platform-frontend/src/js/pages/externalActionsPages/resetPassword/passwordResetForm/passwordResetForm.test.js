import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import PasswordResetForm from './passwordResetForm';

describe('<PasswordResetForm />', () => {
  const VALID_PASSWORD = 'Qwer1234';

  it('cannot be submitted until all rules match', async () => {
    render(<PasswordResetForm />);

    user.type(screen.getByPlaceholderText(/new password/i), VALID_PASSWORD);
    expect(screen.getByText(/reset password/i)).toBeDisabled();
    user.type(screen.getByPlaceholderText(/confirm password/i), 'Q');
    expect(screen.getByText(/reset password/i)).toBeDisabled();
    user.type(screen.getByPlaceholderText(/confirm password/i), 'wer');
    expect(screen.getByText(/reset password/i)).toBeDisabled();
    user.type(screen.getByPlaceholderText(/confirm password/i), '123');
    expect(screen.getByText(/reset password/i)).toBeDisabled();
    user.type(screen.getByPlaceholderText(/confirm password/i), '4');

    await waitFor(() => expect(screen.getByText(/reset password/i)).not.toBeDisabled());
  });

  it('calls onSave with the new password', async () => {
    const onSave = jest.fn();
    render(<PasswordResetForm onSave={onSave} />);
    user.type(screen.getByPlaceholderText(/new password/i), VALID_PASSWORD);
    user.type(screen.getByPlaceholderText(/confirm password/i), VALID_PASSWORD);

    await waitFor(() => expect(screen.getByText(/reset password/i)).not.toBeDisabled());
    user.click(screen.getByText(/reset password/i));

    await waitFor(() => expect(onSave).toHaveBeenCalled());
    expect(onSave).toHaveBeenCalledWith(VALID_PASSWORD);
  });
});
