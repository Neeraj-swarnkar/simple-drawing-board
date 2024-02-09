import React from "react";
import { GiPencilBrush } from "react-icons/gi";

const Header = () => {
    return (
        <header>
            <h1 style={{ color: "#fff" }}>
                <GiPencilBrush className="icon" /> Simple Drawing Board
            </h1>
        </header>
    );
};

export default Header;