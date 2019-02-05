import { graphql, Link } from 'gatsby';
import React from 'react';

import { Layout } from '../components/layout';
import { SEO } from '../components/seo';
import emailIcon from '../images/icons/iconmonstr-email-2.svg';
import githubIcon from '../images/icons/iconmonstr-github-1.svg';
import linkedinIcon from '../images/icons/iconmonstr-linkedin-3.svg';
import postsIcon from '../images/icons/iconmonstr-note-19.svg';
import twitterIcon from '../images/icons/iconmonstr-twitter-1.svg';
import { rhythm } from '../utils/typography';

import styles from './index.module.scss';

const HomeRightOverview = () => {
    return (
        <div>
            <Link to="/">Gilad Peleg</Link>
            <div className={styles.meTag}>Developer and manager.</div>
            <div className={styles.link}>
                See my code: <a href="https://github.com/pgilad">Github</a>
                <img src={githubIcon} className={styles.linkIcon} alt="Github icon" />
            </div>
            <div className={styles.link}>
                Follow me at: <a href="https://twitter.com/GiladPeleg">Twitter</a>
                <img src={twitterIcon} className={styles.linkIcon} alt="Twitter icon" />
            </div>
            <div className={styles.link}>
                See my resume: <a href="https://www.linkedin.com/in/giladpeleg">LinkedIn</a>
                <img src={linkedinIcon} className={styles.linkIcon} alt="LinkedIn icon" />
            </div>
            <div className={styles.link}>
                Send me a pigeon: <a href="mailto:gilad@giladpeleg.com">Email</a>
                <img src={emailIcon} className={styles.linkIcon} alt="Email icon" />
            </div>
            <div className={styles.link}>
                Things I write about: <Link to="/">Posts</Link>
                <img src={postsIcon} className={styles.linkIcon} alt="Posts icon" />
            </div>
        </div>
    );
};

interface RecentProps {
    posts: {
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
}

const HomeRecentPosts: React.FC<RecentProps> = ({ posts }) => {
    return (
        <div style={{ paddingRight: '50px' }}>
            {posts.map(({ node }) => {
                const title = node.frontmatter.title || node.fields.slug;
                return (
                    <div key={node.fields.slug} className={styles.blogPost}>
                        <div>{node.frontmatter.date}</div>
                        <h3
                            style={{
                                marginBottom: rhythm(1 / 4),
                            }}>
                            <Link className={styles.blogPostLink} to={node.fields.slug}>
                                {title}
                            </Link>
                        </h3>
                    </div>
                );
            })}
        </div>
    );
};

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
