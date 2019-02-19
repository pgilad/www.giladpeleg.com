const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const getPreviousPost = (index, posts) =>
    index === posts.length - 1 ? null : posts[index + 1].node;
const getNextPost = (index, posts) => (index === 0 ? null : posts[index - 1].node);

exports.createPages = async ({ graphql, actions }) => {
    const blogPostTemplate = path.resolve(__dirname, 'src/templates/blog-post.tsx');

    const result = await graphql(`
        {
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
                edges {
                    node {
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                        }
                    }
                }
            }
        }
    `);

    if (result.errors) {
        throw result.errors;
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach((post, index) => {
        const previous = getPreviousPost(index, posts);
        const next = getNextPost(index, posts);

        const slug = post.node.fields.slug;

        actions.createPage({
            path: slug,
            component: blogPostTemplate,
            context: {
                slug,
                previous,
                next,
            },
        });
    });
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
