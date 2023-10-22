import { graphql, useStaticQuery } from "gatsby";
import { getSrc, ImageDataLike } from "gatsby-plugin-image";
import React from "react";

import {
    getDescription,
    getMetaTags,
    getPageTitle,
    getSchemaOrgJSONLD,
    MetaTag,
} from "../utils/seo";
import { combineURLs } from "../utils/urls";

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
                gatsbyImageData(width: 1200, height: 630, layout: FIXED)
            }
        }
    }
`;

const DEFAULT_IMAGE_ALT =
    "A picture of me sitting next to a melting iceberg in Landmannalaugar, Iceland";

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
    imageSrc?: string | null;
    lang?: string;
    meta?: MetaTag[];
    overrideDescription?: string;
    overrideTitle?: string;
    pathname?: string;
}

export const PageHead: React.FC<Props> = ({
    article,
    imageAlt = null,
    imageSrc = null,
    meta = [],
    overrideDescription = "",
    overrideTitle = "",
    pathname = "/",
}) => {
    const data: Queries.SEOQuery = useStaticQuery(query);
    if (!data.site?.siteMetadata?.siteUrl || !data.siteImage?.childImageSharp) {
        throw new Error("Invalid fields");
    }

    const imageUrl = imageSrc || getSrc(data.siteImage as ImageDataLike);
    if (!imageUrl) {
        throw new Error("Oh no");
    }
    // const imageUrl = combineURLs(
    //     data.site.siteMetadata.siteUrl,
    //     imageSrc || data.siteImage.childImageSharp.gatsbyImageData.images.sources[0]
    // );
    const url = combineURLs(data.site.siteMetadata.siteUrl, pathname || "/");

    const metaTags = getMetaTags({
        article,
        data,
        description: getDescription(data, overrideDescription, article),
        imageDescription: imageAlt || DEFAULT_IMAGE_ALT,
        imageUrl,
        meta,
        pageTitle: getPageTitle(data, article, overrideTitle),
        url,
    });

    const schemaOrgJSONLD = getSchemaOrgJSONLD({
        article,
        data,
        imageUrl,
        url,
    });

    return (
        <>
            <title>{getPageTitle(data, article, overrideTitle)}</title>
            <meta name="description" content="Hello World" />
            {metaTags.map((tag) => (
                <meta
                    key={tag.name || `${tag.property}::${tag.content}`}
                    name={tag.name}
                    property={tag.property}
                    content={tag.content}
                />
            ))}
            <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>
        </>
    );
};
