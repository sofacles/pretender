import React, { useContext } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "./store/store";
import { OffsetMountainDataType } from "./types";

const InstrumentPanel = ({ gameOffset }: OffsetMountainDataType) => {
  //subBoxes are the three boxes of the control panel: lives, pilots map, and controlPanel
  const shipState = useSelector((store: RootState) => store.ship);
  const mountainStore = useSelector((store: RootState) => store.mountains);
  const subBoxStyle = {
    flex: "1 1 auto",
    justifyContent: "stretch",
  };
  const borderWidth = "6px";
  return (
    <div
      style={{
        color: "red",
        display: "flex",
        width: "100%",
        height: "40px",
        borderBottom: `${borderWidth} solid red`,
        background: "#000000",
      }}
      id="instrument-panel"
    >
      <div
        style={{ ...subBoxStyle, borderRight: `${borderWidth} solid red` }}
      ></div>
      <div
        style={{ ...subBoxStyle, borderRight: `${borderWidth} solid red` }}
      ></div>
      <div style={subBoxStyle}>gameOffset: {gameOffset}</div>
      <div style={subBoxStyle}>ship offsetX: {shipState.offsetX}</div>
      <div style={subBoxStyle}>
        state.screenDimensions.height: {mountainStore.screenDimensions.height}
      </div>
      <div style={subBoxStyle}>
        <Link to="/keys">
          <span style={{ color: "red" }}>keys</span>
        </Link>
      </div>
    </div>
  );
};

export default InstrumentPanel;
