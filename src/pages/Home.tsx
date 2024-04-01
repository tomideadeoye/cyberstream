import { useEffect } from "react";
import TomideStreams from "cyber-stream-sdk";
import { SkeletonCard } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { View } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchMoviesBar from "@/components/SearchMoviesBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "@/features/movies/movieSlice";
import { AppDispatch } from "@/features/movies/moviesAPI";
import { RootState } from "@/app/store";

export const cyberStream = new TomideStreams();

export function Home() {
  const dispatch: AppDispatch = useDispatch(); // Use AppDispatch type for dispatch
  const { data, status, error } =
    useSelector((state: RootState) => state.movies) ?? {};

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);
  const navigate = useNavigate();

  const handleCardClick = (imdbId: string) => {
    navigate(`/details/${imdbId}`);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 p-5">
      <SearchMoviesBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {data
          ? data.map((movie) => (
              <Card
                className="cursor-pointer hover:bg-slate-100 flex flex-col justify-between"
                key={movie["#IMDB_ID"]}
                onClick={() => handleCardClick(movie["#IMDB_ID"])}
              >
                <CardHeader>
                  <img
                    src={movie["#IMG_POSTER"]}
                    alt={`${movie["#TITLE"]} poster`}
                    className="w-full rounded-md"
                  />
                  <CardTitle>{movie["#TITLE"]}</CardTitle>
                  <CardDescription>{movie["#YEAR"]}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-between">
                  <span> {movie["#RANK"]}</span>
                  <span>{movie["#AKA"]}</span>
                  <span>{movie["#ACTORS"]}</span>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <View className="mr-2 h-4 w-4" /> View more details
                  </Button>
                </CardFooter>
              </Card>
            ))
          : Array.from({ length: 10 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
      </div>
    </div>
  );
}
