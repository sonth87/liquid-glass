import React, { useId, type HTMLAttributes } from "react";

export interface GlassProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** Độ biến dạng (khúc xạ) của hiệu ứng glass */
  scale?: number;
  /** Tần số tạo sóng/vân lỏng */
  baseFrequency?: number;
  /** Độ mờ nhòe (frosted effect) */
  blur?: number;
  /** Màu nền tint mờ (CSS background) */
  backgroundColor?: string;
  /** Bo góc cho container */
  borderRadius?: string | number;
  /** Độ sáng của viền viền Specular Highlight (0-1) */
  highlightOpacity?: number;
  /** Phạm vi/độ phủ rộng của vệt sáng Specular Highlight (%, từ 5% đến 60%) */
  highlightSize?: number;
  /** Độ dày của viền sáng border (px) */
  borderWidth?: number;
  /** Góc chiếu của ánh sáng phản xạ (độ deg 0-360) */
  specularAngle?: number;
  /** Bán kính độ lan tản sáng vào trong (Inner Glow Radius px) */
  innerGlowRadius?: number;
  /** Độ đậm tản sáng vào trong (Inner Glow Opacity 0-1) */
  innerGlowOpacity?: number;
  /** Style tùy chỉnh cho div.glass-content bên trong */
  contentStyle?: React.CSSProperties;
}

export const Glass: React.FC<GlassProps> = ({
  children,
  scale = 30,
  baseFrequency = 0.02,
  blur = 2,
  backgroundColor = "rgba(255, 255, 255, 0.15)",
  borderRadius = "16px",
  highlightOpacity = 0.45,
  highlightSize = 25,
  borderWidth = 1,
  specularAngle = 135,
  innerGlowRadius = 12,
  innerGlowOpacity = 0.25,
  className = "",
  style,
  contentStyle,
  ...props
}) => {
  // Tạo unique ID cho SVG filter để dùng nhiều component Glass trên cùng 1 page mà không bị xung đột ID
  const uniqueId = useId().replace(/:/g, "");
  const filterId = `liquid-glass-filter-${uniqueId}`;

  // Tính toán khoảng cách phần trăm cho dải gradient dựa trên highlightSize
  const hSize = Math.max(5, Math.min(80, highlightSize));
  const hMid = Math.round(hSize * 0.6);
  const hEnd = Math.round(hSize);

  return (
    <div
      className={`liquid-glass-container ${className}`}
      style={{
        position: "relative",
        borderRadius,
        overflow: "hidden",
        backdropFilter: `blur(${blur}px) url(#${filterId})`,
        WebkitBackdropFilter: `blur(${blur}px) url(#${filterId})`,
        backgroundColor,
        border: `${borderWidth}px solid rgba(255, 255, 255, ${Math.min(1, highlightOpacity * 0.9)})`,
        boxShadow: `
          0 20px 50px rgba(0, 0, 0, 0.3),
          inset 0 1px 1px 0 rgba(255, 255, 255, ${highlightOpacity * 1.5}),
          inset 0 -2px 4px 0 rgba(0, 0, 0, 0.4),
          inset 0 0 ${innerGlowRadius}px 0 rgba(255, 255, 255, ${innerGlowOpacity})
        `,
        ...style,
      }}
      {...props}
    >
      {/* Khối hiệu ứng viền phát sáng / khúc xạ ánh sáng 3D (Specular Highlight overlay) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          zIndex: 2,
          background: `linear-gradient(
            ${specularAngle}deg,
            rgba(255, 255, 255, ${highlightOpacity}) 0%,
            rgba(255, 255, 255, ${highlightOpacity * 0.1}) ${hMid}%,
            rgba(255, 255, 255, 0) ${hEnd}%
          )`,
          boxShadow: `inset 0 0 ${Math.max(4, innerGlowRadius * 0.8)}px rgba(255, 255, 255, ${innerGlowOpacity * 0.8})`,
        }}
      />
      {/* Khối chứa nội dung người dùng truyền vào */}
      <div
        className="glass-content"
        style={{
          position: "relative",
          zIndex: 1,
          ...contentStyle,
        }}
      >
        {children}
      </div>

      {/* Tự chèn SVG Filter nội bộ phục vụ cho hiệu ứng khúc xạ thuỷ tinh */}
      <svg
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            {/* Tạo vân sóng lỏng tự nhiên bằng Perlin Noise */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency={baseFrequency}
              numOctaves="3"
              result="noise"
            />
            {/* Tăng độ méo khúc xạ ở phần rìa viền */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={scale}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Glass;
