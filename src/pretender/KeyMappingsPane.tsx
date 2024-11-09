import React, { useContext, useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
        height: "800px",
        width: "100%",
      }}
      onKeyDown={(evt) => {
        if (isEditing) {
          reduxDispatch(
            updateKeyMapping({ key: keyBeingEdited, value: evt.key })
          );
          setKeyBeingEdited(undefined);
        }
      }}
      tabIndex={0}
    >
      <h1>Mappings</h1>
      <KeyMappingEditor
        keyMapping={thrust}
        isEditing={thrust.name === keyBeingEdited}
        toggleEditMode={toggleEditModeFor}
      />
      <KeyMappingEditor
        keyMapping={shipUp}
        isEditing={shipUp.name === keyBeingEdited}
        toggleEditMode={toggleEditModeFor}
      />

      <KeyMappingEditor
        keyMapping={shipDown}
        isEditing={shipDown.name === keyBeingEdited}
        toggleEditMode={toggleEditModeFor}
      />
      <KeyMappingEditor
        keyMapping={changeShipDirection}
        isEditing={changeShipDirection.name === keyBeingEdited}
        toggleEditMode={toggleEditModeFor}
      />
      <KeyMappingEditor
        keyMapping={shoot}
        isEditing={shoot.name === keyBeingEdited}
        toggleEditMode={toggleEditModeFor}
      />
      <footer>
        <Link to="/" style={{ color: "red" }}>
          Back to game
        </Link>
      </footer>
    </div>
  );
};

export default KeyMappingsPane;
