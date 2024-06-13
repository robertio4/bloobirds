export const isLeadPage = pathname => {
  const regex = /.+\/(?:leads(?=\/[0-9a-zA-Z]*)|companies(?=\/[0-9a-zA-Z]*\?leadId=[0-9a-zA-Z]*\/Lead\/[0-9a-zA-Z]*))/;
  return regex.test(pathname);
};

export const isLeadWithoutCompanyPage = pathname => {
  const regex = /.+\/leads\/[0-9a-zA-Z]*/;
  return regex.test(pathname);
};

export const isCompanyPage = pathname => {
  const regex = /.+\/companies\/[0-9a-zA-Z]*/;
  return regex.test(pathname);
};

export const isOpportunityPage = pathname => {
  const regex = /.+\/opportunities\/[0-9a-zA-Z]*/;
  return regex.test(pathname);
};

export const isSalesPage = pathname => {
  const regex = /.+\/tasks\/sales*/;
  return regex.test(pathname);
};

export const isProspectingPage = pathname => {
  const regex = /.+\/tasks\/prospecting*/;
  return regex.test(pathname);
};

export const isCompanyTasksPage = pathname => {
  const regex = /.+\/companies\/[a-zA-Z0-9]*\/tasks\/[a-zA-Z0-9]*/;
  return regex.test(pathname);
};

export const isMatchingRoute = (route, location) => {
  const croppedRoute = route.lastIndexOf('/');
  const croppedLocation = location.lastIndexOf('/');
  if (isSalesPage(location) || isProspectingPage(location)) {
    return croppedRoute === croppedLocation;
  }
  return false;
};
