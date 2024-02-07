import React, { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaGithub, FaStackOverflow } from "react-icons/fa";
import {
  FaBrush,
  FaUndo,
  FaRedo,
  FaFileExport,
  FaPalette,
} from "react-icons/fa";
import { GiPencilBrush } from "react-icons/gi";
import "./DrawingBoard.css";

const DrawingBoard = () => {
  const svgRef = useRef();
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentShape, setCurrentShape] = useState("brush");
  const [currentColor, setCurrentColor] = useState("#000000");
  const [lines, setLines] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const handleMouseDown = (e) => {
    handleStartDrawing(e.clientX, e.clientY);
  };

  const generateId = (length) =>
    Array(length)
      .fill("")
      .map(() => Math.random().toString(36).charAt(2))
      .join("");

  const handleStartDrawing = (x, y) => {
    const id = generateId(6);
    const svgRect = svgRef.current.getBoundingClientRect();
    const startingPoint = {
      x: x - svgRect.x,
      y: y - svgRect.y,
    };
    setIsDrawing(true);
    setUndoStack([...undoStack, lines]);
    setLines((lines) =>
      lines.concat({
        id,
        shape: currentShape,
        color: currentColor,
        points: [startingPoint],
      })
    );
    setRedoStack([]);
  };

  const handleMouseMove = (e) => {
    handleMoving(e.clientX, e.clientY);
  };

  const handleMoving = (x, y) => {
    if (!isDrawing) {
      return;
    }
    const svgRect = svgRef.current.getBoundingClientRect();

    setLines((lines) =>
      lines.map((line) => {
        if (line.id === lines[lines.length - 1].id) {
          switch (currentShape) {
            case "circle":
            case "line":
            case "rectangle":
              return {
                ...line,
                points: [
                  line.points[0],
                  { x: x - svgRect.x, y: y - svgRect.y },
                ],
              };
            default:
              return {
                ...line,
                points: line.points.concat({
                  x: x - svgRect.x,
                  y: y - svgRect.y,
                }),
              };
          }
        }
        return line;
      })
    );
  };

  const handleStopDrawing = () => {
    setIsDrawing(false);
  };

  const handleShapeChange = (shape) => {
    setCurrentShape(shape);
  };

  const handleColorChange = (e) => {
    setCurrentColor(e.target.value);
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      setRedoStack([...redoStack, lines]);
      setLines(undoStack[undoStack.length - 1]);
      setUndoStack(undoStack.slice(0, -1));
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      setUndoStack([...undoStack, lines]);
      setLines(redoStack[redoStack.length - 1]);
      setRedoStack(redoStack.slice(0, -1));
    }
  };

  const handleExport = () => {
    const svgElement = svgRef.current.outerHTML;
    const htmlContent = `<!DOCTYPE html><html><head><title>DrawBoard</title></head><body>${svgElement}</body></html>`;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "drawing.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const svgEle = svgRef.current;
    if (!svgEle) {
      return;
    }
    const { height, width } = svgEle.getBoundingClientRect();
    svgEle.setAttribute("width", width);
    svgEle.setAttribute("height", height);
    svgEle.setAttribute("viewBox", `0 0 ${width} ${height}`);
  }, [lines]);

  return (
    <>
      <header>
        <h1 style={{ color: "#fff" }}>
          <GiPencilBrush className="icon" /> Simple Drawing Board
        </h1>
      </header>
      <div className="controls">
        <label className="control-label">
          <FaBrush className="icon" />
          <select
            value={currentShape}
            onChange={(e) => handleShapeChange(e.target.value)}
          >
            <option value="brush">Brush</option>
            <option value="line">Line</option>
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
          </select>
        </label>
        <label className="control-label">
          <FaPalette className="icon" />
          <input
            type="color"
            value={currentColor}
            onChange={handleColorChange}
          />
        </label>
        <button onClick={handleUndo} disabled={undoStack.length === 0}>
          <FaUndo className="icon" /> Undo
        </button>
        <button onClick={handleRedo} disabled={redoStack.length === 0}>
          <FaRedo className="icon" /> Redo
        </button>
        <button onClick={handleExport}>
          <FaFileExport className="icon" /> Export
        </button>
      </div>
      <svg
        className="board"
        ref={svgRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleStopDrawing}
        onMouseLeave={handleStopDrawing}
      >
        {lines.map(({ id, shape, color, points }, index) => (
          <React.Fragment key={id}>
            {shape === "line" && points.length === 2 && (
              <line
                x1={points[0].x}
                y1={points[0].y}
                x2={points[1].x}
                y2={points[1].y}
                stroke={color}
                strokeWidth="2"
              />
            )}
            {shape === "rectangle" && points.length === 2 && (
              <rect
                x={Math.min(points[0].x, points[1].x)}
                y={Math.min(points[0].y, points[1].y)}
                width={Math.abs(points[1].x - points[0].x)}
                height={Math.abs(points[1].y - points[0].y)}
                fill="none"
                stroke={color}
                strokeWidth="2"
              />
            )}
            {shape === "circle" && points.length >= 2 && (
              <circle
                cx={(points[0].x + points[1].x) / 2}
                cy={(points[0].y + points[1].y) / 2}
                r={
                  Math.hypot(
                    points[1].x - points[0].x,
                    points[1].y - points[0].y
                  ) / 2
                }
                fill="none"
                stroke={color}
                strokeWidth="2"
              />
            )}
            {shape !== "line" &&
              shape !== "rectangle" &&
              shape !== "circle" && (
                <polyline
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  points={points
                    .map((point) => `${point.x},${point.y}`)
                    .join(" ")}
                />
              )}
          </React.Fragment>
        ))}
      </svg>
      <footer className="footer">
        <p>Created by Neeraj</p>
        <div className="social-icons">
          <a
            href="https://www.linkedin.com/in/neerajswarnkar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="icon" />
          </a>
          <a
            href="https://github.com/Neeraj-swarnkar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="icon" />
          </a>
          <a
            href="https://stackoverflow.com/users/1258518/frontend-expert"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaStackOverflow className="icon" />
          </a>
        </div>
      </footer>
    </>
  );
};

export default DrawingBoard;
