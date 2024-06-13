export const getFilteredQQsBySegmentation = (QQs, formData) => {
  return QQs.filter((QQ) => {
    const segmentationValues = Object.keys(QQ.segmentationValues);
    if (segmentationValues?.length > 0) {
      let control = true;
      segmentationValues.forEach((key) => {
        if (control && formData?.company?.raw?.contents[key]) {
          control = QQ?.segmentationValues[key].includes(formData?.company?.raw?.contents[key]);
        }
        if (control && formData?.lead?.raw?.contents[key]) {
          control = QQ?.segmentationValues[key].includes(formData?.lead?.raw?.contents[key]);
        }
        if (control && formData?.opportunity?.raw?.contents[key]) {
          control = QQ?.segmentationValues[key].includes(formData?.opportunity?.raw?.contents[key]);
        }
      });
      return control;
    } else
      return true;
  })?.map((QQ) => QQ?.question);
};
