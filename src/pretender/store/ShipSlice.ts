import { createSlice } from "@reduxjs/toolkit";
import { LEFT, RIGHT } from "../Constants";

const halfShipHeight = 25;

export const shipSlice = createSlice({
  name: "ship",
  initialState: {
    direction: RIGHT,
    isThrusting: false,
    isShooting: false,
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
      state.offsetX = newDirection === LEFT ? state.offsetX + 50 : state.offsetX - 50;
    },
      updateIsThrusting: (state, action) => {
        state.isThrusting = action.payload;
      },
    updateIsShooting: (state, action) => {
      state.isShooting = action.payload;
    },
    updateShipY: (state, action) => {
      let theNewOffset = state.offsetY + action.payload.changeInY;
      //  if the ship is at the top of the screen
      if (theNewOffset < halfShipHeight) {
        theNewOffset = halfShipHeight;
      }
      //  or at the bottom
      else if (theNewOffset > state.screenDimensions.height - halfShipHeight) {
        theNewOffset = state.screenDimensions.height - halfShipHeight;
      }

      state.offsetY = theNewOffset;
    },
    updateScreenDimensions: (state, action) => {
      state.screenDimensions = action.payload;
    },
  },
});

export const { changeDirection,
  updateShipY,
  updateScreenDimensions,
  updateIsShooting,
  updateIsThrusting } =
  shipSlice.actions;
export default shipSlice.reducer;
