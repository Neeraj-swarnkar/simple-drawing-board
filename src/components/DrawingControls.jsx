// DrawingControls.js
import React from "react";
import { FaBrush, FaPalette, FaUndo, FaRedo, FaFileExport } from "react-icons/fa";
import Shapes from "../utils/shapes";

const DrawingControls = ({
    currentShape,
    setCurrentShape,
    currentColor,
    setCurrentColor,
    handleUndo,
    handleRedo,
    undoStack,
    redoStack,
    handleExport,
}) => {
    return (
        <div className="controls">
            <label className="control-label">
                <FaBrush className="icon" />
                <select
                    value={currentShape}
                    onChange={(e) => setCurrentShape(e.target.value)}
                >
                    <option value={Shapes.BRUSH}>Brush</option>
                    <option value={Shapes.LINE}>Line</option>
                    <option value={Shapes.RECTANGLE}>Rectangle</option>
                    <option value={Shapes.CIRCLE}>Circle</option>
                </select>
            </label>
            <label className="control-label">
                <FaPalette className="icon" />
                <input
                    type="color"
                    value={currentColor}
                    onChange={(e) => setCurrentColor(e.target.value)}
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
    );
};

export default DrawingControls;
