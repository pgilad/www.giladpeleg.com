import { Article, Data } from '../components/seo';

import { combineURLs } from './urls';

export interface OpenGraphMetaTag extends MetaTag {
    content: string;
    property: string;
}

export interface TwitterMetaTag extends MetaTag {
    content: string;
    name: string;
}

export interface MetaTag {
    content?: string;
    name?: string;
    property?: string;
}

export const getTwitterMetaTags = (options: {
    data: Data;
    description: string;
    imageDescription: string;
    imageUrl: string;
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
            content: options.description,
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

export const getOpenGraphMetaTags = (options: {
    article?: Article;
    data: Data;
    description: string;
    imageDescription: string;
    imageUrl: string;
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
            content: options.description,
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

export const getGeneralMetaTags = (description: string, data: Data) => {
    return [
        {
            name: 'description',
            content: description,
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

interface Entity {
    '@context': string;
    '@type': string;

    [key: string]: any;
}

export const getSchemaOrgJSONLD = (options: {
    article?: Article;
    data: Data;
    imageUrl: string;
    url: string;
}) => {
    const website = {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        name: options.data.site.siteMetadata.title,
        url: options.data.site.siteMetadata.siteUrl,
    };
    const schema: Entity[] = [website];

    if (options.article) {
        const blogPosting = {
            '@context': 'http://schema.org',
            '@type': 'BlogPosting',
            author: {
                '@type': 'Person',
                name: options.data.site.siteMetadata.author,
                url: options.data.site.siteMetadata.siteUrl,
            },
            dateModified: options.article.publishedDate,
            datePublished: options.article.publishedDate,
            description: options.article.description,
            headline: options.article.title,
            image: {
                '@type': 'ImageObject',
                url: options.imageUrl,
                width: 1200,
                height: 630,
            },
            mainEntityOfPage: options.url,
            name: options.article.title,
            url: options.url,
            publisher: {
                '@id': options.data.site.siteMetadata.siteUrl,
                '@type': 'Organization',
                name: options.data.site.siteMetadata.author,
                url: options.data.site.siteMetadata.siteUrl,
                logo: {
                    '@type': 'ImageObject',
                    url: combineURLs(
                        options.data.site.siteMetadata.siteUrl,
                        '/icons/icon-48x48.png'
                    ),
                    width: 48,
                    height: 48,
                },
            },
        };

        const breadcrumbList = {
            '@context': 'http://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    item: {
                        '@id': options.url,
                        image: options.imageUrl,
                        name: options.article.title,
                    },
                },
            ],
        };

        schema.push(breadcrumbList, blogPosting);
    }

    return schema;
};

export const getDescription = (data: Data, overrideDescription?: string, article?: Article) => {
    if (overrideDescription) {
        return overrideDescription;
    }
    if (article) {
        return article.description;
    }
    return data.site.siteMetadata.description;
};

export const getPageTitle = (data: Data, article?: Article, overrideTitle?: string): string => {
    if (overrideTitle) {
        return `${overrideTitle} | ${data.site.siteMetadata.title}`;
    }
    if (article) {
        return `${article.title} | ${data.site.siteMetadata.title}`;
    }
    return data.site.siteMetadata.title;
};

export const getMetaTags = (options: {
    article?: Article;
    data: Data;
    description: string;
    imageDescription: string;
    imageUrl: string;
    meta: MetaTag[];
    pageTitle: string;
    url: string;
}): MetaTag[] => {
    const twitterMetaTags = getTwitterMetaTags({
        data: options.data,
        description: options.description,
        imageDescription: options.imageDescription,
        imageUrl: options.imageUrl,
        pageTitle: options.pageTitle,
    });

    const openGraphMetaTags = getOpenGraphMetaTags({
        article: options.article,
        data: options.data,
        description: options.description,
        imageDescription: options.imageDescription,
        imageUrl: options.imageUrl,
        pageTitle: options.pageTitle,
        url: options.url,
    });

    const generalMetaTags = getGeneralMetaTags(options.description, options.data);

    return generalMetaTags.concat(openGraphMetaTags, twitterMetaTags, options.meta);
};
