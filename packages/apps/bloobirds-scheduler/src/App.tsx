import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { initInternationalizationSettings } from '@bloobirds-it/internationalization';

import './App.css';
import ErrorPage from './error-page';
import ExpiredLink from './pages/ExpiredLink';
import SelectSlots from './pages/SelectSlots';
import Root from './routes/root';

const router = createBrowserRouter([
  {
    path: '/:token',
    element: <Root />,
    errorElement: <Root outlet={<ErrorPage />} />,
    children: [
      {
        path: 'expired',
        element: <ExpiredLink />,
      },
      {
        path: '',
        element: <SelectSlots />,
      },
    ],
  },
]);

export default function App() {
  initInternationalizationSettings();

  return (
    <Suspense fallback={<></>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
