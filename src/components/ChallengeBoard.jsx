import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { challengeBoard } from "../reducers/challengeBoard";
import { EmptyChallengeBoard } from "./EmptyChallengeBoard";
import "./ChallengeBoard.css";

export const ChallengeBoard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(challengeBoard.actions.updateChallengeArray());
  }, []);

  const challenges = useSelector((store) => store.challengeBoard.challenges);
  const notCompletedChallenges =
    challenges && challenges.filter((challenge) => challenge.complete !== true);

  return (
    <>
      <div className="board">
        <h2> My ChallengeBoard</h2>
        {notCompletedChallenges.length === 0 && <EmptyChallengeBoard />}
        <div className="challenges">
          {notCompletedChallenges.map((challenge) => (
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
                    onChange={() =>
                      dispatch(
                        challengeBoard.actions.toggleChallenge(challenge)
                      )
                    }
                  />
                  <span className="checkmark"></span>
                  <p>Are your mission completed?</p>
                </label>

                <img
                  className="delete-icon"
                  src="./src/assets/delete.png"
                  alt="delete-icon"
                  onClick={() =>
                    dispatch(challengeBoard.actions.deleteChallenge(challenge))
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
