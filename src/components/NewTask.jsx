import React from "react";
import { useState } from "react";
import Picker from "emoji-picker-react";
import emojiLogo from "/src/assets/smile.png";

export default function NewTask({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState("");

    const [chosenEmoji, setChosenEmoji] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(null);

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    if (enteredTask.trim() === "") {
      return;
    }
    onAdd(enteredTask);
    setEnteredTask("");
  }

  function handleEmojiClick(){
      setChosenEmoji(!chosenEmoji);
  }

    function onEmojiClick(event, emojiObject) {
        setSelectedEmoji(emojiObject);
        console.log(selectedEmoji);
        setChosenEmoji(false);
    }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleChange}
        value={enteredTask}
      />
        <button onClick={handleEmojiClick}>
            <img src={emojiLogo}
                 className="w-10 h-10" alt="Emoji Button"/>
        </button>
        {chosenEmoji && (
            <div
                className="absolute top-80 left-15 z-20">
                <Picker
                    height="30vw"
                    width="25vw"
                    onEmojiClick={onEmojiClick}
                />
            </div>)}
      <button
        className="text-stone-700 hover:text-red-950"
        onClick={handleClick}
      >
        Add Task
      </button>
        {selectedEmoji && <div>{selectedEmoji.emoji}</div>}
    </div>
  );
}
