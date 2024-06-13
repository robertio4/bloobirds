import { createContext } from 'react';

export default createContext({
  id: null,
  accountId: null,
  userId: null,
  settings: null,
  connections: null,
  mutateConnections: null,
});
