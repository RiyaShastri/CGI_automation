"use strict";

class JumpTo {

    constructor(client) {
        this.client = client;
    }

    performTest(formData) {
        var self = this;
        return new Promise(async function (resolve, reject) {
            try {
                await self.client.pause(2000);
                const parametersTextsArr = Object.keys(formData);
                const totalParameters = parametersTextsArr.length;
                let index = 0;
                while (index < totalParameters) {
                    const parameterText = parametersTextsArr[index];
                    const parameterValue = formData[parameterText];
                    let elementId = '';
                    const exactMatch = 'label=' + parameterText + ' :';
                    const partialMatch = 'label*=' + parameterText + ' :';

                    if (await self.client.isExisting(exactMatch)) {
                        elementId = await self.client.$(exactMatch).getAttribute('for');
                    } else if (await self.client.isExisting(partialMatch)) {
                        elementId = await self.client.$(partialMatch).getAttribute('for');
                    } else {
                        elementId = '';
                    }

                    if (elementId != '' && await self.client.isVisible('#' + elementId)) {
                        const elementTag = await self.client.$('#' + elementId).getTagName();

                        switch (elementTag) {
                            case 'input':
                                const typeValue = await self.client.$('#' + elementId).getAttribute('type');
                                if (typeValue === 'text' || typeValue === 'password') {
                                    await self.client.setValue('#' + elementId, parameterValue);
                                    await self.client.pause(1000);
                                } else if (typeValue === 'checkbox') {
                                    if (await self.client.$('#' + elementId).isSelected() != parameterValue) {
                                        await self.client.$('#' + elementId).click();
                                        await self.client.pause(1000);
                                    }
                                }
                                break;

                            case 'select':
                                await self.client.$('#' + elementId).selectByVisibleText(parameterValue);
                                await self.client.pause(2000);
                                break;

                            case 'textarea':
                                await self.client.setValue('#' + elementId, parameterValue);
                                break;

                            default:
                                break;
                        }
                    }
                    index++;
                    if (index === totalParameters) {
                        resolve();
                    }
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = JumpTo;