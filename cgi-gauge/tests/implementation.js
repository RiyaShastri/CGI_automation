"use strict";
const webdriverio = require("webdriverio");
const fs = require('fs');
var ssh_exec = require('ssh-exec')
var request = require('request');
var config = require("./config");
var Login = require("./utilities/login");
var navigation = require("./utilities/navigation");
var common = require("./utilities/common");
var connection = require("../connection");
var JumpTo = require("./utilities/jumpTo");
var client, formUseData, uiData, jobDataArr, file_Name, databaseDetails;
var haveEditParameters = false;
var siteUrl = '';
var assert = require('assert');
let skipExecution = false;
var appType = '';

beforeSuite(async () => {
    client = webdriverio.remote(config.remoteOptions);
    let rawUIData = await fs.readFileSync('gauge_ui/assets/json/uiData.json');
    uiData = JSON.parse(rawUIData)['userData'];
    databaseDetails = JSON.parse(rawUIData)['databaseDetails'];
    await client.init();
});

step("Load <appName> app", async (appName) => {
    skipTesting();
    if (appName === 'FIN') {
        siteUrl = (uiData && uiData.url) ? uiData.url : '';
    } else if (appName === 'VSS') {
        siteUrl = (uiData && uiData.vss_url) ? uiData.vss_url : '';
    } else {
        siteUrl = '';
    }
    if (siteUrl.trim() === '') {
        skipExecution = true;
        assert.fail('Site URL not provided from UI.')
    } else {
        appType = appName;
        await client.url(siteUrl);
    }
});

step("Load process specific data <fileName>", async (fileName) => {
    skipTesting();
    try {
        file_Name = 'data/job_data/' + fileName;
        let rawdata = await fs.readFileSync(file_Name);
        jobDataArr = JSON.parse(rawdata);
        jobDataArr = jobDataArr.filter((jobData) => {
            return jobData !== null
        });

        if (Array.isArray(jobDataArr)) {
            if (Array.isArray(jobDataArr[0])) {
                formUseData = Object.assign([], jobDataArr[0])
            } else {
                formUseData = Object.assign({}, jobDataArr[0]);
            }
            jobDataArr.splice(0, 1);
            fs.writeFile('Data/job_data/' + fileName, JSON.stringify(jobDataArr), function (err) {
                if (err) {
                    return err;
                }
            });
        } else {
            formUseData = jobDataArr;
        }
    } catch (error) {
        skipExecution = true;
        assert.fail('JSON file for job data is not exist.');
    }
});

step("Login with credential", login);

step("Navigate to Page Search page <navigationText>", async (navigationText) => {
    skipTesting();
    await client.pause(10000);
    await client.frameParent();
    client.frame(1).frame(0);
    await client.pause(2000);
    if (await client.isExisting('input[title="Open Folder: Search"]')) {
        await client.waitUntil(async () => {
            var linkExist = await client.selectorExecute('.folderonly=Search', function (links, message) {
                return links.length;
            }, "");
            return (linkExist > 0);
        }, 20000, 'expected element not found', 100);
        await client.$('.folderonly=Search').click();
        await client.pause(2000);
    }
    await client.$('a=' + navigationText).click();
    await client.pause(2000);
    await client.frameParent().frameParent();
});

step("Search for Page Code <pageCode>", async (pageCode) => {
    skipTesting();
    client.frame(2);
    await client.pause(1000);
    await client.setValue('#txtT1PAGE_CD', pageCode);
    await client.$('#AMSBrowse').click();
    await client.$('tr*=' + pageCode).$('a').click();
});
step("Navigation to <navigationLinks>", async (navigationLinks) => {
    skipTesting();
    try {
        await client.pause(2000);
        await client.windowHandleMaximize();
        client.frame(1).frame('iframe[id="Secondary"]');
        var navigationClass = new navigation(client);
        const navigationLinksArr = navigationLinks.split(',');
        await navigationClass.doNavigation(navigationLinksArr);
        await client.pause(2000);
        await client.frameParent().frameParent();
    } catch (error) {
        throw error;
    }
});

step("Click on new job button with text <buttonText>", async (buttonText) => {
    skipTesting();
    try {
        client.frame(2);
        await client.pause(2000);
        await client.$('a=' + buttonText).click();
    } catch (error) {
        throw error;
    }
});

step("Disable job steps and click save", async () => {
    skipTesting();
    try {
        await client.pause(2000);
        await common.disableJobStepsWithValue(client, formUseData["Disable jobs"]["Job steps"]);
        client.$('#T1R_BS_CATALOG_TEMPSaveAll').click();
    } catch (error) {
        throw error;
    }
});

step("Click on setup parameters button with id <Parameter>", async (Parameter) => {
    skipTesting();
    try {
        await client.pause(2000);
        await client.$("#" + Parameter).click();
        haveEditParameters = false;
        if (Parameter === 'Setup_Parameters') {
            haveEditParameters = true;
        }
    } catch (error) {
        throw error;
    }
});

step("Apply job step parameters with pagination", async () => {
    skipTesting();
    try {
        await client.pause(2000);
        const jobParams = formUseData['Job Parameters'];
        await common.setParameters(client, jobParams, haveEditParameters);
    } catch (error) {
        throw error;
    }
});

