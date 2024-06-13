import { isLinkedInProfilePage, normalizeUrl } from "/src/utils/url.ts.js";
export const cacheKey = "bb-sales-navigator-profile-url-mappings-cache";
export function getLinkedInUrl(sales_navigator_url) {
  return new Promise((resolve) => {
    const cache = localStorage.getItem(cacheKey);
    const cacheJson = cache ? JSON.parse(cache) : {};
    const url = cacheJson[sales_navigator_url];
    if (url) {
      return resolve(normalizeUrl(url));
    }
    resolve(null);
  });
}
const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export async function getLinkedInUrlFromSalesProfile(profileUrl) {
  const cache = localStorage.getItem(cacheKey);
  const cacheJson = cache ? JSON.parse(cache) : {};
  if (cacheJson[profileUrl]) {
    return normalizeUrl(cacheJson[profileUrl]);
  }
  await timeout(1500);
  const copyButton = document.querySelector('div[data-control-name="copy_linkedin"]');
  if (!copyButton) {
    const flagshipLink = document.querySelector('*[class^="_linkedin-link"] > a');
    const link = flagshipLink?.getAttribute("href");
    if (link) {
      cacheJson[profileUrl] = link;
      localStorage.setItem(cacheKey, JSON.stringify(cacheJson));
      return link;
    } else {
      const flagshipActivityLinkedInLink = document.querySelector(
        "[data-test-recent-activity--empty-state] > a"
      );
      const link2 = flagshipActivityLinkedInLink?.getAttribute("href");
      if (link2) {
        const linkWithoutRecentActivity = link2.replace("#recent_activity", "");
        cacheJson[profileUrl] = linkWithoutRecentActivity;
        localStorage.setItem(cacheKey, JSON.stringify(cacheJson));
        return linkWithoutRecentActivity;
      } else {
        const flagShipButton = document.querySelector("[href*='www.linkedin.com/in']");
        const link3 = flagShipButton?.getAttribute("href");
        if (link3) {
          cacheJson[profileUrl] = link3;
          localStorage.setItem(cacheKey, JSON.stringify(cacheJson));
          return link3;
        } else {
          return null;
        }
      }
    }
  }
  copyButton.click();
  await timeout(500);
  const rawUrl = await navigator.clipboard.readText();
  const url = normalizeUrl(rawUrl);
  if (isLinkedInProfilePage(url)) {
    cacheJson[profileUrl] = url;
    localStorage.setItem(cacheKey, JSON.stringify(cacheJson));
    return url;
  } else {
    throw new Error("The copied Linkedin profile page is not a valid Linkedin page");
  }
}
