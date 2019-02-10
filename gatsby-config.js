const pkg = require('./package');
const PAGE_TITLE = 'Gilad Peleg';

const targetAddress = new URL(process.env.TARGET_ADDRESS || 'https://www.giladpeleg.com');
const siteUrl = targetAddress.href.replace(/\/$/, '');

module.exports = {
    siteMetadata: {
        author: PAGE_TITLE,
        description: pkg.description,
        keywords: pkg.keywords,
        siteUrl: siteUrl,
        title: PAGE_TITLE,
        twitterUsername: '@GiladPeleg',
    },
    plugins: [
        'gatsby-plugin-typescript',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'images',
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'content',
                path: `${__dirname}/src/content`,
            },
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 590,
                            withWebp: true,
                            backgroundColor: 'transparent',
                        },
                    },
                    'gatsby-remark-autolink-headers',
                    'gatsby-remark-prismjs',
                    'gatsby-remark-copy-linked-files',
                ],
            },
        },
        'gatsby-plugin-sitemap',
        'gatsby-plugin-robots-txt',
        'gatsby-plugin-feed',
        'gatsby-plugin-catch-links',
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-plugin-canonical-urls',
            options: {
                siteUrl: siteUrl,
            },
        },
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        {
            resolve: 'gatsby-plugin-netlify',
            options: {
                mergeSecurityHeaders: false,
            },
        },
        {
            resolve: 'gatsby-plugin-google-analytics',
            options: {
                trackingId: 'UA-58310464-1',
            },
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'Gilad Peleg - My Personal Page',
                short_name: PAGE_TITLE,
                start_url: '/',
                background_color: '#663399',
                theme_color: '#663399',
                display: 'minimal-ui',
                icon: 'src/images/favicon.png',
                include_favicon: true,
            },
        },
        'gatsby-plugin-offline',
    ],
};
