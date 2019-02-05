import { graphql, Link, StaticQuery } from 'gatsby';
import Img, { GatsbyImageProps } from 'gatsby-image';
import React from 'react';

import styles from './header.module.scss';

const query = graphql`
    query {
        topImage: file(relativePath: { eq: "top-image.png" }) {
            childImageSharp {
                fluid(maxWidth: 1280) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
    }
`;

interface Data {
    topImage: {
        childImageSharp: GatsbyImageProps;
    };
}

interface Props {
    title: string;
}

export const Header: React.FC<Props> = props => (
    <StaticQuery
        query={query}
        render={(data: Data) => {
            return (
                <header className={styles.header}>
                    <Img fluid={data.topImage.childImageSharp.fluid} className={styles.topImage} />
                    <Link className={styles.homeLink} title="Go to main page" to="/">
                        GP
                    </Link>
                    <div className={styles.titleContainer}>
                        <h1 className={styles.title}>{props.title}</h1>
                    </div>
                </header>
            );
        }}
    />
);
