export interface EmailConnection {
  id: string;
  email: string;
  createdAt: string;
  creationDateTime: string;
  provider: string;
  syncState: string;
  nylasAliases: NylasAlias[];
  default: boolean;
}

export interface NylasAlias {
  id: string;
  emailAlias: string;
}
