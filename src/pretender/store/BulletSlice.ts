import { createSlice } from "@reduxjs/toolkit";
import { BulletPropsType, DirectionType } from "../types";

const defaultBulletPositions = [
  {
    direction: "right",
    location: { x: 0, y: 0 },
    isVisible: false,
    tStart: 0,
    lastTimeStamp: 0,
  },
  {
    direction: "right",
    location: { x: 0, y: 0 },
    isVisible: false,
    tStart: 0,
    lastTimeStamp: 0,
  },
  {
    direction: "right",
    location: { x: 0, y: 0 },
    isVisible: false,
    tStart: 0,
    lastTimeStamp: 0,
  },
];

export interface startBulletActionType {
  index: number;
  shipX: number;
  tStart?: number;
  direction: DirectionType;
  lastTimeStamp?: number;
}

export interface MoveBulletActionType {
  screenWidth: number;
  pixelsToMove: number;
}

const bulletSlice = createSlice({
  name: "bulletSlice",
  initialState: defaultBulletPositions,
  reducers: {
    moveBulletRight: (state, action) => {
      const { index, pixelsToMove, screenWidth } = action.payload;
      let bullet = state[index];
      if (bullet.location.x > screenWidth - 100) {
        bullet.isVisible = false;
        bullet.location.x = 0;
      } else {
        bullet.isVisible = true;
        if (pixelsToMove) {
          bullet.location.x += pixelsToMove;
        }
      }
    },

    moveBulletLeft: (state, action) => {
      const { index, pixelsToMove } = action.payload;
      let bullet = state[index];
      if (bullet.location.x < 100) {
        bullet.isVisible = false;
        bullet.location.x = 0;
      } else {
        bullet.isVisible = true;
        if (pixelsToMove) {
          bullet.location.x -= pixelsToMove;
        }
      }
    },

    startBullet: (
      state,
      action: { type: string; payload: startBulletActionType }
    ) => {
      const { direction, index, lastTimeStamp, shipX, tStart } = action.payload;
      let bullet = state[index];
      bullet.isVisible = true;
      bullet.location.x = shipX;
      bullet.tStart = tStart || 0;
      bullet.lastTimeStamp = lastTimeStamp || 0;
      bullet.direction = direction;
    },
  },
});

export const { moveBulletLeft, moveBulletRight, startBullet } =
  bulletSlice.actions;

export default bulletSlice.reducer;
