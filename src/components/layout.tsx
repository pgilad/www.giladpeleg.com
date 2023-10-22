import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";

import { Header } from "./header";
import * as styles from "./header.module.css";

const query = graphql`
    query Layout {
        site {
            siteMetadata {
                title
            }
        }
    }
`;

interface Props {
    children: any;
    headerTitle?: string;
}

export const Layout: React.FC<Props> = ({ headerTitle, children }) => {
    const data: Queries.LayoutQuery = useStaticQuery(query);
    return (
        <>
            <Header title={headerTitle || data.site!.siteMetadata!.title || "No Title"} />
            <div className={styles.bodyContainer}>
                {children}
                <footer style={{ marginTop: "30px" }}>
                    © {new Date().getFullYear()} by <Link to="/">Gilad Peleg</Link>
                </footer>
            </div>
        </>
    );
};
