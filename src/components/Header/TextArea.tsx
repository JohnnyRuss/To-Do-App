import React from "react";

interface TextAreaType {
  setText: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  handleAddNote: (text: string) => void;
}

const TextArea: React.FC<TextAreaType> = ({ text, setText, handleAddNote }) => {
  return (
    <div className="header-container__text-box">
      <input
      type="text"
        placeholder="note your dayly plans"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key !== "Enter") return;
          handleAddNote(text);
          setText("");
        }}
        value={text}
        className="header-container__inp"
      />
    </div>
  );
};

export default TextArea;
