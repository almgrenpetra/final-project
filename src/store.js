import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { challengeBoard } from "./reducers/challengeBoard";

const reducer = combineReducers({
  challengeBoard: challengeBoard.reducer,
});

export const store = configureStore({ reducer });
