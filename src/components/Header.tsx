import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

interface Props {
  dark: boolean;
  toggleDark: () => void;
}

export default function Header({ dark, toggleDark }: Props) {
  const { t } = useTranslation();

  const icon = dark ? '🌙' : '☀️';

  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="QRDrop" className="h-9 w-9" />
          <div>
            <h1 className="text-lg font-semibold text-violet-600 dark:text-violet-400">QRDrop</h1>
            <p className="hidden text-xs text-gray-500 dark:text-gray-400 sm:block">{t("tagline")}</p>
          </div>
          <span className="hidden rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/40 dark:text-green-400 sm:inline-flex">
            {t("privacy")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <button
            onClick={toggleDark}
            className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            aria-label={t("aria_theme_toggle")}
          >
            {icon}
          </button>
        </div>
      </div>
    </header>
  );
}
