import { Route } from '@angular/router';
import { PATHS } from 'src/app';

export const IMPORT_ROUTES: Route[] = [
  {
    path: PATHS.IMPORT.CUSTOM_APPRAISEMENT,
    loadComponent: () => import('../..').then((c) => c.CustomAppraisementComponent),
    data: { title: "Custom Appraisement Application" }
  },
  {
    path: PATHS.IMPORT.YARD_INVOICE,
    loadComponent: () => import('../..').then((c) => c.YardInvoiceComponent),
    data: { title: "Yard Invoice (FCL)" }
  },

  {
    path: PATHS.IMPORT.OBL_ENTRY,
    loadComponent: () => import('../..').then((c) => c.OblEntryComponent),
    data: { title: "OBL Entry" }
  },
];
