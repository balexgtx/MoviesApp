import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBResponse, NowPlayingResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";




export const moviesTopRatedUseCase = async (fetcher: HttpAdapter): Promise<Movie[]> => {
    try {
        const toprated = await fetcher.get<MovieDBResponse>('/top_rated');
        return toprated.results.map(result => MovieMapper.fromMovieDBResultToEntity(result));
    } catch (error) {
        throw new Error("Error fetchingf movies - Top Rated");
    }
}

