import { graphql } from "gatsby";
import React from "react";

import { HomeRecentPosts } from "../components/home-recent-posts";
import { HomeRightOverview } from "../components/home-right-overview";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { IndexPageQuery } from "../graphql";

import styles from "./index.module.css";

export const pageQuery = graphql`
    query IndexPage {
        allMarkdownRemark(
            limit: 1000
            filter: { frontmatter: { draft: { ne: true } } }
            sort: { fields: [frontmatter___date], order: DESC }
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        title
                    }
                }
            }
        }
    }
`;

type IndexData = {
    data: IndexPageQuery;
};

const IndexPage: React.FC<IndexData> = (props) => {
    return (
        <Layout>
            <SEO />
            <div className={styles.mainWrapper}>
                <HomeRecentPosts posts={props.data.allMarkdownRemark.edges} />
                <HomeRightOverview />
            </div>
        </Layout>
    );
};

export default IndexPage;
