import { Route } from '@angular/router';
import { PATHS } from 'src/app';

export const OPERATIONS_ROUTES: Route[] = [
   {
    path: PATHS.OPERATIONS.PREARRIVAL,
    loadComponent: () => import('../../pages/operations/prearrival-notification/prearrival-notification.component').then((c) => c.PreArrivalNotificationComponent),
    data: { title: "Pre Arrival Notification" }
  },
 
  // {
  //   path: PATHS.MASTER.EXIM_TRADER,
  //   loadComponent: () => import('../..').then((c) => c.EximTraderComponent),
  //   data: { title: "Exim Trader Master" }
  // },
  // {
  //   path: PATHS.MASTER.GODOWN,
  //   loadComponent: () => import('../..').then((c) => c.GodownComponent),
  //   data: { title: "Godown Master" }
  // },
  {
    path: PATHS.MASTER.HT_CHARGES.ROOT,
    loadComponent: () => import('../..').then((c) => c.HtChargesComponent),
    data: { title: "H&T Charges" },
    children: [
      {
        path: "", pathMatch: 'full', redirectTo: PATHS.MASTER.HT_CHARGES.ROOT,
      },
      // {
      //   path: PATHS.MASTER.HT_CHARGES.UNLOADING_LOADING,
      //   loadComponent: () => import('../..').then((c) => c.UnloadingLoadingComponent),
      //   data: { title: "H&T Charges" },
      // },
      // {
      //   path: PATHS.MASTER.HT_CHARGES.HANDLING,
      //   loadComponent: () => import('../..').then((c) => c.HandlingComponent),
      //   data: { title: "H&T Charges" },
      // },
      // {
      //   path: PATHS.MASTER.HT_CHARGES.TRANSPORTATION,
      //   loadComponent: () => import('../../').then((c) => c.TarnsportationComponent),
      //   data: { title: "H&T Charges" },
      // }
    ]
  },
 
  // {
  //   path: PATHS.MASTER.PORT,
  //   loadComponent: () => import('../..').then((c) => c.PortComponent),
  //   data: { title: "Port Master" }
  // },
  // {
  //   path: PATHS.MASTER.SAC,
  //   loadComponent: () => import('../..').then((c) => c.SacComponent),
  //   data: { title: "GST Against SAC" }
  // },
];
