import { Link } from "gatsby";
import React from "react";

import * as styles from "./nav-menu.module.css";

export const NavMenu = () => (
    <ul className={styles.navContainer}>
        <li className={styles.navMenu}>
            <Link to="/posts" className={styles.navLink}>
                Posts
            </Link>
        </li>
        <li className={styles.navMenu}>
            <Link to="/about" className={styles.navLink}>
                About
            </Link>
        </li>
    </ul>
);
