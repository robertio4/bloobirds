import { FormDataInterface } from './activityDetailsForm';

export const getFilteredQQsBySegmentation = (QQs: any, formData: FormDataInterface) => {
  return QQs.filter((QQ: any) => {
    const segmentationValues = Object.keys(QQ.segmentationValues);
    if (segmentationValues?.length > 0) {
      let control = true;

      segmentationValues.forEach(key => {
        // @ts-ignore
        if (control && formData?.company?.raw?.contents[key]) {
          // @ts-ignore
          control = QQ?.segmentationValues[key].includes(formData?.company?.raw?.contents[key]);
        }
        // @ts-ignore
        if (control && formData?.lead?.raw?.contents[key]) {
          // @ts-ignore
          control = QQ?.segmentationValues[key].includes(formData?.lead?.raw?.contents[key]);
        }
        if (control && formData?.opportunity?.raw?.contents[key]) {
          control = QQ?.segmentationValues[key].includes(formData?.opportunity?.raw?.contents[key]);
        }
      });
      return control;
    } else return true;
  })?.map((QQ: any) => QQ?.question);
};