step("Click on OK", async () => {
    skipTesting();
    try {
        const OK = await client.isExisting('#OK');
        const Ok = await client.isExisting('#Ok');
        await client.pause(2000);
        if (OK) {
            await client.$("#OK").click();
        } else if (Ok) {
            await client.$("#Ok").click();
        } else {
            await client.$('input[value="OK"]').click();
        }
    } catch (error) {
        throw error;
    }
});

step("Verify job status <LinkText>", async (LinkText) => {
    skipTesting();
    const jobId = formUseData.jobId;
    var rowExist = await common.rowExist(client, jobId);
    let tdTextArr;
    if (rowExist > 0) {
        tdTextArr = await client.$("tr*=" + jobId).getText("td");
        gauge.screenshot();
        if (await client.$("tr*=" + jobId).isExisting("a=" + LinkText)) {
            await client.$("tr*=" + jobId).$("a=" + LinkText).click();
            await client.pause(2000);
            gauge.screenshot();
            await client.pause(1000);
            if (LinkText == 'View Log') {
                await client.$('input[value="OK"]').click();
            } else if (LinkText == 'View Job Steps') {
                await verifyJobSteps();
                await client.$('input[value="OK"]').click();
                await client.pause(2000);
            }
        }
        if (tdTextArr.indexOf("Successful") === -1) {
            gauge.message("Job Failed.");
            skipExecution = true;
            assert.fail('Return Code Failed')
        }
        await client.pause(2000);
    }
});

step("Jump to <pageCode>", async (pageCode) => {
    skipTesting();
    await client.frameParent();
    client.frame(0);
    await client.pause(2000);
    await client.waitUntil(async () => {
        var linkExist = await client.selectorExecute('#gotocode', function (links, message) {
            return links.length;
        }, "");
        return (linkExist > 0);
    }, 30000, 'expected element not found', 100);
    await client.setValue('#gotocode', pageCode);
    await client.pause(2000);
    await client.$('#OpenPageWithData').click();
    await client.frameParent();
    await client.pause(2000);
    client.frame(2);
});

step("Perform Jumpto", async () => {
    skipTesting();
    if (Array.isArray(formUseData)) {
        const totalOperaions = formUseData.length;
        let i = 0;
        while (i < totalOperaions) {
            await performSearch(i + '|Search');
            await ExpandAll();
            await performParameters(i + '|Parameters');
            await client.$('a=Save').click();
            i++;
        }
    } else {
        await performSearch('Search');
        await ExpandAll();
        await performParameters('Parameters');
        await client.$('a=Save').click();
    }
});

step("Expand all section", ExpandAll);

step("Perform Search <dataLocationStr>", performSearch);

step("Apply process parameters <dataLocationStr>", performParameters);

step("Click level", async () => {
    skipTesting();
    client.frame(2);
    await client.pause(2000);
    if (formUseData['Parameters']['Select Level']) {
        await client.$('tr*=' + formUseData['Parameters']['Select Level']).click();
    } else if (formUseData['States Parameters']['Select State']) {
        await client.$('tr*=' + formUseData['States Parameters']['Select State']).click();
    } else {
        await client.$('tr*=' + formUseData['Documents Parameters']['Select State']).click();
    }
});

step("Goto to level page <dataLocationStr>", async (dataLocationStr) => {
    skipTesting();
    client.frame(null);
    await client.pause(2000);
    client.frame(1).frame(2);
    await client.pause(2000);
    client.frame("iframe[id='DocNav']");
    await client.$('a=' + dataLocationStr).click();
    await client.pause(2000);
    await client.frameParent().frameParent();
    client.frame(2);
});

afterSuite(async () => {
    client.endAll();
});

step("Click link with text <linkText>", async (linkText) => {
    skipTesting();
    await client.pause(2000);
    await client.$('a=' + linkText).click();
});

step("Close current window", async () => {
    skipTesting();
    var windowHandles = await client.windowHandles();
    await client.close((windowHandles.value.length) - 1);
});

step("Focus new window", focusNewwindowStep);

step("Verify records exist", async () => {
    skipTesting();
    await client.pause(1000);
    var records = await client.selectorExecute('.advgrid tr', function (trs, message) {
        return trs.length;
    }, "");
    gauge.screenshot();
    if (records == 1) {
        skipExecution = true;
        assert.fail('No records exists.')
    }
    await client.pause(2000);
});

step("Verify no records exist", async () => {
    skipTesting();
    var records = await client.selectorExecute('.advgrid tr', function (trs, message) {
        return trs.length;
    }, "");
    gauge.screenshot();
    if (records > 1) {
        skipExecution = true;
        assert.fail('Records are exists.')
    }
});

