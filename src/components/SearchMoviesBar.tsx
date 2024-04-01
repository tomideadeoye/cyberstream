import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { toast } from "react-toastify";
import { cyberStream } from "@/pages/Home";

type SearchItem = {
  id: string;
  name: string;
  year: number;
  actors: string;
  rank: number;
  imageUrl: string;
};

export default function SearchMoviesBar() {
  const [data, setData] = useState<SearchItem[]>([]);
  const navigate = useNavigate();
  const handleCardClick = (imdbId: string) => {
    navigate(`/details/${imdbId}`);
  };

  const handleOnSearch = async (string: string) => {
    if (string.trim().length === 0) {
      setData([]);
      return;
    }

    try {
      const movies = await cyberStream.searchMovies(string);
      if (movies) {
        setData(
          movies.map((movie) => ({
            id: movie["#IMDB_ID"],
            name: movie["#TITLE"],
            year: movie["#YEAR"],
            actors: movie["#ACTORS"],
            rank: movie["#RANK"],
            imageUrl: movie["#IMG_POSTER"],
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching movie data");
    }
  };

  const handleOnSelect = (item: SearchItem) => {
    console.log(item);
    navigate(`/details/${item.id}`);
  };

  const formatResult = (item: SearchItem) => {
    return (
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => handleCardClick(item.id)}
      >
        <img
          src={item.imageUrl}
          className="w-14 h-14 rounded-full object-cover"
          alt={item.name}
        ></img>
        <div>
          <span style={{ display: "block", textAlign: "left" }}>
            {item.name} ({item.year})
          </span>
          <small>Actors: {item.actors}</small>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <ReactSearchAutocomplete
        items={data}
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        formatResult={formatResult}
        autoFocus
      />
    </div>
  );
}
