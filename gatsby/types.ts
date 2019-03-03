export interface GatsbyNode {
    id: string;
    children: string[];
    parent: string;
    fields: any;
    internal: {
        content: string;
        contentDigest: string;
        fieldOwners: any;
        mediaType: string;
        owner: string;
        type: string;
    };
    [key: string]: any;
}

interface PageInput {
    path: string;
    component: string;
    layout?: string;
    context?: {
        [key: string]: any;
    };
}

interface CreateNodeField {
    actionOptions?: any;
    name: string;
    node: GatsbyNode;
    value: string;
}

interface BoundActionCreators {
    createPage: (page: PageInput) => void;
    deletePage: (page: PageInput) => void;
    createRedirect: (opts: {
        fromPath: string;
        isPermanent?: boolean;
        redirectInBrowser?: boolean;
        toPath: string;
    }) => void;
    createNodeField: (nodeField: CreateNodeField) => void;
}

export type GatsbyCreatePages = (fns: { graphql: any; actions: BoundActionCreators }) => void;

export type GatsbyCreateNode = (fns: {
    node: GatsbyNode;
    actions: BoundActionCreators;
    getNode: any;
}) => void;

export interface CreateFilePathOpts {
    basePath: string;
    getNode: any;
    node: GatsbyNode;
    trailingSlash: boolean;
}
