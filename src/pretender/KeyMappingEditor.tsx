import React, { useState } from "react";
import { KeyMappingType } from "./types";

type toggleEditModeType = (keyMapping: KeyMappingType) => void;
type KeyMappingEditorProps = {
  toggleEditMode: toggleEditModeType;
  keyMapping: KeyMappingType;
  isEditing: boolean;
};

const KeyMappingEditor = (props: KeyMappingEditorProps) => {
  const { toggleEditMode, isEditing, keyMapping } = props;
  const { name, mappedKey } = keyMapping;
  const normalizeKeyName = (key: string) => {
    if (key == " ") {
      return "space";
    }
    return key;
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
  };
  return (
    <div style={rowStyle}>
      <span>{name}</span>
      {!isEditing && (
        <>
          <span>{normalizeKeyName(mappedKey)}</span>
          <button
            onClick={() => {
              toggleEditMode(keyMapping);
            }}
          >
            edit
          </button>
        </>
      )}
      {isEditing && <span>OK, press the key for {name}</span>}
    </div>
  );
};

export default KeyMappingEditor;
