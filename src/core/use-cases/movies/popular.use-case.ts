import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBResponse, NowPlayingResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";


interface Options {
    page?: number;
    limit?: number;
}


export const popularUseCase = async (fetcher: HttpAdapter, options?: Options): Promise<Movie[]> => {
    try {
        const popular = await fetcher.get<MovieDBResponse>('/popular', {
            params: {
                page: options?.page ?? 1
            }
        });
        return popular.results.map(result => MovieMapper.fromMovieDBResultToEntity(result));
    } catch (error) {
        throw new Error("Error fetchingf movies - popular use case");
    }
}

