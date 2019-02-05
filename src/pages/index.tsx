import { graphql } from 'gatsby';
import React from 'react';

import { HomeRecentPosts } from '../components/home-recent-posts';
import { HomeRightOverview } from '../components/home-right-overview';
import { Layout } from '../components/layout';
import { SEO } from '../components/seo';

import styles from './index.module.scss';
import './layout.css';

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            edges {
                node {
                    excerpt
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
    location: any;
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
            <SEO
                title={props.data.site.siteMetadata.title}
                keywords={['blog', 'personal', 'adventures']}
            />
            <div className={styles.mainWrapper}>
                <HomeRecentPosts posts={props.data.allMarkdownRemark.edges} />
                <HomeRightOverview />
            </div>
        </Layout>
    );
};

export default IndexPage;
