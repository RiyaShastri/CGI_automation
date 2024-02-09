"use strict";
class Navigation {

    constructor(client) {
        this.client = client;
    }

    doNavigation(linkTextArr) {
        var self = this;
        const totalLinks = linkTextArr.length;
        return new Promise(async function (resolve, reject) {
            try {
                let index = 0;
                while (index < totalLinks) {
                    if (await self.client.isExisting('input[title="Open Folder: ' + linkTextArr[index].trim() + '"]')) {
                        await self.client.$('input[title="Open Folder: ' + linkTextArr[index].trim() + '"]').click();
                    } else {
                        await self.client.$('a=' + linkTextArr[index].trim()).click();
                    }
                    index++;
                    if (index === totalLinks) {
                        resolve();
                    }
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = Navigation;