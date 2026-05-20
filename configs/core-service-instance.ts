import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import apiConfig from "./api-config";
import { authClient } from "../lib/auth-client";

export type RequestConfig<T = unknown> = AxiosRequestConfig<T>;
export type ResponseErrorConfig<T = unknown> = AxiosError<T>;

export const axiosClient = async <
    TData,
    TError = unknown,
    TVariables = unknown,
>(
    config: AxiosRequestConfig<TVariables>,
): Promise<AxiosResponse<TData>> => {
    // Try to attach Authorization header using JWT from authClient
    let authHeaders: Record<string, string> = {};
    try {
        const tokenRes = await (authClient as unknown as any).token?.();
        const token = tokenRes?.data?.token as string | undefined;
        if (token) {
            authHeaders["Authorization"] = `Bearer ${token}`;
        }
    } catch {
        // ignore token retrieval errors; request proceeds without Authorization
    }

    const promise = apiConfig
        .request<TVariables, AxiosResponse<TData>>({
            ...config,
            baseURL: apiConfig.defaults.baseURL + "/core/v1",
            headers: {
                Accept: "application/json",
                ...authHeaders,
                ...config.headers,
            },
        })
        .catch((e: AxiosError<TError>) => {
            throw e;
        });

	return promise;
};

export default axiosClient;