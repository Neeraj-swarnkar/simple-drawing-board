
// DrawingSvg.js
import React from "react";
import DrawingShape from "./DrawingShape"; // Adjust the import path based on your project structure

const DrawingSvg = ({ lines, svgRef, handleMouseDown, handleMouseMove, handleStopDrawing }) => {
  return (
    <svg
      className="board"
      ref={svgRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleStopDrawing}
      onMouseLeave={handleStopDrawing}
    >
        {lines.map(({ id, shape, color, points }, index) => (
          <DrawingShape id={id} key={id} shape={shape} color={color} points={points} />
        ))}
    </svg>
  );
};

export default DrawingSvg;
