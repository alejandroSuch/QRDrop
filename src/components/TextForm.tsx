import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  onChange: (value: string) => void;
}

export default function TextForm({ onChange }: Props) {
  const { t } = useTranslation();
  const [text, setText] = useState("");

  useEffect(() => {
    onChange(text);
  }, [text, onChange]);

  return (
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder={t("text_placeholder")}
      rows={5}
      className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
    />
  );
}
