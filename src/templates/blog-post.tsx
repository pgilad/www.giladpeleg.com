import { graphql, Link } from "gatsby";
import React from "react";
import assert from "assert";

import { Layout } from "../components/layout";
import { PostTags } from "../components/post-tags";
import { SEO } from "../components/seo";
import { combineURLs } from "../utils/urls";
import { BlogPostQuery, CreatePagesQuery } from "../generated/graphql";

import styles from "./blog-post.module.css";

// noinspection JSUnusedGlobalSymbols
export const pageQuery = graphql`
    query BlogPost($slug: String!) {
        site {
            siteMetadata {
                author
                disqusShortName
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

type Page = CreatePagesQuery["allMarkdownRemark"]["edges"][0]["node"] | null;

export interface PageContext {
    next: Page;
    previous: Page;
    slug: string;
    tags: string[];
}

interface Props {
    data: BlogPostQuery;
    // Received from createPage
    pageContext: PageContext;
}

const GITHUB_CONTENT_URL = "https://github.com/pgilad/www.giladpeleg.com/blob/master/content";

const BlogTemplate: React.FC<Props> = (props) => {
    const post = props.data.markdownRemark;
    const { previous, next, slug } = props.pageContext;
    const githubEditUrl = combineURLs(GITHUB_CONTENT_URL, combineURLs(slug, "index.md"));

    assert(post);
    assert(post.excerpt);
    assert(post.frontmatter);
    assert(post.frontmatter.tags);
    assert(post.frontmatter.title);

    const seoImageSource = post?.frontmatter?.cover?.childImageSharp?.fixed?.src;
    const seoArticleMetadata = {
        description: post.excerpt,
        publishedDate: post.frontmatter.isoDate,
        tags: post.frontmatter.tags,
        title: post.frontmatter.title,
    };

    return (
        <Layout headerTitle={post.frontmatter.title}>
            <SEO
                article={seoArticleMetadata}
                imageAlt={post.frontmatter.coverAlt || undefined}
                imageSrc={seoImageSource}
                pathname={props.pageContext.slug}
            />
            <h2 className={styles.postDate}>{post.frontmatter.date}</h2>
            <div className={styles.blogContent} dangerouslySetInnerHTML={{ __html: post.html! }} />
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
                    {previous?.fields?.slug && previous?.frontmatter?.title && (
                        <Link to={previous.fields.slug} rel="prev">
                            ← {previous.frontmatter.title}
                        </Link>
                    )}
                </li>
                <li>
                    {next?.fields?.slug && next?.frontmatter?.title && (
                        <Link to={next.fields.slug} rel="next">
                            {next.frontmatter.title} →
                        </Link>
                    )}
                </li>
            </ul>
        </Layout>
    );
};

// noinspection JSUnusedGlobalSymbols
export default BlogTemplate;
