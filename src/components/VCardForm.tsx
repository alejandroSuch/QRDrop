import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  onChange: (value: string) => void;
}

export default function VCardForm({ onChange }: Props) {
  const { t } = useTranslation();
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!first.trim() && !last.trim() && !phone.trim() && !email.trim()) {
      onChange("");
      return;
    }
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${last};${first};;;`,
      `FN:${first} ${last}`.trim(),
      phone ? `TEL:${phone}` : "",
      email ? `EMAIL:${email}` : "",
      "END:VCARD",
    ]
      .filter(Boolean)
      .join("\n");
    onChange(vcard);
  }, [first, last, phone, email, onChange]);

  const inputClass = "w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500";

  return (
    <div className="space-y-3">
      <input type="text" value={first} onChange={(e) => setFirst(e.target.value)} placeholder={t("vcard_first")} aria-label={t("aria_vcard_first")} className={inputClass} />
      <input type="text" value={last} onChange={(e) => setLast(e.target.value)} placeholder={t("vcard_last")} aria-label={t("aria_vcard_last")} className={inputClass} />
      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t("vcard_phone")} aria-label={t("aria_vcard_phone")} className={inputClass} />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("vcard_email")} aria-label={t("aria_vcard_email")} className={inputClass} />
    </div>
  );
}
