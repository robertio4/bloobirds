export const openNewTab = (page, queryParams) => {
  let url = `${window.location.protocol}//${window.location.host}${page}`;
  const queryParamsParsed =
    queryParams && Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`)[0];

  if (queryParamsParsed) {
    url = `${url}?${queryParamsParsed}`;
  }
  window.open(url, '_blank');
};

export const addHttpIfNeeded = url => {
  if (!/^https?:\/\//i.test(url)) {
    return `http://${url}`;
  }
  return url;
};

export const addHttpsIfNeeded = url => {
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
};
