import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const makeRequest = axios.create({
    baseURL: "http://localhost/api",
    withCredentials: true,
});

export function load(identifier, url) {
    return useQuery(
        identifier,
        () => {
            return makeRequest.get(url).then((result) => result.data);
        },
        { retry: false, refetchOnWindowFocus: false }
    );
}