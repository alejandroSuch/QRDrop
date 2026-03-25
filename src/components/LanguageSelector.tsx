import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "fr", label: "FR" },
  { code: "it", label: "IT" },
  { code: "pt", label: "PT" },
  { code: "de", label: "DE" },
  { code: "cs", label: "CS" },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  return (
    <select
      value={i18n.language?.split("-")[0] ?? "en"}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className="text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-violet-500"
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
