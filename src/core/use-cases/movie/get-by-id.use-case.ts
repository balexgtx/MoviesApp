import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBMovie } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { FullMovie } from "../../entities/movie.entity";

export const getMovieByIdUseCase = async (fetcher: HttpAdapter, movieId: number):Promise<FullMovie> => {
    try{
        //usar fetcher
        const movie = await fetcher.get<MovieDBMovie>(`/${movieId}`);
        const fullMovie = MovieMapper.fromMovieDBToEntity(movie);
        //mapeo
        return fullMovie;
    } catch (error) {
        throw new Error(`cannot get movie by id: ${movieId}`);
    }
}