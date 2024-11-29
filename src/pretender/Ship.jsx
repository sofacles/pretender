import React, { useEffect, useState } from "react";

const Ship = ({ isThrusting, x, y, reversed }) => {
  const [colorIndex, setColorIndex] = useState(0);
  const [randomX_top, setRandomX_top] = useState(0);
  const [randomY_top, setRandomY_top] = useState(0);
  const colors = ["#c3eb34", "#eb8934", "#bf7b3f", "#f5f4ed", "#ff0101"];

  useEffect(() => {
    //the exhaust rectangles are 100 wide by 5 tall, so place the blinky thing somewhere in there
 
    const killInterval = setInterval(() => {
      setColorIndex(Math.floor(Math.random() * 5));
      setRandomX_top(Math.floor(200 + Math.random() * 100));
      setRandomY_top(100 + Math.floor(Math.random() * 5));
    }, 100)
  }, []);
  return (
    <g transform={`translate(${x},${y}) ${reversed ? "scale(-1, 1)" : ""}`}>
      {isThrusting &&
        <g>
          <path d="M200,100l100,0 0,5 -100,0 z" fill="orange" />
          <path d="M200,110l100,0 0,5 -100,0 z" fill="orange" />
          <g>
            <path d={`M${randomX_top},${randomY_top}l8,0 0,2, -8,0 z`} fill={`${colors[colorIndex]}`} />
          </g>
        </g>
      }
      <path d="M156,108l3,-3 9,-1 1,-4 3,-4 -5,-7 -5,-7 0,1 -6,-1 -1,-4 -5,-8 -16,1 -3,7 -8,1 -2,6 -12,14 -39,-1 -1,11 -43,1 -9,3 1,9 9,4 17,0 1,0 8,1 13,0 22,-2 7,10 16,5 16,-6 14,-1 z" fill="#acafa5" />
      <path d="M120,114l20,2 10,-11 7,-2 9,5 18,3 -8,9 -13,2 -11,11 -16,1 0,-10 z" fill="#995997" />
    </g>
  );
};

export default Ship;