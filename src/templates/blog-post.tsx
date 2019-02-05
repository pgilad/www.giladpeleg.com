import { graphql, Link } from 'gatsby';
import React from 'react';

import { Layout } from '../components/layout';
import { SEO } from '../components/seo';
import { rhythm, scale } from '../utils/typography';

import styles from './blog-post.module.scss';

export const pageQuery = graphql`
    query($slug: String!) {
        site {
            siteMetadata {
                title
                author
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
            }
        }
    }
`;

interface Page {
    frontmatter: {
        title: string;
        date: string;
    };
    fields: {
        slug: string;
    };
    excerpt: string;
    html: string;
}

interface Props {
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
            <SEO title={post.frontmatter.title} description={post.excerpt} />
            <p
                style={{
                    ...scale(1 / 5),
                    display: 'block',
                    marginBottom: rhythm(1),
                    marginTop: rhythm(1),
                }}>
                {post.frontmatter.date}
            </p>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <hr
                style={{
                    marginBottom: rhythm(1),
                }}
            />
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
