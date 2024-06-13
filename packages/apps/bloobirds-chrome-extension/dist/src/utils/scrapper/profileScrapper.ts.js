import { isLinkedInProfilePage } from "/src/utils/url.ts.js";
import { LinkedInProfileScrapper } from "/src/utils/scrapper/linkedInProfileScrapper.ts.js";
import { SalesNavigatorProfileScrapper } from "/src/utils/scrapper/salesNavigatorProfileScrapper.ts.js";
const parenthesisRegex = /\((.*?)\)/g;
const cleanLastName = (value) => value.replace(parenthesisRegex, "").trimStart();
function createProfileScrapper() {
  if (isLinkedInProfilePage(window.location.href)) {
    return new LinkedInProfileScrapper();
  }
  return new SalesNavigatorProfileScrapper();
}
function splitFullName(fullName) {
  const nameParts = fullName.split(" ");
  const totalParts = nameParts.length;
  if (totalParts === 0) {
    return ["", ""];
  }
  if (totalParts === 1) {
    return [fullName, ""];
  }
  if (totalParts === 2) {
    return nameParts;
  }
  if (totalParts === 3) {
    return [nameParts[0], nameParts.slice(1).join(" ")];
  }
  return [nameParts.slice(0, 2).join(" "), nameParts.slice(2).join(" ")];
}
export function scrapLeadJobTitle() {
  const scrapper = createProfileScrapper();
  return scrapper.getJobTitle();
}
export function scrapLeadFirstName() {
  const scrapper = createProfileScrapper();
  const fullName = scrapper.getFullName();
  return splitFullName(fullName)[0];
}
export function scrapLeadLastName() {
  const scrapper = createProfileScrapper();
  const fullName = scrapper.getFullName();
  return cleanLastName(splitFullName(fullName)[1]);
}
export function scrapLeadFullName() {
  const scrapper = createProfileScrapper();
  const fullName = splitFullName(scrapper.getFullName());
  return `${fullName[0]} ${cleanLastName(fullName[1])}`;
}
export function scrapLeadCompanyName() {
  const scrapper = createProfileScrapper();
  return scrapper.getCompanyName();
}
export function scrapLeadLinkedinId() {
  const scrapper = createProfileScrapper();
  return scrapper.getLinkedinId();
}
