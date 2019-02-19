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
    lang?: string;
    meta?: any[];
    title?: string;
    url: string;
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

                const htmlAttributes = { lang };

                // TODO: this should come from page metadata
                const imageUrl = url + data.siteImage.childImageSharp.fixed.src;
                // TODO: this should come from page metadata
                const imageDescription =
                    'A picture of me sitting next to a melting iceberg in Landmannalaugar, Iceland';

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
