function injectCss(file_path, tag) {
  const node = document.querySelector(tag);
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  link.setAttribute('href', file_path);
  node.appendChild(link);
}
injectCss('https://rsms.me/inter/inter.css', 'head');
