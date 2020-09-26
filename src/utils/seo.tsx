import { Article } from "../components/seo";
import { SeoQuery } from "../graphql";
import { combineURLs } from "./urls";

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
    data: SeoQuery;
    description: string;
    imageDescription: string;
    imageUrl: string;
    pageTitle: string;
}): TwitterMetaTag[] => {
    return [
        {
            name: "twitter:card",
            content: "summary",
        },
        {
            name: "twitter:creator",
            content: options.data!.site!.siteMetadata!.twitterUsername,
        },
        {
            name: "twitter:site",
            content: options.data!.site!.siteMetadata!.twitterUsername,
        },
        {
            name: "twitter:title",
            content: options.pageTitle,
        },
        {
            name: "twitter:description",
            content: options.description,
        },
        {
            name: "twitter:image",
            content: options.imageUrl,
        },
        {
            name: "twitter:image:alt",
            content: options.imageDescription,
        },
    ] as TwitterMetaTag[];
};

export const getOpenGraphMetaTags = (options: {
    article?: Article;
    data: SeoQuery;
    description: string;
    imageDescription: string;
    imageUrl: string;
    pageTitle: string;
    url: string;
}): OpenGraphMetaTag[] => {
    const openGraphImageWidth = "1200";
    const openGraphImageHeight = "630";

    const tags: OpenGraphMetaTag[] = [
        {
            property: "og:title",
            content: options.pageTitle,
        },
        {
            property: "og:site_name",
            content: options.data!.site!.siteMetadata!.title!,
        },
        {
            property: "og:description",
            content: options.description,
        },
        {
            property: "og:url",
            content: options.url,
        },
        {
            property: "og:image",
            content: options.imageUrl,
        },
        {
            property: "og:image:alt",
            content: options.imageDescription,
        },
        {
            property: "og:image:type",
            content: "image/png",
        },
        {
            property: "og:image:width",
            content: openGraphImageWidth,
        },
        {
            property: "og:image:height",
            content: openGraphImageHeight,
        },
        {
            property: "og:locale",
            content: "en_US",
        },
    ];

    if (options.article) {
        tags.push(
            {
                property: "og:type",
                content: "article",
            },
            {
                property: "article:author",
                content: options.data!.site!.siteMetadata!.author!,
            },
            {
                property: "article:published_time",
                content: options.article.publishedDate,
            }
        );
        new Set(options.article.tags).forEach((tag) => {
            tags.push({
                property: "article:tag",
                content: tag,
            });
        });
    } else {
        tags.push({
            property: "og:type",
            content: "website",
        });
    }

    return tags;
};

export const getGeneralMetaTags = (description: string, data: SeoQuery): MetaTag[] => {
    return [
        {
            name: "description",
            content: description,
        },
        {
            name: "author",
            content: data.site!.siteMetadata!.author!,
        },
        {
            name: "robots",
            content: "index, follow",
        },
    ];
};

interface Entity {
    "@context": string;
    "@type": string;

    [key: string]: any;
}

const getWebsiteSchema = (options: {
    article?: Article;
    data: SeoQuery;
    imageUrl: string;
    url: string;
}) => ({
    "@context": "http://schema.org",
    "@type": "WebSite",
    publisher: {
        "@type": "Organization",
        name: options.data!.site!.siteMetadata!.title,
        url: options.data!.site!.siteMetadata!.siteUrl,
        logo: {
            type: "ImageObject",
            url: combineURLs(options.data!.site!.siteMetadata!.siteUrl!, "/icons/icon-48x48.png"),
            width: 48,
            height: 48,
        },
    },
    url: options.data!.site!.siteMetadata!.siteUrl,
    mainEntityOfPage: {
        "@type": "WebPage",
        "@id": options.data!.site!.siteMetadata!.siteUrl,
    },
    description: options.data!.site!.siteMetadata!.description,
});

const getBlogPostingSchema = (options: {
    article?: Article;
    data: SeoQuery;
    imageUrl: string;
    url: string;
}) => ({
    "@context": "http://schema.org",
    "@type": "BlogPosting",
    author: {
        "@type": "Person",
        name: options.data!.site!.siteMetadata!.author,
        url: options.data!.site!.siteMetadata!.siteUrl,
    },
    dateModified: options.article!.publishedDate,
    datePublished: options.article!.publishedDate,
    description: options.article!.description,
    headline: options.article!.title,
    image: [options.imageUrl],
    mainEntityOfPage: {
        "@type": "WebPage",
        "@id": options.url,
    },
});

const getBreadcrumbListSchema = (options: {
    article?: Article;
    data: SeoQuery;
    imageUrl: string;
    url: string;
}) => ({
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: options.data!.site!.siteMetadata!.siteUrl,
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: options.data!.site!.siteMetadata!.siteUrl,
        },
        {
            "@type": "ListItem",
            position: 3,
            name: options.article!.title,
            item: options.url,
        },
    ],
});

export const getSchemaOrgJSONLD = (options: {
    article?: Article;
    data: SeoQuery;
    imageUrl: string;
    url: string;
}): Entity[] => {
    const schema: Entity[] = [];

    if (options.article) {
        const blogPosting = getBlogPostingSchema(options);
        const breadcrumbList = getBreadcrumbListSchema(options);
        schema.push(breadcrumbList, blogPosting);
    } else {
        const website = getWebsiteSchema(options);
        schema.push(website);
    }

    return schema;
};

export const getDescription = (
    data: SeoQuery,
    overrideDescription?: string,
    article?: Article
): string => {
    if (overrideDescription) {
        return overrideDescription;
    }
    if (article) {
        return article.description;
    }
    return data.site!.siteMetadata!.description!;
};

export const getPageTitle = (data: SeoQuery, article?: Article, overrideTitle?: string): string => {
    if (overrideTitle) {
        return `${overrideTitle} | ${data.site!.siteMetadata!.title}`;
    }
    if (article) {
        return `${article.title} | ${data.site!.siteMetadata!.title}`;
    }
    return data.site!.siteMetadata!.title!;
};

export const getMetaTags = (options: {
    article?: Article;
    data: SeoQuery;
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
