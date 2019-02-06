import { Link } from 'gatsby';
import React from 'react';

import styles from './home-recent-posts.module.css';

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

export const HomeRecentPosts: React.FC<Props> = ({ posts }) => {
    return (
        <div style={{ paddingRight: '50px' }}>
            {posts.map(({ node }) => {
                const title = node.frontmatter.title || node.fields.slug;
                return (
                    <div key={node.fields.slug} className={styles.blogPost}>
                        <div>{node.frontmatter.date}</div>
                        <h3
                            style={{
                                marginBottom: '0.4375rem',
                            }}>
                            <Link className={styles.blogPostLink} to={node.fields.slug}>
                                {title}
                            </Link>
                        </h3>
                    </div>
                );
            })}
        </div>
    );
};
