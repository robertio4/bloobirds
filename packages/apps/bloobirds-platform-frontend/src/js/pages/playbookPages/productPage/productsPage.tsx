import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Tab } from '@bloobirds-it/flamingo-ui';
import {
  APP_PLAYBOOK_PRODUCTS,
  APP_PLAYBOOK_PRODUCTS_CATEGORIES,
} from '../../../app/_constants/routes';
import AccountSettingsLayout from '../../../layouts/accountSettingsLayout';
import AddCategoryModal, { useCategoryModal } from './addCategoryModal/addCategoryModal';
import { CategoriesTab } from './categoriesTab';
import { ProductsTab } from './productsTab';
import { useRouter } from '../../../hooks';
import SessionManagerFactory from '../../../misc/session';
import NoPermissionsPage from '../../noPermissionsPage';
import { useFullSalesEnabled } from '../../../hooks/useFeatureFlags';

const ProductsPages = () => {
  const hasSalesEnabled = useFullSalesEnabled();
  const { closeModal, isOpen } = useCategoryModal();
  const { history } = useRouter();
  const isProductsPage = useRouteMatch(APP_PLAYBOOK_PRODUCTS)?.isExact;
  const isCategoriesPage = useRouteMatch(APP_PLAYBOOK_PRODUCTS_CATEGORIES)?.isExact;
  const roleManager = SessionManagerFactory().getRoleManager();

  if (!hasSalesEnabled || !roleManager.isAccountAdmin()) {
    return <NoPermissionsPage />;
  }

  return (
    <AccountSettingsLayout
      title="Products Book"
      subtitle="Manage from here your list of products that you can add to your opportunities"
    >
      {hasSalesEnabled ? (
        <>
          <Tab
            name="Products"
            iconLeft="assignBoard"
            onClick={() => history.push(APP_PLAYBOOK_PRODUCTS)}
            active={isProductsPage}
            color="purple"
          />
          <Tab
            name="Categories"
            iconLeft="tag"
            onClick={() => history.push(APP_PLAYBOOK_PRODUCTS_CATEGORIES)}
            active={isCategoriesPage}
            color="purple"
          />
          <Switch>
            <Route exact path={APP_PLAYBOOK_PRODUCTS} component={ProductsTab} />
            <Route path={APP_PLAYBOOK_PRODUCTS_CATEGORIES} component={CategoriesTab} />
          </Switch>
        </>
      ) : (
        <div>Products are not enabled for this account</div>
      )}
      {isOpen && <AddCategoryModal open onClose={closeModal} />}
    </AccountSettingsLayout>
  );
};

export default ProductsPages;
