import { createSlice } from "@reduxjs/toolkit";
import {
  CHANGE_SHIP_DIRECTION_KEY,
  THRUST_KEY,
  SHIP_DOWN_KEY,
  SHIP_UP_KEY,
  SHOOT_KEY,
} from "../Constants";

const initialState = {
  changeShipDirection: {
    mappedKey: CHANGE_SHIP_DIRECTION_KEY,
    name: "changeShipDirection",
  },
  shipDown: { mappedKey: SHIP_DOWN_KEY, name: "shipDown" },
  shipUp: { mappedKey: SHIP_UP_KEY, name: "shipUp" },
  shoot: { mappedKey: SHOOT_KEY, name: "shoot" },
  thrust: { mappedKey: THRUST_KEY, name: "thrust" },
};

export type KeyMappingsType = typeof initialState;

const keyMappingSlice = createSlice({
  name: "KeyMapping",
  initialState,
  reducers: {
    updateKeyMapping: (state, action) => {
      const { key, value } = action.payload;
      state[key as keyof KeyMappingsType] = {
        mappedKey: value,
        name: key,
      };
    },
  },
});

export const { updateKeyMapping } = keyMappingSlice.actions;

export default keyMappingSlice.reducer;
