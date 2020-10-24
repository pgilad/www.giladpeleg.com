import { Link } from "gatsby";
import React from "react";

import emailIcon from "../images/icons/iconmonstr-email-2.svg";
import githubIcon from "../images/icons/iconmonstr-github-1.svg";
import linkedinIcon from "../images/icons/iconmonstr-linkedin-3.svg";
import postsIcon from "../images/icons/iconmonstr-note-19.svg";
import feedIcon from "../images/icons/iconmonstr-rss-feed-1.svg";
import twitterIcon from "../images/icons/iconmonstr-twitter-1.svg";

import styles from "./home-right-overview.module.css";

export const HomeRightOverview = (): JSX.Element => {
    return (
        <div style={{ minWidth: "250px" }}>
            <Link to="/">Gilad Peleg</Link>
            <div className={styles.meTag}>Developer and manager.</div>
            <div className={styles.link}>
                See my code:{" "}
                <a href="https://github.com/pgilad">
                    Github{" "}
                    <img
                        height="20"
                        width="20"
                        src={githubIcon}
                        className={styles.linkIcon}
                        alt="Github icon"
                    />
                </a>
            </div>
            <div className={styles.link}>
                Follow me at:{" "}
                <a href="https://twitter.com/GiladPeleg">
                    Twitter{" "}
                    <img
                        height="20"
                        width="20"
                        src={twitterIcon}
                        className={styles.linkIcon}
                        alt="Twitter icon"
                    />
                </a>
            </div>
            <div className={styles.link}>
                See my resume:{" "}
                <a href="https://www.linkedin.com/in/giladpeleg">
                    LinkedIn{" "}
                    <img
                        height="20"
                        width="20"
                        src={linkedinIcon}
                        className={styles.linkIcon}
                        alt="LinkedIn icon"
                    />
                </a>
            </div>
            <div className={styles.link}>
                Send me a pigeon:{" "}
                <a href="mailto:gilad@giladpeleg.com">
                    Email{" "}
                    <img
                        height="20"
                        width="20"
                        src={emailIcon}
                        className={styles.linkIcon}
                        alt="Email icon"
                    />
                </a>
            </div>
            <div className={styles.link}>
                Things I write about:{" "}
                <Link to="/">
                    Posts{" "}
                    <img
                        height="20"
                        width="20"
                        src={postsIcon}
                        className={styles.linkIcon}
                        alt="Posts icon"
                    />
                </Link>
            </div>
            <div className={styles.link}>
                Follow this blog:{" "}
                <a rel="alternate" type="application/rss+xml" href="/rss.xml">
                    RSS
                    <img
                        height="20"
                        width="20"
                        src={feedIcon}
                        className={styles.linkIcon}
                        alt="RSS Feed icon"
                    />
                </a>
            </div>
        </div>
    );
};
