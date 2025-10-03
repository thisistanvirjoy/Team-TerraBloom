import { useTranslation } from 'react-i18next';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const isBN = i18n.language === 'bn';

  return (
    <button
      onClick={() => i18n.changeLanguage(isBN ? 'en' : 'bn')}
      className="px-3 py-1 rounded-xl border border-emerald-200 text-emerald-900 hover:bg-emerald-50 transition-colors [transform-style:preserve-3d]"
      aria-label="Toggle language"
    >
      <span className="inline-block transition-transform duration-300 [backface-visibility:hidden] rotate-x-0">
        {isBN ? 'EN' : 'বাংলা'}
      </span>
    </button>
  );
}
