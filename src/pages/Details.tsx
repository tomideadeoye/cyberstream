import Review from "@/components/Review";
import SearchMoviesBar from "@/components/SearchMoviesBar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { movieFormatter, FormattedMovieType } from "@/lib/utils";
import { PlayCircle, Share2, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { cyberStream } from "./Home";
import { Skeleton } from "@/components/ui/skeleton";

export function Details() {
  const { imdbId } = useParams(); // This will extract the imdbId from the URL

  const [movie, setMovie] = useState<FormattedMovieType | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!imdbId) {
      toast.info("No movie ID provided, redirecting to home...");
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const movie = await cyberStream.getMovieById(imdbId ?? "");
        console.log(movie);
        const formattedMovie = movieFormatter(movie);
        setMovie(formattedMovie);
      } catch (error) {
        console.log("Error fetching data:", error);
        toast.error("We couldn't find the movie you were looking for.");
      }
    };

    fetchData();
  }, [imdbId]);

  if (!movie) {
    return (
      <div>
        <Skeleton className="h-[500px] w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start w-full gap-4 p-5">
      <SearchMoviesBar />
      <Card className="w-full">
        <CardHeader className="w-full">
          <div className="flex flex-col items-center w-full justify-between md:flex-row">
            <CardTitle className="text-5xl font-bold text-center p-6">
              {movie.name}
            </CardTitle>
            <div className="flex items-center justify-center space-x-2 p-6">
              <a
                href={movie.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 flex"
              >
                <Share2 /> View
              </a>
              <Badge>{movie.type}</Badge>
              <div className="text-blue-500 hover:text-blue-700 flex">
                <Star /> {movie.rating} / 10
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full bg-black">
            <img
              src={movie.image}
              alt={`${movie.name} poster`}
              className="rounded-md h-[500px] w-[500px] object-cover "
            />
            {movie.trailer && (
              <div className="relative w-full ">
                <img
                  src={movie.trailer?.thumbnailUrl}
                  alt={`${movie.name} trailer`}
                  className="rounded-md h-[500px] w-full object-cover  brightness-[0.3]"
                />
                <a
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
                  href={movie.trailer?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PlayCircle
                    size={100}
                    className="text-white hover:scale-125"
                  />
                </a>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="w-full flex-col gap-5 flex">
          <div className="flex flex-wrap gap-2 items-center w-full">
            {movie.genre?.map((genre) => <Badge key={genre}>{genre}</Badge>)}
          </div>

          <p className="w-full text-start">{movie.description}</p>
        </CardContent>
        <CardFooter className="w-full flex-col flex gap-5">
          <div className="flex flex-col gap-2 w-full">
            {movie.directors && (
              <div className="flex gap-2 items-center border-t pt-2">
                <p>Director: </p>
                {movie.directors?.map((director) => (
                  <a key={director.url} href={director.url}>
                    {director.name}
                  </a>
                ))}
              </div>
            )}
            {movie.creators && (
              <div className="flex gap-2 items-center border-t pt-2">
                <p>Writer: </p>
                {movie.creators?.map((creator) => (
                  <a key={creator.url} href={creator.url}>
                    {creator.name}
                  </a>
                ))}
              </div>
            )}
            {movie.actors && (
              <div className="flex gap-2 items-center border-t pt-2">
                <p>Stars: </p>
                {movie.actors?.map((actor) => (
                  <a key={actor.url} href={actor.url}>
                    {actor.name}
                  </a>
                ))}
              </div>
            )}
            {movie.keyWords && (
              <div className="flex gap-2 items-center border-t pt-2">
                <p>Keywords: {movie.keyWords}</p>
              </div>
            )}
          </div>

          <Review review={movie.review} />
        </CardFooter>
      </Card>
    </div>
  );
}
