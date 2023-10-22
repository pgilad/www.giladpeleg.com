import { Link } from "gatsby";
import React from "react";

import * as styles from "./recent-posts.module.css";

type Props = {
    posts: Queries.PostsPageQuery["allMarkdownRemark"]["edges"];
};

export const RecentPosts = (props: Props) => (
    <div className={styles.blogPostList}>
        {props.posts.map(({ node }) => {
            if (!node.fields || !node.fields.slug || !node.frontmatter) {
                throw new Error("Invalid fields");
            }

            return (
                <div key={node.fields.slug} className={styles.blogPost}>
                    <div>{node.frontmatter.date}</div>
                    <h3 className={styles.blogPostTitle}>
                        <Link className={styles.blogPostLink} to={node.fields.slug}>
                            {node.frontmatter.title || node.fields.slug}
                        </Link>
                    </h3>
                    <div>{node.excerpt}</div>
                </div>
            );
        })}
    </div>
);
