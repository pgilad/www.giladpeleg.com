import { graphql, Link } from 'gatsby';
import React from 'react';

import { Layout } from '../components/layout';
import { SEO } from '../components/seo';

import styles from './blog-post.module.css';

export const pageQuery = graphql`
    query($slug: String!) {
        site {
            siteMetadata {
                title
                author
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            excerpt(pruneLength: 160)
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                cover {
                    childImageSharp {
                        fixed(width: 1280, height: 630) {
                            src
                        }
                    }
                }
                coverAlt
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
    fields: {
        slug: string;
    };
    excerpt: string;
    html: string;
}

interface Props {
    location: Location;
    data: {
        markdownRemark: Page;
    };
    pageContext: {
        next?: Page;
        previous?: Page;
    };
}

const BlogTemplate: React.FC<Props> = props => {
    const post = props.data.markdownRemark;
    const { previous, next } = props.pageContext;

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
                origin={props.location.origin}
                title={post.frontmatter.title}
                url={props.location.href}
            />
            <p className={styles.postDate}>{post.frontmatter.date}</p>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
