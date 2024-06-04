import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from "./http.adapter";


interface Options {
    baseUrl: string;
    params: Record<string, string>
}

export class AxiosAdapter implements HttpAdapter{

    private AxiosInstance: AxiosInstance;
    constructor(options: Options){
        this.AxiosInstance = axios.create({
            baseURL: options.baseUrl,
            params: options.params,
        })
    }

    async get<T>(url: string, options?: Record<string, unknown> | undefined): Promise<T> {
        try{

            const {data} = await this.AxiosInstance.get(url, options);
            return data;

        } catch(error) {
            throw new Error(`Error fetchg get: ${url}`);
        }
    }

}