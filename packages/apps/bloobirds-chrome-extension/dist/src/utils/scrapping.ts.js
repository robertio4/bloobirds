export function extractText(element) {
  if (element) {
    return element.textContent.trim();
  } else {
    return "";
  }
}