step("Bounce server", async () => {
    skipTesting();
    const sshHost = (uiData && uiData.fin_ssh_host) ? uiData.fin_ssh_host : '';
    const sshUserid = (uiData && uiData.fin_ssh_userid) ? uiData.fin_ssh_userid : '';
    const sshPassword = (uiData && uiData.fin_ssh_password) ? uiData.fin_ssh_password : '';
    const sshCommand = (uiData && uiData.fin_ssh_bounce_server_command) ? uiData.fin_ssh_bounce_server_command : '';
    if (sshHost.trim() !== '' || sshUserid.trim() !== '' || sshPassword.trim() !== '' || sshCommand.trim() !== '') {
        const commandToBounce = "echo '" + sshPassword + "' | sudo -S " + sshCommand;
        ssh_exec(commandToBounce, {
            host: sshHost,
            user: sshUserid,
            password: sshPassword
        });
        await siteStatusWithText("Advantage is currently unavailable");
        await siteStatusWithText("Login");
    } else {
        skipExecution = true;
        assert.fail('Missing required FIN SSH detail.')
    }
});

async function login() {
    skipTesting();
    const loginClass = new Login(client);
    let userName;
    let password;
    if (appType.trim() === 'FIN') {
        userName = (uiData && uiData.userid) ? uiData.userid : '';
        password = (uiData && uiData.password) ? uiData.password : '';
    } else if (appType.trim() === 'VSS') {
        userName = (uiData && uiData.vss_userid) ? uiData.vss_userid : '';
        password = (uiData && uiData.vss_password) ? uiData.vss_password : '';
    } else {
        skipExecution = true;
        assert.fail('Application type for login is not exist.');
    }
    if (userName.trim() === '' || password.trim() === '') {
        skipExecution = true;
        assert.fail('Username / Password not provided.');
    } else {
        await loginClass.doLogin(userName, password);
    }
}

function getNewWindow() {
    return new Promise(async function (resolve, reject) {
        const currentWindow = await client.getCurrentTabId();
        var windowHandles = await client.windowHandles();
        const latestWindow = (windowHandles.value.length) - 1;
        var newWindow = (currentWindow != windowHandles.value[latestWindow]) ? windowHandles.value[latestWindow] : windowHandles.value[latestWindow - 1];
        resolve(newWindow);
    });
}

async function focusNewwindowStep() {
    skipTesting();
    var newWindow = await getNewWindow();
    client.switchTab(newWindow);
    await client.pause(2000);
}

function verifyJobSteps() {
    return new Promise(async function (resolve, reject) {
        try {
            const rows = await client.$(".advgrid").$$("tr");
            const totalRows = rows.length;
            let index = 1;

            while (index < totalRows) {
                const tableRows = await client.$(".advgrid").$$("tr");
                const links = await client.elementIdElement(tableRows[index].ELEMENT, 'a=View Log');
                let elementID = links.value.ELEMENT;
                await client.elementIdClick(elementID);
                await client.pause(2000);
                gauge.screenshot();
                await client.$('input[value="OK"]').click();
                await client.pause(2000);
                index++;
                if (index === totalRows) {
                    resolve();
                }
            }
        } catch (error) {
            resolve();
        }
    });
}

async function ExpandAll() {
    skipTesting();
    if (await client.isExisting('img[alt="Expand All"]')) {
        await client.$('img[alt="Expand All"]').click();
    }
}

async function performSearch(dataLocationStr) {
    skipTesting();
    await client.pause(2000);
    await client.$('a=Search').click();
    focusNewwindowStep();
    const dataLocationArr = dataLocationStr.split('|');
    let data = null;
    dataLocationArr.forEach((dataKey, index) => {
        if (index === 0) {
            data = Object.assign({}, formUseData);
        }
        data = data[dataKey];
    });
    const jumpToClass = new JumpTo(client);
    await jumpToClass.performTest(data);
    await client.pause(2000);
    await client.$('a=Ok').click();
    focusNewwindowStep();
    await client.pause(2000);
    client.frame(2);
    await client.pause(2000);
}

async function performParameters(dataLocationStr) {
    skipTesting();
    const dataLocationArr = dataLocationStr.split('|');
    let data = null;
    dataLocationArr.forEach((dataKey, index) => {
        if (index === 0) {
            data = Object.assign({}, formUseData);
        }
        data = data[dataKey];
    });
    const jumpToClass = new JumpTo(client);
    if (data) {
        await jumpToClass.performTest(data);
    }
    if (await client.isExisting('[name="txtT1AGNT_ID"]')) {
        await client.$('#T1BS_AGENTSaveAll').click();
        await client.pause(2000);
        const jobId = await client.$('[name="txtT1AGNT_ID"]').getValue();
        formUseData.jobId = jobId;
    }
    await client.pause(2000);
}

function siteStatusWithText(siteText) {
    return new Promise(async function (resolve, reject) {
        let tmp = 15000;
        let index = 0;
        while (index < tmp) {
            try {
                let serverBounced = await checkSiteWithText(siteText);
                if (serverBounced == 1) {
                    index = tmp;
                    resolve();
                } else {
                    index++;
                }
            } catch (error) {
                throw error;
            }
        }
    });
}

function checkSiteWithText(textToCheck) {
    return new Promise(async function (resolve, reject) {
        try {
            await client.url(siteUrl + '?v=' + Math.random())
            await client.pause(1000);
            const bodyText = await client.getText('body');
            if (bodyText && bodyText.indexOf(textToCheck) > -1) {
                resolve(1)
            } else {
                resolve(0);
            }
        } catch (error) {
            reject(error);
        }
    });
}

