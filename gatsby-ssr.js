/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from "react";

// noinspection JSUnusedGlobalSymbols
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const onRenderBody = ({ setHeadComponents }) => {
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
