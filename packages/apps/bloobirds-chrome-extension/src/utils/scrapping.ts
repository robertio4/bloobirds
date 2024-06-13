export function extractText(element: Element): string {
  if (element) {
    return element.textContent.trim();
  } else {
    return '';
  }
}
