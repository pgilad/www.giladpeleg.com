import path from "path";

import { GatsbyCreatePages } from "./types";

interface Post {
    node: {
        fields: {
            slug: string;
            tags: string[];
        };
    };
}

const getPreviousPost = (index: number, posts: Post[]) => {
    return index === posts.length - 1 ? null : posts[index + 1].node;
};
const getNextPost = (index: number, posts: Post[]) => {
    return index === 0 ? null : posts[index - 1].node;
};

interface AllMarkdown {
    errors?: string[];
    data: {
        allMarkdownRemark: {
            edges: Post[];
        };
    };
}

// noinspection JSUnusedGlobalSymbols
export const createPages: GatsbyCreatePages = async ({ graphql, actions }) => {
    const BlogPostTemplate = path.resolve(__dirname, "../src/templates/blog-post.tsx");

    const allMarkdown: AllMarkdown = await graphql(`
        {
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
                            tags
                            title
                        }
                    }
                }
            }
        }
    `);

    if (allMarkdown.errors) {
        throw allMarkdown.errors;
    }

    const markdownFiles = allMarkdown.data.allMarkdownRemark.edges;

    // Generate blog pages
    markdownFiles.forEach((post, index: number) => {
        actions.createPage({
            component: BlogPostTemplate,
            path: post.node.fields.slug,
            context: {
                next: getNextPost(index, markdownFiles),
                previous: getPreviousPost(index, markdownFiles),
                slug: post.node.fields.slug,
                tags: post.node.fields.tags,
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
