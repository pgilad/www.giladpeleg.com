const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const getPreviousPost = (index, posts) =>
    index === posts.length - 1 ? null : posts[index + 1].node;
const getNextPost = (index, posts) => (index === 0 ? null : posts[index - 1].node);

exports.createPages = async ({ graphql, actions }) => {
    const BlogPostTemplate = path.resolve(__dirname, 'src/templates/blog-post.tsx');

    const allMarkdown = await graphql(`
        {
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
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
    markdownFiles.forEach((post, index) => {
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

exports.onCreateNode = ({ node, actions, getNode }) => {
    if (node.internal.type === 'MarkdownRemark') {
        const value = createFilePath({ node, getNode });
        actions.createNodeField({
            name: 'slug',
            node,
            value,
        });
    }
};
