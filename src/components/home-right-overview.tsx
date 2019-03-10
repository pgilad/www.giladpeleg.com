import { Link } from 'gatsby';
import React from 'react';

import emailIcon from '../images/icons/iconmonstr-email-2.svg';
import githubIcon from '../images/icons/iconmonstr-github-1.svg';
import linkedinIcon from '../images/icons/iconmonstr-linkedin-3.svg';
import postsIcon from '../images/icons/iconmonstr-note-19.svg';
import twitterIcon from '../images/icons/iconmonstr-twitter-1.svg';

import styles from './home-right-overview.module.css';

export const HomeRightOverview = () => {
    return (
        <div style={{ minWidth: '250px' }}>
            <Link to="/">Gilad Peleg</Link>
            <div className={styles.meTag}>Developer and manager.</div>
            <div className={styles.link}>
                See my code: <a href="https://github.com/pgilad">Github</a>
                <img src={githubIcon} className={styles.linkIcon} alt="Github icon" />
            </div>
            <div className={styles.link}>
                Follow me at: <a href="https://twitter.com/GiladPeleg">Twitter</a>
                <img src={twitterIcon} className={styles.linkIcon} alt="Twitter icon" />
            </div>
            <div className={styles.link}>
                See my resume: <a href="https://www.linkedin.com/in/giladpeleg">LinkedIn</a>
                <img src={linkedinIcon} className={styles.linkIcon} alt="LinkedIn icon" />
            </div>
            <div className={styles.link}>
                Send me a pigeon: <a href="mailto:gilad@giladpeleg.com">Email</a>
                <img src={emailIcon} className={styles.linkIcon} alt="Email icon" />
            </div>
            <div className={styles.link}>
                Things I write about: <Link to="/">Posts</Link>
                <img src={postsIcon} className={styles.linkIcon} alt="Posts icon" />
            </div>
        </div>
    );
};
