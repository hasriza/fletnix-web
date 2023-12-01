/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { routes } from './routes';
import HeaderHelmet from './components/Decorators/HeaderHelmet';
import PrivateRoutesLoader from './components/Decorators/PrivateRoutesLoader';
import PublicRoutesLoader from './components/Decorators/PublicRoutesLoader';
import { useAuthSlice } from './pages/Auth/slice';
import { getRefreshToken, getRefreshTokenExpiration } from 'store/localStore';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';

interface RouteProps {
  component: React.ComponentType<any>;
  needsAuth?: boolean;
  title?: string;
  description?: string;
  path: string;
  hideHeader?: boolean;
  allowedAfterLogin?: boolean;
  disableHeader?: boolean;
}

export function App() {
  const { actions } = useAuthSlice();
  const dispatch = useDispatch();

  const refreshToken = getRefreshToken();

  if (refreshToken) {
    const refreshTokenExp = getRefreshTokenExpiration();
    if (refreshTokenExp) {
      if (dayjs(refreshTokenExp).diff(dayjs(), 'm') > 5) {
        dispatch(actions.refreshToken());
      } else {
        dispatch(actions.logoutStart());
      }
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        {routes?.map(({ component: Component, ...routeProps }: RouteProps) =>
          routeProps?.needsAuth ? (
            <Route
              key={routeProps?.path + routeProps?.title}
              path={routeProps?.path}
              element={
                <>
                  {!routeProps?.disableHeader && (
                    <HeaderHelmet {...routeProps} />
                  )}
                  <PrivateRoutesLoader routeProps={routeProps}>
                    <Component {...routeProps} />
                  </PrivateRoutesLoader>
                </>
              }
            />
          ) : (
            <Route
              key={routeProps?.path}
              path={routeProps?.path}
              element={
                <>
                  {!routeProps?.disableHeader && (
                    <HeaderHelmet {...routeProps} />
                  )}
                  <PublicRoutesLoader {...routeProps}>
                    <Component {...routeProps} />
                  </PublicRoutesLoader>
                </>
              }
            />
          ),
        )}

        <Route key="notFoundPage" path="*" element={<NotFoundPage />} />
      </Routes>

      <GlobalStyle />
    </BrowserRouter>
  );
}
