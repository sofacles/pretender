export type ActionType = {
  type: string;
  cargo: any;
};

export type screenDimensionsType = {
  height: number;
  width: number;
};

export type PointType = {
  x: number;
  y: number;
};

//For the Bullet component
export type BulletPropsType = {
  direction: DirectionType;
  isVisible: boolean;
  x: number;
  y: number;
  fill: string;
};

export type OffsetMountainDataType = {
    allPointsCorrected: PointType[];
    gameOffset: number;
shipOffset: number;
  screenDimensions: screenDimensionsType;
};

export type ShipDataType = {
  direction: DirectionType;
  offsetX: number;
  offsetY: number;
  screenDimensions: { height: number; width: number };
  isThrusting: boolean;
};

export type UP_DOWN_NEITHER_type = "UP" | "DOWN" | "NEITHER";

export type UseMultipleKeysPropsType = {
  goHandler: () => void;
  resetAnimationHandler: () => void;
  stopHandler: () => void;
  changeShipYHandler: (upDownNeither: UP_DOWN_NEITHER_type) => void;
  changeShipDirectionHandler: () => void;
  fireShotHandler: () => void;
};

export type KeyMappingType = {
  mappedKey: string;
  name: string;
};

export type DirectionType = "left" | "right";
