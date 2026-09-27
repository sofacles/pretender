import { KeyboardEvent, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { UP_DOWN_NEITHER } from "../Constants";
import { RootState } from "../store/store";
import { UseMultipleKeysPropsType } from "../types";
import { updateIsThrusting, updateIsShooting } from "../store/ShipSlice";
import useAudioPlayer from "../useAudioPlayer";

//I want to be able to test the ship moving up and down, but I'm having trouble getting the onKeyDown handler to be called
// in a unit test, which is because React or maybe react-testing-library doesn't really handle svg elements.

//So if this thing just handles the logic of determining which functions to call based on what keys are being pressed
/*
goHandler is whatever function this hook should call to that makes the ship go
stopHandler       "        "        "        "                           stop
changeShipYHander whatever function should be called to tell the ship what direction it shoould be moving
*/
export const useMultipleKeys = ({
  goHandler,
  resetAnimationHandler,
  fireShotHandler,
  stopHandler,
  changeShipYHandler,
  changeShipDirectionHandler,
}: UseMultipleKeysPropsType) => {
  const [currentlyPressedKeys] = useState(new Map());
  const keyMappings = useSelector((state: RootState) => state.keyMappings);
  useAudioPlayer();

  const reduxDispatch = useDispatch();
  const { changeShipDirection, shipUp, shipDown, shoot, thrust } = keyMappings;

  const onKeyDown = (evt: KeyboardEvent) => {
    const plainKey = evt.key.toLowerCase();
    currentlyPressedKeys.set(plainKey, true);
    if (
      currentlyPressedKeys.has(thrust.mappedKey) &&
      currentlyPressedKeys.get(thrust.mappedKey)
    ) {
      goHandler();
      reduxDispatch(updateIsThrusting(true));
    }
    if (
      currentlyPressedKeys.has(changeShipDirection.mappedKey) &&
      currentlyPressedKeys.get(changeShipDirection.mappedKey)
    ) {
      changeShipDirectionHandler();
    }
    if (
      currentlyPressedKeys.has(shipUp.mappedKey) &&
      currentlyPressedKeys.get(shipUp.mappedKey)
    ) {
      evt.preventDefault();
      changeShipYHandler(UP_DOWN_NEITHER.UP);
    }

    if (
      currentlyPressedKeys.has(shipDown.mappedKey) &&
      currentlyPressedKeys.get(shipDown.mappedKey)
    ) {
      evt.preventDefault();
      changeShipYHandler(UP_DOWN_NEITHER.DOWN);
    }

    if (
      currentlyPressedKeys.has(shoot.mappedKey) &&
      currentlyPressedKeys.get(shoot.mappedKey)
    ) {
      fireShotHandler();
      reduxDispatch(updateIsShooting(true));
    }
  };

  const onKeyUp = (evt: KeyboardEvent) => {
    const plainKey = evt.key.toLowerCase();
    currentlyPressedKeys.set(plainKey, false);
    if (plainKey === thrust.mappedKey) {
      stopHandler();
      reduxDispatch(updateIsThrusting(false));
    }

    if (plainKey === shipUp.mappedKey || plainKey === shipDown.mappedKey) {
      resetAnimationHandler();
      changeShipYHandler(UP_DOWN_NEITHER.NEITHER);
    }

    if (plainKey === shoot.mappedKey) {
      setTimeout(() => {
        reduxDispatch(updateIsShooting(false));
      }, 10);
    }

    evt.preventDefault();
  };

  return { onKeyDown, onKeyUp };

};
