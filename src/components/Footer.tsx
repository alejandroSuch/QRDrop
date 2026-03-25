import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
        <a
          href="https://github.com/alejandroSuch/QRDrop"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
        >
          {t("footer_github")}
        </a>
        <a
          href="https://buymeacoffee.com/alejandrosuch"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
        >
          {t("footer_coffee")}
        </a>
      </div>
    </footer>
  );
}
