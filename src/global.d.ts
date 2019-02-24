declare module '*.module.css' {
    const content: { [className: string]: string };
    export = content;
}

declare module '*.svg' {
    const content: any;
    export default content;
}

declare module 'disqus-react' {
    interface DisqusDiscussionProps {
        shortname: string;
        config: {
            url: string;
            identifier: string;
            title: string;
        };
    }

    export class DiscussionEmbed extends React.Component<DisqusDiscussionProps> {}
}
