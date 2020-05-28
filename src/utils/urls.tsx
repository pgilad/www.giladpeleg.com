export const combineURLs = (baseURL: string, relativeURL?: string): string => {
    return relativeURL
        ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "")
        : baseURL;
};
