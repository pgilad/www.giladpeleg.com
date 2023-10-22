import path from "node:path";

import { GatsbyNode } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";

const getPreviousPost = (
    index: number,
    posts: Queries.AllMarkdownFilesQuery["allMarkdownRemark"]["edges"],
) => {
    return index === posts.length - 1 ? null : posts[index + 1].node;
};

const getNextPost = (
    index: number,
    posts: Queries.AllMarkdownFilesQuery["allMarkdownRemark"]["edges"],
) => {
    return index === 0 ? null : posts[index - 1].node;
};

// noinspection JSUnusedGlobalSymbols
export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, actions, getNode }) => {
    if (node.internal.type === "MarkdownRemark") {
        const value = createFilePath({ node, getNode });

        actions.createNodeField({
            name: "slug",
            node,
            value,
        });
    }
};

// noinspection JSUnusedGlobalSymbols
export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
    const BlogPostTemplate = path.resolve(__dirname, "./src/templates/blog-post.tsx");

    const allMarkdown = await graphql<Queries.AllMarkdownFilesQuery>(`
        query AllMarkdownFiles {
            allMarkdownRemark(
                limit: 1000
                filter: { frontmatter: { draft: { ne: true } } }
                sort: { frontmatter: { date: DESC } }
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

    if (allMarkdown.errors?.length > 0) {
        reporter.panicOnBuild("Got the following build errors:", allMarkdown.errors);
        return;
    }

    const markdownFiles = allMarkdown?.data?.allMarkdownRemark.edges || [];

    // Generate blog pages
    markdownFiles.forEach((post: any, index: number) => {
        if (!post.node.fields?.slug || !post.node.frontmatter?.tags) {
            throw new Error("Invalid fields");
        }

        actions.createPage({
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

// noinspection JSUnusedGlobalSymbols
export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {},
        },
    });
};
