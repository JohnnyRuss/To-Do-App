import React, { useContext, useState } from "react";
import { ThemeContext } from "../../Theme/Theme";
import { AppContext } from "../../store/AppProvider";
import { Theme } from "../../Theme/Theme";

import "./header.css";
import ThemeBTN from "./ThemeBTN";
import TextArea from "./TextArea";

const Header: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { handleAddNote } = useContext(AppContext);

  const [text, setText] = useState<string>("");

  return (
    <header
      className={`${
        theme === Theme.DARK ? "dark-mode" : "light-mode"
      } header-container`}
    >
      <div className="header-container__inner-wrapper">
        <div className="header-container__title-box">
          <h1 className="header-container__title">todo</h1>
          <ThemeBTN theme={theme} setTheme={setTheme} />
        </div>
        <TextArea text={text} setText={setText} handleAddNote={handleAddNote} />
      </div>
    </header>
  );
};

export default Header;