function skipTesting() {
    try {
        if (!skipExecution) {
            return true;
        } else {
            skipExecution = true;
            assert.fail('Test skipped');
        }
    } catch (error) {
        throw 'Test skipped';
    }
}

function performQuery(query, schemaFlag) {
    skipTesting();
    return new Promise(async (resolve, reject) => {
        try {
            await connection.db(query, schemaFlag, databaseDetails);
            resolve();
        } catch (error) {
            reject(error);
        }
    }).catch(dbError => {
        skipExecution = true;
        assert.fail(dbError['message']);
    });
}

step("Perform database activity for search R_APPR table", async () => {
    const query = "UPDATE AFMOWN.R_APPR SET ACT_FL = 1 WHERE ACT_FL = 0 AND FY in ((EXTRACT(YEAR FROM SYSDATE)),(EXTRACT(YEAR FROM SYSDATE)+1))";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for search R_CNTAC table", async () => {
    const query = "UPDATE AFMOWN.R_CNTAC SET EXTR_CTRY = NULL WHERE EXTR_CTRY IS NOT NULL";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for set reimbursement eligible flag", async () => {
    const query = "UPDATE AFMOWN.R_ACTV SET reim_elg_sta = 1 WHERE FY in ((EXTRACT(YEAR FROM SYSDATE)),EXTRACT(YEAR FROM SYSDATE)+1) AND reim_elg_sta = 0";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for Reset DCTRL to prohibit past accounting period", async () => {
    const query = "update AFMOWN.r_gen_doc_ctrl set past_apd_alw_fl = 0, past_fy_alw_fl = 0 where past_doc_dt_alw_fl = 1 and doc_cd not in ('BGCA','BGPDR','BGPHR','ABDL','VCCADDU','VCCNEW','VCCVER','VCM','ABSJ','COAJ','CA','CH','JV','JVA','JVAC','JVC','CBDL','VCC','VCCADDG','PAJV')";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for CT documents are left in draft status or have rejected", async () => {
    const query = "select doc_phase_cd, doc_sta_cd, sum(count1+count2) from ( select doc_phase_cd, doc_sta_cd, count(*) COUNT1, 0 COUNT2 from afmown.po_doc_hdr where doc_cd in ('BPO','CT', 'CTI', 'CTM','DO', 'PO') and doc_crea_usid = 'yearend' and trunc(curr_sys_dt) = to_date(SYSDATE,'DD/MM/YYYY')+365 group by doc_phase_cd, doc_sta_cd UNION ALL select doc_phase_cd, doc_sta_cd, 0 COUNT1, count(*) COUNT2 from afmown.rq_doc_hdr where doc_cd in ('CTB', 'CTMV') and doc_crea_usid = 'yearend' and trunc(curr_sys_dt) = to_date(SYSDATE,'DD/MM/YYYY')+365 group by doc_phase_cd, doc_sta_cd";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for jumpTo GASA", async () => {
    const query = "select doc_phase_cd,count(unique doc_id),sum(ln_am-al_clsd_am) from AFMOWN.abs_doc_actg where doc_cd ='GASA' and doc_crea_usid = 'yearend' and doc_crea_usid='yearend' and trunc(curr_sys_dt)= to_date(TO_CHAR(SYSDATE,'mm/dd/yyyy'),'mm/dd/yyyy') group by rollup(doc_phase_cd)";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for deselecting RLPSD line", async () => {
    const query = "SELECT doc_cd, doc_dept_cd, doc_id, doc_act_fl from afmown.po_doc_hdr where doc_phase_cd = '3' and doc_act_fl <> 1 and doc_cd||doc_dept_cd||doc_id in ( select doc_cd||doc_dept_cd||doc_id from afmown.rllp_pre_det)";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);

    //Update query for RLPSD
    query = "update afmown.rllp_pre_det set aprv_fl = 0 where doc_cd||doc_dept_cd||doc_id||doc_vend_ln_no||doc_comm_ln_no in (select doc_cd||doc_dept_cd||doc_id||doc_vend_ln_no||doc_comm_ln_no from afmown.po_doc_comm where trunc(svc_end_dt) <= to_date(SYSDATE,'DD/MM/YYYY') and doc_phase_cd = 3 and doc_func_cd <> 3)";
    await performQuery(query, schemaFlag);
});

