import { graphql } from 'gatsby';
import React from 'react';

import { HomeRecentPosts } from '../components/home-recent-posts';
import { HomeRightOverview } from '../components/home-right-overview';
import { Layout } from '../components/layout';
import { SEO } from '../components/seo';

import styles from './index.module.css';

export const pageQuery = graphql`
    query IndexQuery {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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

interface Props {
    data: {
        site: {
            siteMetadata: {
                title: string;
            };
        };
        allMarkdownRemark: {
            edges: {
                node: {
                    excerpt: string;
                    frontmatter: {
                        title: string;
                        date: string;
                    };
                    fields: {
                        slug: string;
                    };
                };
            }[];
        };
    };
}

const IndexPage: React.FC<Props> = props => {
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
