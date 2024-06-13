import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import PasswordChangeForm from './passwordChangeForm';

describe('<PasswordChangeForm />', () => {
  it('cannot be submitted until all rules match', async () => {
    render(<PasswordChangeForm />);

    user.type(screen.getByPlaceholderText(/current password/i), 'tesla');
    expect(screen.getByText(/reset password/i)).toBeDisabled();
    user.type(screen.getByPlaceholderText(/new password/i), 'Q');
    expect(screen.getByText(/reset password/i)).toBeDisabled();
    user.type(screen.getByPlaceholderText(/new password/i), 'wer');
    expect(screen.getByText(/reset password/i)).toBeDisabled();
    user.type(screen.getByPlaceholderText(/new password/i), '123');
    expect(screen.getByText(/reset password/i)).toBeDisabled();
    user.type(screen.getByPlaceholderText(/new password/i), '4');

    await waitFor(() => expect(screen.getByText(/reset password/i)).not.toBeDisabled());
  });

  it('calls onSubmit with both old and new passwords', async () => {
    const onSave = jest.fn();
    render(<PasswordChangeForm onSave={onSave} />);
    user.type(screen.getByPlaceholderText(/current password/i), 'tesla');
    user.type(screen.getByPlaceholderText(/new password/i), 'Qwer1234');
    await waitFor(() => expect(screen.getByText(/reset password/i)).not.toBeDisabled());

    user.click(screen.getByText(/reset password/i));
    await waitFor(() => expect(onSave).toHaveBeenCalled());

    expect(onSave).toHaveBeenCalledWith({
      oldPassword: 'tesla',
      newPassword: 'Qwer1234',
    });
  });

  it('resets the inputs after submit', async () => {
    render(<PasswordChangeForm onSave={jest.fn()} />);
    user.type(screen.getByPlaceholderText(/current password/i), 'tesla');
    user.type(screen.getByPlaceholderText(/new password/i), 'Qwer1234');
    await waitFor(() => expect(screen.getByText(/reset password/i)).not.toBeDisabled());

    await act(async () => user.click(screen.getByText(/reset password/i)));

    expect(screen.getByPlaceholderText(/current password/i)).toHaveValue('');
    expect(screen.getByPlaceholderText(/new password/i)).toHaveValue('');
  });
});