step("Perform database activity for verify RLPSD rolled lines", async () => {
    const query = "SELECT doc_cd, doc_dept_cd, sum(count1) as \"TO ROLL\", sum(count2) as \"ROLLED\", sum(COUNT1-COUNT2) as \"VARIANCE\" FROM ( select ACTG.doc_cd, ACTG.doc_dept_cd, count (unique(ACTG.doc_id)) COUNT1, 0 COUNT2 from AFMOWN.DOC_ACTG ACTG, AFMOWN.DOC_HDR HDR where ACTG.doc_cd in ('BPO','CT','CTB','DO') and ACTG.evnt_typ_id in ('PR08','PR88') and (ACTG.ln_am >= al_clsd_am and ACTG.al_clsd_dt is null) and ACTG.doc_phase_cd = 3 and ACTG.doc_func_cd <> 3 and ACTG.BFY = (EXTRACT(YEAR FROM SYSDATE)) and ACTG.DOC_CD = HDR.DOC_CD and ACTG.DOC_DEPT_CD = HDR.DOC_DEPT_CD and ACTG.DOC_ID = HDR.DOC_ID and ACTG.DOC_VERS_NO = HDR.DOC_VERS_NO and doc_act_fl = 1 group by ACTG.doc_dept_cd, ACTG.doc_cd UNION ALL select doc_cd, doc_dept_cd, 0 COUNT1, count(doc_id) COUNT2 from AFMOWN.doc_hdr where doc_crea_usid_up = 'YEAREND' and doc_sta_cd = 1 and doc_cd in ('BPO','CT', 'CTB','CTB','DO') and trunc(curr_sys_dt) = to_date(TO_CHAR(SYSDATE,'mm/dd/yyyy'),'mm/dd/yyyy') group by doc_dept_cd, doc_cd ) GROUP BY doc_dept_cd, doc_cd";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for lock out user", async () => {
    const query = "UPDATE ADMFMOWN.R_SC_USER_INFO SET LOCK_FL = 1 WHERE USER_ID not in ('batch','dcotnoir','Kim','bladd','adickinson','yearend') --COMMIT";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for open encumbrances report", async () => {
    const query = "SELECT FUND_CD,DEPT_CD,APPR_CD,OCLS_CD,OBJ_CD,sum(pstng_am)FROM AFMOWN.jrnl_ACTG Tbl where FY_DC = (EXTRACT(YEAR FROM SYSDATE)+1) and PER_DC = 1 and pstng_cd_id = 'P005' and ((doc_cd in ('BPO','CT','CTB','CTM','DO')AND EVNT_TYP_ID = 'PRM5')or(doc_cd = 'GASA' and EVNT_TYP_ID='PR05'))group by FUND_CD,DEPT_CD,APPR_CD,OCLS_CD,OBJ_CD order by FUND_CD,DEPT_CD,APPR_CD,OCLS_CD,OBJ_CD";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for reset dirty flags on GN_FUND_CNST for current year", async () => {
    const query = "UPDATE AFMOWN.GN_FUND_CNST SET DRTY_FL = 0 WHERE DRTY_FL = 1 AND BFY = EXTRACT(YEAR FROM SYSDATE)";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for review DRAFT HELD JVAC documents in Doc_catalog", async () => {
    const query = "select doc_phase_cd,doc_sta_cd,curr_fy,curr_per,curr_bfy,count(*)from afmown.jv_doc_hdr where doc_cd = 'JVAC' and doc_dept_cd='08C' and doc_id like 'ACLS170715%' and doc_crea_usid = 'yearend' group by doc_phase_cd,doc_sta_cd,curr_fy,curr_per,curr_bfy";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for review TEMP_FYDAD", async () => {
    const query = "select unique a.fy_dc, a.per_dc, a.pscd_clos_cl_cd, b.pscd_clos_cl_nm, sum(a.dr_am), sum(a.cr_am) from AFMOWN.TEMP_FYDAD A, AFMOWN.R_PSCD_CLOSE B where a.pscd_clos_cl_cd = b.pscd_clos_cl_cd group by a.fy_dc, a.per_dc, a.pscd_clos_cl_cd, b.pscd_clos_cl_nm order by a.pscd_clos_cl_cd, a.fy_dc, a.per_dc, b.pscd_clos_cl_nm";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for negative $ unexpended cash at level 2", async () => {
    const query = "Select bfy, fund_Cd, dept_cd, appr_cd, unexp_cash_am  from afmown.bud_stru_90_lvl_2  where fund_cd not in ('010','012') and unexp_cash_am < 0 and bfy = (EXTRACT(YEAR FROM SYSDATE)) group by bfy, fund_Cd, dept_cd, appr_cd, unexp_cash_am order by bfy, fund_Cd, dept_cd, appr_cd, unexp_cash_am";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for verify BGCA", async () => {
    const query = "select unique doc_phase_cd, bfy, fy, per, count(unique fund_cd||dept_cd||appr_cd||ocls_cd) as COUNT from AFMOWN.bg_doc_ln where doc_cd = 'BGCA'and doc_dept_cd = '18F'and doc_crea_usid = 'yearend' and trunc(doc_crea_dt) = to_date(TO_CHAR(sysdate, 'MM/DD/YYYY'), 'MM/DD/YYYY') group by doc_phase_cd, bfy, fy, per";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for compare count on RLPSD table to documents created", async () => {
    const query = "select doc_dept_cd, sum(COUNT1) as \"DOCS CREATED\", sum(COUNT2) as \"ON PRE-SELECT\", SUM(COUNT1-COUNT2) as \"VARIANCE\" from ( select doc_dept_cd, count(unique doc_id) COUNT1, 0 COUNT2 from AFMOWN.doc_actg where evnt_typ_id = 'PR07' and doc_cd in ('BPO','CT','CTB','CTM','CTMV','DO','PO') and doc_crea_usid = 'yearend' and trunc(doc_last_dt) = to_date(SYSDATE,'mm/dd/yyyy') and fy_dc = (EXTRACT(YEAR FROM SYSDATE)+1) and bfy = (EXTRACT(YEAR FROM SYSDATE)+1) and doc_phase_cd = 1 group by doc_dept_cd UNION ALL select doc_dept_cd, 0 COUNT1 ,COUNT(unique doc_id) COUNT2 from AFMOWN.rllp_pre_det where aprv_fl = 1 group by doc_dept_cd ) group by doc_dept_cd";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for create B931", async () => {
    let query = "SELECT BFY,FUND_CD,DEPT_CD,APPR_CD,OCLS_CD,ENC_AM,UOBLG_AM,DSCR FROM AFMOWN.BUD_STRU_90_LVL_3 where bfy=2013 and fund_cd in ('010','012') group by BFY,FUND_CD,DEPT_CD,APPR_CD,OCLS_CD,ENC_AM,UOBLG_AM,dscr order by BFY,FUND_CD,DEPT_CD,APPR_CD,OCLS_CD";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);

    query = "SELECT BFY,FUND_CD,DEPT_CD,APPR_CD,ENC_AM,UOBLG_AM,DSCR FROM AFMOWN.BUD_STRU_90_LVL_2 where bfy=2013 and fund_cd between '013' and '024' group by BFY,FUND_CD,DEPT_CD,APPR_CD,ENC_AM,UOBLG_AM,dscr order by BFY,FUND_CD,DEPT_CD,APPR_CD";
    await performQuery(query, schemaFlag);
});

