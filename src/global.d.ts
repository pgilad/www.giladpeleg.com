declare module '*.scss' {
    const content: { [className: string]: string };
    export = content;
}

declare module '*.svg' {
    const content: any;
    export default content;
}

declare module 'typography-theme-wordpress-2016';
