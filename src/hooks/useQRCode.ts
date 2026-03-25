import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

export function useQRCode(content: string, size: number) {
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
      QRCode.toDataURL(content, {
        width: size,
        margin: 2,
        color: { dark: "#000000", light: "#ffffff" },
      }).then(setDataUrl).catch(() => setDataUrl(null));

      QRCode.toString(content, { type: "svg", width: size, margin: 2 })
        .then(setSvgString)
        .catch(() => setSvgString(null));
    }, 300);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [content, size]);

  return { dataUrl, svgString };
}
