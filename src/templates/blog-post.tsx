import { graphql, Link } from 'gatsby';
import React from 'react';

import { Layout } from '../components/layout';
import { PostTags } from '../components/post-tags';
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
                isoDate: date
                title
                tags
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
        cover?: {
            childImageSharp: {
                fixed: {
                    src: string;
                };
            };
        };
        coverAlt?: string;
        date: string;
        description?: string;
        isoDate: string;
        tags?: string[];
        title: string;
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

    const seoImageSource = post.frontmatter.cover
        ? post.frontmatter.cover.childImageSharp.fixed.src
        : undefined;
    const seoArticleMetadata = {
        publishedDate: post.frontmatter.isoDate,
        tags: post.frontmatter.tags,
    };

    return (
        <Layout headerTitle={post.frontmatter.title}>
            <SEO
                article={seoArticleMetadata}
                description={post.frontmatter.description || post.excerpt}
                imageAlt={post.frontmatter.coverAlt || undefined}
                imageSrc={seoImageSource}
                pathname={props.pageContext.slug}
                title={post.frontmatter.title}
            />
            <h2 className={styles.postDate}>{post.frontmatter.date}</h2>
            <div className={styles.blogContent} dangerouslySetInnerHTML={{ __html: post.html }} />
            <PostTags tags={post.frontmatter.tags} />
            <a
                className={styles.suggestAnEdit}
                title="Suggest an edit to this post on Github"
                href={githubEditUrl}>
                Suggest an edit to this post
            </a>
            <hr className={styles.bottomSeparator} />
            <ul className={styles.postNavigation}>
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
