import { useEffect, useState } from "react";
import { View } from "react-native"
import { getMovieByIdUseCase } from "../../core/use-cases/movie/get-by-id.use-case";
import * as UseCases from '../../core/use-cases';
import { MovieDBFetcher } from "../../config/adapters/movieDB.adaptar";
import { FullMovie } from "../../core/entities/movie.entity";
import { Cast } from "../../core/entities/cast.entities";

export const useMovie = (movieId: number) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState<FullMovie>();
    const [cast, setCast] = useState<Cast[]>();

    useEffect(() => {
        loadMovie();
    }, [movieId]);

    const loadMovie = async () => {
        setIsLoading(true);
        const fullMoviePromise = UseCases.getMovieByIdUseCase(MovieDBFetcher, movieId);
        const castPromise = UseCases.getMovieCastUseCase(MovieDBFetcher, movieId);

        const [fullMovie, cast] = await Promise.all([fullMoviePromise, castPromise]);

        setMovie(fullMovie);
        setCast(cast);
        setIsLoading(false);
        //console.log({fullMovie});
        //console.log({cast});
    };

    return {
        isLoading,
        movie,
        cast,
    }
}