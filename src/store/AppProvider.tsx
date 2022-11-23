import React, { createContext, useState } from "react";

interface AppProviderType {
  children: React.ReactNode;
}

export interface NoteType {
  id: string;
  text: string;
  complited: boolean;
}

export enum Fillter {
  ALL = "all",
  ACTIVE = "active",
  COMPLITED = "complited",
}

interface AppStateType {
  allNotes: NoteType[];
  setAllNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
  handleMark: (id: string) => void;
  handleAddNote: (text: string) => void;
  fillterKey: string;
  setFillterKey: React.Dispatch<React.SetStateAction<Fillter>>;
  handleDeleteNote: (id: string) => void;
  handleClearComplited: () => void;
  notesCount: number;
}

export const AppContext = createContext<AppStateType>({
  allNotes: [],
  setAllNotes: () => {},
  handleMark: (id) => {},
  handleAddNote: (text) => {},
  fillterKey: "",
  setFillterKey: (key) => {},
  handleDeleteNote: (id) => {},
  handleClearComplited: () => {},
  notesCount: NaN,
});

const AppProvider: React.FC<AppProviderType> = ({ children }) => {
  const [allNotes, setAllNotes] = useState<NoteType[]>(getNotes());
  const [fillterKey, setFillterKey] = useState<Fillter>(Fillter.ALL);

  function handleMark(id: string) {
    setAllNotes((prev) =>
      prev.map((note) => {
        if (note.id === id) {
          note.complited = note.complited ? false : true;
          return note;
        } else return note;
      })
    );
  }

  function handleAddNote(text: string) {
    const newNote: NoteType = {
      text: text,
      complited: false,
      id: generateID(),
    };

    setAllNotes((prev) => [newNote, ...prev]);
  }

  function handleDeleteNote(id: string) {
    setAllNotes((prev) => prev.filter((note) => note.id !== id));
  }

  function handleClearComplited() {
    setAllNotes((prev) => prev.filter((note) => note.complited !== true));
  }

  return (
    <AppContext.Provider
      value={{
        allNotes,
        setAllNotes,
        handleMark,
        handleAddNote,
        fillterKey,
        setFillterKey,
        handleClearComplited,
        handleDeleteNote,
        notesCount: allNotes.length,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

function getNotes() {
  return [
    {
      id: generateID(),
      text: "task 1",
      complited: false,
    },
    {
      id: generateID(),
      text: "task 2",
      complited: false,
    },
    {
      id: generateID(),
      text: "task 3",
      complited: false,
    },
    {
      id: generateID(),
      text: "task 4",
      complited: true,
    },
    {
      id: generateID(),
      text: "task 5",
      complited: false,
    },
  ];
}

function generateID() {
  return Math.random().toString(36).substring(2, 12);
}
