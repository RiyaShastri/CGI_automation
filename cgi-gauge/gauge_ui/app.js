const path = require('path');
const express = require('express');
const uiConfig = require('./assets/js/config');
const app = express();
const bodyParser = require('body-parser')
const exec = require('child_process').exec;
const fs = require('fs');
const uiPort = uiConfig.port;
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({
    extended: false
}));

//Start the server
app.listen(uiPort, () => {
    console.log('Gauge UI listening on localhost:' + uiPort + ', open your browser on http://localhost:' + uiPort);
});

//Call html and css file in node
app.get('/', (req, res) => {
    app.use('/css', express.static(__dirname + '/assets/css'));
    app.use('/js', express.static(__dirname + '/assets/js'));
    app.use('/json', express.static(__dirname + '/assets/json'));
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Final Report
app.get('/report', (req, res) => {
    app.use('/css', express.static(__dirname + '/reports/html-report/css'));
    app.use('/js', express.static(__dirname + '/reports/html-report/js'));
    app.use('/images', express.static(__dirname + '/reports/html-report/images'));
    app.use('/fonts', express.static(__dirname + '/reports/html-report/fonts'));
    app.use('/tempSpecs', express.static(__dirname + '/reports/html-report/tempSpecs'));
    app.use('/specs', express.static(__dirname + '/reports/html-report/specs'));
    res.sendFile(path.join(__dirname + '/reports/html-report/index.html'));
});

// Return schema for request test case along with default data from template directory
app.post('/getTemplateWithSchema', async (req, res) => {
    let jsonData = {};
    const fileName = req.body.fileName;
    if (fileName) {
        fs.readFile(uiConfig.templateDir + fileName, 'utf-8', (err, data) => {
            if (err) {
                res.send({});
            } else {
                jsonData = JSON.parse(data);
                res.send(jsonData);
            }
        });
    }
});

//Save json file with updated data
app.post('/saveParameter', async (req, res) => {
    var newData;
    const reqObj = JSON.parse(JSON.stringify(req.body));

    if (reqObj.fileName !== 'undefined' && reqObj.position != 'undefined') {
        const fileName = reqObj.fileName;
        if (reqObj.hasOwnProperty("newdata")) {
            newData = JSON.parse(reqObj.newdata);
        }
        const position = reqObj.position - 1;
        let jsonData;
        let totalLength = 0;

        fs.readFile(uiConfig.jobDataDir + fileName, 'utf-8', (err, fileData) => {
            jsonData = JSON.parse(fileData);
            if (!Array.isArray(jsonData)) {
                jsonData = [jsonData];
            }
            totalLength = jsonData.length;
            if (totalLength < position) {
                for (let index = totalLength; index <= position; index++) {
                    (index === position) ? jsonData[position] = newData : jsonData[position] = null;
                }
            } else {
                jsonData[position] = newData;
            }
            fs.writeFile(uiConfig.jobDataDir + fileName, JSON.stringify(jsonData), function (err) {
                if (err) {
                    res.send({
                        status: false,
                        message: "Issue to save parameter into file!"
                    });
                }
                res.send({
                    status: true,
                    message: "The parameters has been saved suuccessfully!!"
                });
            });
        });
    }
});

//execute selected testcase
app.post('/executeTestCase', async (req, res) => {
    try {
        const selectedTestCaseObj = req.body.selectedProcesses;

        // Remove old spec files from tempSpec directory
        await removeOldSpecs();
        const selectedTestCases = [];
        selectedTestCaseObj.forEach(selectedTestCase => {
            selectedTestCases.push(selectedTestCase.processSpec);
        });

        // Copy spec files to tempSpec folder
        const specNameArr = await copySpecFiles(selectedTestCases);
        await setDefaultJobData(selectedTestCaseObj);
        const uiData = {
            userData: req.body.userData,
            databaseDetails: req.body.databaseDetails
        }

        //Save updated form data in uidata.json file
        fs.writeFile('./assets/json/uiData.json', JSON.stringify(uiData), function (err) {
            if (err) {
                throw err;
            }
            exec('gauge run ../specs/login.spec ' + specNameArr.join(" "), (err, stdout, stderr) => {
                if (err) { return err; }
            });
        });
        res.send({
            status: 'SUCCESS',
            data: req.body
        });
    } catch (error) {
        throw (error);
    }
});

function removeOldSpecs() {
    return new Promise((resolve, reject) => {
        fs.readdir(uiConfig.tempSpecsDir, async (err, files) => {
            if (err) {
                reject(err);
            }
            const total_files = files.length;
            if (total_files > 0) {
                let i = 0;
                while (i < total_files) {
                    await deleteFile(uiConfig.tempSpecsDir + files[i]);
                    i++;
                    if (i === total_files) {
                        resolve();
                    }
                }
            } else {
                resolve();
            }
        });
    });
}

function copySpecFiles(selectedTestCases) {
    const specs = {};
    const totalTestCases = selectedTestCases.length;
    const specNameArr = [];
    return new Promise(async (resolve, reject) => {
        let index = 0;
        while (index < totalTestCases) {
            let newfile = uiConfig.tempSpecsDir + index + '.spec';
            const specName = selectedTestCases[index];
            if (!specs.hasOwnProperty(specName)) {
                const specContent = await readFile(uiConfig.specsDir + specName);
                specs[specName] = specContent;
                await writeFile(newfile, specContent);
            } else {
                await writeFile(newfile, specs[specName]);
            }
            specNameArr.push(newfile);
            index++;
            if (index === totalTestCases) {
                resolve(specNameArr);
            }
        }
    });
}

function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', function (err, specContent) {
            if (err) {
                reject(err);
            } else {
                resolve(specContent);
            }
        })
    });
}

