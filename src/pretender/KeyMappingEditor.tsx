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

  return (
    <div className="h-center">
      <div className="key-mapping-row">
        <span>{name}</span>
        {!isEditing && (
          <>
            <input type="text" className="key-mapping-read-only" disabled value={normalizeKeyName(mappedKey)} />
            <button
              onClick={() => {
                toggleEditMode(keyMapping);
              }}
            >
              edit
            </button>
          </>
        )}
        {isEditing && <><input type="text" value={normalizeKeyName(mappedKey)} /><span>OK, press the key for {name}</span></>}
      </div>
    </div>
  );
};

export default KeyMappingEditor;
