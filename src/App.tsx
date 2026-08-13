import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Glass from "./components/Glass";
import { useDraggable } from "./hooks/useDraggable";
import ConfigPanel, { type GlassConfig } from "./components/ConfigPanel";

const LOCAL_STORAGE_KEY = "liquid_glass_config";

export const DEFAULT_CONFIG: GlassConfig = {
  scale: 30,
  baseFrequency: 0.015,
  blur: 3,
  borderRadius: 100,
  highlightOpacity: 0.5,
  highlightSize: 25,
  borderWidth: 2,
  specularAngle: 160,
  innerGlowRadius: 15,
  innerGlowOpacity: 0.25,
  bgColor: "#ffffff",
  bgOpacity: 0,
  theme: "dark",
};

function App() {
  const [count, setCount] = useState(0);

  // State cho thông số Glass với khôi phục từ localStorage
  const [glassConfig, setGlassConfig] = useState<GlassConfig>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback nếu không đọc được localStorage
    }
    return DEFAULT_CONFIG;
  });

  // Tự động lưu cấu hình và cập nhật data-theme lên thẻ HTML root khi config thay đổi
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(glassConfig));
    } catch {
      // Safe catch
    }
    document.documentElement.setAttribute("data-theme", glassConfig.theme);
  }, [glassConfig]);

  // Chuyển đổi HEX color + opacity thành chuỗi rgba(...)
  const getRgbaColor = (hex: string, opacity: number) => {
    if (!hex) return `rgba(255, 255, 255, ${opacity})`;
    let cleanHex = hex.replace("#", "").trim();
    if (cleanHex.length === 3) {
      cleanHex = cleanHex
        .split("")
        .map((char) => char + char)
        .join("");
    }
    // Cắt 6 ký tự HEX chuẩn nếu có thêm ký tự alpha từ trình duyệt
    if (cleanHex.length > 6) {
      cleanHex = cleanHex.substring(0, 6);
    }
    if (cleanHex.length !== 6) {
      return `rgba(255, 255, 255, ${opacity})`;
    }
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      return `rgba(255, 255, 255, ${opacity})`;
    }
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  // Sử dụng custom hook drag
  const { bindProps, style: dragStyle, isDragging, resetPosition } = useDraggable();

  const handleReset = () => {
    setGlassConfig(DEFAULT_CONFIG);
    resetPosition();
  };

  return (
    <>
      <section id="center" style={{ position: "relative" }}>
        {/* Component Glass nằm ở chính giữa trung tâm trang */}
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Glass
            scale={glassConfig.scale}
            baseFrequency={glassConfig.baseFrequency}
            blur={glassConfig.blur}
            borderRadius={`${glassConfig.borderRadius}px`}
            highlightOpacity={glassConfig.highlightOpacity}
            highlightSize={glassConfig.highlightSize}
            borderWidth={glassConfig.borderWidth}
            specularAngle={glassConfig.specularAngle}
            innerGlowRadius={glassConfig.innerGlowRadius}
            innerGlowOpacity={glassConfig.innerGlowOpacity}
            backgroundColor={getRgbaColor(
              glassConfig.bgColor,
              glassConfig.bgOpacity,
            )}
            {...bindProps}
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "32px",
              color: "#ffffff",
              ...dragStyle,
              boxShadow: isDragging
                ? "0 16px 48px 0 rgba(31, 38, 135, 0.35)"
                : "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
            }}
            onClick={() => console.log("Clicked Glass!")}
          >
            <h2 style={{ marginTop: 0 }}>Liquid Glass Card</h2>
            <p>Đây là component Glass</p>
            <button
              style={{
                padding: "10px 20px",
                borderRadius: "12px",
                border: "none",
                background: "#ffffff",
                color: "#333",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: "16px",
              }}
            >
              Khám phá
            </button>
          </Glass>
        </div>

        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
      <ConfigPanel
        config={glassConfig}
        onChange={setGlassConfig}
        onReset={handleReset}
      />
    </>
  );
}

export default App;
