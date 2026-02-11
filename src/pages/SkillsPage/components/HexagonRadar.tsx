import type { SkillData } from "@/store/slices/skills.slice";

interface HexagonRadarProps {
  skills: SkillData[];
}

// Skill labels for display (ordered clockwise from top)
const SKILL_LABELS: Record<string, string> = {
  react: "React",
  reactNative: "React Native",
  typescript: "TypeScript",
  css: "CSS",
  git: "Git/CI/CD",
  ai: "AI Tools",
};

// Order of skills (clockwise from top)
const SKILL_ORDER = ["react", "reactNative", "typescript", "css", "git", "ai"];

/**
 * Calculate hexagon point coordinates
 * Starting from top (90 degrees), going clockwise (decreasing angles)
 */
const getHexagonPoint = (
  centerX: number,
  centerY: number,
  radius: number,
  index: number
): { x: number; y: number } => {
  // Start from top (90 degrees), go clockwise (subtract 60 degrees per point)
  const angle = (Math.PI / 2) - (index * Math.PI / 3);
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY - radius * Math.sin(angle),
  };
};

/**
 * Generate hexagon SVG path from center and radius
 */
const getHexagonPath = (cx: number, cy: number, radius: number): string => {
  const points = Array.from({ length: 6 }, (_, i) =>
    getHexagonPoint(cx, cy, radius, i)
  );
  return `M ${points.map((p) => `${p.x},${p.y}`).join(" L ")} Z`;
};

/**
 * Generate skill area path based on skill levels
 */
const getSkillAreaPath = (
  cx: number,
  cy: number,
  maxRadius: number,
  skills: SkillData[]
): string => {
  // Create a map for quick lookup
  const skillMap = new Map(skills.map((s) => [s.id, s.level]));

  // Generate points based on skill levels in the correct order
  const points = SKILL_ORDER.map((skillId, index) => {
    const level = skillMap.get(skillId) ?? 0;
    const radius = (level / 100) * maxRadius;
    return getHexagonPoint(cx, cy, radius, index);
  });

  return `M ${points.map((p) => `${p.x},${p.y}`).join(" L ")} Z`;
};

export function HexagonRadar({ skills }: HexagonRadarProps) {
  // SVG viewBox dimensions (fixed for consistent scaling)
  const viewBoxSize = 700;
  const center = viewBoxSize / 2;
  const maxRadius = 280;
  const labelOffset = 30;

  // Grid radii (100%, 75%, 50%, 25%)
  const gridScales = [1, 0.75, 0.5, 0.25];

  // Create skill map for lookup
  const skillMap = new Map(skills.map((s) => [s.id, s.level]));

  return (
    <svg
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      className="w-full h-full max-w-[700px] max-h-[700px]"
      aria-label="Skill radar chart"
    >
      {/* Grid layers - 4 concentric hexagons */}
      {gridScales.map((scale) => (
        <path
          key={`grid-${scale}`}
          d={getHexagonPath(center, center, maxRadius * scale)}
          fill="none"
          stroke="#1E293B"
          strokeWidth="1"
        />
      ))}

      {/* Axis lines - from center to each vertex */}
      {Array.from({ length: 6 }, (_, i) => {
        const point = getHexagonPoint(center, center, maxRadius, i);
        return (
          <line
            key={`axis-${i}`}
            x1={center}
            y1={center}
            x2={point.x}
            y2={point.y}
            stroke="#1E293B"
            strokeWidth="1"
          />
        );
      })}

      {/* Skill area - filled polygon based on levels */}
      <path
        d={getSkillAreaPath(center, center, maxRadius, skills)}
        fill="#22D3EE"
        fillOpacity="0.125"
        stroke="#22D3EE"
        strokeWidth="2"
      />

      {/* Skill labels at each vertex */}
      {SKILL_ORDER.map((skillId, index) => {
        const point = getHexagonPoint(center, center, maxRadius + labelOffset, index);
        const level = skillMap.get(skillId) ?? 0;
        const label = SKILL_LABELS[skillId] || skillId;

        // Determine text anchor based on position
        let textAnchor: "start" | "middle" | "end" = "middle";
        if (index === 1 || index === 2) textAnchor = "start";
        if (index === 4 || index === 5) textAnchor = "end";

        // Vertical alignment
        let dy = "0.35em";
        if (index === 0) dy = "-0.5em";
        if (index === 3) dy = "1.2em";

        return (
          <g key={skillId}>
            <text
              x={point.x}
              y={point.y}
              textAnchor={textAnchor}
              dy={dy}
              className="fill-white text-sm font-medium"
              style={{ fontSize: "14px" }}
            >
              {label}
            </text>
            <text
              x={point.x}
              y={point.y}
              textAnchor={textAnchor}
              dy={index === 0 ? "1em" : index === 3 ? "2.7em" : "1.5em"}
              className="fill-[#22D3EE] text-xs font-semibold"
              style={{ fontSize: "12px" }}
            >
              {level}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
