import { createFilePath } from "gatsby-source-filesystem";

import { GatsbyCreateNode } from "./types";

export const onCreateNode: GatsbyCreateNode = ({ node, actions, getNode }) => {
    if (node.internal.type === "MarkdownRemark") {
        const value = createFilePath({ node, getNode });

        actions.createNodeField({
            name: "slug",
            node,
            value,
        });
    }
};
