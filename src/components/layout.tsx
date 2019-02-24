import { graphql, Link, StaticQuery } from 'gatsby';
import React from 'react';

import { Header } from './header';

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

interface Data {
    site: {
        siteMetadata: {
            title: string;
        };
    };
}

export const Layout: React.FC<Props> = ({ headerTitle, children }) => (
    <StaticQuery
        query={query}
        render={(data: Data) => (
            <>
                <Header title={headerTitle || data.site.siteMetadata.title} />
                <div
                    style={{
                        margin: '0 auto',
                        maxWidth: 960,
                        padding: '0px 1.0875rem 1.45rem',
                        paddingTop: 0,
                    }}>
                    {children}
                    <footer style={{ marginTop: '30px' }}>
                        © {new Date().getFullYear()} by <Link to="/">Gilad Peleg</Link>
                    </footer>
                </div>
            </>
        )}
    />
);
