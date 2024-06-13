import { Dashboards } from '../newDashboards';
import { overviewProspecting } from './overviewProspecting';
import { activityPerformanceProspecting } from './activityPerformance';
import { dataQualityProspecting } from './dataQualityProspecting';
import { conversionRatesProspecting } from './conversionRatesProspecting';
import { overviewSales } from './overviewSales';
import { funnelProspecting } from './funnelProspecting';
import { funnelSales } from './funnelSales';
import { historicConversionRatesProspecting } from './historicConversionRatesProspecting';

export const paths: Dashboards = {
  prospecting: {
    overview: overviewProspecting,
    activityPerformance: activityPerformanceProspecting,
    dataQuality: dataQualityProspecting,
    conversionRates: conversionRatesProspecting,
    historicConversionRates: historicConversionRatesProspecting,
    funnel: funnelProspecting,
  },
  sales: {
    overview: overviewSales,
    funnel: funnelSales,
  },
};
