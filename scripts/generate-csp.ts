import * as CSP from 'csp-builder';

const csp = new CSP.Builder();

const githubAssets = 'https://github.githubassets.com';
const googleAnalyticsDomain = 'https://www.google-analytics.com';
const googleDomain = 'https://www.google.com/analytics';
const googleMarketing = 'https://marketingplatform.google.com';
const ownDomain = 'https://www.giladpeleg.com';
const reportUri = 'https://giladpeleg.report-uri.com/r/d/csp/enforce';

const extensiveSourceDirective = [
    CSP.PredefinedSource.Self,
    googleAnalyticsDomain,
    googleDomain,
    googleMarketing,
    ownDomain,
    CSP.SchemaSource.Data,
];

const regularSourceDirective = [
    CSP.PredefinedSource.Self,
    googleAnalyticsDomain,
    googleDomain,
    googleMarketing,
    ownDomain,
    githubAssets,
];
const localSourceDirective = [CSP.PredefinedSource.Self, ownDomain];

csp.addDirective(new CSP.ConnectSource().addValue(regularSourceDirective))
    .addDirective(new CSP.DefaultSource().addValue(regularSourceDirective))
    .addDirective(new CSP.FontSource().addValue(extensiveSourceDirective))
    .addDirective(new CSP.FrameSource().addValue(CSP.PredefinedSource.Self))
    .addDirective(
        new CSP.ImageSource().addValue([...regularSourceDirective, CSP.SchemaSource.Data])
    )
    .addDirective(new CSP.MediaSource().addValue(localSourceDirective))
    .addDirective(new CSP.ObjectSource().addValue(CSP.PredefinedSource.None))
    .addDirective(new CSP.PrefetchSource().addValue(regularSourceDirective))
    .addDirective(
        new CSP.ScriptSource().addValue([
            ...regularSourceDirective,
            CSP.PredefinedSource.UnsafeInline,
        ])
    )
    .addDirective(
        new CSP.StyleSource().addValue([
            ...regularSourceDirective,
            CSP.PredefinedSource.UnsafeInline,
        ])
    )
    .addDirective(new CSP.WorkerSource().addValue(localSourceDirective))
    .addDirective(new CSP.ReportUri().setValue(reportUri))
    .addDirective(new CSP.ReportTo().setValue('default'));

// tslint:disable-next-line:no-console
console.log(csp.stringify());
