import { createSlice } from "@reduxjs/toolkit";
import { LEFT, RIGHT } from "../Constants";

const halfShipHeight = 25;

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
      state.offsetX =
        newDirection === LEFT ? state.screenDimensions.width / 2 : 300;
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

export const { changeDirection, updateShipY, updateScreenDimensions } =
  shipSlice.actions;
export default shipSlice.reducer;
