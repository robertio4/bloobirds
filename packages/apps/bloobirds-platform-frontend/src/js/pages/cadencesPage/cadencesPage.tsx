import React from 'react';

import { useDocumentTitle } from '../../hooks';
import Routes from './cadenceTable.routes';

const CadencesPage = () => {
  useDocumentTitle('My Cadences');
  return <Routes />;
};

export default CadencesPage;
