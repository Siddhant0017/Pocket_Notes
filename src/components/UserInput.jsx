import React from "react";
import "../styles/UserInput.css"

const Input = ({ id, handleNewNote }) => {
  const [note, setNote] = React.useState("");

  const handleInputChange = (e) => {
    const { value } = e.target;
    setNote(value);
  };

  const handleSendClick = () => {
    // This is for if the text area is empty not to proceed or to submit
    if (!note.trim()) return;

    const newNote = {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      content: note,
      id: Math.floor(Math.random() * 1000),
    };

    handleNewNote(newNote);

    const notesGroup = JSON.parse(localStorage.getItem("noteGroups")) || [];

    const groupIndex = notesGroup.findIndex((group) => group.id === id);
    if (groupIndex === -1) {
      console.error(`Group with ID ${id} not found`);
      return;
    }

    //  new note into the notes array of the group
    const group = notesGroup[groupIndex];

    group.notes.push(newNote);

    // This is to update the notes group
    localStorage.setItem("noteGroups", JSON.stringify(notesGroup));

    //clear the textarea
    setNote("");
  };

  return (
    <div className="input-container">
      <div className="input-div flex flex-row">
        <textarea
          name="note"
          id=""
          cols="30"
          rows="6"
          className="note-input"
          placeholder="Here’s the sample text for sample work"
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && note.trim()) {
              handleSendClick();
            }
          }}
          value={note}
        ></textarea>
        <svg
          className={`send-btn ${note.trim() ? 'send-btn-active' : 'send-btn-disabled'}`}
          width="25"
          height="29"
          viewBox="0 0 35 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={note.trim() ? handleSendClick : undefined}
        >
          <path
            d="M0 29V18.125L14.5 14.5L0 10.875V0L34.4375 14.5L0 29Z"
            fill={note.trim() ? "#15008b" : "#ABABAB"}
          />
        </svg>
      </div>
    </div>
  );
};

export default Input;
