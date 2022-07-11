import request from "@/utils/request";
export const getSuggestion = (params) => {
    return request({
        method: "GET",
        url: "/v1_0/suggestion",
        params
    });
};
//获取搜索结果
export const getSearchResult = (params) => {
    return request({
        method: "GET",
        url: "/v1_0/search",
        params
    });
};