import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  dataUrl: string | null;
  svgString: string | null;
  noContentMessage: string;
}

export default function QRPreview({ dataUrl, svgString, noContentMessage }: Props) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const downloadPng = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "qrcode.png";
    a.click();
  };

  const downloadSvg = () => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    if (!dataUrl) return;
    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API not available
    }
  };

  if (!dataUrl) {
    return (
      <div className="w-full aspect-square max-w-xs flex items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 text-center p-8">
        {noContentMessage}
      </div>
    );
  }

  return (
    <div className="space-y-4 flex flex-col items-center">
      <div className="bg-white p-4 rounded-2xl shadow-lg">
        <img src={dataUrl} alt="QR Code" className="max-w-xs w-full" />
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        <button onClick={downloadPng} className="px-4 py-2 text-sm font-medium bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
          {t("download_png")}
        </button>
        <button onClick={downloadSvg} className="px-4 py-2 text-sm font-medium bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
          {t("download_svg")}
        </button>
        <button onClick={copyToClipboard} className="px-4 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          {copied ? t("copied") : t("copy_clipboard")}
        </button>
      </div>
    </div>
  );
}
