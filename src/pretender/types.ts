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
  gameOffset: number;
  allPointsCorrected: PointType[];
  screenDimensions: screenDimensionsType;
};

export type ShipDataType = {
  direction: DirectionType;
  offsetX: number;
  offsetY: number;
  screenDimensions: { height: number; width: number };
};

export type UP_DOWN_NEITHER_type = "UP" | "DOWN" | "NEITHER";

export type UseMultipleKeysPropsType = {
  goHandler: () => {};
  resetAnimationHandler: () => {};
  stopHandler: () => {};
  changeShipYHandler: (upDownNeither: UP_DOWN_NEITHER_type) => {};
  changeShipDirectionHandler: () => {};
  fireShotHandler: () => {};
};

export type KeyMappingType = {
  mappedKey: string;
  name: string;
};

export type DirectionType = "left" | "right";
