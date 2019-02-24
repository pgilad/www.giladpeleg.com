import { graphql, Link, StaticQuery } from 'gatsby';
import Img, { GatsbyImageProps } from 'gatsby-image';
import React from 'react';

import styles from './header.module.css';

const query = graphql`
    query Header {
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

const imgTitle = 'A picture of me sitting next to a melting iceberg in Landmannalaugar, Iceland';

export const Header: React.FC<Props> = props => (
    <StaticQuery
        query={query}
        render={(data: Data) => {
            return (
                <header className={styles.header}>
                    <Img
                        fluid={data.topImage.childImageSharp.fluid}
                        className={styles.topImage}
                        alt={imgTitle}
                        title={imgTitle}
                    />
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
