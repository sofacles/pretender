import React, { useContext, useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './cssAnimation.css'

import KeyMappingEditor from "./KeyMappingEditor";
import { updateKeyMapping } from "./store/KeyMappingSlice";
import { RootState } from "./store/store";
import { KeyMappingType } from "./types";

const KeyMappingsPane = () => {
  const keyMappings = useSelector((state: RootState) => state.keyMappings);
  const reduxDispatch = useDispatch();
  const { changeShipDirection, shipUp, shipDown, shoot, thrust } = keyMappings;
  const [isEditing, setIsEditing] = useState(false);
  const [keyBeingEdited, setKeyBeingEdited] = useState<string | undefined>(
    undefined
  );
  const [keyThatIsGlowingAfterUpdate, setKeyThatIsGlowingAfterUpdate] = useState<string | undefined>(
    undefined
  );

  const refToPaneDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refToPaneDiv.current) {
      refToPaneDiv.current.focus();
    }
  }, []);

  const toggleEditModeFor = (keyMapping: KeyMappingType) => {
    setKeyBeingEdited(keyMapping.name);
    setIsEditing(true);
    refToPaneDiv.current?.focus();
  };
  return (
    <div
      ref={refToPaneDiv}
      style={{
        backgroundColor: "#000",
        color: "red",
        display: "flex",
        height: "800px",
        width: "100%",
      }}
    >
      <div className="purina">
      <div className="row">
          <div className="cell">
            <div className="throbber">child of Key Mapping Pane</div>
          </div>
          <div className="cell">
            <div className="throbber">child of Key Mapping Pane</div>
          </div>
        </div>
        <div className="row">
          <div className="cell">
            <div className="throbber">child of Key Mapping Pane</div>
          </div>
          <div className="cell">
            <div className="throbber">child of Key Mapping Pane</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyMappingsPane;