step("Perform database activity for delete effective end dates for units and subunits in closing and opening FY's", async () => {
    let query = "update ADMFMOWN.R_UNIT Tbl set efend_dt = NULL where (FY=(EXTRACT(YEAR FROM SYSDATE)) or FY=(EXTRACT(YEAR FROM SYSDATE)+1)) AND EFEND_DT IS NOT NULL";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);

    query = "update AFMOWN.R_SUNIT Tbl set efend_dt = NULL Where(FY=(EXTRACT(YEAR FROM SYSDATE)) or FY=(EXTRACT(YEAR FROM SYSDATE)+1)) AND EFEND_DT IS NOT NULL";
    await performQuery(query, schemaFlag);
});

step("Perform database activity for unlock User", async () => {
    let query = "UPDATE ADMFMOWN.R_SC_USER_INFO SET LOCK_FL = 0 WHERE SECRET_KEY_TXT = 'UNLOCKED'";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);

    query = "UPDATE ADMFMOWN.R_SC_USER_INFO SET SECRET_KEY_TXT = NULL WHERE LOCK_FL = 0 --COMMIT";
    await performQuery(query, schemaFlag);
});

step("Perform database activity for update R_APPR table", async () => {
    let query = "Update afmown.R_APPR set ACT_FL = 0 where APPR_DSCR = 'INACTIVE' and FY in ((EXTRACT(YEAR FROM SYSDATE)),(EXTRACT(YEAR FROM SYSDATE)+1))";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);

    query = "Update afmown.R_APPR set APPR_DSCR = NULL where ACT_FL = 0 and FY in ((EXTRACT(YEAR FROM SYSDATE)-1),(EXTRACT(YEAR FROM SYSDATE)))";
    await performQuery(query, schemaFlag);
});

step("Perform database activity for open incident - create jobs terminate if documents cannot be loaded", async () => {
    let query = "select DOC_CD,DOC_DEPT_CD,DOC_ID,DOC_CREA_USID from AFMOWN.PO_DOC_ACTG PO_ACTG where DOC_CD in('BPO','CT','CTM','CTMV','DO')and EVNT_TYP_ID in ('PR05') and DOC_CREA_USID not in (SELECT USER_ID from AFMOWN.R_PRCU_USER)";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);

    query = "select unique b.DOC_FUNC_CD,a.DOC_CD,a.DOC_DEPT_CD,a.DOC_ID,b.DOC_CD,b.DOC_DEPT_CD,b.DOC_ID,b.PRCU_ID,c.MGR_CLSD_FL from AFMOWN.PO_DOC_ACTG a,AFMOWN.PO_DOC_HDR b,AFMOWN.R_PRCU_ID c where a.DOC_CD in ('BPO','CT','CTM','CTMV','DO') and a.EVNT_TYP_ID = 'PR05' and FY_DC = (EXTRACT(YEAR FROM SYSDATE)) and a.LN_AM <> a.AL_CLSD_AM and a.DOC_PHASE_CD='3' and b.PRCU_ID in (select b.PRCU_ID from AFMOWN.R_PRCU_ID where c.MGR_CLSD_FL = '1') and a.DOC_CD = b.DOC_CD and a.DOC_DEPT_CD = b.DOC_DEPT_CD and a.DOC_ID = b.DOC_ID and a.DOC_PHASE_CD = b.DOC_PHASE_CD and b.prcu_id = c.prcu_id";
    await performQuery(query, schemaFlag);
});

