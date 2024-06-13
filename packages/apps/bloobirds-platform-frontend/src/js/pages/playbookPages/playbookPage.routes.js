import React from 'react';
import { Route, withRouter } from 'react-router';

import { UserPermission } from '@bloobirds-it/types';

import {
  APP_PLAYBOOK_BUYER_PERSONAS,
  APP_PLAYBOOK_CUSTOM_TASKS,
  APP_PLAYBOOK_MESSAGING_EMAIL,
  APP_PLAYBOOK_MESSAGING_EMAIL_FORM,
  APP_PLAYBOOK_MESSAGING_LINKEDIN,
  APP_PLAYBOOK_MESSAGING_LINKEDIN_FORM,
  APP_PLAYBOOK_MESSAGING_PITCH,
  APP_PLAYBOOK_MESSAGING_PITCH_FORM,
  APP_PLAYBOOK_MESSAGING_QQ,
  APP_PLAYBOOK_MESSAGING_QQ_FORM,
  APP_PLAYBOOK_MESSAGING_QQ_SCORES,
  APP_PLAYBOOK_MESSAGING_SEGMENTATION,
  APP_PLAYBOOK_MESSAGING_SNIPPET,
  APP_PLAYBOOK_MESSAGING_SNIPPET_FORM,
  APP_PLAYBOOK_MESSAGING_WHATSAPP,
  APP_PLAYBOOK_MESSAGING_WHATSAPP_FORM,
  APP_PLAYBOOK_PRODUCTS,
  APP_PLAYBOOK_SALES_PIPELINE,
  APP_PLAYBOOK_SCENARIOS,
  APP_PLAYBOOK_TARGET_MARKET,
} from '../../app/_constants/routes';
import { useUserSettings } from '../../components/userPermissions/hooks';
import { useNewCadenceTableEnabled } from '../../hooks/useFeatureFlags';
import AutomationsPagesRoutes from './automationsPages/automationsPages.routes';
import BusinessAssetsPage from './businessAssetsPage/businessAssetsPage';
import EmailTemplateForm from './emailTemplatesPage/emailTemplateForm';
import EmailTemplatesPage from './emailTemplatesPage/emailTemplatesPage';
import LinkedinTemplateForm from './linkedinTemplatesPage/linkedinTemplateForm';
import LinkedinTemplatesPage from './linkedinTemplatesPage/linkedinTemplatesPage.view';
import PitchTemplatesPage from './pitchTemplatesPage';
import PitchTemplateForm from './pitchTemplatesPage/pitchTemplateForm';
import PlaybookSegmentationPage from './playbookSegmentationPage';
import ProductsPages from './productPage/productsPage';
import QualifyingQuestionsPage from './qualifyingQuestionTemplatesPage';
import QualifyingQuestionsScore from './qualifyingQuestionTemplatesPage/qualifyingQuestionScoresPage';
import QualifyingQuestionTemplateForm from './qualifyingQuestionTemplatesPage/qualifyingQuestionTemplateForm';
import { SalesPipelinePage } from './salesPipelinePage/salesPipelinePage';
import SnippetForm from './snippetTemplatesPage/snippetForm';
import { SnippetTemplatesPage } from './snippetTemplatesPage/snippetTemplatesPage.view';
import WhatsappTemplateForm from './whatsappTemplatesPage/whatsappTemplateForm';
import WhatsappTemplatesPage from './whatsappTemplatesPage/whatsappTemplatesPage.view';

const Routes = () => {
  const settings = useUserSettings();
  const hasCustomPermission = settings?.user?.permissions.includes(UserPermission.CUSTOM_TASK);
  const canViewCustomTasks = hasCustomPermission && useNewCadenceTableEnabled();
  return (
    <>
      <AutomationsPagesRoutes />
      <Route exact path={APP_PLAYBOOK_MESSAGING_SNIPPET} component={SnippetTemplatesPage} />
      <Route exact path={APP_PLAYBOOK_MESSAGING_PITCH} component={PitchTemplatesPage} />
      <Route exact path={APP_PLAYBOOK_MESSAGING_EMAIL} component={EmailTemplatesPage} />
      <Route exact path={APP_PLAYBOOK_MESSAGING_QQ} component={QualifyingQuestionsPage} />
      <Route exact path={APP_PLAYBOOK_MESSAGING_QQ_SCORES} component={QualifyingQuestionsScore} />
      <Route exact path={APP_PLAYBOOK_MESSAGING_LINKEDIN} component={LinkedinTemplatesPage} />
      <Route exact path={APP_PLAYBOOK_MESSAGING_PITCH_FORM} component={PitchTemplateForm} />
      <Route exact path={APP_PLAYBOOK_MESSAGING_EMAIL_FORM} component={EmailTemplateForm} />
      <Route exact path={APP_PLAYBOOK_MESSAGING_SNIPPET_FORM} component={SnippetForm} />
      <Route
        exact
        path={APP_PLAYBOOK_MESSAGING_QQ_FORM}
        component={QualifyingQuestionTemplateForm}
      />
      <Route exact path={APP_PLAYBOOK_MESSAGING_LINKEDIN_FORM} component={LinkedinTemplateForm} />
      <Route exact path={APP_PLAYBOOK_MESSAGING_WHATSAPP} component={WhatsappTemplatesPage} />
      <Route exact path={APP_PLAYBOOK_MESSAGING_WHATSAPP_FORM} component={WhatsappTemplateForm} />
      <Route
        exact
        path={APP_PLAYBOOK_MESSAGING_SEGMENTATION}
        component={PlaybookSegmentationPage}
      />
      <Route exact path={APP_PLAYBOOK_SALES_PIPELINE} component={SalesPipelinePage} />
      <Route exact path={APP_PLAYBOOK_TARGET_MARKET}>
        <BusinessAssetsPage tab="Target Markets" />
      </Route>
      <Route exact path={APP_PLAYBOOK_BUYER_PERSONAS}>
        <BusinessAssetsPage tab="Buyer personas (ICP)" />
      </Route>
      <Route exact path={APP_PLAYBOOK_SCENARIOS}>
        <BusinessAssetsPage tab="Scenarios" />
      </Route>
      {canViewCustomTasks && (
        <Route exact path={APP_PLAYBOOK_CUSTOM_TASKS}>
          <BusinessAssetsPage tab="Custom Tasks" />
        </Route>
      )}
      <Route path={APP_PLAYBOOK_PRODUCTS} component={ProductsPages} />
    </>
  );
};

export default withRouter(Routes);
