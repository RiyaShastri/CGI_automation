"use strict";
class Login {

    constructor(client) {
        this.client = client;
    }

    doLogin(userName, password) {
        var self = this;
        return new Promise(async function (resolve, reject) {
            try {
                await self.client.setValue('#login', userName);
                await self.client.pause(1000);
                await self.client.setValue('#password', password);
                await self.client.$('.advbutton').click();
                await self.client.pause(2000);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = Login;