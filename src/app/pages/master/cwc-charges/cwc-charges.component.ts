import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {PATHS} from "../../../lib";

@Component({
  selector: 'app-cwc-charges',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './cwc-charges.component.html',
  styleUrls: ['./cwc-charges.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CwcChargesComponent {
  readonly tabs = [
    {path: PATHS.MASTER.CWC_CHARGES.GROUND_RENT_CHARGE, label: 'Ground Rent Charge'},
    {path:PATHS.MASTER.CWC_CHARGES.REEFER_CHARGE, label: "Reefer Charge"},
    {path:PATHS.MASTER.CWC_CHARGES.MISC_CHARGE, label: "MISC Charge"},
    // {path:PATHS.MASTER.CWC_CHARGES.RENT_OFFICE_SPACE, label: "Rent Office Space"},
    // {path:PATHS.MASTER.CWC_CHARGES.RENT_TABLE_SPACE, label: "Rent Table Space"},
    // {path:PATHS.MASTER.CWC_CHARGES.OVER_TIME, label: "Over Time"},
    // {path:PATHS.MASTER.CWC_CHARGES.EXAMINATION, label: "Examination"},
  ]
}
