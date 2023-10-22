import React from "react";

import * as styles from "./post-tags.module.css";

interface Props {
    tags: string[];
}

export const PostTags: React.FC<Props> = (props) => {
    if (!props.tags || props.tags.length === 0) {
        return null;
    }
    return (
        <ul className={styles.tagsContainer}>
            {props.tags.map((tag) => {
                return (
                    <li key={tag} className={styles.tag} title={tag}>
                        {tag}
                    </li>
                );
            })}
        </ul>
    );
};
