import { Article, Data } from '../components/seo';

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
