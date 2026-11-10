import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F8F9F7",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#101820",
            fontSize: 28,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "#101820",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#526BFF",
              }}
            />
          </div>
          Synapto Tech
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 600,
              color: "#101820",
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            Commerce infrastructure for modern healthcare businesses.
          </div>
          <div style={{ fontSize: 24, color: "#5C6670", maxWidth: 720 }}>
            Beautiful storefronts. Connected operations. Built for clinics and
            healthcare brands.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
