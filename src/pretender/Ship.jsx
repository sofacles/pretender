import React, { useEffect, useState } from "react";

const Ship = ({ isThrusting, x, y, reversed }) => {
  const [colorIndex_top1, setcolorIndex_top1] = useState(0);
  const [colorIndex_top2, setcolorIndex_top2] = useState(0);

  const [randomX_top1, setRandomX_top1] = useState(0);
  const [randomY_top1, setrandomY_top1] = useState(0);

  const [randomX_top2, setRandomX_top2] = useState(0);
  const [randomY_top2, setrandomY_top2] = useState(0);


  const colors = ["#c3eb34", "#eb8934", "#bf7b3f", "#f5f4ed", "#ff0101", "orange"];

  useEffect(() => {
    //the exhaust rectangles are 100 wide by 5 tall, so place the blinky thing somewhere in there
 
    const killInterval = setInterval(() => {
      setcolorIndex_top1(Math.floor(Math.random() * 6));
      setRandomX_top1(Math.floor(200 + Math.random() * 99));
      setrandomY_top1(100 + Math.floor(Math.random() * 4));

      setcolorIndex_top2(Math.floor(Math.random() * 6));
      setRandomX_top2(Math.floor(200 + Math.random() * 101));
      setrandomY_top2(100 + Math.floor(Math.random() * 4));
    }, 100);
    return () => {clearInterval(killInterval)}
  }, []);
  return (
    <g transform={`translate(${x},${y}) ${reversed ? "scale(-1, 1)" : ""}`}>
      {isThrusting &&
        <g>
          <path d="M200,100l100,0 0,5 -100,0 z" fill="orange" />
          <path d="M200,110l100,0 0,5 -100,0 z" fill="orange" />
          <g>
            <path d={`M${randomX_top1},${randomY_top1}l8,0 0,2, -8,0 z`} fill={`${colors[colorIndex_top1]}`} />
            <path d={`M${randomX_top2},${randomY_top2}l8,0 0,2, -8,0 z`} fill={`${colors[colorIndex_top2]}`} />
          </g>
        </g>
      }
      <path d="M156,108l3,-3 9,-1 1,-4 3,-4 -5,-7 -5,-7 0,1 -6,-1 -1,-4 -5,-8 -16,1 -3,7 -8,1 -2,6 -12,14 -39,-1 -1,11 -43,1 -9,3 1,9 9,4 17,0 1,0 8,1 13,0 22,-2 7,10 16,5 16,-6 14,-1 z" fill="#acafa5" />
      <path d="M120,114l20,2 10,-11 7,-2 9,5 18,3 -8,9 -13,2 -11,11 -16,1 0,-10 z" fill="#995997" />
    </g>
  );
};

export default Ship;