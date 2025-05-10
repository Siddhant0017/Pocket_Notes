import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import CreateNotes from "./components/CreateNotes";
import Notes from "./components/Notes";
import "./styles/App.css";

function App() {
  const [noteBtnClick, setNoteBtnClick] = useState(false);
  const [noteGroups, setNoteGroups] = useState(
    localStorage.getItem("noteGroups")
      ? JSON.parse(localStorage.getItem("noteGroups"))
      : []
  );
  // Removed the unused newNoteGroup state
  const [selectedNote, setSelectedNote] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <React.Fragment>
      <div className="App flex flex-row">
        <Sidebar
          display={display}
          setDisplay={setDisplay}
          setNoteBtnClick={setNoteBtnClick}
          noteGroups={noteGroups}
          setSelectedNote={setSelectedNote}
          selectedNote={selectedNote}
          isMobile={isMobile}/>

        <Notes
          display={display}
          setDisplay={setDisplay}
          selectedNote={selectedNote}
          isMobile={isMobile}
          noteBtnClick={noteBtnClick} />
      </div>

      <CreateNotes
        noteBtnClick={noteBtnClick}
        setNoteBtnClick={setNoteBtnClick}
        noteGroups={noteGroups}
        setNoteGroups={setNoteGroups}/>
    </React.Fragment>
  );
}

export default App;
