import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

import { PointType } from "./types";

const Mountains = () => {
  //initial state: we are in the middle of the world: x = 0;
  // we want to show a portion of the mountains that's equal to the screen width
  const mountains = useSelector((state: RootState) => {
    return state.mountains;
  });
  const { allPointsCorrected } = mountains;

  const generateAdjustedLines = (points: PointType[]) => {
    const adjustedLines = [];
    for (var i = 0; i < points.length - 1; i++) {
      adjustedLines.push({
        x1: points[i].x,
        y1: points[i].y,
        x2: points[i + 1].x,
        y2: points[i + 1].y,
      });
    }
    return adjustedLines;
  };

  const mountainLines = generateAdjustedLines(allPointsCorrected);

  //This file will have a collection of line data from the context and for now the generation of mountain lines will stay here;
  const myLines = mountainLines.map((segment, idx) => {
    return (
      <line
        key={"kui" + idx}
        x1={segment.x1}
        y1={segment.y1}
        x2={segment.x2}
        y2={segment.y2}
        width="2"
        stroke="#fc6b03"
      />
    );
  });

  //I need to give the ridgelines their new dimensions.  For now I'll just offset all the points and hope that React is smart enough
  //to only draw the ones that appear on screen

  return <>{myLines}</>;
};

export default Mountains;
