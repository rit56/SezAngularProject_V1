import { PATHS } from "src/app/lib";

export const MENU = [
  {
    label: 'Master',
    children: [
      //{ label: 'Commodity', path: PATHS.MASTER.COMMODITY },
      { label: 'CWC Charges', path: PATHS.MASTER.CWC_CHARGES.ROOT },
      // { label: 'Exim Trader', path: PATHS.MASTER.EXIM_TRADER },
      // { label: 'Godown', path: PATHS.MASTER.GODOWN },
       { label: 'H&T Charges', path: PATHS.MASTER.HT_CHARGES.ROOT },
      // { label: 'Operation', path: PATHS.MASTER.OPERATION },
      // { label: 'Port', path: PATHS.MASTER.PORT },
      // { label: 'GST Against SAC', path: PATHS.MASTER.SAC },
    ],
  },
  // {
  //   label: 'Gate Operation',
  //   children: [
  //     { label: 'Gate In', path: PATHS.GATE_OPERATION.GATE_IN },
  //     { label: 'Gate Exit', path: PATHS.GATE_OPERATION.GATE_EXIT },
  //     { label: 'Gate Pass', path: PATHS.UNDER_DEVELOPMENT },
  //   ],
  // },
   {
    label: 'Operations',
    children: [
      { label: 'Pre Arrival Notification', path: PATHS.OPERATIONS.PREARRIVAL },
      { label: 'Gate IN', path: PATHS.OPERATIONS.GATE_IN },
      { label: 'CCIN Entry', path: PATHS.OPERATIONS.CCIN_ENTRY },
      { label: 'Job Order', path: PATHS.OPERATIONS.JOB_ORDER },
      { label: 'Custom Examination', path: PATHS.OPERATIONS.CUSTOM_EXAMINATION },
      { label: 'Invoice', path: PATHS.OPERATIONS.INVOICE },
      { label: 'Payment Receipt', path: PATHS.OPERATIONS.PAYMENT_RECEIPT },
      { label: 'Gate Pass', path: PATHS.OPERATIONS.GATE_PASS },
      { label: 'Gate Exit', path: PATHS.OPERATIONS.GATE_EXIT },
    ],
  },
  // {
  //   label: 'Export',
  //   children: [
  //     { label: 'CCIN Entry', path: PATHS.UNDER_DEVELOPMENT, },
  //     { label: 'Container Movement Invoice', path: PATHS.UNDER_DEVELOPMENT },
  //     { label: 'Container Stuffing', path: PATHS.UNDER_DEVELOPMENT },
  //     { label: 'Load Container Invoice', path: PATHS.UNDER_DEVELOPMENT },
  //     { label: 'Container Movement Request', path: PATHS.UNDER_DEVELOPMENT },
  //   ],
  // },
  // {
  //   label: 'Import',
  //   children: [
  //     { label: 'OBL Entry', path: PATHS.IMPORT.OBL_ENTRY },
  //     { label: 'Custom Appraisement', path: PATHS.IMPORT.CUSTOM_APPRAISEMENT, },
  //     { label: 'Yard Invoice', path: PATHS.IMPORT.YARD_INVOICE },
  //     { label: 'Delivery Application', path: PATHS.UNDER_DEVELOPMENT },
  //     { label: 'Delivery Invoice', path: PATHS.UNDER_DEVELOPMENT },
  //     { label: 'Destuffing Entry', path: PATHS.UNDER_DEVELOPMENT },
  //     { label: 'Godown Invoice', path: PATHS.UNDER_DEVELOPMENT },
  //     { label: 'Godown Invoice', path: PATHS.UNDER_DEVELOPMENT },
  //   ],
  // },
  // {
  //   label: 'Cash Management',
  //   children: [
  //     { label: 'Payment Receipt', path: PATHS.UNDER_DEVELOPMENT, },
  //   ],
  // },
]
