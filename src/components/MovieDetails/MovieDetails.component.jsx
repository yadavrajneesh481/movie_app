import { useState, useEffect } from "react";
import { useKey } from "../../hooks/useKey";
import Loader from "../Loader/Loader.component";
import ErrorMessage from "../ErrorMessage/ErrorMessage.component";
import MovieDetailsHeader from "../MovieDetailsHeader/MovieDetailsHeader.component";
import MovieDetailsSection from "../MovieDetailsSection/MovieDetailsSection.component";
import { API_KEY } from "../App";

import "./MovieDetails.styles.scss";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { Title: title } = movie;

  useKey("Escape", onCloseMovie);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error(data.Error);

        setMovie(data);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => (document.title = "usePopcorn");
  }, [title]);

  return (
    <div className="details">
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <>
          <MovieDetailsHeader movie={movie} onCloseMovie={onCloseMovie} />
          <MovieDetailsSection
            selectedId={selectedId}
            movie={movie}
            onCloseMovie={onCloseMovie}
            watched={watched}
            onAddWatched={onAddWatched}
          />
        </>
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}
