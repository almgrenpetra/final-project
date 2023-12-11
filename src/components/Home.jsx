import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "./Modal";
import { challengeBoard } from "../reducers/challengeBoard";
import { CardImages } from "./CardImages";
import data from "../data.json";
import heart_empty from "../assets/heart_empty.svg";
import heart_filled from "../assets/heart_filled.svg";
import "./Home.css";

export const Home = () => {
  // Get data from local storage
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(challengeBoard.actions.updateChallengeArray());
  }, []);

  const [openModal, setOpenModal] = useState(null);
  const selectedCategory = useSelector(
    (store) => store.challengeBoard.selectedCategory
  );

  const filteredChallenges =
    selectedCategory === "all"
      ? data.challenges
      : data.challenges.filter((challenge) =>
          challenge.categories.includes(selectedCategory)
        );

  const selectedChallenges = useSelector(
    (store) => store.challengeBoard.challenges
  );

  return (
    <>
      <h2>
        <span>
          Nobody can do <span className="emphasize">everything</span>, but
          everyone can do <span className="emphasize">something</span>
        </span>
        <span className="new-line">
          Add challenges and find them in your Challenge Board
        </span>
      </h2>
      <div className="challenge-list">
        {filteredChallenges.map((challenge) => (
          <div key={challenge.id}>
            <div className="challenge-card">
              <div className="card-header">
                <img
                  className="card-img"
                  src={CardImages[challenge.categories[0]]}
                />
              </div>
              <div className="heart-container">
                {selectedChallenges &&
                selectedChallenges.some((item) => item.id === challenge.id) ? (
                  <img
                    onClick={() =>
                      dispatch(
                        challengeBoard.actions.deleteChallenge(challenge)
                      )
                    }
                    className="heart"
                    src={heart_filled}
                    alt="Remove challenge from board"
                  />
                ) : (
                  <img
                    onClick={() =>
                      dispatch(challengeBoard.actions.addChallenge(challenge))
                    }
                    className="heart"
                    src={heart_empty}
                    alt="Add challenge to board"
                  />
                )}
              </div>
              <div className="card-body">
                <div className="categories">
                  {challenge.categories.map((category, index) => (
                    <span key={index} className={`category ${category}`}>
                      {category}
                    </span>
                  ))}
                </div>
                <h3>{challenge.header}</h3>
                <p className="description">{challenge.description}</p>
              </div>
              <div className="card-footer">
                <button
                  className="modal-button"
                  onClick={() => setOpenModal(challenge.id)}
                >
                  Read more
                </button>
              </div>
            </div>

            <Modal
              open={openModal === challenge.id}
              onClose={() => setOpenModal(null)}
              challenge={challenge}
            />
          </div>
        ))}
      </div>
    </>
  );
};
