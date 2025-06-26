import { IDataTableHeader } from "../../models";

export const GroundRentCharge: IDataTableHeader[] = [
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
    field: 'view',
    label: 'View',
    type: 'icon',
    icon: 'fa fa-eye',
    class: 'text-center',
  },
  {
    field: 'effectiveDate',
    label: 'Effective Date',
    type: 'date',
  },
  {
    field: 'containerType',
    label: 'Container Type',
    type: 'string',
  },
  {
    field: 'containerDetails',
    label: 'Container Details',
    type: 'string',
  },
  {
    field: 'operationType',
    label: 'Operation Type',
    type: 'string',
  },
  {
    field: 'daysRange',
    label: 'Days Range',
    type: 'string',
  },
  {
    field: 'amount',
    label: 'Charges',
    type: 'price',
  },
 
];
