import { Link } from "gatsby";
import React from "react";

import styles from "./home-recent-posts.module.css";

interface Props {
    posts: {
        node: {
            excerpt: string;
            frontmatter: {
                title: string;
                date: string;
            };
            fields: {
                slug: string;
            };
        };
    }[];
}

export const HomeRecentPosts: React.FC<Props> = (props) => (
    <div className={styles.blogPostList}>
        {props.posts.map(({ node }) => {
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
