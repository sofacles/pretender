import React from "react";
import { SHIP_HEIGHT, SHIP_WIDTH } from "./Constants";

const Ship = ({ x, y }) => {
  return (

	
	 
  <svg x={x} y={y} width="400" height="300" viewBox="0 0 200 150" style={{ backgroundColor: "#e2e8f0", border: "1px solid #8a22b6"  }}>
   
    <rect x="0" y="0" width="200" height="150" fill="orange" stroke="#3b82f6" stroke-width="2" />
    <circle cx="100" cy="75" r="40" fill="#60cc90" />
    <text x="15" y="25" font-family="sans-serif" font-size="12" fill="#1e293b">Nested SVG (x:100, y:80)</text>
  </svg>

  );
};

export default Ship;