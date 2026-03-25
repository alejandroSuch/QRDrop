import { useTranslation } from "react-i18next";
import type { QRTab } from "../App";

interface Props {
  tab: QRTab;
  setTab: (tab: QRTab) => void;
  onTabChange: () => void;
}

const TABS: QRTab[] = ["text", "url", "wifi", "vcard"];

export default function TabSelector({ tab, setTab, onTabChange }: Props) {
  const { t } = useTranslation();

  const labels: Record<QRTab, string> = {
    text: t("tab_text"),
    url: t("tab_url"),
    wifi: t("tab_wifi"),
    vcard: t("tab_vcard"),
  };

  return (
    <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
      {TABS.map((key) => (
        <button
          key={key}
          onClick={() => {
            setTab(key);
            onTabChange();
          }}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            tab === key
              ? "bg-violet-600 text-white shadow-sm"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {labels[key]}
        </button>
      ))}
    </div>
  );
}
