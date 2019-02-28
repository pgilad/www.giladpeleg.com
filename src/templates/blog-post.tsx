import { graphql, Link } from 'gatsby';
import React from 'react';

import { Layout } from '../components/layout';
import { SEO } from '../components/seo';
import { combineURLs } from '../utils/urls';

import styles from './blog-post.module.css';

export const pageQuery = graphql`
    query BlogPostQuery($slug: String!) {
        site {
            siteMetadata {
                author
                siteUrl
                title
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            excerpt(pruneLength: 160)
            id
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                coverAlt
                cover {
                    childImageSharp {
                        fixed(width: 1200, height: 630) {
                            src
                        }
                    }
                }
            }
        }
    }
`;

interface Page {
    frontmatter: {
        title: string;
        date: string;
        description?: string;
        coverAlt?: string;
        cover?: {
            childImageSharp: {
                fixed: {
                    src: string;
                };
            };
        };
    };
    id: string;
    excerpt: string;
    html: string;
}

interface ExternalPage {
    fields: {
        slug: string;
    };
    frontmatter: {
        title: string;
    };
}

interface Props {
    data: {
        markdownRemark: Page;
        site: {
            siteMetadata: {
                disqusShortName: string;
                siteUrl: string;
            };
        };
    };
    pageContext: {
        next?: ExternalPage;
        previous?: ExternalPage;
        slug: string;
    };
}

const GITHUB_CONTENT_URL = 'https://github.com/pgilad/www.giladpeleg.com/blob/master/content';

const BlogTemplate: React.FC<Props> = props => {
    const post = props.data.markdownRemark;
    const { previous, next, slug } = props.pageContext;
    const githubEditUrl = combineURLs(GITHUB_CONTENT_URL, combineURLs(slug, 'index.md'));

    return (
        <Layout headerTitle={post.frontmatter.title}>
            <SEO
                description={post.frontmatter.description || post.excerpt}
                imageSrc={
                    post.frontmatter.cover
                        ? post.frontmatter.cover.childImageSharp.fixed.src
                        : undefined
                }
                imageAlt={post.frontmatter.coverAlt || undefined}
                pathname={props.pageContext.slug}
                title={post.frontmatter.title}
            />
            <p className={styles.postDate}>{post.frontmatter.date}</p>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <a
                className={styles.suggestAnEdit}
                title="Suggest an edit to this post on Github"
                href={githubEditUrl}>
                Suggest an edit to this post
            </a>
            <hr className={styles.bottomSeparator} />
            <ul className={styles.listContainer}>
                <li>
                    {previous && previous.fields && (
                        <Link to={previous.fields.slug} rel="prev">
                            ← {previous.frontmatter.title}
                        </Link>
                    )}
                </li>
                <li>
                    {next && next.fields && (
                        <Link to={next.fields.slug} rel="next">
                            {next.frontmatter.title} →
                        </Link>
                    )}
                </li>
            </ul>
        </Layout>
    );
};

export default BlogTemplate;
