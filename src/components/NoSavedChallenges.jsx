import Lottie from "lottie-react";
import animationData from "../assets/Animation - 1701085060253.json";

export const NoSavedChallenges = () => {
  return (
    <div className="animation-container">
      <h3>Nobody can do everything, but everyone can do something</h3>
      <p>
        You have no active challenges. On the home page you will find lots of
        fun challenges that you can add to your challenge board. When you have
        completed them, you will see them here.
      </p>
      <Lottie className="animation" animationData={animationData} />
    </div>
  );
};
