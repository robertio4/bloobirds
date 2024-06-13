function injectScript(file_path, tag) {
  const node = document.querySelector(tag);
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file_path);
  if (node) {
    node.appendChild(script);
    console.log('Inject JS when document load ended');
  } else {
    console.error('Failed to inject JS when document load ended');
  }
}
injectScript(chrome.runtime.getURL('src/content/extendEventListeners.js'), 'body');
