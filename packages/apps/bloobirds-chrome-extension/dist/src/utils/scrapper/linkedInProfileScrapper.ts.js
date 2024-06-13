import { extractText } from "/src/utils/scrapping.ts.js";
export class LinkedInProfileScrapper {
  getCompanyName() {
    const name = extractText(
      document?.querySelector(".pv-text-details__right-panel li:first-child")
    );
    if (!name) {
      const topCardElement = document.querySelector(".pv-top-card");
      return extractText(
        topCardElement?.querySelector(".pv-top-card--experience-list li:first-child")
      );
    }
    return name;
  }
  getFullName() {
    let fullName = "";
    fullName = extractText(document?.querySelector('a[href*="about-this-profile"] > h1'));
    if (!fullName) {
      const topCardElement = document.querySelector(".pv-top-card");
      if (!topCardElement) {
        return extractText(
          document.querySelector(".pv-text-details__about-this-profile-entrypoint")
        );
      }
      fullName = extractText(topCardElement?.querySelector("h1"));
      if (!fullName) {
        return extractText(topCardElement?.querySelector(".pv-top-card--list li"));
      }
    }
    return fullName;
  }
  getJobTitle() {
    const topCardElement = document.querySelector("[class*=pv-text-details__left-panel]");
    const jobTitle = topCardElement?.querySelector("[class^=text-body-medium]") || document.querySelector("[data-generated-suggestion-target]");
    return extractText(jobTitle)?.split(/ at |en |@ [\s+]/i)?.[0];
  }
  getLinkedinId() {
    const connectionsLink = document.querySelector('a[href*="connectionOf="]');
    const idSegment = connectionsLink?.href?.split("connectionOf=")?.[1];
    const extractionRegex = /%22(.*?)%22/g;
    const cleanPattern = /%22/g;
    const matches = idSegment?.match(extractionRegex);
    if (matches && matches?.length > 0) {
      return matches?.[0]?.replace(cleanPattern, "");
    } else {
      const seeAllExperiencesLink = document.querySelector(
        "#navigation-index-see-all-experiences"
      );
      if (seeAllExperiencesLink) {
        return seeAllExperiencesLink.href.split("profile%3A")?.[1];
      }
      return null;
    }
  }
}
