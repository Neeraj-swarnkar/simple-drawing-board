// DrawingShape.js
import React from "react";

const DrawingShape = ({ shape, color, points }) => {
  switch (shape) {
    case "line":
      return points.length === 2 ? (
        <line
          x1={points[0].x}
          y1={points[0].y}
          x2={points[1].x}
          y2={points[1].y}
          stroke={color}
          strokeWidth="2"
        />
      ) : null;

    case "rectangle":
      return points.length === 2 ? (
        <rect
          x={Math.min(points[0].x, points[1].x)}
          y={Math.min(points[0].y, points[1].y)}
          width={Math.abs(points[1].x - points[0].x)}
          height={Math.abs(points[1].y - points[0].y)}
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
      ) : null;

    case "circle":
      return points.length >= 2 ? (
        <circle
          cx={(points[0].x + points[1].x) / 2}
          cy={(points[0].y + points[1].y) / 2}
          r={Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y) / 2}
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
      ) : null;

    default:
      return points.length > 1 ? (
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points.map((point) => `${point.x},${point.y}`).join(" ")}
        />
      ) : null;
  }
};

export default DrawingShape;
