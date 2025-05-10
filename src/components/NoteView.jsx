import React from "react";
import "../styles/NoteView.css";
import NoteHeaders from "./NoteHeaders";
import UserInput from "./UserInput";

const NoteView = ({ name, color, id, isMobile, display, setDisplay }) => {
  const [notes, setNotes] = React.useState([]);
  const [groupId, setGroupId] = React.useState("");
  const [newNote, setNewNote] = React.useState({});

  React.useEffect(() => {
    const noteGroups = JSON.parse(localStorage.getItem("noteGroups"));
    const groupIndex = noteGroups.findIndex((group) => group.id === id);
    if (groupIndex === -1) {
      console.error(`Group with ID ${id} not found`);//Just for error handling
      return;
    }
    const group = noteGroups[groupIndex];
    setGroupId(group.id);
    setNotes([...group.notes], newNote);
    console.log(group.notes);
  }, [id, newNote, setNewNote]);

  const handleNewNote = (value) => {
    console.log("new note");
    setNewNote(value);
    setNotes([...notes], newNote);
  };

  // The format date required to "9 Mar 2023" format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // The format time required to "10:10 AM" format
  const formatTime = (timeString) => {
    const time = new Date(`1/1/2000 ${timeString}`);
    return time.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <div
      className="note-view-container flex justify-start"
      style={{ display: isMobile && !display ? "none" : "" }}
    >
      <NoteHeaders
        name={name}
        color={color}
        isMobile={isMobile}
        display={display}
        setDisplay={setDisplay}
      />
      
      <div className="notes-list">
        {groupId === id &&
          notes &&
          notes.map((note, index) => {
            return (
              <div className="note" key={index}>
                <p className="note-content">{note.content}</p>
                <div className="time-container">
                  <span className="date">
                    {note && formatDate(note.date)}
                  </span>
                  <span className="time-separator"></span>
                  <span className="time">
                    {note && formatTime(note.time)}
                  </span>
                </div>
              </div>
            );
          })}
        {notes && notes.length <= 0 ? <p className="example-txt">Start Writing Notes Here!</p> : ""}
      </div>

      <UserInput id={id} handleNewNote={handleNewNote} />
    </div>
  );
};

export default NoteView;
