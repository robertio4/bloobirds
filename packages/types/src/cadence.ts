export interface CadenceStatistics {
  activeCount: number;
  automatedPercentage: number;
  optOutCount: number;
  prospectCount: number;
  totalDays: number;
  totalSteps: number;
}

export interface CadenceObject {
  automated: boolean;
  automationRescheduleMode: string;
  bobjectType: string;
  createdBy: string;
  creationDatetime: string;
  defaultCadence: boolean;
  editMode: string;
  enabled: boolean;
  id: string;
  includesFriday: boolean;
  includesMonday: boolean;
  includesSaturday: boolean;
  includesSunday: boolean;
  includesThursday: boolean;
  includesTuesday: boolean;
  includesWednesday: boolean;
  isNurturingCadence: boolean;
  isOfficial: boolean;
  lastEntityUpdate: string;
  name: string;
  ordering: number;
  ownerId: string;
  reschedulableMode: string;
  statistics: CadenceStatistics;
  tags: string[];
  timeZoneToApplyMode: string;
  updateDatetime: string;
  updatedBy: string;
}
