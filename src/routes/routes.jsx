import { Route, Routes } from "react-router-dom";
import { Home } from "../components/Home";
import { ChallengeBoard } from "../components/ChallengeBoard";
import { MyPage } from "../components/MyPage";

export const routes = (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/challengeboard" element={<ChallengeBoard />} />
    <Route path="/mypage" element={<MyPage />} />
  </Routes>
);
