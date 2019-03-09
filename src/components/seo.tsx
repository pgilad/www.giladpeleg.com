import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

import {
    getDescription,
    getGeneralMetaTags,
    getOpenGraphMetaTags,
    getPageTitle,
    getSchemaOrgJSONLD,
    getTwitterMetaTags,
    MetaTag,
} from '../utils/seo';
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

export interface Article {
    description: string;
    modifiedDate?: string;
    publishedDate: string;
    tags?: string[];
    title: string;
}

interface Props {
    article?: Article;
    imageAlt?: string;
    imageSrc?: string;
    lang?: string;
    meta?: any[];
    overrideDescription?: string;
    overrideTitle?: string;
    pathname?: string;
}

export interface Data {
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
    article,
    imageAlt = null,
    imageSrc = null,
    lang = 'en',
    meta = [],
    overrideDescription = '',
    overrideTitle = '',
    pathname = '/',
}) => {
    return (
        <StaticQuery
            query={query}
            render={(data: Data) => {
                const description = getDescription(data, overrideDescription, article);
                const pageTitle = getPageTitle(data, article, overrideTitle);

                const htmlAttributes = { lang };

                const imageUrl = combineURLs(
                    data.site.siteMetadata.siteUrl,
                    imageSrc || data.siteImage.childImageSharp.fixed.src
                );
                const imageDescription = imageAlt || DEFAULT_IMAGE_ALT;
                const url = combineURLs(data.site.siteMetadata.siteUrl, pathname || '/');

                const twitterMetaTags = getTwitterMetaTags({
                    data,
                    description,
                    imageDescription,
                    imageUrl,
                    pageTitle,
                });

                const openGraphMetaTags = getOpenGraphMetaTags({
                    article,
                    data,
                    description,
                    imageDescription,
                    imageUrl,
                    pageTitle,
                    url,
                });

                const generalMetaTags = getGeneralMetaTags(description, data);

                const metaTags: MetaTag[] = generalMetaTags.concat(
                    openGraphMetaTags,
                    twitterMetaTags,
                    meta
                );

                const schemaOrgJSONLD = getSchemaOrgJSONLD({
                    article,
                    data,
                    imageUrl,
                    url,
                });

                return (
                    <Helmet
                        htmlAttributes={htmlAttributes}
                        meta={metaTags}
                        script={[
                            {
                                type: 'application/ld+json',
                                innerHTML: JSON.stringify(schemaOrgJSONLD),
                            },
                        ]}
                        title={pageTitle}
                    />
                );
            }}
        />
    );
};
