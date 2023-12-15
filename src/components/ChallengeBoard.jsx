import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { challengeBoard } from "../reducers/challengeBoard";
import { EmptyChallengeBoard } from "./EmptyChallengeBoard";
import delete_icon from "../assets/delete.png";
import "./ChallengeBoard.css";

export const ChallengeBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  useEffect(() => {
    dispatch(challengeBoard.actions.updateChallengeArray());
  }, []);

  const challenges = useSelector((store) => store.challengeBoard.challenges);
  const notCompletedChallenges =
    challenges && challenges.filter((challenge) => challenge.complete !== true);

  const handleCompleted = (challenge) => {
    dispatch(challengeBoard.actions.toggleChallenge(challenge));
    navigate("/mypage");
  };

  const handleDelete = (challenge) => {
    setSelectedChallenge(challenge);
  };

  const handleConfirmDelete = () => {
    dispatch(challengeBoard.actions.deleteChallenge(selectedChallenge));
    setSelectedChallenge(null);
  };

  const handleCancelDelete = () => {
    setSelectedChallenge(null);
  };

  return (
    <>
      <div className="board">
        <h2> My ChallengeBoard</h2>
        {notCompletedChallenges && notCompletedChallenges.length === 0 && (
          <EmptyChallengeBoard />
        )}
        <div className="challenges">
          {notCompletedChallenges &&
            notCompletedChallenges.map((challenge) => (
              <div key={challenge.id} className="challenge">
                <h3 className={`challenge-header ${challenge.categories[0]}`}>
                  {challenge.header}
                </h3>
                <p className="description">{challenge.description}</p>
                <div className="footer">
                  <label className="checkbox" htmlFor={challenge.id}>
                    <input
                      className="checkbox-input"
                      type="checkbox"
                      id={challenge.id}
                      checked={challenge.complete}
                      // onChange={() =>
                      //   dispatch(
                      //     challengeBoard.actions.toggleChallenge(challenge)
                      //   )
                      // }
                      onChange={() => handleCompleted(challenge)}
                    />
                    <span className="checkmark"></span>
                    <p>Are your mission completed?</p>
                  </label>

                  <img
                    className="delete-icon"
                    src={delete_icon}
                    alt="delete-icon"
                    onClick={() => handleDelete(challenge)}
                  />
                </div>
                {selectedChallenge && selectedChallenge.id === challenge.id && (
                  <div className="confirmation-modal">
                    <p>
                      Are you sure you want to remove this challenge from your
                      board?
                    </p>
                    <div className="modal-buttons">
                      <button onClick={handleConfirmDelete}>
                        Yes, I'm sure
                      </button>
                      <button onClick={handleCancelDelete}>Actually no</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
