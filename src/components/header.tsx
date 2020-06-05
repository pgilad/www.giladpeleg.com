import { graphql, Link, StaticQuery } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import React from "react";

import styles from "./header.module.css";
import { HeaderQuery } from "../graphql";
import assert from "assert";

const query = graphql`
    query Header {
        headerImage: file(relativePath: { eq: "header-image.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 400) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
    }
`;

interface Props {
    title: string;
}

const imgTitle = "My kid pointing out that line 17 is missing a semi-colon";

export const Header: React.FC<Props> = (props) => (
    <StaticQuery
        query={query}
        render={(data: HeaderQuery) => {
            assert(data.headerImage?.childImageSharp?.fluid);

            return (
                <header className={styles.header}>
                    <div style={{ backgroundColor: "#258a71" }}>
                        <Img
                            fluid={data.headerImage.childImageSharp.fluid as FluidObject}
                            className={styles.headerImage}
                            alt={imgTitle}
                            title={imgTitle}
                        />
                    </div>
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
