import { createFilePath } from "gatsby-source-filesystem";

import { GatsbyNode } from "gatsby";

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
