import { createSlice } from "@reduxjs/toolkit";
import peaks from "../MountainData.js";
import { OffsetMountainDataType, PointType } from "../types";
import { PANEL_WIDTH } from "../Constants";
import { RootState } from "./store";

const slopWidth = 100;

// mountain data is in cartesian coordinates, so convert to screen Y by subtacting the data's y value + instrument panel height from screenHeight
const adjustMountainPointsForScreenHeight = (
  points: PointType[],
  screenHeight: number,
  offset = 0
): PointType[] => {
  //returns the original y values of the peaks, but corrected for the current offset
  const createShiftedArrayOfYValues = (panelOffset: number): number[] => {
    const retVal = peaks
      .map((p) => p.y)
      .slice(offset)
      .concat(peaks.slice(0, panelOffset).map((p) => p.y));
    return retVal;
  };

  const offsetInPanels = offset / PANEL_WIDTH;
  const offsetPeak_y_values =
    Math.abs(offset) < PANEL_WIDTH
      ? createShiftedArrayOfYValues(offsetInPanels)
      : peaks.map((a) => a.y);

  //a positive offset is when the ship has gone right, the mountains move left.
  const adjustedPoints: PointType[] = [];
  for (let i = 0; i < points.length; i++) {
    adjustedPoints.push({
      x: points[i].x,
      y: screenHeight - offsetPeak_y_values[i],
    });
  }
  return adjustedPoints;
};

const adjustCurrentPointsForOffset = (
  currentPoints: PointType[],
  offset: number,
  gameWidth: number
) => {
  const adjustedPoints: PointType[] = [];

  //move all the points to the right or left
  for (var i = 0; i < currentPoints.length; i++) {
    adjustedPoints.push({
      x: currentPoints[i].x - offset,
      y: currentPoints[i].y,
    });
  }
  //now move points that have fallen too far off the screen
  if (offset > 0) {
    //the left-most point may need to be removed and tacked onto the right side of the peaks
    const cutoffPoint = -(gameWidth / 2 + slopWidth);
    if (adjustedPoints[0].x < cutoffPoint) {
      const leftmost = adjustedPoints.shift();
      if (leftmost) {
        //give it a new x value, 100 greater than the rightmost point
        leftmost.x = adjustedPoints[adjustedPoints.length - 1].x + PANEL_WIDTH;
        adjustedPoints.push(leftmost);
      }
    }
  } else if (offset < 0) {
    //the right-most point may need to be removed and tacked onto the left side of the peaks, but the cutoff point to the right needs to be farther out, since we're effectively
    // measuring from the left edge of the screen.
    const cutoffPoint = gameWidth + slopWidth;
    if (adjustedPoints[adjustedPoints.length - 1].x > cutoffPoint) {
      const rightmost = adjustedPoints.pop();
      if (rightmost) {
        rightmost.x = adjustedPoints[0].x - PANEL_WIDTH;
        adjustedPoints.unshift(rightmost);
      }
    }
  }
  return adjustedPoints;
};

const initialState = {
  gameOffset: 0,
  allPointsCorrected: adjustMountainPointsForScreenHeight(peaks, 800),
  screenDimensions: { height: 800, width: 1000 },
};

export type mountainsStateType = {
  gameOffset: number;
  allPointsCorrected: PointType[];
  screenDimensions: { height: number; width: number };
};

const mountainsSlice = createSlice({
  name: "mountains",
  initialState,
  reducers: {
    updateGameOffset: (state: typeof initialState, action) => {
      state.gameOffset += action.payload.offsetDifference;
      state.allPointsCorrected = adjustCurrentPointsForOffset(
        state.allPointsCorrected,
        action.payload.offsetDifference,
        state.screenDimensions.width
      );
    },
    updateGameDimensions: (
      state: mountainsStateType,
      action: { payload: { height: number; width: number } }
    ) => {
      state.screenDimensions = action.payload;
      state.allPointsCorrected = adjustCurrentPointsForOffset(
        adjustMountainPointsForScreenHeight(
          state.allPointsCorrected,
          action.payload.height,
          state.gameOffset
        ),
        state.gameOffset,
        state.screenDimensions.width
      );
    },
  },
});

export const { updateGameDimensions, updateGameOffset } =
  mountainsSlice.actions;

export default mountainsSlice.reducer;
