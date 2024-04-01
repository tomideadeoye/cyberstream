import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import TomideStreams from "cyber-stream-sdk";
import { Star, View } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Counter from "@/components/Counter";
import { MovieDescription } from "cyber-stream-sdk/dist/movies/types";

export function Home() {
  const [data, setData] = useState<MovieDescription[] | null>(null);

  const cyberStream = new TomideStreams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movies = await cyberStream.getRandomMovies();
        setData(movies);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error(JSON.stringify(error));
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleCardClick = (imdbId: string) => {
    navigate(`/details/${imdbId}`);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input placeholder="movie details" />
        <Button type="submit">Search</Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.map((movie) => (
          <div className="grid gap-4" key={movie["#IMDB_ID"]}>
            <Card
              className=""
              onClick={() => handleCardClick(movie["#IMDB_ID"])}
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <img
                    src={movie["#IMG_POSTER"]}
                    alt={`${movie["#TITLE"]} poster`}
                    className="w-full rounded-md"
                  />
                </div>
                <CardTitle>{movie["#TITLE"]}</CardTitle>
                <CardDescription>{movie["#YEAR"]}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className=" flex items-center space-x-4 rounded-md border p-4">
                  <Star />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {movie["#RANK"]}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {movie["#AKA"]}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {movie["#ACTORS"]}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <View className="mr-2 h-4 w-4" /> View more details
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      <Counter />
    </div>
  );
}
