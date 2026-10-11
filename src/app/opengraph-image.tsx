import { ImageResponse } from "next/og";
import { profile } from "@/content/data";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Share card: dark board, signal-green headline, a mini pipeline along the bottom.
export default function Image() {
  const stages = ["Problem", "Constraints", "Decision", "Build", "Ship", "Learn"];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a100d",
          color: "#e6efe9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", color: "#3ddc84", fontSize: 28, letterSpacing: 4 }}>
          {profile.role.toUpperCase()} · {profile.company.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700 }}>{profile.name}</div>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: "#3ddc84", marginTop: 8 }}>Software that holds up_</div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {stages.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", border: "2px solid #67e8f9", borderRadius: 6, padding: "8px 16px", fontSize: 22, color: "#e6efe9" }}>{s}</div>
              {i < stages.length - 1 && <div style={{ display: "flex", width: 28, height: 2, background: "#67e8f9" }} />}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
