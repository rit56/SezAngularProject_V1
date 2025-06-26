export const API = {
  MASTER: {
    HT_CHARGES: {
      // UNLOADING_LOADING: {
        LIST: "HTCharges/GETHTChargeList",
        SAVE: "HTCharges/AddHTCharge",
      // },
      HANDLING: {
        LIST: "Sez/GetAllHandlingCharges",
        SAVE: "Sez/AddEditHandlingCharges",
      },
      TRANSPORTATION: {
        LIST: "Sez/GetAllTransportationCharges",
        SAVE: "Sez/AddEditTransportationCharges",
      },
    },
    SAC: {
      SACCODEBYOPERATION: "MasterData/GetMstSacByOperation?SacId=",
      LIST: "MasterData/GetMstSacAll",
      SAVE: "Sez/AddEditMstSac",
    },
    OPERATION: {
      LIST: "MasterData/GetMstOperation",
      SAVE: "Sez/AddEditMstOperation",
    },
    PARTY: {
      LIST: "Sez/GetmstParty",
    },
    EXIM_TRADER: {
      LIST: "Sez/GetMstEximTraderMaster",
    },
    COMMODITY: {
      LIST: "Sez/GetMstCommodity",
      SAVE: "Sez/AddEditMstCommodity",
    },
    GODOWN: {
      LIST: "Sez/GetMstGoDown",
      SAVE: "Sez/AddEditGoDown",
    },
    PORT: {
      LIST: "Sez/GetPort",
      SAVE: "Sez/AddEditPort",
    },
    CWC_CHARGES: {
      GROUND_RENT_CHARGE: {
        LIST: "CWCCharges/GETGroundRentChargeList",
        SAVE: "CWCCharges/AddGroundRentCharge",
      },
      REFERER_CHARGE: {
        LIST: "CWCCharges/GETReferChargeList",
        SAVE: "CWCCharges/AddReferCharge",
      },
      MISC_CHARGE: {
        LIST: "CWCCharges/GETMISCChargeList",
        SAVE: "CWCCharges/AddMISCCharge",
      },
      EXAMINATION: {
        LIST: "Sez/GetExaminationCharge",
        SAVE: "Sez/AddEditExaminationCharge",
      },
    },
    COUNTRY: "Sez/GetCountry",
    STATE: "Sez/GetState",
  },
  GATE_OPERATION: {
    GATE_IN: {
      LIST: "Sez/GetAllEntries",
      SAVE: "Sez/AddEditEntry",
    },
  },
  IMPORT: {
    OBL_ENTRY: {
      LIST: "Sez/GetOblEntry",
      SAVE: "Sez/AddOblEntry",
      ADDITIONAL_INFO: "Sez/GetOblEntryAdditionalDetails",
    },
    YARD_INVOICE: {
      SAVE: "Sez/AddEditYardInvoice",
    },
    CUSTOM_APPRAISEMENT: {
      LIST: "Sez/GetCustomAppraisement",
      SAVE: "Sez/AddEditCustomAppraisement",
    },
  },
};
