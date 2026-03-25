import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  onChange: (value: string) => void;
}

export default function WifiForm({ onChange }: Props) {
  const { t } = useTranslation();
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("WPA");

  useEffect(() => {
    if (!ssid.trim()) {
      onChange("");
      return;
    }
    const wifiString = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
    onChange(wifiString);
  }, [ssid, password, encryption, onChange]);

  const inputClass = "w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500";

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={ssid}
        onChange={(e) => setSsid(e.target.value)}
        placeholder={t("wifi_ssid")}
        className={inputClass}
      />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t("wifi_password")}
        className={inputClass}
      />
      <div>
        <label className="block text-sm font-medium mb-1">{t("wifi_encryption")}</label>
        <select
          value={encryption}
          onChange={(e) => setEncryption(e.target.value)}
          className="rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">{t("wifi_none")}</option>
        </select>
      </div>
    </div>
  );
}
