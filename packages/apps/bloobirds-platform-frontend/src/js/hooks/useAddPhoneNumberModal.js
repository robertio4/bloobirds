import { atom, useRecoilState } from 'recoil';
import { useToasts } from '@bloobirds-it/flamingo-ui';
import { useState } from 'react';
import { useUserSettings } from '../components/userPermissions/hooks';
import { mutate } from 'swr';
import md5 from 'md5';
import { RestApi } from '../misc/api/rest';

const phoneNumberAtom = atom({
  key: 'phoneNumberAtom',
  default: {
    mode: 'CREATE',
    phone: {},
  },
});

const phoneNumberVisibility = atom({
  key: 'phoneNumberVisibility',
  default: false,
});

export const useAddPhoneNumberModal = () => {
  const [open, setOpen] = useRecoilState(phoneNumberVisibility);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneNumber, setPhoneNumber] = useRecoilState(phoneNumberAtom);
  const settings = useUserSettings();
  const { createToast } = useToasts();

  const handleClose = () => {
    setPhoneNumber(phoneNumberAtom);
    setOpen(false);
  };

  const openEditAddPhoneModal = phone => {
    setPhoneNumber({
      mode: 'EDIT',
      phone: { ...phone },
    });
    setOpen(true);
  };

  const openCreateAddPhoneModal = () => {
    setPhoneNumber({
      mode: 'CREATE',
    });
    setOpen(true);
  };

  const handlePhoneCreation = body => {
    setIsSubmitting(true);
    RestApi.create({
      entity: 'phoneNumbers',
      body: {
        ...body,
        type: body.verifiedCaller ? 'VERIFIED_NUMBER' : 'TWILIO_NUMBER',
        sid: body.sid ? body.sid : `VC${md5(`${body.phoneNumber}`)}`,
        account: `/accounts/${settings.account.id}`,
        phoneNumber: body?.phoneNumber.replace(/\s/g, ''),
      },
    }).then(response => {
      setIsSubmitting(false);
      setOpen(false);
      if (response?.id) {
        createToast({ message: 'Phone succesfully created!', type: 'success' });
        mutate('/entity/phoneNumbers');
      } else {
        createToast({
          message:
            'Something went wrong while trying to create the phone. Please check that all fields are filled correctly.',
          type: 'error',
        });
      }
    });
  };

  const handlePhoneEdit = body => {
    setIsSubmitting(true);
    RestApi.patch({
      entity: 'phoneNumbers',
      id: phoneNumber.phone.id,
      body: {
        ...body,
        type: body.verifiedCaller ? 'VERIFIED_NUMBER' : 'TWILIO_NUMBER',
        sid: body.sid ? body.sid : `VC${md5(`${body.phoneNumber}`)}`,
        account: `/accounts/${settings.account.id}`,
        phoneNumber: body?.phoneNumber.replace(/\s/g, ''),
      },
    }).then(response => {
      setIsSubmitting(false);
      setOpen(false);
      if (response?.id) {
        createToast({ message: 'Phone succesfully updated!', type: 'success' });
        mutate('/entity/phoneNumbers');
      } else {
        createToast({
          message:
            'Something went wrong while trying to update the phone. Please check that all fields are filled correctly.',
          type: 'error',
        });
      }
    });
  };

  const handlePhoneDelete = () => {
    setIsSubmitting(true);
    RestApi.delete({
      entity: 'phoneNumbers',
      id: phoneNumber.phone.id,
    }).then(() => {
      setIsSubmitting(false);
      createToast({ message: 'Phone succesfully deleted!', type: 'success' });
      setOpen(false);
      mutate('/entity/phoneNumbers');
    });
  };

  return {
    open,
    phoneNumber,
    isSubmitting,
    handleClose,
    openCreateAddPhoneModal,
    openEditAddPhoneModal,
    handlePhoneCreation,
    handlePhoneEdit,
    handlePhoneDelete,
  };
};
