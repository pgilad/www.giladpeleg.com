import { Link } from "gatsby";
import React from "react";

import styles from "./home-recent-posts.module.css";
import { IndexPageQuery } from "../graphql";
import assert from "assert";

type Post = IndexPageQuery["allMarkdownRemark"]["edges"][0];

type Props = {
    posts: Post[];
};

export const HomeRecentPosts: React.FC<Props> = (props) => (
    <div className={styles.blogPostList}>
        {props.posts.map(({ node }) => {
            assert(node.fields);
            assert(node.fields.slug);
            assert(node.frontmatter);

            return (
                <div key={node.fields.slug} className={styles.blogPost}>
                    <div>{node.frontmatter.date}</div>
                    <h3 className={styles.blogPostTitle}>
                        <Link className={styles.blogPostLink} to={node.fields.slug}>
                            {node.frontmatter.title || node.fields.slug}
                        </Link>
                    </h3>
                </div>
            );
        })}
    </div>
);
