import { createI18n } from 'vue-i18n';
import messages from './locales';

export const i18n = createI18n({
  locale: 'pl',
  fallbackLocale: 'en',
  globalInjection: true,
  messages,
});
