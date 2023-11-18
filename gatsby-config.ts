import { GatsbyConfig } from "gatsby";
import { getSrc } from "gatsby-plugin-image";

import pkg from "./package.json" assert { type: "json" };

const PAGE_TITLE = "Gilad Peleg";
const SITE_DOMAIN = "https://www.giladpeleg.com";

// preact is currently disabled as it doesn't support gatsby v5+ (and react 18+)

const targetAddress = new URL(process.env.TARGET_ADDRESS || SITE_DOMAIN);
const siteUrl = targetAddress.href.replace(/\/$/, "");

// const getAnalyticsTrackingId = () => {
//     switch (process.env.NODE_ENV) {
//         case "production":
//             return "G-SC2MZSJBVH";
//         case "staging":
//             return "G-SC2MZSJBVH";
//         default:
//             return "G-SC2MZSJBVH";
//     }
// };

const rssGlobalFeedQuery = `
    {
        site {
            siteMetadata {
                author
                authorEmail
                description
                keywords
                siteUrl
                title
            }
        }
        headerImage: file(relativePath: { eq: "header-image.jpg" }) {
            childImageSharp {
                gatsbyImageData(layout: FIXED, width: 753, height: 592)
            }
        }
    }
`;

const rssFeedQuery = `
    {
        allMarkdownRemark(
            limit: 1000
            filter: { frontmatter: { draft: { ne: true } } }
            sort: { frontmatter: { date: DESC } }
        ) {
            edges {
                node {
                    excerpt
                    html
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "YYYY MMMM DD")
                        tags
                        title
                    }
                }
            }
        }
    }
`;

