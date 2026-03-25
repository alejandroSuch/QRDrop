import { useTranslation } from "react-i18next";

interface Props {
  size: "s" | "m" | "l";
  setSize: (s: "s" | "m" | "l") => void;
}

const OPTIONS: Array<"s" | "m" | "l"> = ["s", "m", "l"];

export default function SizeSelector({ size, setSize }: Props) {
  const { t } = useTranslation();

  return (
    <div>
      <label className="block text-sm font-medium mb-2">{t("size")}</label>
      <div className="flex gap-2">
        {OPTIONS.map((key) => (
          <button
            key={key}
            onClick={() => setSize(key)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              size === key
                ? "bg-violet-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {t(`size_${key}`)}
          </button>
        ))}
      </div>
    </div>
  );
}
