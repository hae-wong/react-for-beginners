import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (await fetch(
      'https://yts.bz/api/v2/list_movies.json?sort_by=year&rating=8.5'
    )).json();
    setMovies(json.data.movies);
    setLoading(false);
  }; 
  useEffect(() => {
    getMovies()
  }, []);
  console.log(movies);
  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.movies}>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              coverImg={movie.medium_cover_image}
              year={movie.year}
              title={movie.title}
              titleLong={movie.title_long}
              genres={movie.genres} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;