import Lottie from "lottie-react";
import animationData from "../assets/Animation - 1702047650374.json";

export const EmptyChallengeBoard = () => {
  return (
    <div className="animation-container">
      <h3>Nobody can do everything, but everyone can do something</h3>
      <p>
        You currently have no active challenges. On the home page you will find
        lots of fun challenges that you can add to your challenge board
      </p>
      <Lottie className="animation" animationData={animationData} />
    </div>
  );
};
