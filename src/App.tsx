// @ts-ignore
import DrawingBoard from "./DrawingBoard";
import "./DrawingBoard.css";
import { StrictMode } from "react";

export default function App() {
  return (
    <div className="App">
      <StrictMode>
        <DrawingBoard />
      </StrictMode>
    </div>
  );
}