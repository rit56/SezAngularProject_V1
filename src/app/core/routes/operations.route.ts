import { Route } from '@angular/router';
import { PATHS } from 'src/app';

export const OPERATIONS_ROUTES: Route[] = [
   {
    path: PATHS.OPERATIONS.PREARRIVAL,
    loadComponent: () => import('../../pages/operations/prearrival-notification/prearrival-notification.component').then((c) => c.PreArrivalNotificationComponent),
    data: { title: "Pre Arrival Notification" }
  },
   {
    path: PATHS.OPERATIONS.GATE_IN,
    loadComponent: () => import('../../pages/operations/gate-in/gate-in.component').then((c) => c.GateInComponent),
    data: { title: "Gate In" }
  },
   {
    path: PATHS.OPERATIONS.CCIN_ENTRY,
    loadComponent: () => import('../../pages/operations/ccin-entry/ccin-entry.component').then((c) => c.CCINComponent),
    data: { title: "CCIN Entry" }
  },
  {
    path: PATHS.OPERATIONS.JOB_ORDER,
    loadComponent: () => import('../../pages/operations/job-order/job-order.component').then((c) => c.JobOrderComponent),
    data: { title: "Job Order" }
  },
  {
    path: PATHS.OPERATIONS.CUSTOM_EXAMINATION,
    loadComponent: () => import('../../pages/operations/custom-examination/custom-examination.component').then((c) => c.CustomExaminationComponent),
    data: { title: "Custom Examination" }
  },
  {
    path: PATHS.OPERATIONS.INVOICE,
    loadComponent: () => import('../../pages/operations/invoice/invoice.component').then((c) => c.InvoiceComponent),
    data: { title: "Invoice" }
  },
  {
    path: PATHS.OPERATIONS.PAYMENT_RECEIPT,
    loadComponent: () => import('../../pages/operations/payment-receipt/payment-receipt.component').then((c) => c.PaymentReceiptComponent),
    data: { title: "Payment Receipt" }
  },
  {
    path: PATHS.OPERATIONS.GATE_PASS,
    loadComponent: () => import('../../pages/operations/gate-pass/gate-pass.component').then((c) => c.GatePassComponent),
    data: { title: "Gate Pass" }
  },
  {
    path: PATHS.OPERATIONS.GATE_EXIT,
    loadComponent: () => import('../../pages/operations/gate-exit/gate-exit.component').then((c) => c.GateExitComponent),
    data: { title: "Gate Exit" }
  },
 
  
];
