import { createSlice } from "@reduxjs/toolkit";
import { LEFT, RIGHT } from "../Constants";

const HALF_SHIP_HEIGHT = 25;
// The SVG box that holds the ship has some space at the top, so if you only allow the ship to move up to zero pixels when it gets near the top of the screen
// then it stops before the ship actually touches the top
const MINIMUM_SHIP_X = -4;

export const shipSlice = createSlice({
  name: "ship",
  initialState: {
    direction: RIGHT,
    offsetX: 300,
    offsetY: 300,
    screenDimensions: {
      height: 800,
      width: 1600,
    },
  },
  reducers: {
    changeDirection: (state) => {
      let newDirection = state.direction === RIGHT ? LEFT : RIGHT;
      state.direction = newDirection;
      state.offsetX = state.screenDimensions.width / 2;
    },
    updateShipY: (state, action) => {
      let theNewOffset = state.offsetY + action.payload.changeInY;
      //  if the ship is at the top of the screen
      if (theNewOffset < MINIMUM_SHIP_X) {
        theNewOffset = MINIMUM_SHIP_X;
      }
      //  or at the bottom
      else if (theNewOffset > state.screenDimensions.height - HALF_SHIP_HEIGHT) {
        theNewOffset = state.screenDimensions.height - HALF_SHIP_HEIGHT;
      }

      state.offsetY = theNewOffset;
    },
    updateScreenDimensions: (state, action) => {
      state.screenDimensions = action.payload;
    },
  },
});

export const { changeDirection, updateShipY, updateScreenDimensions } =
  shipSlice.actions;
export default shipSlice.reducer;
