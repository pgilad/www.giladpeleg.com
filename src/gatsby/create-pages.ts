import path from "path";
import assert from "assert";

import { GatsbyNode } from "gatsby";
import { CreatePagesQuery } from "../generated/graphql";
import { PageContext } from "../templates/blog-post";

type Post = CreatePagesQuery["allMarkdownRemark"]["edges"][0];

const getPreviousPost = (index: number, posts: Post[]) => {
    return index === posts.length - 1 ? null : posts[index + 1].node;
};
const getNextPost = (index: number, posts: Post[]) => {
    return index === 0 ? null : posts[index - 1].node;
};

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
    const BlogPostTemplate = path.resolve(__dirname, "../templates/blog-post.tsx");

    const allMarkdown = await graphql<CreatePagesQuery>(`
        query CreatePages {
            allMarkdownRemark(
                limit: 1000
                filter: { frontmatter: { draft: { ne: true } } }
                sort: { fields: [frontmatter___date], order: DESC }
            ) {
                edges {
                    node {
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                            tags
                        }
                    }
                }
            }
        }
    `);

    if (allMarkdown.errors) {
        throw allMarkdown.errors;
    }

    const markdownFiles = allMarkdown?.data?.allMarkdownRemark.edges || [];

    // Generate blog pages
    markdownFiles.forEach((post, index: number) => {
        assert(post.node.fields?.slug);
        assert(post.node.frontmatter?.tags);

        actions.createPage<PageContext>({
            component: BlogPostTemplate,
            path: post.node.fields.slug,
            context: {
                next: getNextPost(index, markdownFiles),
                previous: getPreviousPost(index, markdownFiles),
                slug: post.node.fields.slug,
                tags: post.node.frontmatter.tags,
            },
        });
    });

    // const uniqueTags = new Set(markdownFiles.flatMap(page => page.node.frontmatter.tags || []));

    // TODO: Generate tags
    // uniqueTags.forEach(tag => {
    //     actions.createPage({
    //         path: `tags/${tag}`,
    //         component: PostsByTagTemplate,
    //         context: {
    //             tag: tag,
    //         },
    //     });
    // });
};
