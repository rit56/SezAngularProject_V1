import {ChangeDetectionStrategy, Component, inject, signal, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApiService, ToastService, UtilService} from "../../../../services";
import {API, DATA_TABLE_HEADERS} from "../../../../lib";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {DataTableComponent} from "../../../../components";
import {NgbInputDatepicker} from "@ng-bootstrap/ng-bootstrap";
import {AutoCompleteComponent} from "../../../../components/auto-complete/auto-complete.component";
import {ENTRY_FEE_DATA} from "./ground-rent-charge-data";
import { HT_CHARGES_DATA } from '../../ht-charges/ht-charges-data';

@Component({
  selector: 'app-entry-fees',
  standalone: true,
  imports: [CommonModule, DataTableComponent, NgbInputDatepicker, ReactiveFormsModule, AutoCompleteComponent],
  templateUrl: './ground-rent-charge.component.html',
  styleUrls: ['./ground-rent-charge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryFeesComponent {
  apiService = inject(ApiService);
  utilService = inject(UtilService);
  toasterService = inject(ToastService);

  readonly headers = DATA_TABLE_HEADERS.MASTER.CWC_CHARGES.ENTRY_FEES
  readonly apiUrls = API.MASTER.CWC_CHARGES.GROUND_RENT_CHARGE;
  readonly operationTypes = ENTRY_FEE_DATA.operationTypes;
  readonly FCLLCL = ENTRY_FEE_DATA.FCLLCL;
  readonly containerTypes = ENTRY_FEE_DATA.containerTypes;
  readonly commodityTypes = ENTRY_FEE_DATA.commodityTypes;
  readonly sizes = HT_CHARGES_DATA.sizes;
  form!: FormGroup;
  sacList = signal<any[]>([]);
  isViewMode = signal(false);
  isSaving = signal(false);
  sacMap = signal(new Map<string, string>());

  @ViewChild(DataTableComponent) table!: DataTableComponent;

  constructor() {
    this.getSacList()
    this.setHeaderCallbacks();
    this.makeForm();
  }

  getSacList() {
    this.apiService.get(API.MASTER.SAC.LIST).subscribe({
      next: (response: any) => {
        this.sacList.set(response.data)
        const sacMap = new Map<string, string>();
        response.data.forEach((sac: any) => {
          sacMap.set(sac.sacId, sac.sacCode);
        })
        this.sacMap.set(sacMap);
      }
    })
  }

  makeForm() {
    this.form = new FormGroup({
      groundRentId: new FormControl(0, []),
      effectiveDate: new FormControl(null, []),
      sacCodeId: new FormControl(null, []),
      daysRangeFrom: new FormControl(null, []),
      daysRangeTo: new FormControl(null, []),
      containerType: new FormControl(null, []),
      commodityType: new FormControl(null, []),
       size: new FormControl("", []),
      fclLcl: new FormControl(null, []),
      rentAmount: new FormControl(null, []),
      operationType: new FormControl(null, []),
      createdBy: new FormControl(0, []),
      createdOn: new FormControl(new Date(), []),
      updatedBy: new FormControl(0, []),
      updatedOn: new FormControl(null, []),
    })
  }

  edit(record: any) {
    this.patchForm({...record}, false);
  }

  view(record: any) {
    this.patchForm({...record}, true);
    this.isViewMode.set(false);
  }

  patchForm(record: any, isViewMode: boolean) {
    record.effectiveDate = this.utilService.getNgbDateObject(record.effectiveDate);
    //record.sacId = 996719;
    record.daysRangeFrom = record.daysRange.split('-')[0];
     record.daysRangeTo = record.daysRange.split('-')[1];
       record.containerType = record.containerType == "Empty Container"  ? 1 : 2;
        record.commodityType = record.commodityType == "HAZ"  ? 1 : 2;
         record.fclLcl = record.fclLcl == "FCL"  ? 1 : 2;
          record.operationType = record.operationType == "Import"  ? 1 : record.operationType == "Export"? 2 
                                :record.operationType == "Empty Import" ? 3 :record.operationType == "Empty Export"? 4 : 0;
         record.size = parseInt(record.size) == 20  ? "20" : parseInt(record.size) == 40? "40" 
                                :record.size == "40(AEO)" ? "40(AEO)" : 0;
                                record.fclLcl = record.containerType == "FCL"  ? 1 : 2;
         record.rentAmount = record.amount
    this.form.reset();
    this.form.patchValue(record);
    this.isViewMode = signal(isViewMode);
    isViewMode ? this.form.disable() : this.form.enable();
  }

  setEditMode(){
    this.form.enable();
    this.isViewMode.set(false);
  }

  reset() {
    this.form.reset();
    this.isViewMode.set(false);
    this.makeForm();
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.isSaving.set(true);
      const data = this.makePayload();
      this.apiService.post(this.apiUrls.SAVE, data).subscribe({
        next:() => {
          this.toasterService.showSuccess("Ground Rent Charge saved successfully");
          this.table.reload();
          this.makeForm();
          this.isSaving.set(false);
        }, error: () => {
          this.isSaving.set(false);
        }
      })
    }
  }

  makePayload() {
    return {...this.form.value, effectiveDate: this.utilService.getDateObject(this.form.value.effectiveDate)};
  }

  hasError(formControlName: string) {
    const control = this.form.get(formControlName);
    return control?.touched && control.invalid;
  }

  setHeaderCallbacks() {
    this.headers.forEach(header => {
      if(header.field === "edit") {
        header.callback = this.edit.bind(this);
      }
      if(header.field === "view") {
        header.callback = this.view.bind(this);
      }
      if(header.field === "sacCode") {
        header.valueGetter = this.getSacCodeBySacId.bind(this) ;
      }
    });
  }

  getSacCodeBySacId(record: any) {
    return this.sacMap().get(record.sacCodeId)!
  }
}
