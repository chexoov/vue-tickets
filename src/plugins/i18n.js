import { createI18n } from 'vue-i18n';
import { en, ja, ru, fr, es } from '../locales';


const i18n = createI18n({
    locale: 'es',
    fallbackLocale: 'en',
    messages: {
      en,
      ja,
      ru,
      fr,
      es
    }
  });

export default i18n;