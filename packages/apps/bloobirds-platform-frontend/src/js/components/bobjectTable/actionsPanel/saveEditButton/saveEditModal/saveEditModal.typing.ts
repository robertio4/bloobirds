import { Matrix, StrDict, TagType } from '@bloobirds-it/types';

import { BobjectTableColumn } from '../../../useBobjectTable';

// SAVE BODY

export interface SaveListParams {
  id?: string;
  bobjectType: string;
  filter: StrDict;
  columns: BobjectTableColumn[];
  viewName: string;
  sort: string;
  viewVisibility: string;
  tags: TagType[];
  sortDirection: string;
}

export interface Filter {
  bobjectFieldId: string;
  searchType: string;
  values: string[];
}

export interface SaveListBody {
  columns: Matrix<string>[];
  filters: Filter[];
  id: string;
  name: string;
  sort: string;
  sortDirection: string;
  tags: string[];
  type: string;
  visibility: string;
}
