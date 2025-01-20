import axiosClient from "../utils/axios";

const apiUrl = "http://localhost/api";

export function getRequest(
        URL: string,
        baseUlr: string | null = ""
    ) {
    axiosClient.defaults.baseURL = baseUlr ? baseUlr : apiUrl;
    let user = JSON.parse(localStorage.getItem("authUser") || "{}");
    const token = user.token;

    axiosClient.defaults.headers.common = { Authorization: `Bearer ${token}` };

    return axiosClient.get(`${apiUrl}${URL}`).then((response: any) => response);
}

export function postRequest(
        URL: string,
        payload: any,
        baseUlr: string | null = ""
    ) {
    axiosClient.defaults.baseURL = baseUlr ? baseUlr : apiUrl;
    return axiosClient.post(`/${URL}`, payload).then((response: any) => response);
}

export function patchRequest(URL: string, payload: any) {
    return axiosClient
        .patch(`/${URL}`, payload)
        .then((response: any) => response);
}

export function deleteRequest(URL: string) {
    return axiosClient.delete(`/${URL}`).then((response: any) => response);
}