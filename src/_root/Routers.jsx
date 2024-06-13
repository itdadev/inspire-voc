import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { LOCAL_STORAGE_LANGUAGE } from '@/constants/storageKey';
import { SUPPORTED_LANGUAGE_LIST } from '@/constants/languages';
import RootLayout from '@/_root/RootLayout';
import { Home } from '@/_root/pages/home';
import { NotFound } from '@/screen';
import QrCode from '@/_root/pages/home/QrCode';

const Routers = () => {
  const lang = localStorage.getItem(LOCAL_STORAGE_LANGUAGE) || 'en';

  const baseUrl = lang !== null ? `/${lang}` : '';

  const renderMultiRoutes = ({ element: Element, path, ...rest }) =>
    SUPPORTED_LANGUAGE_LIST.map((staticPath) => (
      <Route
        key={`${staticPath}/${path}`}
        path={`${staticPath}${path}`}
        {...rest}
        element={Element}
      />
    ));

  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Navigate to={baseUrl} replace />} />

        {renderMultiRoutes({
          path: '/',
          element: <QrCode />,
        })}

        {renderMultiRoutes({
          path: '/voc/:categoryType/:option1/:option2',
          element: <Home />,
        })}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
