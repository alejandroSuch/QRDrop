import { useRef } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  fgColor: string;
  bgColor: string;
  logoFile: File | null;
  logoPreview: string | null;
  setFgColor: (c: string) => void;
  setBgColor: (c: string) => void;
  setLogoFile: (f: File | null) => void;
}

export default function StyleControls({
  fgColor,
  bgColor,
  logoFile,
  logoPreview,
  setFgColor,
  setBgColor,
  setLogoFile,
}: Props) {
  const { t } = useTranslation();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setLogoFile(file);
  };

  const removeLogo = () => {
    setLogoFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="space-y-4">
      {/* Color pickers */}
      <div className="flex gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">{t("qrColor")}</label>
          <input
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
            aria-label={t("qrColor")}
            className="w-10 h-10 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t("bgColor")}</label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            aria-label={t("bgColor")}
            className="w-10 h-10 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
          />
        </div>
      </div>

      {/* Logo input */}
      <div>
        <label className="block text-sm font-medium mb-1">{t("logo")}</label>
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/svg+xml"
          onChange={handleLogoChange}
          aria-label={t("logo")}
          className="block text-sm text-gray-600 dark:text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-violet-50 file:text-violet-700 dark:file:bg-violet-900 dark:file:text-violet-200 hover:file:bg-violet-100 dark:hover:file:bg-violet-800 file:cursor-pointer file:transition-colors"
        />
        {logoFile && logoPreview && (
          <div className="mt-2 flex items-center gap-3">
            <img
              src={logoPreview}
              alt="Logo preview"
              className="w-10 h-10 rounded object-contain border border-gray-200 dark:border-gray-700"
            />
            <button
              onClick={removeLogo}
              className="text-sm text-red-600 dark:text-red-400 hover:underline"
            >
              {t("removeLogo")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
