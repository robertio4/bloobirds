export interface EmailConnection {
  id: string;
  email: string;
  createdAt: string;
  provide: string;
  syncState: string;
  nylasAliases: NylasAlias[];
  default: boolean;
  name: string;
}

export interface NylasAlias {
  id: string;
  emailAlias: string;
}

export interface Connections {
  list: EmailConnection[];
  defaultConnection: string;
  stoppedConnections: EmailConnection[];
}

export interface ConnectionResponse {
  count: number;
  nylasTokens: EmailConnection[];
}
