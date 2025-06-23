import { IDataTableHeader } from "../../models";

export const GateInHeaders: IDataTableHeader[] = [
  {
    field: 'slNo',
    label: 'SL No',
    type: 'sl',
    width: '60px',
    valueClass: 'text-center',
    class: 'text-center',
  },

  {
    field: 'edit',
    label: 'Edit',
    type: 'icon',
    icon: 'fa fa-pencil',
    class: 'text-center',
  },
  {
    field: 'view',
    label: 'View',
    type: 'icon',
    icon: 'fa fa-eye',
    class: 'text-center',
  },
  {
    field: 'referenceNo',
    label: 'Reference No	',
    type: 'string',
    isDeleteLabel: true,
  },
  {
    field: 'vehicleNo',
    label: 'Vehicle No',
    type: 'string',
  },
  {
    field: 'containerNo',
    label: 'Container No',
    type: 'string',
  },
];