step("Perform database activity for remedy ticket for PSMAG", async () => {
    const query = "select count(*) from afmown.r_actv where reim_elg_sta = 0 and fy in ((EXTRACT(YEAR FROM SYSDATE)), (EXTRACT(YEAR FROM SYSDATE))+1)";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for Reset dirty flags on GN_FUND_CNST", async () => {
    const query = "UPDATE AFMOWN.GN_FUND_CNST SET DRTY_FL = 0 WHERE DRTY_FL = 1";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for MAJOR PROGRAMS", async () => {
    const query = "select mjr_prog_cd, dept_cd from AFMOWN.r_mjr_prog where efend_dt < to_date(SYSDATE,'DD/MM/YYYY')+365 and mjr_prog_cd in (select mjr_prog_cd from AFMOWN.po_doc_actg where doc_cd in ('BPO','CT','CTB') and doc_crea_usid = 'yearend' and trunc(curr_sys_dt) = to_date(SYSDATE,'DD/MM/YYYY')+365) group by mjr_prog_cd, dept_cd order by mjr_prog_cd, dept_cd";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for PROGRAMS", async () => {
    const query = "select prog_cd, dept_cd from AFMOWN.r_prog where efend_dt < to_date(SYSDATE,'DD/MM/YYYY')+365 and prog_cd in (select prog_cd from AFMOWN.po_doc_actg where doc_cd in ('BPO','CT','CTM','CTMV','DO') and doc_crea_usid = 'yearend' and trunc(curr_sys_dt) = to_date(SYSDATE,'DD/MM/YYYY')+365) group by prog_cd, dept_cd order by prog_cd, dept_cd";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for FUNDING PROFILES", async () => {
    const query = "select mjr_prog_cd, dept_cd from AFMOWN.r_fprfl where efend_dt < to_date(SYSDATE,'DD/MM/YYYY')+365 and mjr_prog_cd in (select mjr_prog_cd from AFMOWN.po_doc_actg where doc_cd in ('BPO','CT','CTM','CTMV','DO') and doc_crea_usid = 'yearend' and trunc(curr_sys_dt) = to_date(SYSDATE,'DD/MM/YYYY')+365)";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for ACTIVITIES", async () => {
    const query = "select actv_cd, dept_cd from AFMOWN.r_actv where efend_dt < to_date(SYSDATE,'DD/MM/YYYY')+365 and actv_cd in (select actv_cd from AFMOWN.po_doc_actg where doc_cd in ('BPO','CT','CTB') and doc_crea_usid = 'yearend' and trunc(curr_sys_dt) = to_date(SYSDATE,'DD/MM/YYYY')+365)";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for SUB ACTIVITIES", async () => {
    const query = "select dept_cd, actv_cd, sactv_cd from AFMOWN.r_sactv where efend_dt < to_date(SYSDATE,'DD/MM/YYYY')+365 and sactv_cd in (select sactv_cd from AFMOWN.po_doc_actg where doc_cd in ('BPO','CT','CTB') and doc_crea_usid = 'yearend' and trunc(curr_sys_dt) = to_date(SYSDATE,'DD/MM/YYYY')+365)";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for UPDATE MAJOR PROGRAMS", async () => {
    const query = "update AFMOWN.r_mjr_prog set efend_dt = to_date(SYSDATE,'DD/MM/YYYY')+365 where efend_dt < to_date(SYSDATE,'DD/MM/YYYY')+365 and mjr_prog_cd in (select mjr_prog_cd from AFMOWN.po_doc_actg where doc_cd in ('BPO','CT','CTB') and doc_crea_usid = 'yearend' and trunc(curr_sys_dt) = to_date(SYSDATE,'DD/MM/YYYY')+365)";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for UPDATE PROGRAMS", async () => {
    const query = "update AFMOWN.r_prog set efend_dt = to_date(SYSDATE,'DD/MM/YYYY')+365 where efend_dt < to_date(SYSDATE,'DD/MM/YYYY')+365 and prog_cd in (select prog_cd from AFMOWN.po_doc_actg where doc_cd in ('BPO','CT','CTB') and doc_crea_usid = 'yearend' and trunc(curr_sys_dt) = to_date(SYSDATE,'DD/MM/YYYY')+365)";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for UPDATE FUNDING PROFILES", async () => {
    const query = "update AFMOWN.r_fprfl set efend_dt = to_date(SYSDATE,'DD/MM/YYYY')+365 where efend_dt < to_date(SYSDATE,'DD/MM/YYYY')+365 and mjr_prog_cd in (select mjr_prog_cd from AFMOWN.po_doc_actg where doc_cd in ('BPO','CT','CTB') and doc_crea_usid = 'yearend' and trunc(curr_sys_dt) = to_date(SYSDATE,'DD/MM/YYYY')+365)";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for UPDATE ACTIVITIES", async () => {
    const query = "update AFMOWN.r_actv set efend_dt = to_date(SYSDATE,'DD/MM/YYYY')+365 where efend_dt < to_date(SYSDATE,'DD/MM/YYYY')+365 and actv_cd in (select actv_cd from AFMOWN.po_doc_actg where doc_cd in ('BPO','CT','CTB') and doc_crea_usid = 'yearend' and trunc(curr_sys_dt) = to_date(SYSDATE,'DD/MM/YYYY')+365)";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for SET DESCRIPTION FOR INACTIVE APPR", async () => {
    const query = "update AFMOWN.R_APPR set appr_dscr = 'INACTIVE' Where FY in ((EXTRACT(YEAR FROM SYSDATE)),(EXTRACT(YEAR FROM SYSDATE)+1)) AND ACT_FL = 0";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for SET INACTIVE APPR AS ACTIVE", async () => {
    const query = "update AFMOWN.R_APPR set ACT_FL = 1 Where FY in ((EXTRACT(YEAR FROM SYSDATE)),(EXTRACT(YEAR FROM SYSDATE)+1)) AND ACT_FL = 0 AND appr_dscr = 'INACTIVE'";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for Budget Lines Selected for Roll s/b at LVL 3", async () => {
    const query = "select count(*) from afmown.bud_stru_90_lvl_3 where bfy = (EXTRACT(YEAR FROM SYSDATE)) and dept_cd <= '16A' and dept_cd not in ('05A','10A')";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});

