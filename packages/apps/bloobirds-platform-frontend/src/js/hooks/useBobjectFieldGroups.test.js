import { shouldShowStatusFields } from './useBobjectFieldGroups';

describe('useBobjectFieldGroups', () => {
  const bobjectType = 'Company';

  it('shouldShowStatusFields', () => {
    const isSalesStage1 = true;
    const isProspectingStage1 = false;
    const field1 = {
      logicRole: 'COMPANY__STATUS',
    };
    const result = shouldShowStatusFields(bobjectType, field1, isSalesStage1, isProspectingStage1);
    expect(result).toEqual(false);

    const isSalesStage2 = false;
    const isProspectingStage2 = true;
    const field2 = {
      logicRole: 'COMPANY__STATUS',
    };
    const result2 = shouldShowStatusFields(bobjectType, field2, isSalesStage2, isProspectingStage2);
    expect(result2).toEqual(true);

    const isSalesStage3 = true;
    const isProspectingStage3 = false;
    const field3 = {
      logicRole: 'LEAD__SALES_STATUS',
    };
    const result3 = shouldShowStatusFields(bobjectType, field3, isSalesStage3, isProspectingStage3);
    expect(result3).toEqual(true);

    const isSalesStage4 = false;
    const isProspectingStage4 = true;
    const field4 = {
      logicRole: 'LEAD__SALES_STATUS',
    };
    const result4 = shouldShowStatusFields(bobjectType, field4, isSalesStage4, isProspectingStage4);
    expect(result4).toEqual(true);
  });
});
