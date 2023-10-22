import { Link } from "gatsby";
import React from "react";

import * as styles from "./header.module.css";
import { NavMenu } from "./nav-menu";

interface Props {
    title: string;
}

export const Header: React.FC<Props> = () => {
    return (
        <header className={styles.header}>
            <NavMenu />
            <div className={styles.titleContainer}>
                <Link to="/" className={styles.titleLinkWrapper} title="Home">
                    <div className={styles.title}>Gilad Peleg</div>
                </Link>
            </div>
        </header>
    );
};
