import { graphql, Link } from "gatsby";
import { getSrc, ImageDataLike } from "gatsby-plugin-image";
import React from "react";

import { Layout } from "../components/layout";
import { PostTags } from "../components/post-tags";
import { Article, PageHead } from "../components/seo";
import { combineURLs } from "../utils/urls";
import * as styles from "./blog-post.module.css";

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
                isoDate: date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
                title
                tags
                coverAlt
                cover {
                    childImageSharp {
                        gatsbyImageData(layout: FIXED, width: 1200, height: 630)
                    }
                }
            }
        }
    }
`;

export interface PageContext {
    next: Queries.AllMarkdownFilesQuery["allMarkdownRemark"]["edges"][0]["node"];
    previous: Queries.AllMarkdownFilesQuery["allMarkdownRemark"]["edges"][0]["node"];
    slug: string;
    tags: string[];
}

interface Props {
    data: Queries.BlogPostQuery;
    // Received from createPage
    pageContext: PageContext;
}

const GITHUB_CONTENT_URL = "https://github.com/pgilad/www.giladpeleg.com/blob/master/content";

const BlogTemplate: React.FC<Props> = ({ data, ...props }) => {
    const post = data.markdownRemark;
    const { previous, next, slug } = props.pageContext;
    const githubEditUrl = combineURLs(GITHUB_CONTENT_URL, combineURLs(slug, "index.md"));

    if (
        !post ||
        !post.excerpt ||
        !post.frontmatter ||
        !post.frontmatter.tags ||
        !post.frontmatter.title
    ) {
        throw new Error("Invalid fields");
    }

    const tags = post.frontmatter.tags.filter(Boolean) as string[];

    return (
        <Layout headerTitle={post.frontmatter.title}>
            <h1 className={styles.postTitle}>{post.frontmatter.title}</h1>
            <h2 className={styles.postDate}>{post.frontmatter.date}</h2>
            <div className={styles.blogContent} dangerouslySetInnerHTML={{ __html: post.html! }} />
            <PostTags tags={tags} />
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
export const Head: React.FC<Props> = ({ data, ...props }) => {
    const post = data.markdownRemark;

    if (
        !post ||
        !post.excerpt ||
        !post.frontmatter ||
        !post.frontmatter.tags ||
        !post.frontmatter.title ||
        !post.frontmatter.isoDate
    ) {
        throw new Error("Invalid fields");
    }

    const tags = post.frontmatter.tags.filter(Boolean) as string[];

    if (!post.frontmatter.cover?.childImageSharp) {
        // throw new Error("Missing cover");
    }

    const seoImageSource = post.frontmatter.cover
        ? getSrc(post.frontmatter.cover as ImageDataLike)
        : null;
    const seoArticleMetadata: Article = {
        description: post.excerpt,
        publishedDate: post.frontmatter.isoDate,
        tags: tags,
        title: post.frontmatter.title,
    };

    return (
        <PageHead
            article={seoArticleMetadata}
            imageAlt={post.frontmatter.coverAlt || undefined}
            imageSrc={seoImageSource}
            pathname={props.pageContext.slug}
        />
    );
};

// noinspection JSUnusedGlobalSymbols
export default BlogTemplate;
