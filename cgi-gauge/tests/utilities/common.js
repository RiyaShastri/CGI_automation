"use strict";

function disableJobStepsWithValue(client, disableJobSteps) {
    const disableJobStepsArr = Object.keys(disableJobSteps);
    const totalDisableSteps = disableJobStepsArr.length;
    return new Promise(async function (resolve, reject) {
        try {
            let index = 0;
            while (index < totalDisableSteps) {
                if (await client.$('tr*=' + disableJobStepsArr[index]).$('input[title="Disable Job"]').isSelected() != disableJobSteps[disableJobStepsArr[index]]) {
                    await client.$('tr*=' + disableJobStepsArr[index]).$('input[title="Disable Job"]').click();
                }
                index++;
                if (index === totalDisableSteps) {
                    resolve();
                }
            }
        } catch (error) {
            reject(error);
        }
    });
}

function setParameters(client, jobParams, isEditParameter = false) {
    return new Promise(async function (resolve, reject) {
        try {
            const jobStpes = Object.keys(jobParams);
            const totalJobStpes = jobStpes.length;
            let index = 0;
            while (index < totalJobStpes) {
                const stepName = jobStpes[index];
                let perfromAction = true;
                if (isEditParameter) {
                    if (await client.isExisting('tr*=' + stepName)) {
                        await client.$('tr*=' + stepName).$('input').click();
                        await client.$("#btnT3User_AgentParm_Grid").click();
                        perfromAction = true;
                    } else {
                        perfromAction = false;
                    }
                }
                if (perfromAction) {
                    const stepParameters = jobParams[stepName];
                    await applyParameter(client, stepParameters);
                }
                if (isEditParameter && perfromAction) {
                    await client.pause(2000);
                    await client.$('#OK').click();
                }
                index++;
                if (index === totalJobStpes) {
                    resolve();
                }
            }
        } catch (error) {
            reject(error);
        }
    });
}

function applyParameter(client, parameters) {
    return new Promise(async function (resolve, reject) {
        try {
            const parameterTexts = Object.keys(parameters);
            const totalParameters = parameterTexts.length;
            let parameterApplied = 0;
            while (parameterApplied < totalParameters) {
                const count = await applyParameterOnPage(client, parameters, parameterTexts);
                parameterApplied = parameterApplied + count;
                let nextClass = '';
                if (await client.isExisting('#T1BS_AGENT_PARMnextpage')) {
                    nextClass = await client.getAttribute('#T1BS_AGENT_PARMnextpage', 'class');
                }
                if ((parameterApplied === totalParameters) || nextClass.trim() === 'inactive') {
                    parameterApplied = totalParameters;
                    await client.$('#T1BS_AGENT_PARMSaveAll').click();
                    resolve();
                } else {
                    await client.$('#T1BS_AGENT_PARMSaveAll').click();
                    await client.$('#T1BS_AGENT_PARMnextpage').click();
                }
            }
        } catch (error) {
            reject();
        }
    });
}

function applyParameterOnPage(client, parameters, parameterTexts) {
    let parameterApplied = 0;
    return new Promise(async function (resolve, reject) {
        try {
            const parameterRows = await client.$$('tr');
            const totalParameterRows = parameterRows.length;
            let index = 0;
            while (index < totalParameterRows) {
                if (parameterRows[index]) {
                    const tr = await client.elementIdText(parameterRows[index].ELEMENT);
                    const parameterIndex = parameterTexts.findIndex(function (parameterText) {
                        return tr.value.indexOf(parameterText) > -1;
                    });
                    if (parameterIndex > -1) {
                        const readOnlyAttribute = await client.$("tr*=" + parameterTexts[parameterIndex]).$("input[type='text']").getAttribute('readonly');
                        if (readOnlyAttribute === null) {
                            await client.$("tr*=" + parameterTexts[parameterIndex]).$("input[type='text']").setValue(parameters[parameterTexts[parameterIndex]]);
                            parameterTexts.splice(parameterIndex, 1);
                            parameterApplied++;
                            if (parameterTexts.length == 0) {
                                resolve(parameterApplied);
                            }
                        }
                    }
                    if (index === (totalParameterRows - 1)) {
                        resolve(parameterApplied);
                    }
                    index++;
                }
            }
        } catch (error) {
            reject(parameterApplied);
        }
    })
}

function rowExist(client, jobId) {
    let getRecord = 0;
    return new Promise(async function (resolve, reject) {
        try {
            while (getRecord !== 1) {
                await client.$('#AMSBrowse').click();
                getRecord = await client.selectorExecute("tr*=" + jobId, function (divs, message) {
                    return divs.length;
                }, "");
                if (getRecord > 0) {
                    resolve(getRecord);
                }
            }
        } catch (error) {
            resolve(0);
        }
    });
}

module.exports = {
    disableJobStepsWithValue: disableJobStepsWithValue,
    setParameters: setParameters,
    rowExist: rowExist
};