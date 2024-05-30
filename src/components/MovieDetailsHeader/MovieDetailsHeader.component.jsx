import "./MovieDetailsHeader.styles.scss";

export default function MovieDetailsHeader({ movie, onCloseMovie }) {
  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Released: released,
    Genre: genre,
  } = movie;

  return (
    <header>
      <button className="btn-back" onClick={onCloseMovie}>
        &larr;
      </button>
      <img src={poster} alt={`Poster of ${title}`} />
      <div className="details-overview">
        <h2>{title}</h2>
        <p>
          {released} &bull; {runtime}
        </p>
        <p>{genre}</p>
        <p>
          <span>⭐</span>
          {imdbRating} IMDb Rating
        </p>
      </div>
    </header>
  );
}
