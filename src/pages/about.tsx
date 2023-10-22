import React from "react";

import { HomeRightOverview } from "../components/home-right-overview";
import { Layout } from "../components/layout";
import { PageHead } from "../components/seo";

const AboutPage = () => (
    <Layout>
        <br />
        <h1>About me</h1>
        <p>
            Hi, I am Gilad Peleg. I live and work in Tel-Aviv, Israel, as a Director of Engineering
            @<a href="https://forter.com/">Forter</a>. I explore areas such as coding, developer
            productivity, excellence, improving flow and leveling up.
        </p>
        <HomeRightOverview />
    </Layout>
);

export const Head = () => {
    return <PageHead overrideTitle="About me" />;
};

// noinspection JSUnusedGlobalSymbols
export default AboutPage;
