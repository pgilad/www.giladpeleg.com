// noinspection HttpUrlsUsage

const axios = require("axios");
const { expect } = require("chai");

describe("Domain Redirect Test", function() {
    this.slow(500);

    // Define an array of redirect tests, where each test has an initial URL and an expected URL
    const redirectTests = [
        "http://giladpeleg.com",
        "http://www.giladpeleg.com",
        "https://giladpeleg.com",
    ];

    redirectTests.forEach((test) => {
        it(`should redirect with a 301 status code: ${test}`, async () => {
            const requestedUrl = `${test}/blog/page?query_string=true`;
            const expectedUrl = "https://www.giladpeleg.com/blog/page?query_string=true";

            const response = await axios.head(requestedUrl, {
                maxRedirects: 0,
                validateStatus: (status) => {
                    return status > 200 && status < 400;
                }
            });

            // Ensure a 301 status code
            expect(response.status).to.equal(301);
            // Ensure the "Location" header points to the expected URL
            expect(response.headers["location"]).to.equal(expectedUrl);
        });
    });
});
