import { IDataTableHeader } from "../../models";

export const OverTimeHeaders: IDataTableHeader[] = [
  {
    field: 'slNo',
    label: 'SL No',
    type: 'sl',
    width: '60px',
    valueClass: 'text-center',
    class: 'text-center',
  },

  // {
  //   field: 'edit',
  //   label: 'Edit',
  //   type: 'icon',
  //   icon: 'fa fa-pencil',
  //   class: 'text-center',
  // },
 
  {
    label: 'Effective Date',
    field: 'effectiveDate',
    type: 'date',
  },
  {
    field: 'sacCodeId',
    label: 'Sac Code',
    type: 'string',
  },
  {
    field: 'operationDesc',
    label: 'Charge Name',
    type: 'string',
  },
  {
    field: 'size',
    label: 'Size',
    type: 'price',
  },
  {
    field: 'rate',
    label: 'Rate',
    type: 'price',
  },
   {
    field: 'view',
    label: 'View',
    type: 'icon',
    icon: 'fa fa-eye',
    class: 'text-center',
  },
];
