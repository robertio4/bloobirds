import { useActiveUserSettings } from '@bloobirds-it/hooks';
import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

interface UserPhoneNumber {
  account: string;
  aircallRecordingEnabled: boolean;
  createdBy: string;
  creationDatetime: string;
  id: string;
  location: null | any;
  name: null | string;
  phoneByDefault: boolean;
  phoneIntegrated: boolean;
  phoneNumber: string;
  sid: string;
  type: string;
  updateDatetime: string;
  updatedBy: string;
}

interface UserPhoneResponse {
  data: {
    _embedded: {
      phoneNumbers: UserPhoneNumber[];
    };
    _links: { self: { href: string } };
  };
}

export const useUserPhoneNumbers = (callback?: (phoneNumbers: UserPhoneNumber[]) => void) => {
  const { settings } = useActiveUserSettings();

  const { data: userPhones } = useSWR<UserPhoneNumber[]>(
    `/entities/users/${settings?.user?.id}/phoneNumbers`,
    async () => {
      const response: UserPhoneResponse = await api.get(
        `/entities/users/${settings?.user?.id}/phoneNumbers`,
      );
      const filteredPhones = response?.data?._embedded?.phoneNumbers.filter(
        (phoneNumber: UserPhoneNumber) =>
          phoneNumber?.type === 'TWILIO_NUMBER' || phoneNumber?.type === 'VERIFIED_NUMBER',
      );

      callback?.(filteredPhones);

      return filteredPhones;
    },
  );

  return { userPhones };
};
