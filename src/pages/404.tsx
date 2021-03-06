import React from "react";

import { Layout } from "../components/layout";
import { SEO } from "../components/seo";

const NotFoundPage: React.FC = () => (
    <Layout>
        <SEO
            overrideDescription="Your requested page was not found"
            overrideTitle="404: Not found"
        />
        <br />
        <h1>NOT FOUND</h1>
        <p>{"You just hit a route that doesn't exist... the sadness."}</p>
    </Layout>
);

// noinspection JSUnusedGlobalSymbols
export default NotFoundPage;
