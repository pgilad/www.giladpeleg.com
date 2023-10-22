import React from "react";

import { Layout } from "../components/layout";
import { PageHead } from "../components/seo";

const NotFoundPage = () => (
    <Layout>
        <br />
        <h1>NOT FOUND</h1>
        <p>{"You just hit a route that doesn't exist... the sadness."}</p>
    </Layout>
);

export const Head = () => {
    return (
        <PageHead
            overrideDescription="Your requested page was not found"
            overrideTitle="404: Not found"
        />
    );
};

// noinspection JSUnusedGlobalSymbols
export default NotFoundPage;
