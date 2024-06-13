import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { Item, Section, Text } from '@bloobirds-it/flamingo-ui';
import { useAircallPhoneLinkEnabled } from '@bloobirds-it/hooks';
import { BobjectTypes, ExtensionCompany, LinkedInLead } from '@bloobirds-it/types';

export const PhoneDropdownContent = ({
  bobject,
  callback,
  notShowIfEmpty = false,
  isWhatsApp = false,
  closeDropdown,
}: {
  bobject: ExtensionCompany | LinkedInLead;
  callback: (phone: string) => void;
  notShowIfEmpty?: boolean;
  closeDropdown?: () => void;
  isWhatsApp?: boolean;
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'sidePeek.contactViewActions' });
  const isCompany = bobject?.id?.typeName === BobjectTypes.Company;
  const bobjectName = isCompany
    ? (bobject as ExtensionCompany)?.name
    : (bobject as LinkedInLead)?.fullName;
  const hasAircallPhoneLinkEnabled = useAircallPhoneLinkEnabled();

  return notShowIfEmpty && bobject?.phoneNumbers?.length === 0 ? null : (
    <>
      <Section id={bobject?.name} icon={isCompany ? 'company' : 'person'}>
        {bobjectName}
      </Section>
      {bobject?.phoneNumbers?.length === 0 ? (
        <Item disabled value="no-phone">
          {t('noPhoneNumbers')}
        </Item>
      ) : (
        bobject?.phoneNumbers.map(phone => (
          <Fragment key={phone}>
            {hasAircallPhoneLinkEnabled && !isWhatsApp ? (
              <a href={`callto:${phone}`} onClick={closeDropdown} style={{ padding: '8px 16px' }}>
                <Text size="s" color="darkGray" weight="bold" decoration="none">
                  {phone}
                </Text>
              </a>
            ) : (
              <Item section={bobjectName} key={phone} onClick={() => callback(phone)}>
                {phone}
              </Item>
            )}
          </Fragment>
        ))
      )}
    </>
  );
};
