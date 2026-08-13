import React from "react";
import Glass from "./Glass";

export interface GlassConfig {
  scale: number;
  baseFrequency: number;
  blur: number;
  borderRadius: number;
  bgColor: string;
  bgOpacity: number;
  highlightOpacity: number;
  highlightSize: number;
  borderWidth: number;
  specularAngle: number;
  innerGlowRadius: number;
  innerGlowOpacity: number;
  theme: "dark" | "light";
}

interface ConfigPanelProps {
  config: GlassConfig;
  onChange: (newConfig: GlassConfig) => void;
  onReset: () => void;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({
  config,
  onChange,
  onReset,
}) => {
  const handleChange = <K extends keyof GlassConfig>(
    key: K,
    value: GlassConfig[K]
  ) => {
    onChange({
      ...config,
      [key]: value,
    });
  };

  const isDark = config.theme === "dark";
  const textColor = isDark ? "#ffffff" : "#08060d";
  const labelColor = isDark ? "#94a3b8" : "#64748b";
  const btnBg = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.06)";
  const btnBorder = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.15)";
  const panelBg = isDark ? "rgba(20, 20, 35, 0.45)" : "rgba(255, 255, 255, 0.45)";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        zIndex: 9999,
        width: "300px",
        height: "55vh",
        maxHeight: "480px",
      }}
    >
      <Glass
        scale={config.scale}
        baseFrequency={config.baseFrequency}
        blur={config.blur}
        borderRadius="20px"
        highlightOpacity={config.highlightOpacity}
        highlightSize={config.highlightSize}
        borderWidth={config.borderWidth}
        specularAngle={config.specularAngle}
        innerGlowRadius={config.innerGlowRadius}
        innerGlowOpacity={config.innerGlowOpacity}
        backgroundColor={panelBg}
        style={{
          width: "100%",
          height: "100%",
          color: textColor,
          fontFamily: "system-ui, -apple-system, sans-serif",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.25)",
          transition: "color 0.3s ease, background-color 0.3s ease",
        }}
        contentStyle={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: "16px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Header cố định không bị scroll */}
        <div
          style={{
            marginBottom: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "15px",
              fontWeight: 600,
              letterSpacing: "0.5px",
              color: isDark ? "#60a5fa" : "#2563eb",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            ⚙️ Controls
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <button
              onClick={onReset}
              style={{
                padding: "4px 8px",
                borderRadius: "8px",
                border: `1px solid ${btnBorder}`,
                background: btnBg,
                color: textColor,
                fontSize: "12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                transition: "all 0.2s ease",
              }}
              title="Reset về bộ thông số mặc định"
            >
              🔄 Reset
            </button>
            <button
              onClick={() =>
                handleChange("theme", isDark ? "light" : "dark")
              }
              style={{
                padding: "4px 8px",
                borderRadius: "8px",
                border: `1px solid ${btnBorder}`,
                background: btnBg,
                color: textColor,
                fontSize: "12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                transition: "all 0.2s ease",
              }}
              title="Đổi giao diện Sáng / Tối cho toàn trang"
            >
              {isDark ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </div>

        {/* Khối danh sách Sliders riêng biệt chỉ cuộn dọc */}
        <div
          className="auto-scrollbar"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            overflowY: "auto",
            overflowX: "hidden",
            paddingRight: "4px",
            flexGrow: 1,
            boxSizing: "border-box",
          }}
        >
          {/* Scale Slider */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "4px",
                fontSize: "13px",
              }}
            >
              <span>Scale (Biến dạng)</span>
              <span style={{ color: labelColor }}>{config.scale}</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              step="1"
              value={config.scale}
              onChange={(e) =>
                handleChange("scale", parseFloat(e.target.value))
              }
              style={{
                width: "100%",
                accentColor: "#3b82f6",
                cursor: "pointer",
              }}
            />
          </div>

          {/* Base Frequency Slider */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "4px",
                fontSize: "13px",
              }}
            >
              <span>Frequency (Tần số)</span>
              <span style={{ color: labelColor }}>
                {config.baseFrequency.toFixed(3)}
              </span>
            </div>
            <input
              type="range"
              min="0.001"
              max="0.1"
              step="0.001"
              value={config.baseFrequency}
              onChange={(e) =>
                handleChange("baseFrequency", parseFloat(e.target.value))
              }
              style={{
                width: "100%",
                accentColor: "#3b82f6",
                cursor: "pointer",
              }}
            />
          </div>

          {/* Blur Slider */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "4px",
                fontSize: "13px",
              }}
            >
              <span>Blur (Nhòe)</span>
              <span style={{ color: labelColor }}>{config.blur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="0.5"
              value={config.blur}
              onChange={(e) => handleChange("blur", parseFloat(e.target.value))}
              style={{
                width: "100%",
                accentColor: "#3b82f6",
                cursor: "pointer",
              }}
            />
          </div>

          {/* Border Radius Slider */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "4px",
                fontSize: "13px",
              }}
            >
              <span>Radius (Bo góc)</span>
              <span style={{ color: labelColor }}>{config.borderRadius}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={config.borderRadius}
              onChange={(e) =>
                handleChange("borderRadius", parseFloat(e.target.value))
              }
              style={{
                width: "100%",
                accentColor: "#3b82f6",
                cursor: "pointer",
              }}
            />
          </div>

          {/* Specular Highlight Opacity */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "4px",
                fontSize: "13px",
              }}
            >
              <span>Viền phản sáng (Highlight)</span>
              <span style={{ color: labelColor }}>
                {Math.round(config.highlightOpacity * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={config.highlightOpacity}
              onChange={(e) =>
                handleChange("highlightOpacity", parseFloat(e.target.value))
              }
              style={{
                width: "100%",
                accentColor: "#3b82f6",
                cursor: "pointer",
              }}
            />
          </div>

          {/* Specular Highlight Size / Spread Slider */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "4px",
                fontSize: "13px",
              }}
            >
              <span>Vùng phủ sáng (Highlight Size)</span>
              <span style={{ color: labelColor }}>{config.highlightSize}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              step="1"
              value={config.highlightSize}
              onChange={(e) =>
                handleChange("highlightSize", parseFloat(e.target.value))
              }
              style={{
                width: "100%",
                accentColor: "#3b82f6",
                cursor: "pointer",
              }}
            />
          </div>

          {/* Border Width Slider */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "4px",
                fontSize: "13px",
              }}
            >
              <span>Độ dày viền (Border)</span>
              <span style={{ color: labelColor }}>{config.borderWidth}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={config.borderWidth}
              onChange={(e) =>
                handleChange("borderWidth", parseFloat(e.target.value))
              }
              style={{
                width: "100%",
                accentColor: "#3b82f6",
                cursor: "pointer",
              }}
            />
          </div>

          {/* Specular Light Angle Slider */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "4px",
                fontSize: "13px",
              }}
            >
              <span>Góc ánh sáng (Angle)</span>
              <span style={{ color: labelColor }}>{config.specularAngle}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              step="5"
              value={config.specularAngle}
              onChange={(e) =>
                handleChange("specularAngle", parseFloat(e.target.value))
              }
              style={{
                width: "100%",
                accentColor: "#3b82f6",
                cursor: "pointer",
              }}
            />
          </div>

          {/* Inner Glow Radius Slider */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "4px",
                fontSize: "13px",
              }}
            >
              <span>Tản sáng trong (Glow Spread)</span>
              <span style={{ color: labelColor }}>{config.innerGlowRadius}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="1"
              value={config.innerGlowRadius}
              onChange={(e) =>
                handleChange("innerGlowRadius", parseFloat(e.target.value))
              }
              style={{
                width: "100%",
                accentColor: "#3b82f6",
                cursor: "pointer",
              }}
            />
          </div>

          {/* Inner Glow Opacity Slider */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "4px",
                fontSize: "13px",
              }}
            >
              <span>Độ đậm Glow (Glow Intensity)</span>
              <span style={{ color: labelColor }}>
                {Math.round(config.innerGlowOpacity * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={config.innerGlowOpacity}
              onChange={(e) =>
                handleChange("innerGlowOpacity", parseFloat(e.target.value))
              }
              style={{
                width: "100%",
                accentColor: "#3b82f6",
                cursor: "pointer",
              }}
            />
          </div>

          {/* Background Color & Opacity */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "4px",
                fontSize: "13px",
              }}
            >
              <span>Màu nền Tint</span>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="color"
                  value={config.bgColor.length > 7 ? config.bgColor.slice(0, 7) : config.bgColor}
                  onChange={(e) => handleChange("bgColor", e.target.value)}
                  onInput={(e) => handleChange("bgColor", (e.target as HTMLInputElement).value)}
                  style={{
                    border: "none",
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    padding: 0,
                    backgroundColor: "transparent",
                  }}
                />
                <span style={{ color: labelColor, fontFamily: "monospace", fontSize: "13px" }}>
                  {config.bgColor.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Background Opacity Slider */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "4px",
                fontSize: "13px",
              }}
            >
              <span>Độ đục nền (Opacity)</span>
              <span style={{ color: labelColor }}>
                {Math.round(config.bgOpacity * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={config.bgOpacity}
              onChange={(e) =>
                handleChange("bgOpacity", parseFloat(e.target.value))
              }
              style={{
                width: "100%",
                accentColor: "#3b82f6",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </Glass>
    </div>
  );
};

export default ConfigPanel;
