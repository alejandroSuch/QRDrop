import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "./hooks/useDarkMode";
import { useQRCode } from "./hooks/useQRCode";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TabSelector from "./components/TabSelector";
import TextForm from "./components/TextForm";
import UrlForm from "./components/UrlForm";
import WifiForm from "./components/WifiForm";
import VCardForm from "./components/VCardForm";
import QRPreview from "./components/QRPreview";
import SizeSelector from "./components/SizeSelector";
import StyleControls from "./components/StyleControls";

export type QRTab = "text" | "url" | "wifi" | "vcard";

const SIZES = { s: 128, m: 256, l: 512 } as const;
type SizeKey = keyof typeof SIZES;

export default function App() {
  const { t } = useTranslation();
  const [dark, toggleDark] = useDarkMode();
  const [tab, setTab] = useState<QRTab>("text");
  const [content, setContent] = useState("");
  const [size, setSize] = useState<SizeKey>("m");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!logoFile) {
      setLogoPreview(null);
      return;
    }
    const url = URL.createObjectURL(logoFile);
    setLogoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [logoFile]);

  const qr = useQRCode(content, SIZES[size], fgColor, bgColor, logoFile);

  const handleContentChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      <Header dark={dark} toggleDark={toggleDark} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input side */}
          <div className="space-y-6">
            <TabSelector tab={tab} setTab={setTab} onTabChange={() => setContent("")} />

            {tab === "text" && <TextForm onChange={handleContentChange} />}
            {tab === "url" && <UrlForm onChange={handleContentChange} />}
            {tab === "wifi" && <WifiForm onChange={handleContentChange} />}
            {tab === "vcard" && <VCardForm onChange={handleContentChange} />}

            <SizeSelector size={size} setSize={setSize} />
            <StyleControls
              fgColor={fgColor}
              bgColor={bgColor}
              logoFile={logoFile}
              logoPreview={logoPreview}
              setFgColor={setFgColor}
              setBgColor={setBgColor}
              setLogoFile={setLogoFile}
            />
          </div>

          {/* QR preview side */}
          <div className="flex flex-col items-center justify-start space-y-4">
            <QRPreview
              dataUrl={qr.dataUrl}
              svgString={qr.svgString}
              noContentMessage={t("no_content")}
              hasLogo={logoFile !== null}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
