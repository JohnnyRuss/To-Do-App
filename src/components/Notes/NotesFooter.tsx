import React, { useContext } from "react";
import { AppContext, Fillter } from "../../store/AppProvider";

const NotesFooter: React.FC = () => {
  const { fillterKey, setFillterKey, handleClearComplited, notesCount } =
    useContext(AppContext);

  return (
    <footer className="notes-footer">
      <span>{notesCount} items left</span>
      <nav className="notes-footer__nav">
        {["all", "active", "complited"].map((item) => (
          <span
            onClick={() =>
              setFillterKey(() => {
                if (item === "active") return Fillter.ACTIVE;
                else if (item === "complited") return Fillter.COMPLITED;
                else return Fillter.ALL;
              })
            }
            className={`notes-footer__nav-item ${
              fillterKey === item ? "notes-footer__nav-item--active" : ""
            }`}
            key={item}
          >
            {item}
          </span>
        ))}
      </nav>
      <button onClick={handleClearComplited} className="clear-complited__btn">
        clear complited
      </button>
    </footer>
  );
};

export default NotesFooter;
