import { createGtm } from '@gtm-support/vue-gtm';

import router from './router';

export default createGtm({
  id: import.meta.env.VITE_APP_GTM_CONTAINER_ID,
  // queryParams: {
  //   // Add URL query string when loading gtm.js with GTM ID (required when using custom environments)
  //   gtm_auth: 'AB7cDEf3GHIjkl-MnOP8qr',
  //   gtm_preview: 'env-4',
  //   gtm_cookies_win: 'x',
  // },
  defer: false,
  compatibility: false,
  nonce: '2726c7f26c',
  enabled: true,
  debug: true,
  loadScript: true,
  // @ts-ignore
  vueRouter: router,
  ignoredViews: [],
  trackOnNextTick: false,
});
