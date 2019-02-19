import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

import { combineURLs } from '../utils/urls';

const DEFAULT_IMAGE_ALT =
    'A picture of me sitting next to a melting iceberg in Landmannalaugar, Iceland';

const query = graphql`
    query SEO {
        site {
            siteMetadata {
                author
                description
                siteUrl
                title
                twitterUsername
            }
        }
        siteImage: file(relativePath: { eq: "top-image.png" }) {
            childImageSharp {
                fixed(width: 1200, height: 630) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
    }
`;

interface Props {
    description?: string;
    imageAlt?: string;
    imageSrc?: string;
    lang?: string;
    meta?: any[];
    pathname?: string;
    title?: string;
}

interface Data {
    siteImage: {
        childImageSharp: {
            fixed: {
                src: string;
            };
        };
    };
    site: {
        siteMetadata: {
            author: string;
            description: string;
            siteUrl: string;
            title: string;
            twitterUsername: string;
        };
    };
}

export const SEO: React.FC<Props> = ({
    description = '',
    imageAlt = null,
    imageSrc = null,
    lang = 'en',
    meta = [],
    pathname = '/',
    title = '',
}) => {
    return (
        <StaticQuery
            query={query}
            render={(data: Data) => {
                const metaDescription = description || data.site.siteMetadata.description;
                const pageTitle = title
                    ? `${title} | ${data.site.siteMetadata.title}`
                    : data.site.siteMetadata.title;

                const htmlAttributes = { lang };

                const imageUrl = combineURLs(
                    data.site.siteMetadata.siteUrl,
                    imageSrc || data.siteImage.childImageSharp.fixed.src
                );
                const imageDescription = imageAlt || DEFAULT_IMAGE_ALT;
                const url = combineURLs(data.site.siteMetadata.siteUrl, pathname || '/');

                const twitterMetaTags: any[] = [
                    {
                        name: 'twitter:card',
                        content: 'summary',
                    },
                    {
                        name: 'twitter:creator',
                        content: data.site.siteMetadata.twitterUsername,
                    },
                    {
                        name: 'twitter:site',
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
                        property: 'twitter:image',
                        content: imageUrl,
                    },
                    {
                        property: 'twitter:image:alt',
                        content: imageDescription,
                    },
                ];

                const openGraphMetaTags: any[] = [
                    {
                        property: 'og:title',
                        content: pageTitle,
                    },
                    {
                        property: 'og:site_name',
                        content: data.site.siteMetadata.title,
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
                        property: 'og:image',
                        content: imageUrl,
                    },
                    {
                        property: 'og:image:alt',
                        content: imageDescription,
                    },
                    {
                        property: 'og:image:type',
                        content: 'image/png',
                    },
                    {
                        property: 'og:image:width',
                        content: '1200',
                    },
                    {
                        property: 'og:image:height',
                        content: '630',
                    },
                ];

                const metaTags: any[] = [
                    {
                        name: 'description',
                        content: metaDescription,
                    },
                    {
                        name: 'author',
                        content: data.site.siteMetadata.author,
                    },
                    {
                        name: 'robots',
                        content: 'index, follow',
                    },
                ].concat(openGraphMetaTags, twitterMetaTags, meta);

                return <Helmet htmlAttributes={htmlAttributes} title={pageTitle} meta={metaTags} />;
            }}
        />
    );
};
