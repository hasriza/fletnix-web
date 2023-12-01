/**
 *
 * Asynchronously loads the component for Listing
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Listing = lazyLoad(
  () => import('./index'),
  module => module.Listing,
);
