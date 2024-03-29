import { graphql, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";

import { Layout } from "../components/layout";
import { RecentPosts } from "../components/recent-posts";
import { PageHead } from "../components/seo";
// import twitterIcon from "../images/icons/iconmonstr-twitter-1.svg";
import * as styles from "./index.module.css";

export const pageQuery = graphql`
    query IndexRecentPosts {
        allMarkdownRemark(
            limit: 5
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

const IndexPage = ({ data }: PageProps<Queries.IndexRecentPostsQuery>) => {
    return (
        <Layout>
            <div className={styles.mainWrapper}>
                <p>
                    &quot;Give me six hours to chop down a tree and I will spend the first four
                    sharpening the axe.&quot; - Abraham Lincoln.
                </p>
                <p>
                    Best way to contact me is via{" "}
                    <a href="https://twitter.com/GiladPeleg">Twitter</a> or{" "}
                    <a href="mailto:gilad@giladpeleg.com">email</a>.
                </p>
                <StaticImage
                    alt="Sitting near a small pond in Iceland"
                    src="../images/header-image.jpg"
                    height={300}
                />
                <br />
                <br />
                <h2 className={styles.recentPosts}>Recent posts</h2>
                <RecentPosts posts={data.allMarkdownRemark.edges} />
            </div>
        </Layout>
    );
};

export const Head = () => {
    return <PageHead />;
};

export default IndexPage;
