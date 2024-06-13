import { atom, useRecoilState } from 'recoil';
import { ColumnName, ImportAction } from '../types/imports';

const importFormStepAtom = atom({
  key: 'importFormStep',
  default: 0,
});

const importFormValidationAtom = atom({
  key: 'importFormValidation',
  default: false,
});

const importFormImportAtom = atom({
  key: 'importFormImport',
  default: false,
});

const importFormCanBeImportedAtom = atom({
  key: 'importFormCanBeImported',
  default: false,
});

const importFormActionAtom = atom({
  key: 'importFormAction',
  default: ImportAction.CREATE,
});

const importExcelFileNameAtom = atom({
  key: 'importFormExcelFileName',
  default: null,
});

const importFormInfoAtom = atom({
  key: 'importFormInfo',
  default: { bobjectType: null, importName: '', excelFile: null },
});

const uniqueMatchingFileColumnAtom = atom({
  key: 'uniqueMatchingFileColumnAtom',
  default: null,
});

const uniqueMatchingFieldAtom = atom({
  key: 'uniqueMatchingField',
  default: null,
});

const shouldSkipLeadWithoutCompanyAtom = atom({
  key: 'shouldSkipLeadWithoutCompany',
  default: false,
});

const showCompanyMatchingOptionsAtom = atom({
  key: 'showCompanyMatchingOptions',
  default: false,
});

const columnNamesAtom = atom({
  key: 'columnNamesAtom',
  default: [] as ColumnName[],
});

export const useImportForm = () => {
  const [step, setStep] = useRecoilState(importFormStepAtom);
  const [action, setAction] = useRecoilState<ImportAction>(importFormActionAtom);
  const [info, setInfo] = useRecoilState(importFormInfoAtom);
  const [startValidation, setStartValidation] = useRecoilState(importFormValidationAtom);
  const [startImport, setStartImport] = useRecoilState(importFormImportAtom);
  const [canBeImported, setCanBeImported] = useRecoilState(importFormCanBeImportedAtom);
  const [excelFileName, setExcelFileName] = useRecoilState(importExcelFileNameAtom);
  const [uniqueMatchingFileColumn, setUniqueMatchingFileColumn] = useRecoilState(
    uniqueMatchingFileColumnAtom,
  );
  const [uniqueMatchingField, setUniqueMatchingField] = useRecoilState(uniqueMatchingFieldAtom);
  const [shouldSkipLeadWithoutCompany, setShouldSkipLeadWithoutCompany] = useRecoilState(
    shouldSkipLeadWithoutCompanyAtom,
  );
  const [showCompanyMatchingOptions, setShowCompanyMatchingOptions] = useRecoilState(
    showCompanyMatchingOptionsAtom,
  );
  const [columnNames, setColumnNames] = useRecoilState(columnNamesAtom);

  const nextStep = () => {
    setStep(step + 1 > 2 ? 2 : step + 1);
  };

  const prevStep = () => {
    setStep(step - 1 < 0 ? 0 : step - 1);
  };

  const setBobjectType = (bobjectTypeName: string) => {
    setInfo({
      ...info,
      bobjectType: bobjectTypeName,
    });
  };

  const setImportName = (importName: string) => {
    setInfo({
      ...info,
      importName,
    });
  };

  const setExcelFile = (data: any) => {
    setInfo({
      ...info,
      excelFile: data,
    });
  };

  const clearImportData = () => {
    setInfo({
      ...info,
      bobjectType: null,
      excelFile: null,
      importName: '',
    });

    setAction(ImportAction.CREATE);
    setStep(0);
    setStartImport(false);
    setStartValidation(false);
    setCanBeImported(false);
    setExcelFileName(null);
    setUniqueMatchingFileColumn(null);
    setUniqueMatchingField(null);
    setShouldSkipLeadWithoutCompany(null);
    setColumnNames([]);
  };

  return {
    ...info,
    step,
    action,
    setAction,
    nextStep,
    prevStep,
    setBobjectType,
    setImportName,
    setExcelFile,
    clearImportData,
    startValidation,
    setStartValidation,
    startImport,
    setStartImport,
    canBeImported: showCompanyMatchingOptions
      ? canBeImported && uniqueMatchingField && uniqueMatchingFileColumn
      : canBeImported,
    setCanBeImported,
    excelFileName,
    setExcelFileName,
    uniqueMatchingField,
    setUniqueMatchingField,
    uniqueMatchingFileColumn,
    setUniqueMatchingFileColumn,
    shouldSkipLeadWithoutCompany,
    setShouldSkipLeadWithoutCompany,
    showCompanyMatchingOptions,
    setShowCompanyMatchingOptions,
    columnNames,
    setColumnNames,
  };
};
