const processData = [

    {
        processName: "New year table initiation (NYTI) - 1",
        processJson: "NYTI.json",
        processSpec: "NYTI.spec",
        position: 1,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Bounce server",
        processJson: "",
        processSpec: "bounce_Server.spec",
        position: 1,
        isQuery: true,
        phase: 1
    },
    {
        processName: "New year table initiation (NYTI) - 2",
        processJson: "NYTI.json",
        processSpec: "NYTI.spec",
        position: 2,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Bounce server",
        processJson: "",
        processSpec: "bounce_Server.spec",
        position: 1,
        isQuery: true,
        phase: 1
    },
    {
        processName: "New year table initiation (NYTI) - 3",
        processJson: "NYTI.json",
        processSpec: "NYTI.spec",
        position: 3,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Verify REQBUD",
        processJson: "jumpTo_REQBUD.json",
        processSpec: "jumpTo_REQBUD.spec",
        position: 1,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Verify BYSTPFSL",
        processJson: "jumpTo_BYSTPFSL.json",
        processSpec: "jumpTo_BYSTPFSL.spec",
        position: 1,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Reset dirty flags on GN_FUND_CNST",
        processJson: "",
        processSpec: "reset_DirtyFlags_GN_FUND_CNST.spec",
        position: 1,
        isQuery: true,
        phase: 1
    },
    {
        processName: "Set reimbursement eligible flag",
        processJson: "",
        processSpec: "set_Reimbursement_Eligible_Flag.spec",
        position: 1,
        isQuery: true,
        phase: 1
    },
    {
        processName: "Provide count in remedy ticket for PSMAG",
        processJson: "",
        processSpec: "remedy_Ticket_For_PSMAG.spec",
        position: 1,
        isQuery: true,
        phase: 1
    },
    {
        processName: "Reset dirty flags on GN_FUND_CNST for current year",
        processJson: "",
        processSpec: "reset_DirtyFlags_GN_FUND_CNST_forCurrentYear.spec",
        position: 1,
        isQuery: true,
        phase: 1
    },
    {
        processName: "Bounce server",
        processJson: "",
        processSpec: "bounce_Server.spec",
        position: 1,
        isQuery: true,
        phase: 1
    },
    {
        processName: "Calculation budget control amount",
        processJson: "budget_Controll_Amount.json",
        processSpec: "budget_Controll_Amount.spec",
        position: 1,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Bounce server",
        processJson: "",
        processSpec: "bounce_Server.spec",
        position: 1,
        isQuery: true,
        phase: 1
    },
    {
        processName: "One time export tables - BATSETUP",
        processJson: "",
        processSpec: "one_Time_Export_For_BATSETUP.spec",
        position: 1,
        isQuery: true,
        phase: 1
    },
    {
        processName: "Update R_CNTAC table",
        processJson: "",
        processSpec: "search_R_CNTAC_Table.spec",
        position: 1,
        isQuery: true,
        phase: 1
    },
    {
        processName: "One time export tables",
        processJson: "one_Time_Export_Tables.json",
        processSpec: "one_Time_Export_Tables.spec",
        position: 1,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Export from advantage",
        processJson: "one_Time_Export_From_Advantage.json",
        processSpec: "one_Time_Export_From_Advantage.spec",
        position: 1,
        isQuery: false,
        phase: 1
    },
    {
        processName: "VSS Synchronization",
        processJson: "VSS_Synchronization.json",
        processSpec: "VSS_Synchronization.spec",
        position: 1,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Setup DCTRL - 1 - for DocId = BGCA",
        processJson: "jumpTo_DCTRL.json",
        processSpec: "jumpTo_DCTRL.spec",
        position: 1,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Setup BUDST - 1 - for StructureId = 90",
        processJson: "jumpTo_BUDST.json",
        processSpec: "jumpTo_BUDST.spec",
        position: 1,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Bounce server",
        processJson: "",
        processSpec: "bounce_Server.spec",
        position: 1,
        isQuery: true,
        phase: 1
    },
    {
        processName: "Setup PBRP - 1 -  ParameterId = 11",
        processJson: "jumpTo_PBRP.json",
        processSpec: "jumpTo_PBRP.spec",
        position: 1,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Setup PBRP - 2 - ParameterId = 12",
        processJson: "jumpTo_PBRP.json",
        processSpec: "jumpTo_PBRP.spec",
        position: 2,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Setup PBRP - 3 - ParameterId = 13",
        processJson: "jumpTo_PBRP.json",
        processSpec: "jumpTo_PBRP.spec",
        position: 3,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Setup PBRP - 4 - ParameterId = 3",
        processJson: "jumpTo_PBRP.json",
        processSpec: "jumpTo_PBRP.spec",
        position: 4,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Search for R_APPR table",
        processJson: "",
        processSpec: "search_R_APPR_Table.spec",
        position: 1,
        isQuery: true,
        phase: 1
    },
    {
        processName: "Budget roll jobs - report - 1 - ParameterId = 11",
        processJson: "budget_Roll_For_Report.json",
        processSpec: "budget_Roll_For_Report.spec",
        position: 1,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Budget roll jobs - report - 2 - ParameterId = 12",
        processJson: "budget_Roll_For_Report.json",
        processSpec: "budget_Roll_For_Report.spec",
        position: 2,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Budget roll jobs - report - 3 - ParameterId = 13",
        processJson: "budget_Roll_For_Report.json",
        processSpec: "budget_Roll_For_Report.spec",
        position: 3,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Budget roll jobs - chain - 1 - ParameterId = 11",
        processJson: "budget_Roll_For_Chain.json",
        processSpec: "budget_Roll_For_Chain.spec",
        position: 1,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Budget roll jobs - chain - 2 - ParameterId = 12",
        processJson: "budget_Roll_For_Chain.json",
        processSpec: "budget_Roll_For_Chain.spec",
        position: 2,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Budget roll jobs - chain - 3 - ParameterId = 13",
        processJson: "budget_Roll_For_Chain.json",
        processSpec: "budget_Roll_For_Chain.spec",
        position: 3,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Verify BGCA documents",
        processJson: "",
        processSpec: "verify_BGCA.spec",
        position: 1,
        isQuery: true,
        phase: 1
    },
    {
        processName: "Budget roll jobs - chain - 4 - ParameterId = 11",
        processJson: "budget_Roll_For_Chain.json",
        processSpec: "budget_Roll_For_Chain.spec",
        position: 4,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Budget roll jobs - chain - 5 - ParameterId = 12",
        processJson: "budget_Roll_For_Chain.json",
        processSpec: "budget_Roll_For_Chain.spec",
        position: 5,
        isQuery: false,
        phase: 1

    },
    {
        processName: "Budget roll jobs - chain - 6 - ParameterId = 13",
        processJson: "budget_Roll_For_Chain.json",
        processSpec: "budget_Roll_For_Chain.spec",
        position: 6,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Budget roll jobs - Report - 4 - ParameterId = 3",
        processJson: "budget_Roll_For_Report.json",
        processSpec: "budget_Roll_For_Report.spec",
        position: 4,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Budget roll jobs - chain - 7 - ParameterId = 3",
        processJson: "budget_Roll_For_Chain.json",
        processSpec: "budget_Roll_For_Chain.spec",
        position: 7,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Verify BGCA documents",
        processJson: "",
        processSpec: "verify_BGCA.spec",
        position: 1,
        isQuery: true,
        phase: 1
    },
    {
        processName: "Budget roll jobs - chain - 8 - ParameterId = 3",
        processJson: "budget_Roll_For_Chain.json",
        processSpec: "budget_Roll_For_Chain.spec",
        position: 8,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Update R_APPR table",
        processJson: "",
        processSpec: "update_R_APPR_Table.spec",
        position: 1,
        isQuery: true,
        phase: 1
    },
    {
        processName: "Setup BUDST - 2 - for StructureId = 90",
        processJson: "jumpTo_BUDST.json",
        processSpec: "jumpTo_BUDST.spec",
        position: 2,
        isQuery: false,
        phase: 1
    },
    {
        processName: "Bounce server",
        processJson: "",
        processSpec: "bounce_Server.spec",
        position: 1,
        isQuery: true,
        phase: 1
    },












    {
        processName: "Lock out user",
        processJson: "",
        processSpec: "lock_Out_User.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Create B931",
        processJson: "",
        processSpec: "B931.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Update MESG - 1 - for code = ME216",
        processJson: "jumpTo_MESG.json",
        processSpec: "jumpTo_MESG.spec",
        position: 1,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Setup APD - 1 - for Period = 15",
        processJson: "jumpTo_APD.json",
        processSpec: "jumpTo_APD.spec",
        position: 1,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Setup APPCTRL - 1 - for paramName = BACKOUT_APD,BACKOUT_FY,AR_REF_OPT",
        processJson: "jumpTo_APPCTRL.json",
        processSpec: "jumpTo_APPCTRL.spec",
        position: 1,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Bounce server",
        processJson: "",
        processSpec: "bounce_Server.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Setup DCTRL - 2 -  for DocId = BPO,CT,CTB,CTM,DO,PO,CTMV,GASA",
        processJson: "jumpTo_DCTRL.json",
        processSpec: "jumpTo_DCTRL.spec",
        position: 2,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Reject All Pending Document - 1 - for DocCode = GASA",
        processJson: "system_Maintenance_Utility.json",
        processSpec: "system_Maintenance_Utility.spec",
        position: 1,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Update MESG - 2 - for code = A6351,A1506,A1591,A1592",
        processJson: "jumpTo_MESG.json",
        processSpec: "jumpTo_MESG.spec",
        position: 2,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Budget roll process - Contract Roll - Create and Load",
        processJson: "contract_Roll.json",
        processSpec: "contract_Roll.spec",
        position: 1,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Check for CT document with reserved funding",
        processJson: "",
        processSpec: "CT_Document_Reserved_Funding.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Run detail accounting SQL's to update effective end dates (Resubmit rejected documents)",
        processJson: "",
        processSpec: "resubmit_Rejected_Document.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Budget roll process - Contract Roll - Submit",
        processJson: "contract_Roll.json",
        processSpec: "contract_Roll.spec",
        position: 2,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Setup DCTRL for - 3 -  for DocId = BPO,CT,CTB,CTM,CTMV,DO,PO",
        processJson: "jumpTo_DCTRL.json",
        processSpec: "jumpTo_DCTRL.spec",
        position: 3,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Update MESG - 3 - for code = A2892,A5073,A5722,A2419",
        processJson: "jumpTo_MESG.json",
        processSpec: "jumpTo_MESG.spec",
        position: 3,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Setup APPCTRL - 2 - for paramName = BACKOUT_APD,BACKOUT_FY",
        processJson: "jumpTo_APPCTRL.json",
        processSpec: "jumpTo_APPCTRL.spec",
        position: 2,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Bounce server",
        processJson: "",
        processSpec: "bounce_Server.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Reject All Pending Document - 2 - Doc Code = BPO,CT,CTM,DO,GASA,PO",
        processJson: "system_Maintenance_Utility.json",
        processSpec: "system_Maintenance_Utility.spec",
        position: 2,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Setup RLPA - 1 - for ParameterId = 1",
        processJson: "jumpTo_RLPA.json",
        processSpec: "jumpTo_RLPA.spec",
        position: 1,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Open activity roll job - Report - 1 - ParamId = 1",
        processJson: "open_Activity_RollJobs_Report.json",
        processSpec: "open_Activity_RollJobs_Report.spec",
        position: 1,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Setup RLPA - 2 - for ParameterId = 2",
        processJson: "jumpTo_RLPA.json",
        processSpec: "jumpTo_RLPA.spec",
        position: 2,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Open activity roll job - Chain - 1 - ParamId = 2",
        processJson: "open_Activity_RollJobs_Chain.json",
        processSpec: "open_Activity_RollJobs_Chain.spec",
        position: 1,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Deselecting RLPSD Lines - Verify RLPSD table",
        processJson: "",
        processSpec: "deselecting_RLPSD_Lines.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Setup RLPA - 3 - for ParameterId = 3",
        processJson: "jumpTo_RLPA.json",
        processSpec: "jumpTo_RLPA.spec",
        position: 3,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Open activity roll job - Chain  - 2 - ParamId = 3",
        processJson: "open_Activity_RollJobs_Chain.json",
        processSpec: "open_Activity_RollJobs_Chain.spec",
        position: 2,
        isQuery: false,
        phase: 2
    },
    {
        processName: "SQL to compare RLPSD table to documents created",
        processJson: "",
        processSpec: "verify_RLPSD.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Open activity roll job - Chain - 3 - ParamId = 3",
        processJson: "open_Activity_RollJobs_Chain.json",
        processSpec: "open_Activity_RollJobs_Chain.spec",
        position: 3,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Review_CT documents in draft or rejected status",
        processJson: "",
        processSpec: "CT_Dos_Are_Left_In_DraftStatus.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Reject all pending  GASA document -3 - for DocCode = GASA",
        processJson: "system_Maintenance_Utility.json",
        processSpec: "system_Maintenance_Utility.spec",
        position: 3,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Setup RLPA - 4 -for ParameterId = 10",
        processJson: "jumpTo_RLPA.json",
        processSpec: "jumpTo_RLPA.spec",
        position: 4,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Open activity roll job - Report - 2 - ParamId = 10",
        processJson: "open_Activity_RollJobs_Report.json",
        processSpec: "open_Activity_RollJobs_Report.spec",
        position: 2,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Setup RLPA - 5 - for ParameterId = 11",
        processJson: "jumpTo_RLPA.json",
        processSpec: "jumpTo_RLPA.spec",
        position: 5,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Open activity roll job - Chain - 4 - ParamId = 11",
        processJson: "open_Activity_RollJobs_Chain.json",
        processSpec: "open_Activity_RollJobs_Chain.spec",
        position: 4,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Deselecting RLPSD Lines - Verify RLPSD table",
        processJson: "",
        processSpec: "deselecting_RLPSD_Lines.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Setup RLPA - 6 - for ParameterId = 12",
        processJson: "jumpTo_RLPA.json",
        processSpec: "jumpTo_RLPA.spec",
        position: 6,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Open activity roll job - Chain - 5 - ParamId = 12",
        processJson: "open_Activity_RollJobs_Chain.json",
        processSpec: "open_Activity_RollJobs_Chain.spec",
        position: 5,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Open activity roll job - Chain - 6 - ParamId = 12",
        processJson: "open_Activity_RollJobs_Chain.json",
        processSpec: "open_Activity_RollJobs_Chain.spec",
        position: 6,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Review GASA document in draft or rejected status",
        processJson: "",
        processSpec: "jumpTo_GASA.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Setup RLPA - 7 - for ParameterId = 4",
        processJson: "jumpTo_RLPA.json",
        processSpec: "jumpTo_RLPA.spec",
        position: 7,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Update MESG - 4 - for code = A3809",
        processJson: "jumpTo_MESG.json",
        processSpec: "jumpTo_MESG.spec",
        position: 4,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Open incident - Create jobs terminate if documents cannot be loaded(Force-closed or deleted PRCU_USER)",
        processJson: "",
        processSpec: "verify_PRCU_USER.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Reject all pending document - 4 - for DocCode = BPO,CT,CTM,DO",
        processJson: "system_Maintenance_Utility.json",
        processSpec: "system_Maintenance_Utility.spec",
        position: 4,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Open activity roll job - Report - 3 - ParamId = 4",
        processJson: "open_Activity_RollJobs_Report.json",
        processSpec: "open_Activity_RollJobs_Report.spec",
        position: 3,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Setup RLPA - 8 - for ParameterId = 5",
        processJson: "jumpTo_RLPA.json",
        processSpec: "jumpTo_RLPA.spec",
        position: 8,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Open activity roll job - Chain - 7 - ParamId = 5",
        processJson: "open_Activity_RollJobs_Chain.json",
        processSpec: "open_Activity_RollJobs_Chain.spec",
        position: 7,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Deselecting RLPSD Lines - Verify RLPSD table",
        processJson: "",
        processSpec: "deselecting_RLPSD_Lines.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Setup RLPA - 9 - for ParameterId = 6",
        processJson: "jumpTo_RLPA.json",
        processSpec: "jumpTo_RLPA.spec",
        position: 9,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Run detail accounting SQL's to update effective end dates (Resubmit rejected documents)",
        processJson: "",
        processSpec: "resubmit_Rejected_Document.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Open activity roll job - Chain - 8 - ParamId = 6",
        processJson: "open_Activity_RollJobs_Chain.json",
        processSpec: "open_Activity_RollJobs_Chain.spec",
        position: 8,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Review Documents catalog",
        processJson: "",
        processSpec: "document_Catalog.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Open activity roll job - Chain - 9 - ParamId = 6",
        processJson: "open_Activity_RollJobs_Chain.json",
        processSpec: "open_Activity_RollJobs_Chain.spec",
        position: 9,
        isQuery: false,
        phase: 2
    },
    {
        processName: "* Setup DCTRL for - 4 -  for DocId = ",
        processJson: "jumpTo_DCTRL.json",
        processSpec: "jumpTo_DCTRL.spec",
        position: 4,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Setup RLPA - 10 - for ParameterId = 13",
        processJson: "jumpTo_RLPA.json",
        processSpec: "jumpTo_RLPA.spec",
        position: 10,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Update MESG - 5 -  for code = A3809",
        processJson: "jumpTo_MESG.json",
        processSpec: "jumpTo_MESG.spec",
        position: 5,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Open incident - Create jobs terminate if documents cannot be loaded(Force-closed or deleted PRCU_USER)",
        processJson: "",
        processSpec: "verify_PRCU_USER.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Reject all pending document - 5 - DocCode = BPO,CT,CTM,DO",
        processJson: "system_Maintenance_Utility.json",
        processSpec: "system_Maintenance_Utility.spec",
        position: 5,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Open activity roll job - Report - 4 - ParamId = 13",
        processJson: "open_Activity_RollJobs_Report.json",
        processSpec: "open_Activity_RollJobs_Report.spec",
        position: 4,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Setup RLPA - 11 - for ParameterId = 14",
        processJson: "jumpTo_RLPA.json",
        processSpec: "jumpTo_RLPA.spec",
        position: 11,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Open activity roll job - Chain - 10 - ParamId = 14",
        processJson: "open_Activity_RollJobs_Chain.json",
        processSpec: "open_Activity_RollJobs_Chain.spec",
        position: 10,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Deselecting RLPSD Lines - Verify RLPSD table",
        processJson: "",
        processSpec: "deselecting_RLPSD_Lines.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Setup RLPA - 12 - for ParameterId = 15",
        processJson: "jumpTo_RLPA.json",
        processSpec: "jumpTo_RLPA.spec",
        position: 12,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Run detail accounting SQL's to update effective end dates (Resubmit rejected documents)",
        processJson: "",
        processSpec: "resubmit_Rejected_Document.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Open activity roll job - Chain - 11 - ParamId = 15",
        processJson: "open_Activity_RollJobs_Chain.json",
        processSpec: "open_Activity_RollJobs_Chain.spec",
        position: 11,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Documents catalog",
        processJson: "",
        processSpec: "document_Catalog.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Setup DCTRL for - 5 -  for DocId = BPO, CT, CTM, CTB, CTMV,DO,PO",
        processJson: "jumpTo_DCTRL.json",
        processSpec: "jumpTo_DCTRL.spec",
        position: 5,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Setup DCTRL for - 6 -  for DocId = ABDL, CBDL",
        processJson: "jumpTo_DCTRL.json",
        processSpec: "jumpTo_DCTRL.spec",
        position: 6,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Setup PROGREQ - 1 ",
        processJson: "jumpTo_PROGREQ.json",
        processSpec: "jumpTo_PROGREQ.spec",
        position: 1,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Update MESG - 6 -  for code = A5074 ",
        processJson: "jumpTo_MESG.json",
        processSpec: "jumpTo_MESG.spec",
        position: 6,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Add CBDL document to awards section of procurement type (PRCUTYP) - 1",
        processJson: "jumpTo_PRCUTYP.json",
        processSpec: "jumpTo_PRCUTYP.spec",
        position: 1,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Setup LPPA - 1 - paramID = 1",
        processJson: "jumpTo_LPPA.json",
        processSpec: "jumpTo_LPPA.spec",
        position: 1,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Open activity roll job - Report - 5 - ParamId = 1",
        processJson: "open_Activity_RollJobs_Report.json",
        processSpec: "open_Activity_RollJobs_Report.spec",
        position: 5,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Setup LPPA - 2 - paramID = 2",
        processJson: "jumpTo_LPPA.json",
        processSpec: "jumpTo_LPPA.spec",
        position: 2,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Open activity roll job - Chain - 12 - ParamId = 2",
        processJson: "open_Activity_RollJobs_Chain.json",
        processSpec: "open_Activity_RollJobs_Chain.spec",
        position: 12,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Deselecting RLPSD Lines - Verify RLPSD table",
        processJson: "",
        processSpec: "verify_RLPSD.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Setup LPPA - 3 - paramID = 3",
        processJson: "jumpTo_LPPA.json",
        processSpec: "jumpTo_LPPA.spec",
        position: 3,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Open activity roll laps - 1 - ParamId = 3",
        processJson: "open_Activity_Lapse_Roll.json",
        processSpec: "open_Activity_Lapse_Roll.spec",
        position: 1,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Document catalog for all documents",
        processJson: "",
        processSpec: "document_Catalog.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Run detail accounting SQL's to update effective end dates (Resubmit rejected documents)",
        processJson: "",
        processSpec: "resubmit_Rejected_Document.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Update MESG - 7 -  for code = A5074",
        processJson: "jumpTo_MESG.json",
        processSpec: "jumpTo_MESG.spec",
        position: 7,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Setup DCTRL for - 7 -  for DocId = ABDL,CBDL",
        processJson: "jumpTo_DCTRL.json",
        processSpec: "jumpTo_DCTRL.spec",
        position: 7,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Setup PROGREQ - 2",
        processJson: "jumpTo_PROGREQ.json",
        processSpec: "jumpTo_PROGREQ.spec",
        position: 2,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Update MESG - 8 -  for code = A5074",
        processJson: "jumpTo_MESG.json",
        processSpec: "jumpTo_MESG.spec",
        position: 8,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Add CBDL document to awards section of procurement type (PRCUTYP) - 2",
        processJson: "jumpTo_PRCUTYP.json",
        processSpec: "jumpTo_PRCUTYP.spec",
        position: 2,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Setup LPPA - 4 - paramID = 1 ",
        processJson: "jumpTo_LPPA.json",
        processSpec: "jumpTo_LPPA.spec",
        position: 4,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Open activity roll job - Report - 6 - ParamId = 1",
        processJson: "open_Activity_RollJobs_Report.json",
        processSpec: "open_Activity_RollJobs_Report.spec",
        position: 6,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Setup LPPA - 5 - ParamID = 2",
        processJson: "jumpTo_LPPA.json",
        processSpec: "jumpTo_LPPA.spec",
        position: 5,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Open activity roll job - Chain - 13 - ParamId = 2",
        processJson: "open_Activity_RollJobs_Chain.json",
        processSpec: "open_Activity_RollJobs_Chain.spec",
        position: 13,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Deselecting RLPSD Lines - Verify RLPSD table",
        processJson: "",
        processSpec: "verify_RLPSD.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Setup LPPA - 6 - ParamID = 3",
        processJson: "jumpTo_LPPA.json",
        processSpec: "jumpTo_LPPA.spec",
        position: 6,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Open activity roll laps - 2 - ParamId = 3",
        processJson: "open_Activity_Lapse_Roll.json",
        processSpec: "open_Activity_Lapse_Roll.spec",
        position: 2,
        isQuery: false,
        phase: 2
    },
    {
        processName: " Verify documents catalog",
        processJson: "",
        processSpec: "document_Catalog.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {

        processName: "Run detail accounting SQL's to update effective end dates (Resubmit rejected documents)",
        processJson: "",
        processSpec: "resubmit_Rejected_Document.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Documents catalog",
        processJson: "",
        processSpec: "document_Catalog.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Update MESG - 9 -  for code = A5074",
        processJson: "jumpTo_MESG.json",
        processSpec: "jumpTo_MESG.spec",
        position: 9,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Open encumbrances report",
        processJson: "",
        processSpec: "open_Encumbrances_Report.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Setup DCTRL for - 8 -  for DocId = RE,RES,REM",
        processJson: "jumpTo_DCTRL.json",
        processSpec: "jumpTo_DCTRL.spec",
        position: 8,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Setup APPCTRL - 3 - for paramName = AR_REF_OPT ,BACKOUT_APD , BACKOUT_FY",
        processJson: "jumpTo_APPCTRL.json",
        processSpec: "jumpTo_APPCTRL.spec",
        position: 3,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Bounce server",
        processJson: "",
        processSpec: "bounce_Server.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Update MESG - 10 -  for code = A4150",
        processJson: "jumpTo_MESG.json",
        processSpec: "jumpTo_MESG.spec",
        position: 10,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Setup RLPA - 13 - for ParameterId = 7",
        processJson: "jumpTo_RLPA.json",
        processSpec: "jumpTo_RLPA.spec",
        position: 13,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Clear all pending RE documents (DCTRL) for - 9 -  for DocId = RE",
        processJson: "jumpTo_DCTRL.json",
        processSpec: "jumpTo_DCTRL.spec",
        position: 9,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Clear all pending RE documents (System maintainace utility job) - 6 - DocType = RE",
        processJson: "system_Maintenance_Utility.json",
        processSpec: "system_Maintenance_Utility.spec",
        position: 6,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Open activity roll job - Report - 7 - ParamId = 7",
        processJson: "open_Activity_RollJobs_Report.json",
        processSpec: "open_Activity_RollJobs_Report.spec",
        position: 7,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Setup RLPA - 14 - for ParameterId = 8",
        processJson: "jumpTo_RLPA.json",
        processSpec: "jumpTo_RLPA.spec",
        position: 14,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Open activity roll job - Chain - 14 - ParamId = 8",
        processJson: "open_Activity_RollJobs_Chain.json",
        processSpec: "open_Activity_RollJobs_Chain.spec",
        position: 14,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Deselecting RLPSD Lines - Verify RLPSD table",
        processJson: "",
        processSpec: "deselecting_RLPSD_Lines.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Setup RLPA - 15 - for ParameterId = 9",
        processJson: "jumpTo_RLPA.json",
        processSpec: "jumpTo_RLPA.spec",
        position: 15,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Open activity roll job - Chain - 15 - ParamId = 9",
        processJson: "open_Activity_RollJobs_Chain.json",
        processSpec: "open_Activity_RollJobs_Chain.spec",
        position: 15,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Documents catalog",
        processJson: "",
        processSpec: "document_Catalog.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Documents catalog",
        processJson: "",
        processSpec: "document_Catalog.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Run detail accounting SQL's to update effective end dates (Resubmit rejected documents)",
        processJson: "",
        processSpec: "resubmit_Rejected_Document.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
    {
        processName: "Update DCTRL  for - 10 - for DocId = RE,RES,REM ",
        processJson: "jumpTo_DCTRL.json",
        processSpec: "jumpTo_DCTRL.spec",
        position: 10,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Reset DCTRL to prohibit past accounting period",
        processJson: "",
        processSpec: "reset_DCTRL_to_prohibit_past.spec",
        isQuery: true,
        phase: 2
    },
    {
        processName: "Reset DCTRL for - 11 - for DocId = ",
        processJson: "jumpTo_DCTRL.json",
        processSpec: "jumpTo_DCTRL.spec",
        position: 11,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Setup APPCTRL - 4 - for paramName = BACKOUT_APD,BACKOUT_FY,AR_REF_OPT",
        processJson: "jumpTo_APPCTRL.json",
        processSpec: "jumpTo_APPCTRL.spec",
        position: 4,
        isQuery: false,
        phase: 2
    },
    {
        processName: "Unlock user",
        processJson: "",
        processSpec: "unlock_Users.spec",
        position: 1,
        isQuery: true,
        phase: 2
    },
















    {
        processName: "Budget roll - Unexpended cash - Chain - 9 - ParameterId = ",
        processJson: "budget_Roll_For_Chain.json",
        processSpec: "budget_Roll_For_Chain.spec",
        position: 9,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Run SQL's for negative $ unexpended cash at level 2",
        processJson: "",
        processSpec: "unexpended_Cash_Level2.spec",
        position: 1,
        isQuery: true,
        phase: 3
    },
    {
        processName: "Setup DCTRL for - 13 -  for DocId = BGCA",
        processJson: "jumpTo_DCTRL.json",
        processSpec: "jumpTo_DCTRL.spec",
        position: 13,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Setup BUDST - 3 - for StructureId = 90",
        processJson: "jumpTo_BUDST.json",
        processSpec: "jumpTo_BUDST.spec",
        position: 3,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Set inactive APPR_CD as active using SQL",
        processJson: "",
        processSpec: "set_Inactive_APPR_CD.spec",
        position: 1,
        isQuery: true,
        phase: 3
    },
    {
        processName: "Setup PBRP - 5 -  ParameterId = 14",
        processJson: "jumpTo_PBRP.json",
        processSpec: "jumpTo_PBRP.spec",
        position: 5,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Budget roll jobs - Report - 5 - ParameterId = 14",
        processJson: "budget_Roll_For_Report.json",
        processSpec: "budget_Roll_For_Report.spec",
        position: 5,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Verify report - Budget lines for roll",
        processJson: "",
        processSpec: "verify_BudgetLines_For_Roll.spec",
        position: 1,
        isQuery: true,
        phase: 3
    },
    {
        processName: "Budget roll jobs - chain - 10 - ParameterId = 14 ",
        processJson: "budget_Roll_For_Chain.json",
        processSpec: "budget_Roll_For_Chain.spec",
        position: 10,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Verify BGCA documents",
        processJson: "",
        processSpec: "verify_BGCA.spec",
        position: 1,
        isQuery: true,
        phase: 3
    },
    {
        processName: "Budget roll for unused budget jobs - chain - 11 - ParameterId = 14",
        processJson: "budget_Roll_For_Chain.json",
        processSpec: "budget_Roll_For_Chain.spec",
        position: 11,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Setup PBRP - 6 -  ParameterId = 15",
        processJson: "jumpTo_PBRP.json",
        processSpec: "jumpTo_PBRP.spec",
        position: 6,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Budget roll for unused budget - Report - 6 - ParameterId = 15",
        processJson: "budget_Roll_For_Report.json",
        processSpec: "budget_Roll_For_Report.spec",
        position: 6,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Verify report - Budget lines for roll",
        processJson: "",
        processSpec: "verify_BudgetLines_For_Roll.spec",
        position: 1,
        isQuery: true,
        phase: 3
    },
    {
        processName: "Budget roll for unused budget - Chain - 12 - ParameterId = 15",
        processJson: "budget_Roll_For_Chain.json",
        processSpec: "budget_Roll_For_Chain.spec",
        position: 12,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Verify BGCA documents",
        processJson: "",
        processSpec: "verify_BGCA.spec",
        position: 1,
        isQuery: true,
        phase: 3
    },
    {
        processName: "Budget roll for unused budget - chain - 13 - ParameterId = 15",
        processJson: "budget_Roll_For_Chain.json",
        processSpec: "budget_Roll_For_Chain.spec",
        position: 13,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Setup PBRP - 7 -  ParameterId = 16",
        processJson: "jumpTo_PBRP.json",
        processSpec: "jumpTo_PBRP.spec",
        position: 7,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Budget roll for unused budget - report - 7 - ParameterId = 16",
        processJson: "budget_Roll_For_Report.json",
        processSpec: "budget_Roll_For_Report.spec",
        position: 7,
        isQuery: false,
        phase: 3

    },
    {
        processName: "Verify report - Budget lines for roll",
        processJson: "",
        processSpec: "verify_BudgetLines_For_Roll.spec",
        position: 1,
        isQuery: true,
        phase: 3
    },
    {
        processName: "Budget roll for unused budget - Chain - 14 - ParameterId = 16",
        processJson: "budget_Roll_For_Chain.json",
        processSpec: "budget_Roll_For_Chain.spec",
        position: 14,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Verify BGCA documents",
        processJson: "",
        processSpec: "verify_BGCA.spec",
        position: 1,
        isQuery: true,
        phase: 3
    },
    {
        processName: "Budget roll for unused budget - Chain - 15 - ParameterId = 16",
        processJson: "budget_Roll_For_Chain.json",
        processSpec: "budget_Roll_For_Chain.spec",
        position: 15,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Setup PBRP - 8 -  ParameterId = 4",
        processJson: "jumpTo_PBRP.json",
        processSpec: "jumpTo_PBRP.spec",
        position: 8,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Budget roll for unused budget - Report - 8 - ParameterId = 4",
        processJson: "budget_Roll_For_Report.json",
        processSpec: "budget_Roll_For_Report.spec",
        position: 8,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Verify report - Budget lines for roll",
        processJson: "",
        processSpec: "verify_BudgetLines_For_Roll.spec",
        position: 1,
        isQuery: true,
        phase: 3
    },
    {
        processName: "Budget roll for unused budget - Chain - 16 - ParameterId = 4 ",
        processJson: "budget_Roll_For_Chain.json",
        processSpec: "budget_Roll_For_Chain.spec",
        position: 16,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Verify BGCA documents",
        processJson: "",
        processSpec: "verify_BGCA.spec",
        position: 1,
        isQuery: true,
        phase: 3
    },
    {
        processName: "Budget roll for unused budget - Chain - 17 - ParameterId = 4",
        processJson: "budget_Roll_For_Chain.json",
        processSpec: "budget_Roll_For_Chain.spec",
        position: 17,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Setup BUDLCON - 1 - controlID = 40,9940",
        processJson: "jumpTo_BUDLCON.json",
        processSpec: "jumpTo_BUDLCON.spec",
        position: 1,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Bounce server",
        processJson: "",
        processSpec: "bounce_Server.spec",
        position: 1,
        isQuery: true,
        phase: 1
    },
    {
        processName: "Setup SPEC - 1",
        processJson: "jumpTo_SPEC.json",
        processSpec: "jumpTo_SPEC.spec",
        position: 1,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Setup PSCD - 1",
        processJson: "jumpTo_PSCD.json",
        processSpec: "jumpTo_PSCD.spec",
        position: 1,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Setup DCTRL for - 14 -  for DocId = JVAC",
        processJson: "jumpTo_DCTRL.json",
        processSpec: "jumpTo_DCTRL.spec",
        position: 14,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Confirm FDREQ page setup",
        processJson: "jumpTo_FDREQ.json",
        processSpec: "jumpTo_FDREQ.spec",
        position: 1,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Journal engine",
        processJson: "journal_Engine.json",
        processSpec: "journal_Engine.spec",
        position: 1,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Ledger engine",
        processJson: "ledger_Engine.json",
        processSpec: "ledger_Engine.spec",
        position: 1,
        isQuery: false,
        phase: 3
    },
    {
        processName: "System assurance 3 - 1 - for sourceTable = JRNL_ACTG ",
        processJson: "system_Assurance_3.json",
        processSpec: "system_Assurance_3.spec",
        position: 1,
        isQuery: false,
        phase: 3
    },
    {
        processName: "System assurance 3 - 2 - for sourceTable = LDGR_FYID_ACTG",
        processJson: "system_Assurance_3.json",
        processSpec: "system_Assurance_3.spec",
        position: 2,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Setup AAPDC - 1 - for documentCode = JVAC",
        processJson: "jumpTo_AAPDC.json",
        processSpec: "jumpTo_AAPDC.spec",
        position: 1,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Setup ADNT - 1 - for documentCode = JVAC",
        processJson: "jumpTo_ADNT.json",
        processSpec: "jumpTo_ADNT.spec",
        position: 1,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Close accounting perioud process - 1",
        processJson: "close_Accounting_Period_Process.json",
        processSpec: "close_Accounting_Period_Process.spec",
        position: 1,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Annual close process - 1 - UpdateMode = 1",
        processJson: "annual_Close_Process.json",
        processSpec: "annual_Close_Process.spec",
        position: 1,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Review Temp_FYDAD",
        processJson: "",
        processSpec: "review_Temp_FYDAD.spec",
        position: 1,
        isQuery: true,
        phase: 3
    },
    {
        processName: "Annual close process - 2 - UpdateMode = 2",
        processJson: "annual_Close_Process.json",
        processSpec: "annual_Close_Process.spec",
        position: 2,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Delete effective end dates for units and subUnits in closing and opening FY's",
        processJson: "",
        processSpec: "delete_Effective_EndDate.spec",
        position: 1,
        isQuery: true,
        phase: 3
    },
    {
        processName: "Review DRAFT HELD JVAC documents in doc_catalog",
        processJson: "",
        processSpec: "review_DRAFT_HELD_JVAC.spec",
        position: 1,
        isQuery: true,
        phase: 3
    },
    {
        processName: "Reject All Pending Document - 7 - for Doc = JVAC",
        processJson: "system_Maintenance_Utility.json",
        processSpec: "system_Maintenance_Utility.spec",
        position: 7,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Verify JVAC documents and resubmit rejected docuemnts if any - 8",
        processJson: "system_Maintenance_Utility.json",
        processSpec: "system_Maintenance_Utility.spec",
        position: 8,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Annual close process - 3 - UpdateMode = ",
        processJson: "annual_Close_Process.json",
        processSpec: "annual_Close_Process.spec",
        position: 3,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Setup APD - 1 - for Period = 99,0",
        processJson: "jumpTo_APD.json",
        processSpec: "jumpTo_APD.spec",
        position: 1,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Ledger engine to ledgerize closing transaction (JVAC)",
        processJson: "ledger_Engine.json",
        processSpec: "ledger_Engine.spec",
        position: 2,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Cash report - 1",
        processJson: "cash_Report.json",
        processSpec: "cash_Report.spec",
        position: 1,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Run trial balances - 1 - ParameterID = 98",
        processJson: "run_Trial_Balances.json",
        processSpec: "run_Trial_Balances.spec",
        position: 1,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Run trial balances - 2 - ParameterID = 99",
        processJson: "run_Trial_Balances.json",
        processSpec: "run_Trial_Balances.spec",
        position: 2,
        isQuery: false,
        phase: 3
    },












    {
        processName: "Setup BUDLCON - 3",
        processJson: "jumpTo_BUDLCON.json",
        processSpec: "jumpTo_BUDLCON.spec",
        position: 3,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Setup ADNT - 2",
        processJson: "jumpTo_ADNT.json",
        processSpec: "jumpTo_ADNT.spec",
        position: 2,
        isQuery: false,
        phase: 3
    },
    {
        processName: "Setup AutoFano - 1",
        processJson: "jumpTo_AutoFano.json",
        processSpec: "jumpTo_AutoFano.spec",
        position: 1,
        isQuery: false,
        phase: 3
    }


];
