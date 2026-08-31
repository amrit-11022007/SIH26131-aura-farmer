import * as React from "react";
import { cn } from "@/lib/utils";

interface PercentageCircleProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

const PercentageCircle = ({
  value,
  size = 120,
  strokeWidth = 10,
  className,
}: PercentageCircleProps) => {
  const percentage = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const getSeverityColor = (value: number) => {
    if (value >= 85) return { main: "#dc2626", soft: "#fee2e2" };
    if (value >= 70) return { main: "#f97316", soft: "#ffedd5" };
    if (value >= 40) return { main: "#facc15", soft: "#fef9c3" };
    return { main: "#22c55e", soft: "#dcfce7" };
  };

  const palette = getSeverityColor(percentage);

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size, color: palette.main }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          strokeWidth={strokeWidth}
          stroke={palette.soft}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="transition-all duration-300 ease-in-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke={palette.main}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <span
        className="absolute text-3xl font-semibold tracking-tighter"
        style={{ color: palette.main }}
      >
        {Math.round(percentage)}%
      </span>
    </div>
  );
};

export default PercentageCircle;
