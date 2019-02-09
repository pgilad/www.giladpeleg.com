import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

const query = graphql`
    query {
        site {
            siteMetadata {
                author
                description
                keywords
                title
                twitterUsername
            }
        }
    }
`;

interface Props {
    description?: string;
    keywords?: string[];
    lang?: string;
    meta?: any[];
    title?: string;
}

interface Data {
    site: {
        siteMetadata: {
            author: string;
            description: string;
            keywords: string[];
            title: string;
            twitterUsername: string;
        };
    };
}

export const SEO: React.FC<Props> = ({
    description = '',
    keywords = [],
    lang = 'en',
    meta = [],
    title = '',
}) => {
    return (
        <StaticQuery
            query={query}
            render={(data: Data) => {
                const metaDescription = description || data.site.siteMetadata.description;
                const metaKeywords =
                    keywords.length > 0 ? keywords : data.site.siteMetadata.keywords;
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
                        ]
                            .concat(
                                metaKeywords.length > 0
                                    ? {
                                          name: 'keywords',
                                          content: metaKeywords.join(', '),
                                      }
                                    : []
                            )
                            .concat(meta)}
                    />
                );
            }}
        />
    );
};
