import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

import { combineURLs } from '../utils/urls';

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

interface Article {
    modifiedDate?: string;
    publishedDate: string;
    tags?: string[];
}

interface Props {
    article?: Article;
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

const getTwitterMetaTags = (options: {
    data: Data;
    imageDescription: string;
    imageUrl: string;
    metaDescription: string;
    pageTitle: string;
}) => {
    return [
        {
            name: 'twitter:card',
            content: 'summary',
        },
        {
            name: 'twitter:creator',
            content: options.data.site.siteMetadata.twitterUsername,
        },
        {
            name: 'twitter:site',
            content: options.data.site.siteMetadata.twitterUsername,
        },
        {
            name: 'twitter:title',
            content: options.pageTitle,
        },
        {
            name: 'twitter:description',
            content: options.metaDescription,
        },
        {
            name: 'twitter:image',
            content: options.imageUrl,
        },
        {
            name: 'twitter:image:alt',
            content: options.imageDescription,
        },
    ] as TwitterMetaTag[];
};

const getOpenGraphMetaTags = (options: {
    article?: Article;
    data: Data;
    imageDescription: string;
    imageUrl: string;
    metaDescription: string;
    pageTitle: string;
    url: string;
}) => {
    const openGraphImageWidth = '1200';
    const openGraphImageHeight = '630';

    const tags: OpenGraphMetaTag[] = [
        {
            property: 'og:title',
            content: options.pageTitle,
        },
        {
            property: 'og:site_name',
            content: options.data.site.siteMetadata.title,
        },
        {
            property: 'og:description',
            content: options.metaDescription,
        },
        {
            property: 'og:url',
            content: options.url,
        },
        {
            property: 'og:image',
            content: options.imageUrl,
        },
        {
            property: 'og:image:alt',
            content: options.imageDescription,
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

    if (options.article) {
        tags.push(
            {
                property: 'og:type',
                content: 'article',
            },
            {
                property: 'article:author',
                content: options.data.site.siteMetadata.author,
            },
            {
                property: 'article:published_time',
                content: options.article.publishedDate,
            }
        );
        new Set(options.article.tags).forEach(tag => {
            tags.push({
                property: 'article:tag',
                content: tag,
            });
        });
    } else {
        tags.push({
            property: 'og:type',
            content: 'website',
        });
    }

    return tags;
};

const getGeneralMetaTags = (metaDescription: string, data: Data) => {
    return [
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
    ] as MetaTag[];
};

export const SEO: React.FC<Props> = ({
    article,
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

                const twitterMetaTags = getTwitterMetaTags({
                    data,
                    imageDescription,
                    imageUrl,
                    metaDescription,
                    pageTitle,
                });

                const openGraphMetaTags = getOpenGraphMetaTags({
                    article,
                    data,
                    imageDescription,
                    imageUrl,
                    metaDescription,
                    pageTitle,
                    url,
                });

                const generalMetaTags = getGeneralMetaTags(metaDescription, data);

                const metaTags: MetaTag[] = generalMetaTags.concat(
                    openGraphMetaTags,
                    twitterMetaTags,
                    meta
                );

                return <Helmet htmlAttributes={htmlAttributes} title={pageTitle} meta={metaTags} />;
            }}
        />
    );
};
