const targetAddress = new URL(process.env.TARGET_ADDRESS || 'https://www.giladpeleg.com');

module.exports = {
    siteMetadata: {
        title: 'Gilad Peleg',
        description: 'Read about my technological and life adventures',
        author: 'Gilad Peleg',
        siteUrl: targetAddress.href,
        twitterUsername: '@GiladPeleg',
        keywords: [
            'blog',
            'personal',
            'technology',
            'writings',
            'creative',
            'developer',
            'manager',
        ],
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
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'Gilad Peleg - My Personal Page',
                short_name: 'Gilad Peleg',
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
