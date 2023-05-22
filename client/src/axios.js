export const makeRequest = axios.create({
    baseURL: "http://localhost/api",
    withCredentials: true,
});