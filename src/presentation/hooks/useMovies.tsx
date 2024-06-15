import { useEffect, useState } from "react"
import { Movie } from "../../core/entities/movie.entity";
import * as UseCases from '../../core/use-cases';
import { MovieDBFetcher } from "../../config/adapters/movieDB.adaptar";

let popularPageNumber = 1;

export const useMovies = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [popular, setPopular] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [upcoming, setUpcoming] = useState<Movie[]>([]);

    useEffect(() => {
        initialLoad();
    }, []);
    
    const initialLoad = async () => {
        const nowPlayingPromise = UseCases.moviesNowPlayingUseCase(MovieDBFetcher);
        const popularPromise = UseCases.popularUseCase(MovieDBFetcher);
        const topRatedPromise = UseCases.moviesTopRatedUseCase(MovieDBFetcher);
        const upcomingPromise = UseCases.moviesUpcomingUseCase(MovieDBFetcher);
        
        const [
            nowPlayingMovies,
            popularMovies,
            topRatedMovies,
            upcomingMovies
        ] = await Promise.all([nowPlayingPromise, popularPromise, topRatedPromise, upcomingPromise]);

        setNowPlaying(nowPlayingMovies);
        setPopular(popularMovies);
        setTopRated(topRatedMovies);
        setUpcoming(upcomingMovies);

        setIsLoading(false);
    }

    return {
        isLoading,
        nowPlaying,
        popular,
        topRated,
        upcoming,

        //metodos
        popularNextPage: async() => {
            popularPageNumber++;
            const popularMovies = await UseCases.popularUseCase(MovieDBFetcher, {
                page: popularPageNumber
            });
            setPopular(prev => [...prev, ...popularMovies]);
        }
    }
}
