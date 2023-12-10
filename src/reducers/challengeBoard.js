import { createSlice } from "@reduxjs/toolkit";

export const challengeBoard = createSlice({
  name: "challengeBoard",
  initialState: {
    challenges: [],
    selectedCategory: "all",
    categories: [
      { value: "all", label: "All categories" },
      { value: "christmas", label: "Christmas" },
      { value: "food", label: "Food" },
      { value: "home", label: "Home" },
      { value: "transportation", label: "Transportation" },
      { value: "recycling", label: "Recycling" },
      { value: "shopping", label: "Shopping" },
      { value: "savings", label: "Savings" },
      { value: "technology", label: "Technology" },
      { value: "holiday", label: "Holiday" },
    ],
  },
  reducers: {
    updateChallengeArray: (state) => {
      state.challenges = JSON.parse(localStorage.getItem("challengeList"));
    },
    addChallenge: (state, { payload }) => {
      if (state.challenges === null || state.challenges === undefined) {
        state.challenges = [];
      }

      const alreadyExists =
        state.challenges &&
        state.challenges.find((challenge) => challenge.id === payload.id);

      if (!alreadyExists) {
        state.challenges.push(payload);
      }
      localStorage.setItem("challengeList", JSON.stringify(state.challenges));
    },
    toggleChallenge: (state, { payload }) => {
      const currentTask =
        state.challenges &&
        state.challenges.find((challenge) => challenge.id === payload.id);
      currentTask.complete = !currentTask.complete;
      localStorage.setItem("challengeList", JSON.stringify(state.challenges));
    },
    deleteChallenge: (state, { payload }) => {
      const filteredList = state.challenges.filter(
        (challenge) => challenge.id !== payload.id
      );

      state.challenges = state.challenges.filter(
        (challenge) => challenge.id !== payload.id
      );

      localStorage.setItem("challengeList", JSON.stringify(state.challenges));
    },
    setCategory: (state, { payload }) => {
      state.selectedCategory = payload;
    },
  },
});
