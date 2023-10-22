import { graphql } from "gatsby";

graphql`
    query RssFeed {
        site {
            siteMetadata {
                author
                siteUrl
            }
        }
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

graphql`
    query RssGlobalFeed {
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
