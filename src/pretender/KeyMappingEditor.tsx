import React, { useState } from "react";
import { KeyMappingType } from "./types";

type toggleEditModeType = (keyMapping: KeyMappingType) => void;
type KeyMappingEditorProps = {
  toggleEditMode: toggleEditModeType;
  keyMapping: KeyMappingType;
  isEditing: boolean;
  isGlowing: boolean;
};

const KeyMappingEditor = (props: KeyMappingEditorProps) => {
  const { toggleEditMode, isEditing, isGlowing, keyMapping } = props;
  const { name, mappedKey } = keyMapping;
  const normalizeKeyName = (key: string) => {

    switch (key) {
      case " ":
        return "space";

    }

    return key;
  };

  return (
    <div className="h-center">
      <div className={isEditing ? "key-mapping-row-editing" : "key-mapping-row"}>

        {!isEditing && (
          <>
            <span>{name}</span><input type="text" className="key-mapping-read-only" disabled value={normalizeKeyName(mappedKey)} />
            <button
              onClick={() => {
                toggleEditMode(keyMapping);
              }}
            >
              edit
            </button>
          </>
        )}
        {isEditing && !isGlowing && <>
          <div className="throbbing-child"></div>
          <div className="key-selection-prompt">Press the new key for {name}</div>
          </>
        }
        {isGlowing && <div >{normalizeKeyName(mappedKey)} check!</div>}
      </div>
    </div>
  );
};

export default KeyMappingEditor;
