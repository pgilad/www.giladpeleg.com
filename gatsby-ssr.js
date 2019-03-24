/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react';

export const onRenderBody = ({ setHeadComponents }) => {
    setHeadComponents([
        <link
            rel="preconnect"
            key="preconnect-google-analytics"
            href="https://www.google-analytics.com"
        />,
        <link
            rel="dns-prefetch"
            key="dns-prefetch-google-analytics"
            href="https://www.google-analytics.com"
        />,
    ]);
};
