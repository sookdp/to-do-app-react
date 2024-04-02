import { useRef, useState } from "react";
import Input from "./Input";
import Modal from "./Modal";
import addImage from "/src/assets/add-image.png";

export default function NewProject({ onAdd, onCancel }) {
  const modal = useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();
  const imageInput = useRef(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;
    const selectedImage = backgroundImage;

    // validation
    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      // show error modal
      modal.current.open();
      return;
    }
    if (enteredDescription.trim().length === 0) {
      return;
    }
    if (enteredDueDate.trim().length === 0) {
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
      backgroundImage: selectedImage,
    });
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setBackgroundImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    console.log(backgroundImage);
  }
  return (
    <>
      <Modal ref={modal} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-stone-700 my-4">
          Invalid Input...
        </h2>
        <p className="text-stone-600 mb-4">
          Oops... looks like you forgot to enter a value.
        </p>
        <p className="text-stone-600 mb-4">
          Please make sure you provide a valid value for every input field
        </p>
      </Modal>
      <div className="w-[35rem] mt-16 pr-6">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={title} label="Title"/>
          <Input ref={description} label="Description" textarea/>
          <Input type="date" ref={dueDate} label="Due Date"/>
          <Input
              label="Projet's Background Image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={imageInput}
              style={{display: "none"}}
          />
          <button onClick={() => imageInput.current.click()}>
            <img src={addImage} alt="Add Image icon" className="w-8 h-8"/>
          </button>
        </div>
      </div>
    </>
  );
}
