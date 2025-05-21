import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return { t };
};