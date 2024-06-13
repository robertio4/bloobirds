import { extractText } from '../scrapping';
import { LeadProfileScrapper } from './profileScrapper';

export class SalesNavigatorProfileScrapper implements LeadProfileScrapper {
  getRootElement() {
    return (
      document.querySelector('.profile-topcard') || document.querySelector('#profile-card-section')
    );
  }

  getCurrentPositionRootElement() {
    return document.querySelector('[class^="current-role-container"]');
  }

  getCompanyName(): string | null {
    const oldRoot = this.getRootElement();
    const newRoot = this.getCurrentPositionRootElement();
    const oldVersionName = extractText(
      oldRoot?.querySelector('.profile-topcard__summary-position > span > a'),
    );
    if (oldVersionName && oldVersionName !== '') {
      return oldVersionName;
    }
    const newVersionName = extractText(newRoot?.querySelector('*[class^="_headingText_"] > a'));
    return newVersionName !== ''
      ? newVersionName
      : extractText(newRoot?.querySelector('*[class^="_current-role-item"] > a'));
  }

  getFullName(): string | null {
    const root = this.getRootElement();
    const oldVersionName = extractText(root?.querySelector('.profile-topcard-person-entity__name'));
    return oldVersionName !== ''
      ? oldVersionName
      : extractText(root?.querySelector('*[class^="name-title-container"] > h1'));
  }

  getJobTitle(): string | null {
    const element = document.querySelector("[data-anonymize='headline']");
    return extractText(element).replace(/ (at|en) (.*)$/i, '');
  }

  getLinkedinId(): string | null {
    return null;
  }
}
