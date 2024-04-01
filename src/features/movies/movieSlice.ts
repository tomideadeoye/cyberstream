import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TomideStreams from "cyber-stream-sdk";
import { MovieDescription } from "cyber-stream-sdk/dist/movies/types";

export const cyberStream = new TomideStreams();

const fetchMoviesAPI = async (): Promise<MovieDescription[]> => {
  const movies = await cyberStream.getRandomMovies();
  console.log(movies);
  return movies;
};
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (): Promise<MovieDescription[]> => {
    return await fetchMoviesAPI();
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    data: [] as MovieDescription[],
    status: "idle",
    error: null,
  },
  reducers: {
    // synchronous reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { reducer: moviesReducer } = moviesSlice;
