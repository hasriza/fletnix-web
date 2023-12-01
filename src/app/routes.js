import { Auth } from './pages/Auth/Loadable';
import { DetailPage } from './pages/DetailPage';
import { HomePage } from './pages/HomePage';
import { Listing } from './pages/Listing/Loadable';
import { UserProfile } from './pages/UserProfile';

export const routes = [
  {
    component: HomePage,
    title: 'FletNix',
    description: 'Way better than Netflix',
    path: '/',
    allowedAfterLogin: true,
  },
  {
    component: Auth,
    title: 'Authentication',
    path: '/auth',
    hideHeader: true,
  },
  {
    component: Listing,
    title: 'Content List',
    description: 'List of all shows on the OTT. Browse charge-free!',
    path: '/listing',
    needsAuth: true,
  },
  {
    component: DetailPage,
    path: '/detail/:showId',
    needsAuth: true,
    disableHeader: true,
  },
  {
    component: UserProfile,
    path: '/my-profile',
    needsAuth: true,
    disableHeader: true,
  },
];