function writeFile(filePath, fileContent) {
    return new Promise((resolve, reject) => {
        var writeStream = fs.createWriteStream(filePath);
        writeStream.write(fileContent);
        writeStream.end();
        resolve();
    });
}

function deleteFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, function (error) {
            resolve();
        });
    });
}

function setDefaultJobData(testCasesObj) {
    return new Promise(async (resolve, reject) => {
        const totalTestCases = testCasesObj.length;
        const testCaseTemplateData = {};
        let index = 0;
        while (index < totalTestCases) {
            const testCase = testCasesObj[index];
            if (!testCase.isQuery || testCase.processJson !== '') {
                const testJsonName = testCase['processJson'];
                const position = testCase['position'] - 1;
                if (!testCaseTemplateData.hasOwnProperty(testJsonName)) {
                    const strTemplateFile = await readFile(uiConfig.templateDir + testJsonName);
                    const templateFile = JSON.parse(strTemplateFile);
                    testCaseTemplateData[testJsonName] = templateFile['data'];
                    await saveDefaultJobData(testJsonName, testCaseTemplateData[testJsonName], position);
                } else {
                    await saveDefaultJobData(testJsonName, testCaseTemplateData[testJsonName], position);
                }
            }
            index++;
            if (index === totalTestCases) {
                resolve();
            }
        }
    });
}

function saveDefaultJobData(testJsonName, jobData, position) {
    return new Promise(async (resolve, reject) => {
        try {
            fs.readFile(uiConfig.jobDataDir + testJsonName, 'utf-8', (err, fileData) => {
                if (fileData === '') {
                    fileData = '[]';
                }
                let fileJsonData = JSON.parse(fileData);
                if (!Array.isArray(fileJsonData)) {
                    fileJsonData = [fileJsonData];
                }
                if (!fileJsonData[position]) {
                    fileJsonData[position] = jobData;
                }
                fs.writeFile(uiConfig.jobDataDir + testJsonName, JSON.stringify(fileJsonData), function (err) {
                    resolve();
                });
            });
        } catch (error) {
            resolve();
        }
    });
}
