import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";

import StarRating from "../ui/StarRating";

import "./MovieDetailsSection.styles.scss";

export default function MovieDetailsSection({
  selectedId,
  movie,
  watched,
  onAddWatched,
  onCloseMovie,
}) {
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  const isPhone = useMediaQuery("(max-width: 37.5em)");
  const isSmallPhone = useMediaQuery("(max-width: 22em)");

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Actors: actors,
    Director: director,
  } = movie;

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  return (
    <section>
      <div className="rating">
        {!isWatched ? (
          <>
            <StarRating
              maxRating={10}
              size={isSmallPhone ? 18 : isPhone ? 21 : 26}
              onSetRating={setUserRating}
            />
            {userRating > 0 && (
              <button className="btn-add" onClick={handleAdd}>
                + Add to list
              </button>
            )}
          </>
        ) : (
          <p>
            You already rated this movie with {watchedUserRating}
            <span>⭐</span>
          </p>
        )}
      </div>
      <p>
        <em>{plot}</em>
      </p>
      <p>Starring {actors}</p>
      <p>Directed by {director}</p>
    </section>
  );
}
