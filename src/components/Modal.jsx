import { useDispatch } from "react-redux";
import { challengeBoard } from "../reducers/challengeBoard";
import { CardImages } from "./CardImages";
import "./Modal.css";

export const Modal = ({ open, onClose, challenge }) => {
  const dispatch = useDispatch();

  const addToBoard = () => {
    onClose();
    dispatch(challengeBoard.actions.addChallenge(challenge));
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
              alt=""
            />
            <div className="modal-right">
              <p onClick={onClose} className="close-cross">
                X
              </p>
              <div className="content">
                <h2>{challenge.header}</h2>
                <p>{challenge.description}</p>
              </div>

              <div className="button-container">
                <button className="add-button" onClick={addToBoard}>
                  Add to board
                </button>
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
