import React, { useState } from "react";
import Picker from "emoji-picker-react";
import emojiLogo from "/src/assets/smile.png";

export default function NewTask({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiClick = () => {
    setShowPicker(!showPicker);
  };

  const handleChange = (event) => {
    setInputStr(event.target.value);
  };

  const handleClick = () => {
    onAdd(inputStr);
    setInputStr("");
  };


    function onEmojiClick (event, emojiObject){
        const sym = event.unified.split("_");
        const codeArray= [];
        sym.forEach((el) => codeArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codeArray);
        setInputStr((prevInput) => prevInput + emoji);
        setShowPicker(false);
    }



    return (
        <div className="flex items-center gap-4">
            <input
                className="w-64 px-2 py-1 rounded-sm bg-stone-200"
                value={inputStr}
                onChange={handleChange}
            />
            <button onClick={handleEmojiClick}>
                <img
                    src={emojiLogo}
                    className="w-10 h-10"
                    alt="Emoji Button"
                />
            </button>
            {showPicker && (<div className="absolute top-80 left-15 z-20">
                <Picker
                    height="30vw"
                    width="25vw"
                    onEmojiClick={onEmojiClick}
                />
            </div>)}
            <button onClick={handleClick} className="text-stone-700 hover:text-stone-500">
                Add Task
            </button>
        </div>
    );
}
