import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

function applyLogoToDataUrl(
  qrDataUrl: string,
  logoFile: File,
  size: number,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const qrImg = new Image();
    qrImg.onload = () => {
      const logoImg = new Image();
      const logoUrl = URL.createObjectURL(logoFile);
      logoImg.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(qrImg, 0, 0, size, size);
        const logoSize = size * 0.2;
        const x = (size - logoSize) / 2;
        const y = (size - logoSize) / 2;
        ctx.drawImage(logoImg, x, y, logoSize, logoSize);
        URL.revokeObjectURL(logoUrl);
        resolve(canvas.toDataURL("image/png"));
      };
      logoImg.onerror = () => {
        URL.revokeObjectURL(logoUrl);
        reject(new Error("Failed to load logo"));
      };
      logoImg.src = logoUrl;
    };
    qrImg.onerror = () => reject(new Error("Failed to load QR"));
    qrImg.src = qrDataUrl;
  });
}

export function useQRCode(
  content: string,
  size: number,
  fgColor: string = "#000000",
  bgColor: string = "#ffffff",
  logoFile: File | null = null,
) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [svgString, setSvgString] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!content.trim()) {
      setDataUrl(null);
      setSvgString(null);
      return;
    }

    timerRef.current = setTimeout(() => {
      const errorCorrectionLevel = logoFile ? "H" : "M";

      QRCode.toDataURL(content, {
        width: size,
        margin: 2,
        errorCorrectionLevel,
        color: { dark: fgColor, light: bgColor },
      })
        .then((url) => {
          if (logoFile) {
            return applyLogoToDataUrl(url, logoFile, size);
          }
          return url;
        })
        .then(setDataUrl)
        .catch(() => setDataUrl(null));

      QRCode.toString(content, {
        type: "svg",
        width: size,
        margin: 2,
        errorCorrectionLevel,
        color: { dark: fgColor, light: bgColor },
      })
        .then(setSvgString)
        .catch(() => setSvgString(null));
    }, 300);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [content, size, fgColor, bgColor, logoFile]);

  return { dataUrl, svgString };
}
