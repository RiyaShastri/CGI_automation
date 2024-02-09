"use strict";
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

let connection;
async function runConnection(query, schemaFlag, databaseDetails) {
    return new Promise(async function (resolve, reject) {

        try {
            const dbUser = databaseDetails['username'] || 'PPALADIY';
            const dbPassword = databaseDetails['password'] || 'pratik*2510';
            const dbHost = databaseDetails['host'] || '10.106.4.12';
            const dbPort = databaseDetails['port'] || '1522';
            const dbServiceName = databaseDetails['serviceName'] || 'meos2fn3.psmag.cgipdc.cginet';
            const connectString = dbHost + ':' + dbPort + '/' + dbServiceName;

            connection = await oracledb.getConnection({
                user: dbUser,
                password: dbPassword,
                connectString: connectString
            });
            await performDBOperation(query, schemaFlag);
            resolve();
        } catch (err) {
            reject(err);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                    resolve();
                } catch (err) {
                    reject(err);
                }
            }
        }
    });
}

function performDBOperation(query, isSchemaDefined = 0) {
    return new Promise(async function (resolve, reject) {
        if (!isSchemaDefined) {
            await executeQueryWithoutSchema(query);
            resolve();
        } else {
            await executeQuery(query);
            resolve();
        }
    });
}

function executeQueryWithoutSchema(query) {
    return new Promise(async function (resolve, reject) {
        executeQuery(query.replace('schemaName', 'AFMOWN')).then(res => {
            resolve('AFMOWN');
        }, async ex => {
            if (ex.errorNum === 942) {
                await executeQuery(query.replace('schemaName', 'ADMFMOWN'));
                resolve('ADMFMOWN');
            }
        });
    });
}

function executeQuery(query) {
    return connection.execute(query);
}

module.exports = {
    db: runConnection
};