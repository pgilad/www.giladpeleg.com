import { graphql, PageProps } from "gatsby";
import React from "react";

import { Layout } from "../components/layout";
import { RecentPosts } from "../components/recent-posts";
import { PageHead } from "../components/seo";
import * as styles from "./index.module.css";

// noinspection JSUnusedGlobalSymbols
export const pageQuery = graphql`
    query PostsPage {
        allMarkdownRemark(
            limit: 1000
            filter: { frontmatter: { draft: { ne: true } } }
            sort: { frontmatter: { date: DESC } }
        ) {
            edges {
                node {
                    excerpt(pruneLength: 250)
                    fields {
                        slug
                    }
                    frontmatter {
                        year: date(formatString: "YYYY")
                        date(formatString: "MMMM DD, YYYY")
                        title
                    }
                }
            }
        }
    }
`;

const PostsPage = ({ data }: PageProps<Queries.PostsPageQuery>) => {
    return (
        <Layout>
            <div className={styles.mainWrapper}>
                <h2 className={styles.recentPosts}>Posts</h2>
                <RecentPosts posts={data.allMarkdownRemark.edges} />
            </div>
        </Layout>
    );
};

export const Head = () => {
    return <PageHead />;
};

export default PostsPage;
