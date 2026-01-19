import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [movieDetail, setMovieDetail] = useState("");
    const getMovie = async () => {
        const json = await (
            await fetch(`https://yts.bz/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMovieDetail(json.data.movie);
        setLoading(false);
    };
    useEffect(() => { 
        getMovie()
    }, []);
    console.log(movieDetail);
    return (
        <div>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div>
                    <h1>{movieDetail.title}</h1>
                    <img src={movieDetail.large_cover_image} alt={movieDetail.title} />
                    <ul>
                        {(movieDetail.genres).map(g => (
                            <li key={g}>{g}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

    )
}

export default Detail;