const configuration: GatsbyConfig = {
    trailingSlash: "always",
    graphqlTypegen: {
        typesOutputPath: "src/gatsby-types.d.ts",
        generateOnBuild: true,
        documentSearchPaths: [
            "./gatsby-config.ts",
            "./gatsby-node.ts",
            "./gatsby-queries.ts",
            "./plugins/**/gatsby-node.ts",
            "./src/**/*.ts(x)?",
        ],
    },
    siteMetadata: {
        author: PAGE_TITLE,
        authorEmail: "gilad@giladpeleg.com",
        description: pkg.description,
        disqusShortName: "gilad-peleg-blog",
        keywords: pkg.keywords,
        siteUrl: siteUrl,
        title: PAGE_TITLE,
        twitterUsername: "@GiladPeleg",
    },
    plugins: [
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "content",
                path: `${__dirname}/content`,
            },
        },
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [
                    {
                        resolve: "gatsby-remark-images",
                        options: {
                            backgroundColor: "transparent",
                            linkImagesToOriginal: true,
                            maxWidth: 590,
                            quality: 90,
                            withWebp: true,
                        },
                    },
                    // {
                    //     resolve: 'gatsby-remark-embed-gist',
                    //     options: {
                    //         username: 'pgilad',
                    //         includeDefaultCss: true,
                    //     },
                    // },
                    {
                        resolve: "gatsby-remark-prismjs",
                        options: {
                            noInlineHighlight: true,
                        },
                    },
                    {
                        resolve: "gatsby-remark-emojis",
                        options: {
                            // Deactivate the plugin globally (default: true)
                            active: true,
                            // Add a custom css class
                            class: "emoji-icon",
                            // Select the size (available size: 16, 24, 32, 64)
                            size: 64,
                            // Add custom styles
                            styles: {
                                display: "inline",
                                margin: "0",
                                "margin-top": "1px",
                                position: "relative",
                                top: "5px",
                                width: "25px",
                            },
                        },
                    },
                    {
                        resolve: "gatsby-remark-copy-linked-files",
                        options: {
                            ignoreFileExtensions: [],
                        },
                    },
                    "gatsby-remark-autolink-headers",
                ],
            },
        },
        "gatsby-plugin-sitemap",
        {
            resolve: "gatsby-plugin-robots-txt",
            options: {
                host: "https://www.giladpeleg.com",
                sitemap: [
                    "https://www.giladpeleg.com/sitemap-index.xml",
                    "https://www.giladpeleg.com/sitemap-0.xml",
                ],
                policy: [
                    { userAgent: "*", allow: "/" },
                    { userAgent: "*", disallow: "/cdn-cgi/" },
                ],
            },
        },
        {
            resolve: "gatsby-plugin-feed",
            options: {
                query: rssGlobalFeedQuery,
                setup({ query }: { query: Queries.RssGlobalFeedQuery }) {
                    if (!query.site?.siteMetadata || !query.headerImage?.childImageSharp) {
                        throw new Error("Missing required properties");
                    }
                    const imageUrl = getSrc(query.headerImage?.childImageSharp);
                    return {
                        title: query.site.siteMetadata.author,
                        description: query.site.siteMetadata.description,
                        site_url: query.site.siteMetadata.siteUrl,
                        feed_url: `${query.site.siteMetadata.siteUrl}/rss.xml`,
                        image_url: `${query.site.siteMetadata.siteUrl}${imageUrl}`,
                        managingEditor: `${query.site.siteMetadata.authorEmail} (${query.site.siteMetadata.author})`,
                        webMaster: query.site.siteMetadata.authorEmail,
                        language: "en-us",
                        docs: "https://www.rssboard.org/rss-specification",
                        categories: query.site.siteMetadata.keywords,
                        copyright: `Copyright ${new Date().getFullYear()} ${
                            query.site.siteMetadata.author
                        }`,
                    };
                },
                feeds: [
                    {
                        query: rssFeedQuery,
                        output: "/rss.xml",
                        title: PAGE_TITLE,
                        serialize: ({ query }: { query: Queries.RssFeedQuery }) => {
                            if (!query.allMarkdownRemark || !query.site?.siteMetadata) {
                                throw new Error("Missing required properties");
                            }
                            const siteMetadata = query.site.siteMetadata;
                            const posts = query.allMarkdownRemark.edges;

                            return posts.map((edge) => {
                                const post = edge.node;

                                if (!post.frontmatter || !post.fields?.slug) {
                                    throw new Error("Missing required properties");
                                }

                                return {
                                    author: siteMetadata.author,
                                    categories: post.frontmatter.tags,
                                    custom_elements: [{ "content:encoded": post.html }],
                                    date: post.frontmatter.date,
                                    description: post.excerpt,
                                    guid: siteMetadata.siteUrl + post.fields.slug,
                                    title: post.frontmatter.title,
                                    url: siteMetadata.siteUrl + post.fields.slug,
                                };
                            });
                        },
                    },
                ],
            },
        },
        "gatsby-plugin-catch-links",
        {
            resolve: "gatsby-plugin-canonical-urls",
            options: {
                siteUrl: siteUrl,
            },
        },
        {
            resolve: "gatsby-plugin-cloudflare-pages",
            options: {
                mergeSecurityHeaders: false,
                headers: {
                    "/*": [
                        "Content-Security-Policy: connect-src 'self' https://github.githubassets.com https://www.google.com https://www.giladpeleg.com; default-src 'self' https://github.githubassets.com https://www.google.com https://www.giladpeleg.com; font-src 'self' data: https://github.githubassets.com https://www.google.com https://fonts.gstatic.com https://fonts.googleapis.com https://www.giladpeleg.com; frame-src 'self'; img-src 'self' data: https://github.githubassets.com https://marketingplatform.google.com https://www.google.com https://fonts.gstatic.com https://fonts.googleapis.com https://www.giladpeleg.com; media-src 'self' https://www.giladpeleg.com; object-src 'none'; script-src 'self' https://github.githubassets.com https://www.google.com https://www.giladpeleg.com 'unsafe-inline'; style-src 'self' data: https://github.githubassets.com https://www.google.com https://fonts.gstatic.com https://fonts.googleapis.com https://www.giladpeleg.com 'unsafe-inline'; worker-src 'self' https://www.giladpeleg.com; report-uri https://giladpeleg.report-uri.com/r/d/csp/enforce; report-to default;",
                        "Permissions-Policy: fullscreen=(self)",
                        "Referrer-Policy: no-referrer-when-downgrade",
                        `Report-To: '{"group":"default","max_age":31536000,"endpoints":[{"url":"https://giladpeleg.report-uri.com/a/d/g"}],"include_subdomains":true}'`,
                        "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload",
                        "X-Content-Type-Options: nosniff",
                        "X-Frame-Options: DENY",
                        "X-UA-Compatible: IE=Edge,chrome=1",
                        "X-XSS-Protection: 1; mode=block",
                    ],
                },
            },
        },
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                background_color: "#663399",
                display: "minimal-ui",
                icon: "src/images/favicon.png",
                name: "Gilad Peleg - My Personal Page",
                short_name: PAGE_TITLE,
                start_url: "/",
                theme_color: "#663399",
                icon_options: {
                    // For all the options available, please see:
                    // https://developer.mozilla.org/en-US/docs/Web/Manifest
                    // https://w3c.github.io/manifest/#purpose-member
                    purpose: "maskable",
                },
            },
        },
        "gatsby-plugin-offline",
    ],
};

export default configuration;
