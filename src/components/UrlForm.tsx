import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  onChange: (value: string) => void;
}

export default function UrlForm({ onChange }: Props) {
  const { t } = useTranslation();
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url.trim()) {
      setError(false);
      onChange("");
      return;
    }
    try {
      new URL(url);
      setError(false);
      onChange(url);
    } catch {
      setError(true);
      onChange("");
    }
  }, [url, onChange]);

  return (
    <div className="space-y-1">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder={t("url_placeholder")}
        aria-label={t("aria_url_input")}
        className={`w-full rounded-xl border ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500`}
      />
      {error && <p className="text-red-500 text-sm">{t("url_invalid")}</p>}
    </div>
  );
}
