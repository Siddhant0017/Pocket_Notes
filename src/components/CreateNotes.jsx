import React, { useState, useRef, useEffect } from "react";
import "../styles/CreateNotes.css";

// This is the Unique color array name
const paletteChoices = [
  { color: "var(--notes-color-1)", name: "Color 1" },
  { color: "var(--notes-color-2)", name: "Color 2" },
  { color: "var(--notes-color-3)", name: "Color 3" },
  { color: "var(--notes-color-4)", name: "Color 4" },
  { color: "var(--notes-color-5)", name: "Color 5" },
  { color: "var(--notes-color-6)", name: "Color 6" },
];

// In the CreateNotes component, update the props destructuring:
const CreateNotes = ({
  noteBtnClick,
  noteGroups,
  setNoteBtnClick,
  setNoteGroups,
}) => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [nameError, setNameError] = useState(false);
  const [colorError, setColorError] = useState(false);
  const popupRef = useRef(null);

  // Handle click outside of the popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setNoteBtnClick(false);
      }
    };

    // Add event listener when popup is open
    if (noteBtnClick) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [noteBtnClick, setNoteBtnClick]);

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
    setNameError(false);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    setColorError(false);
  };

  const handleCreateGroup = () => {
    if (groupName.trim() === "") {
      setNameError(true);
      return;
    }
    if (selectedColor === "") {
      setColorError(true);
      return;
    }
    const newGroup = {
      id: Math.floor(Math.random() * 1000),
      name: groupName,
      color: selectedColor,
      notes: [],
    };
    // Update this line to directly set the noteGroups
    const updatedGroups = [...noteGroups, newGroup];
    localStorage.setItem("noteGroups", JSON.stringify(updatedGroups));
    setGroupName("");
    setSelectedColor("");
    setNoteBtnClick(false);
    setNoteGroups(updatedGroups);
  };

  const displayContainer = noteBtnClick ? "flex" : "none";

  return (
    <div className="container-body" style={{ display: displayContainer }}>
      <div className="note-create-box flex" ref={popupRef}>
        <p className="note-create-title">Create New Notes group</p>
        <div className="note-input-row flex flex-row justify-start">
          <label htmlFor="name" className="label">
            Group Name
          </label>
          <input
            type="text"
            name="name"
            className="note-create-input"
            placeholder="Enter your group name...."
            value={groupName}
            onChange={handleGroupNameChange}
          />
        </div>
        <div className="note-input-row flex flex-row justify-start">
          <label htmlFor="color" className="label">
            Choose colour
          </label>
          <div className="palette-row flex flex-row">
            {paletteChoices.map(({ color, name }) => (
              <div
                key={color}
                className={`circle palette-color ${selectedColor === color ? "selected" : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorClick(color)}
              ></div>
            ))}
          </div>
        </div>
        {nameError && (
          <p className="show-error">*Please Enter your group name</p>
        )}
        {colorError && <p className="show-error">*Please Choose Color</p>}
        <button className="note-create-btn" onClick={handleCreateGroup}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateNotes;
