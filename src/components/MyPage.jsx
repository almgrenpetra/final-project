import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { challengeBoard } from "../reducers/challengeBoard";
import { NoSavedChallenges } from "./NoSavedChallenges";
import { CardImages } from "./CardImages";
import delete_icon from "../assets/delete.png";
import "./MyPage.css";

export const MyPage = () => {
  const dispatch = useDispatch();
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  useEffect(() => {
    dispatch(challengeBoard.actions.updateChallengeArray());
  }, []);

  const challenges = useSelector((store) => store.challengeBoard.challenges);
  const completedChallenges =
    challenges && challenges.filter((challenge) => challenge.complete === true);

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
        <h2> My Completed Challenges</h2>
        {completedChallenges && completedChallenges.length === 0 && (
          <NoSavedChallenges />
        )}
        <div className="challenges">
          {completedChallenges &&
            completedChallenges.map((challenge) => (
              <div key={challenge.id} className="challenge">
                <h3 className={`challenge-header ${challenge.categories[0]}`}>
                  {challenge.header}
                </h3>
                <img
                  className="completed-img"
                  src={CardImages[challenge.categories[0]]}
                  alt={CardImages[challenge.categories[0]]}
                />
                <div className="mypage-footer">
                  <button
                    className="modal-button"
                    onClick={() =>
                      dispatch(
                        challengeBoard.actions.toggleChallenge(challenge)
                      )
                    }
                  >
                    Do this challenge again
                  </button>

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
                      completed challenges?
                    </p>
                    <div className="modal-buttons">
                      <button onClick={handleConfirmDelete}>
                        Yes, I'm sure!
                      </button>
                      <button onClick={handleCancelDelete}>
                        Of course not!
                      </button>
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
