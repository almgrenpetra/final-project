import { useState } from "react";
import { useDispatch } from "react-redux";
import { challengeBoard } from "../reducers/challengeBoard";
import { CardImages } from "./CardImages";
import "./Modal.css";

export const Modal = ({ open, onClose, challenge }) => {
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);

  const addToBoard = () => {
    dispatch(challengeBoard.actions.addChallenge(challenge));
    setShowMessage(true);
  };

  return (
    <>
      {open && (
        <div onClick={onClose} className="overlay">
          <div
            onClick={(event) => {
              event.stopPropagation();
            }}
            className="modal-container"
          >
            <img
              className="modal-img"
              src={CardImages[challenge.categories[0]]}
              alt={CardImages[challenge.categories[0]]}
            />
            <div className="modal-right">
              <p onClick={onClose} className="close-cross">
                X
              </p>
              <div className="content">
                <h2>{challenge.header}</h2>
                {showMessage ? (
                  <p>This challenge has been added to your board!</p>
                ) : (
                  <p>{challenge.description}</p>
                )}
              </div>

              <div className="button-container">
                {!showMessage && (
                  <button className="add-button" onClick={addToBoard}>
                    Add to board
                  </button>
                )}
                <button className="close-button" onClick={onClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