step("Perform database activity for budget Lines Not Rolled should be NULL", async () => {
    let query = "select count(*) from afmown.bud_stru_90_lvl_3 where bfy = (EXTRACT(YEAR FROM SYSDATE)) and dept_cd between '17A' and '92P'";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);

    query = "select count(*) from afmown.bud_stru_90_lvl_3 where bfy = (EXTRACT(YEAR FROM SYSDATE)) and dept_cd between '94B' and '99Z'";
    await performQuery(query, schemaFlag);

});

step("Perform database activity for review document catalog", async function () {
    let query = "select doc_dept_cd, sum(COUNT1) as \"DOCS CREATED\", sum(COUNT2) as \"ON PRE-SELECT\", sum(COUNT1-COUNT2) as \"VARIANCE\" from ( select doc_dept_cd, count(unique doc_id) COUNT1, 0 COUNT2 from AFMOWN.doc_actg where evnt_typ_id = 'PRM5' and doc_cd in ('BPO','CT','CTB','CTM','CTMV','DO','PO') and doc_crea_usid = 'yearend' and trunc(doc_last_dt) = to_date(SYSDATE,'mm/dd/yyyy') and fy_dc = (EXTRACT(YEAR FROM SYSDATE)+1) and doc_phase_cd = 1 group by doc_dept_cd UNION ALL select doc_dept_cd, 0 COUNT1, count(unique doc_id) COUNT2 from AFMOWN.rllp_pre_det where aprv_fl = 1 group by doc_dept_cd)group by doc_dept_cd";
    const schemaFlag = 1;
    await performQuery(query, schemaFlag);
});


step("Click link with text Administration for VSS", async function () {
    skipTesting();
    await client.pause(12000);
    client.frame(2);
    await client.$('a=Administration').click();
});

step("Verify Job Parameters", async function () {
    client.frame(2);
    await client.pause(1000);
    await verifyJobParameters();
});

function verifyJobParameters() {
    return new Promise(async (resolve, reject) => {
        try {
            let nextClass = '';
            while (nextClass.trim() !== 'inactive') {
                await verifyParameterOnPage();
                if (await client.isExisting('#T2BS_CATALOG_PARMnextpage')) {
                    nextClass = await client.getAttribute('#T2BS_CATALOG_PARMnextpage', 'class');
                }
                if (nextClass.trim() !== 'inactive') {
                    await client.$('#T2BS_CATALOG_PARMnextpage').click();
                } else {
                    resolve();
                }
            }
        } catch (error) {
            reject(error);
        }
    }).catch(err => {
        skipExecution = true;
        gauge.screenshot();
        assert.fail(err);
    });
}

function verifyParameterOnPage() {
    return new Promise(async (resolve, reject) => {
        const txtParamNames = await client.$(".advgrid").$$('input[title="Parameter Name"]');
        var index = 0;
        var totalParams = txtParamNames.length;
        while (index < totalParams) {
            if (txtParamNames[index]) {
                const txtNMElementId = txtParamNames[index]['ELEMENT'];
                const txtIdObject = await client.elementIdAttribute(txtNMElementId, 'id');
                const txtParamId = txtIdObject['value'];
                const txtParamText = await client.$('#' + txtParamId).getValue();

                if (txtParamText.indexOf('Table') === 0) {
                    const txtValueId = txtParamId.replace('NM', 'VL');
                    const txtValueText = await client.$('#' + txtValueId).getValue();
                    const txtValueArr = txtValueText.split(';');
                    if (txtValueArr.length === 3) {
                        if (txtValueArr[1] !== 'yes' && txtValueArr[2] !== 'no') {
                            txtValueArr[1] = 'yes';
                            txtValueArr[2] = 'no';
                            await client.$('#' + txtValueId).setValue(txtValueArr.join(';'));
                        }
                    } else {
                        reject('Parameter not fit.')
                    }
                }
                index++;
                if (index === totalParams) {
                    await client.$('#T1R_BS_CATALOGSaveAll').click();
                    resolve();
                }
            }
        }
    })
}

step("Restart app", async function () {
    await client.endAll();
    await client.init();
});