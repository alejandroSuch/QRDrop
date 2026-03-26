import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  onChange: (value: string) => void;
}

function escapeWifiField(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/"/g, '\\"').replace(/:/g, "\\:");
}

export default function WifiForm({ onChange }: Props) {
  const { t } = useTranslation();
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("WPA");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!ssid.trim()) {
      onChange("");
      return;
    }
    const wifiString = `WIFI:T:${encryption};S:${escapeWifiField(ssid)};P:${escapeWifiField(password)};;`;
    onChange(wifiString);
  }, [ssid, password, encryption, onChange]);

  const inputClass = "w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500";

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={ssid}
        onChange={(e) => setSsid(e.target.value)}
        placeholder={t("wifi_ssid")}
        aria-label={t("aria_wifi_ssid")}
        className={inputClass}
      />
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("wifi_password")}
          aria-label={t("aria_wifi_password")}
          className={`${inputClass} pr-16`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={t("aria_toggle_password")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 px-1"
        >
          {showPassword ? "\u{1F441}\u200D\u{1F5E8}" : "\u{1F441}"}
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">{t("wifi_encryption")}</label>
        <select
          value={encryption}
          onChange={(e) => setEncryption(e.target.value)}
          aria-label={t("aria_wifi_encryption")}
          className="rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">{t("wifi_none")}</option>
        </select>
      </div>
    </div>
  );
}
