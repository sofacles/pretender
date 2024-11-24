import React from "react";

const Ship = ({ x, y, reversed }) => {
  return (
    <g transform={`translate(${x},${y}) scale(0.25) ${reversed ? "scale(-1, 1)" : ""}`}>
      <path d="M180,90l6,2 4,4 -1,9 0,4 0,8 0,3 -7,4 -2,9 18,1 6,-6 2,-14 1,-16 -4,-18 -15,-1 z" fill="#acafa5" />
      <path d="M156,108l3,-3 9,-1 1,-4 3,-4 -5,-7 -5,-7 0,1 -6,-1 -1,-4 -5,-8 -16,1 -3,7 -8,1 -2,6 -12,14 -39,-1 -1,11 -43,1 -9,3 1,9 9,4 17,0 1,0 8,1 13,0 22,-2 7,10 16,5 16,-6 14,-1 z" fill="#acafa5" />
      <path d="M120,114l20,2 10,-11 7,-2 9,5 18,3 -8,9 -13,2 -11,11 -16,1 0,-10 z" fill="#995997" />    
    </g>
  );
};

export default Ship;