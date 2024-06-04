import { AxiosAdapter } from "./http/axios.adapter";

export const MovieDBFetcher = new AxiosAdapter({
    baseUrl: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key:'c76373209e6231c147784e1e5a37881b',
        language: 'es'
    }
})