import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { LOCAL_STORAGE_LANGUAGE } from '@/constants/storageKey';
import { SUPPORTED_LANGUAGE_LIST } from '@/constants/languages';
import RootLayout from '@/_root/RootLayout';
import { Home } from '@/_root/pages/home';
import NotFound from '@/_root/pages/NotFound';

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
      {/* NOTE: 로그인없이 접근할 수 있는 페이지 */}
      <Route element={<RootLayout />}>
        <Route path="/" element={<Navigate to={baseUrl} replace />} />

        {renderMultiRoutes({
          path: '/:categoryType/:option1/:option2',
          element: <Home />,
        })}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
