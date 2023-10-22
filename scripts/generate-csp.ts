import * as CSP from "csp-builder";

const csp = new CSP.Builder();

const githubAssets = "https://github.githubassets.com";
const googleAnalytics1 = "https://www.google-analytics.com";
const googleAnalytics2 = "https://www.google.com/analytics";
const googleAnalytics3 = "https://marketingplatform.google.com";
const googleDomain = "https://www.google.com";
const ownDomain = "https://www.giladpeleg.com";
const reportUri = "https://giladpeleg.report-uri.com/r/d/csp/enforce";
const tagManager = "https://www.googletagmanager.com";

const googleFontsDomain = "https://fonts.gstatic.com";
const googleFontsDomain2 = "https://fonts.googleapis.com";

const extensiveSourceDirective = [
    CSP.PredefinedSource.Self,
    CSP.SchemaSource.Data,
    githubAssets,
    googleAnalytics1,
    googleAnalytics2,
    googleAnalytics3,
    googleDomain,
    googleFontsDomain,
    googleFontsDomain2,
    ownDomain,
    tagManager,
];

const regularSourceDirective = [
    CSP.PredefinedSource.Self,
    githubAssets,
    googleAnalytics1,
    googleAnalytics2,
    googleAnalytics3,
    googleDomain,
    ownDomain,
    tagManager,
];
const localSourceDirective = [CSP.PredefinedSource.Self, ownDomain];

csp.addDirective(new CSP.ConnectSource().addValue(regularSourceDirective))
    .addDirective(new CSP.DefaultSource().addValue(regularSourceDirective))
    .addDirective(new CSP.FontSource().addValue(extensiveSourceDirective))
    .addDirective(new CSP.FrameSource().addValue(CSP.PredefinedSource.Self))
    .addDirective(new CSP.ImageSource().addValue(extensiveSourceDirective))
    .addDirective(new CSP.MediaSource().addValue(localSourceDirective))
    .addDirective(new CSP.ObjectSource().addValue(CSP.PredefinedSource.None))
    // .addDirective(new CSP.PrefetchSource().addValue(extensiveSourceDirective))
    .addDirective(
        new CSP.ScriptSource().addValue([
            ...regularSourceDirective,
            CSP.PredefinedSource.UnsafeInline,
        ]),
    )
    .addDirective(
        new CSP.StyleSource().addValue([
            ...extensiveSourceDirective,
            CSP.PredefinedSource.UnsafeInline,
        ]),
    )
    .addDirective(new CSP.WorkerSource().addValue(localSourceDirective))
    .addDirective(new CSP.ReportUri().setValue(reportUri))
    .addDirective(new CSP.ReportTo().setValue("default"));

console.log(csp.stringify());
