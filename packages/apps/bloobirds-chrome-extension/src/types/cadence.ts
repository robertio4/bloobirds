export interface CadenceObject {
  id: string;
  name: string;
  defaultCadence: boolean;
  automated: boolean;
  bobjectType: string;
  ordering: number;
  includesMonday: boolean;
  includesTuesday: boolean;
  includesWednesday: boolean;
  includesThursday: boolean;
  includesFriday: boolean;
  includesSaturday: boolean;
  includesSunday: boolean;
  lastEntityUpdate: Date;
  editMode: string;
  ownerId: string;
}
