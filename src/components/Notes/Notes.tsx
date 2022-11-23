import React, { useContext } from "react";
import { ThemeContext, Theme } from "../../Theme/Theme";

import "./note.css";
import NotesList from "./NotesList";
import NotesFooter from "./NotesFooter";

const Notes: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <main
      className={`${
        theme === Theme.DARK ? "dark-mode" : "light-mode"
      } notes-container`}
    >
      <NotesList />
      <NotesFooter />
    </main>
  );
};

export default Notes;
