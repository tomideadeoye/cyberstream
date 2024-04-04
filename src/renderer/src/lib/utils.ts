import { clsx, type ClassValue } from "clsx";
import { Movie } from "cyber-stream-sdk/dist/movies/types";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const movieFormatter = (movie: Movie) => {
  const movieDetails = {
    type: movie.short["@type"],
    url: movie.short.url,
    name: movie.short.name.replace(/&apos;s;/g, " "),
    description: movie.short.description,
    genre: movie.short.genre,
    image: movie.short.image,
    rating: movie.short?.aggregateRating?.ratingValue,
    review: movie.short.review,
    datePublished: movie.short.datePublished,
    actor: movie.short.actor,
    trailer: movie.short.trailer,
    actors: movie.short.actor,
    directors: movie.short.director,
    creators: movie.short.creator,
    duration: movie.short.duration,
    currentProductionStage: movie.top.productionStatus.currentProductionStage,
    relatedDate: movie.top.releaseDate,
    storyLineKeyWords: movie.storyLine.storylineKeywords.edges,
    totalStoryLineKeyWords: movie.storyLine.storylineKeywords.total,
    tagLines: movie.storyLine.taglines.edges,
    genres: movie.storyLine.genres.genres,
    quotes: movie.main.quotes,
    cast: movie.main.cast.edges,
    keyWords: movie.short.keywords,
  };

  return movieDetails;
};

export type FormattedMovieType = ReturnType<typeof movieFormatter>;
