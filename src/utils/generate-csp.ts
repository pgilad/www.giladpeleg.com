import * as CSP from 'csp-builder';

const csp = new CSP.Builder();

const analyticsDomain = 'www.google-analytics.com';
const ownDomain = 'www.giladpeleg.com';
const reportUri = 'https://giladpeleg.report-uri.com/r/d/csp/enforce';
const disqusSubdomains = '*.disqus.com';
const disqusCdn = 'c.disquscdn.com';
const disqusDomain = 'disqus.com';

/*
    connect-src 'self' www.google-analytics.com www.giladpeleg.com *.disqus.com c.disquscdn.com disqus.com;
    default-src 'self' www.google-analytics.com www.giladpeleg.com;
    font-src 'self' www.google-analytics.com www.giladpeleg.com data:;
    frame-src 'self' *.disqus.com disqus.com;
    img-src 'self' www.google-analytics.com www.giladpeleg.com data: *.disqus.com *.disquscdn.com disqus.com;
    media-src 'self' www.giladpeleg.com;
    object-src 'none';
    prefetch-src 'self' www.google-analytics.com www.giladpeleg.com c.disquscdn.com disqus.com;
    script-src 'self' 'unsafe-inline' www.google-analytics.com www.giladpeleg.com *.disqus.com c.disquscdn.com disqus.com;
    style-src 'self' 'unsafe-inline' www.giladpeleg.com *.disqus.com c.disquscdn.com disqus.com;
    worker-src 'self' www.giladpeleg.com;
    report-to default;
    report-uri https://giladpeleg.report-uri.com/r/d/csp/enforce
*/

const extensiveSourceDirective = [
    CSP.PredefinedSource.Self,
    analyticsDomain,
    ownDomain,
    CSP.SchemaSource.Data,
];

const regularSourceDirective = [
    CSP.PredefinedSource.Self,
    analyticsDomain,
    ownDomain,
    disqusSubdomains,
    disqusCdn,
    disqusDomain,
];
const localSourceDirective = [CSP.PredefinedSource.Self, ownDomain];

csp.addDirective(new CSP.ConnectSource().addValue(regularSourceDirective))
    .addDirective(
        new CSP.DefaultSource().addValue([CSP.PredefinedSource.Self, analyticsDomain, ownDomain])
    )
    .addDirective(new CSP.FontSource().addValue(extensiveSourceDirective))
    .addDirective(
        new CSP.FrameSource().addValue([CSP.PredefinedSource.Self, disqusSubdomains, disqusDomain])
    )
    .addDirective(
        new CSP.ImageSource().addValue(regularSourceDirective.concat(CSP.SchemaSource.Data))
    )
    .addDirective(new CSP.MediaSource().addValue(localSourceDirective))
    .addDirective(new CSP.ObjectSource().addValue(CSP.PredefinedSource.None))
    .addDirective(new CSP.PrefetchSource().addValue(regularSourceDirective))
    .addDirective(
        new CSP.ScriptSource().addValue(
            regularSourceDirective.concat(CSP.PredefinedSource.UnsafeInline)
        )
    )
    .addDirective(
        new CSP.StyleSource().addValue(
            regularSourceDirective.concat(CSP.PredefinedSource.UnsafeInline)
        )
    )
    .addDirective(new CSP.WorkerSource().addValue(localSourceDirective))
    .addDirective(new CSP.ReportUri().setValue(reportUri))
    .addDirective(new CSP.ReportTo().setValue('default'));

// tslint:disable-next-line:no-console
console.log(csp.stringify());
