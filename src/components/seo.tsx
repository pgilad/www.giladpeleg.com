import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

const query = graphql`
    query {
        site {
            siteMetadata {
                author
                description
                title
                twitterUsername
            }
        }
    }
`;

interface Props {
    description?: string;
    lang?: string;
    meta?: any[];
    title?: string;
    url: string;
}

interface Data {
    site: {
        siteMetadata: {
            author: string;
            description: string;
            title: string;
            twitterUsername: string;
        };
    };
}

export const SEO: React.FC<Props> = ({
    description = '',
    lang = 'en',
    meta = [],
    title = '',
    url,
}) => {
    return (
        <StaticQuery
            query={query}
            render={(data: Data) => {
                const metaDescription = description || data.site.siteMetadata.description;
                const pageTitle = title
                    ? `${title} | ${data.site.siteMetadata.title}`
                    : data.site.siteMetadata.title;

                return (
                    <Helmet
                        htmlAttributes={{
                            lang,
                        }}
                        title={pageTitle}
                        meta={[
                            {
                                name: 'description',
                                content: metaDescription,
                            },
                            {
                                name: 'author',
                                content: data.site.siteMetadata.author,
                            },
                            {
                                property: 'og:title',
                                content: pageTitle,
                            },
                            {
                                property: 'og:description',
                                content: metaDescription,
                            },
                            {
                                property: 'og:type',
                                content: 'website',
                            },
                            {
                                property: 'og:url',
                                content: url,
                            },
                            {
                                name: 'twitter:card',
                                content: 'summary',
                            },
                            {
                                name: 'twitter:creator',
                                content: data.site.siteMetadata.twitterUsername,
                            },
                            {
                                name: 'twitter:title',
                                content: pageTitle,
                            },
                            {
                                name: 'twitter:description',
                                content: metaDescription,
                            },
                            {
                                name: 'robots',
                                content: 'index, follow',
                            },
                        ].concat(meta)}
                    />
                );
            }}
        />
    );
};
