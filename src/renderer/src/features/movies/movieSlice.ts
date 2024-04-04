import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TomideStreams from "cyber-stream-sdk";
import { MovieDescription } from "cyber-stream-sdk/dist/movies/types";
import { FormattedMovieType, movieFormatter } from "../../lib/utils";

export const cyberStream = new TomideStreams();

const fetchMoviesAPI = async (): Promise<MovieDescription[]> => {
  return await cyberStream.getRandomMovies();
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (): Promise<MovieDescription[]> => {
    return await fetchMoviesAPI();
  }
);

export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async (imdbId: string): Promise<FormattedMovieType> => {
    const rawOutput = await cyberStream.getMovieById(imdbId);
    return movieFormatter(rawOutput);
  }
);

interface MoviesState {
  data: MovieDescription[];
  movieDetails: FormattedMovieType | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MoviesState = {
  data: [],
  movieDetails: null,
  status: "idle",
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
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
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movieDetails = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export const { reducer: moviesReducer } = moviesSlice;
