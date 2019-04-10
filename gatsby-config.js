const pkg = require('./package');
const PAGE_TITLE = 'Gilad Peleg';

const targetAddress = new URL(process.env.TARGET_ADDRESS || 'https://www.giladpeleg.com');
const siteUrl = targetAddress.href.replace(/\/$/, '');

const getTrackingId = () => {
    if (process.env.GATSBY_ENV === 'production') {
        return 'UA-58310464-1';
    }
    if (process.env.GATSBY_ENV === 'staging') {
        return 'UA-58310464-2';
    }
    return '';
};

module.exports = {
    siteMetadata: {
        author: PAGE_TITLE,
        description: pkg.description,
        disqusShortName: 'gilad-peleg-blog',
        keywords: pkg.keywords,
        siteUrl: siteUrl,
        title: PAGE_TITLE,
        twitterUsername: '@GiladPeleg',
    },
    plugins: [
        'gatsby-plugin-typescript',
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
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
                path: `${__dirname}/content`,
            },
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            backgroundColor: 'transparent',
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
                        resolve: 'gatsby-remark-prismjs',
                        options: {
                            noInlineHighlight: false,
                        },
                    },
                    {
                        resolve: 'gatsby-remark-emojis',
                        options: {
                            // Deactivate the plugin globally (default: true)
                            active: true,
                            // Add a custom css class
                            class: 'emoji-icon',
                            // Select the size (available size: 16, 24, 32, 64)
                            size: 64,
                            // Add custom styles
                            styles: {
                                display: 'inline',
                                margin: '0',
                                'margin-top': '1px',
                                position: 'relative',
                                top: '5px',
                                width: '25px',
                            },
                        },
                    },
                    {
                        resolve: 'gatsby-remark-copy-linked-files',
                        options: {
                            ignoreFileExtensions: [],
                        },
                    },
                    'gatsby-remark-autolink-headers',
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
        {
            resolve: 'gatsby-plugin-netlify',
            options: {
                mergeSecurityHeaders: false,
            },
        },
        {
            resolve: 'gatsby-plugin-google-analytics',
            options: {
                trackingId: getTrackingId(),
            },
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                background_color: '#663399',
                display: 'minimal-ui',
                icon: 'src/images/favicon.png',
                name: 'Gilad Peleg - My Personal Page',
                short_name: PAGE_TITLE,
                start_url: '/',
                theme_color: '#663399',
            },
        },
        'gatsby-plugin-offline',
    ],
};
