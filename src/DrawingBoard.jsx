import React, { useEffect, useRef, useState, useCallback } from "react";
import generateId from "./utils/generateId";
import Footer from "./components/Footer";
import Header from "./components/Header";
import DrawingSvg from "./components/DrawingSvg";
import "./DrawingBoard.css";
import Shapes from "./utils/shapes";
import DrawingControls from "./components/DrawingControls";

const DrawingBoard = () => {
  const svgRef = useRef();
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentShape, setCurrentShape] = useState(Shapes.BRUSH);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [lines, setLines] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const handleStartDrawing = (x, y) => {
    const id = generateId(6);
    const svgRect = svgRef.current.getBoundingClientRect();
    const startingPoint = {
      x: x - svgRect.x,
      y: y - svgRect.y,
    };
    setIsDrawing(true);
    setUndoStack([...undoStack, lines]);
    // Set the drawing state when starting to draw
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

  const handleMouseDown = useCallback((e) => {
    handleStartDrawing(e.clientX, e.clientY);
  }, [handleStartDrawing]);

  const handleMouseMove = useCallback((e) => {
    handleMoving(e.clientX, e.clientY);
  }, [handleMoving]);

  const handleStopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const handleShapeChange = useCallback((e) => {
    setCurrentShape(e);
  }, []);

  const handleColorChange = useCallback((e) => {
    setCurrentColor(e);
  }, []);

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
      <Header />
      <DrawingControls
        currentShape={currentShape}
        setCurrentShape={handleShapeChange}
        currentColor={currentColor}
        setCurrentColor={handleColorChange}
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        undoStack={undoStack}
        redoStack={redoStack}
        handleExport={handleExport}
      />
      <DrawingSvg
        lines={lines}
        svgRef={svgRef}
        handleMouseDown={handleMouseDown}
        handleMouseMove={handleMouseMove}
        handleStopDrawing={handleStopDrawing}
      />
      <Footer />
    </>
  );
};

export default DrawingBoard;
