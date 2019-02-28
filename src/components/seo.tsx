import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

import { combineURLs } from '../utils/urls';

const DEFAULT_IMAGE_ALT =
    'A picture of me sitting next to a melting iceberg in Landmannalaugar, Iceland';

interface OpenGraphMetaTag extends MetaTag {
    content: string;
    property: string;
}

interface TwitterMetaTag extends MetaTag {
    content: string;
    name: string;
}

interface MetaTag {
    content?: string;
    name?: string;
    property?: string;
}

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
    article?: {
        modifiedDate?: string;
        publishedDate: string;
        tags?: string[];
    };
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
    article,
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

                const twitterMetaTags: TwitterMetaTag[] = [
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
                        name: 'twitter:image',
                        content: imageUrl,
                    },
                    {
                        name: 'twitter:image:alt',
                        content: imageDescription,
                    },
                ];

                const openGraphImageWidth = '1200';
                const openGraphImageHeight = '630';
                const openGraphMetaTags: OpenGraphMetaTag[] = [
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
                        content: openGraphImageWidth,
                    },
                    {
                        property: 'og:image:height',
                        content: openGraphImageHeight,
                    },
                    {
                        property: 'og:locale',
                        content: 'en_US',
                    },
                ];

                if (article) {
                    openGraphMetaTags.push(
                        {
                            property: 'og:type',
                            content: 'article',
                        },
                        {
                            property: 'og:article:author',
                            content: data.site.siteMetadata.author,
                        },
                        {
                            property: 'og:article:published_time',
                            content: article.publishedDate,
                        }
                    );
                    new Set(article.tags).forEach(tag => {
                        openGraphMetaTags.push({
                            property: 'og:article:tag',
                            content: tag,
                        });
                    });
                } else {
                    openGraphMetaTags.push({
                        property: 'og:type',
                        content: 'website',
                    });
                }

                const generalMetaTags: MetaTag[] = [
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
                ];

                const metaTags: any[] = generalMetaTags.concat(
                    openGraphMetaTags,
                    twitterMetaTags,
                    meta
                );

                return <Helmet htmlAttributes={htmlAttributes} title={pageTitle} meta={metaTags} />;
            }}
        />
    );
};
