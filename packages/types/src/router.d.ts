export interface RouterQuery {
  push: (path: any, options?: {}) => void;
  replace: (path: any, state: any) => void;
  pathname: string;
  query: any;
  match: match<{}>;
  location: Location<unknown>;
  history: any;
}
