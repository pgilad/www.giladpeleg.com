import { GatsbySSR } from "gatsby";
import React from "react";

// noinspection JSUnusedGlobalSymbols
export const onRenderBody: GatsbySSR["onRenderBody"] = ({
    setHeadComponents,
    setHtmlAttributes,
}) => {
    setHtmlAttributes({ lang: "en" });
    setHeadComponents([
        <link
            rel="preconnect dns-prefetch"
            key="preconnect-google-marketingplatform"
            href="https://marketingplatform.google.com"
        />,
        <link
            rel="preconnect dns-prefetch"
            key="preconnect-google"
            href="https://www.google.com"
        />,
    ]);
};
