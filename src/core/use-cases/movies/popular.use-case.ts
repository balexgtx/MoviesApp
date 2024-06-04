import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBResponse, NowPlayingResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";




export const popularUseCase = async (fetcher: HttpAdapter): Promise<Movie[]> => {
    try {
        const popular = await fetcher.get<MovieDBResponse>('/popular');
        return popular.results.map(result => MovieMapper.fromMovieDBResultToEntity(result));
    } catch (error) {
        throw new Error("Error fetchingf movies - popular use case");
    }
}

