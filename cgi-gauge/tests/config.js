module.exports = {
    remoteOptions: {
        headless: false,
        deprecationWarnings: false,
        desiredCapabilities: {
            browserName: "chrome",
            // browserName: "internet explorer",
            // version: '11',
            // platform: 'windows',
            // platformName: 'windows',
            'unexpectedAlertBehaviour': 'accept'
        }
    }
};