import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Português" },
  { code: "de", label: "Deutsch" },
  { code: "cs", label: "Čeština" },
];

export default function LanguageSelector() {
  const { i18n, t } = useTranslation();

  return (
    <select
      value={i18n.language?.split("-")[0] ?? "en"}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      aria-label={t("aria_language_selector")}
      className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
