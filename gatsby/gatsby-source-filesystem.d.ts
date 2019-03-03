declare module 'gatsby-source-filesystem' {
    import { CreateFilePathOpts } from './types';

    export function createFilePath({
        basePath = 'src/pages',
        getNode,
        node,
        trailingSlash = true,
    }: CreateFilePathOpts): string;
}
