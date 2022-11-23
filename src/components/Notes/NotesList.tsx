import React, { useContext } from "react";
import { Fillter, AppContext, NoteType } from "../../store/AppProvider";

import CloseBTN from "./CloseBTN";
import DragableContainer from "../Dragable/DragableContainer";
import DragableItem from "../Dragable/DragableItem";

const NotesList: React.FC = () => {
  const { fillterKey, allNotes, handleMark, handleDeleteNote, notesCount } =
    useContext(AppContext);

  return (
    <DragableContainer className={"notes-container__list"}>
      {allNotes
        .filter((item: NoteType) => {
          if (fillterKey === Fillter.ALL) return item;
          else if (fillterKey === Fillter.ACTIVE)
            return item.complited === false;
          else return item.complited === true;
        })
        .map((note: NoteType, i) => (
          <DragableItem key={note.id}>
            <div
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.preventDefault();
                handleMark(note.id);
              }}
              className={`notes-container__item ${
                note.complited ? "notes-container__item-complited" : ""
              }`}
            >
              <input type="checkbox" id={note.id} hidden></input>
              <label
                htmlFor={note.id}
                className="notes-container__item-mark"
              ></label>
              <label htmlFor={note.id} className="notes-container__item-text">
                {note.text}
              </label>
              <CloseBTN handleDeleteNote={() => handleDeleteNote(note.id)} />
            </div>
          </DragableItem>
        ))}

      {notesCount === 0 && <p className="no-notes--msg">there are no notes</p>}
    </DragableContainer>
  );
};

export default NotesList;
