import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { challengeBoard } from "../reducers/challengeBoard";
import { NoSavedChallenges } from "./NoSavedChallenges";
import delete_icon from "../assets/delete.png";
import "./MyPage.css";

export const MyPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(challengeBoard.actions.updateChallengeArray());
  }, []);

  const challenges = useSelector((store) => store.challengeBoard.challenges);
  const completedChallenges =
    challenges && challenges.filter((challenge) => challenge.complete === true);

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
                  src={`./src/assets/${challenge.categories[0]}.jpg`}
                />
                <div className="footer">
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
                    onClick={() =>
                      dispatch(
                        challengeBoard.actions.deleteChallenge(challenge)
                      )
                    }
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
