import { configureStore } from "@reduxjs/toolkit";
import { moviesReducer } from "./movieSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
