import {ChangeDetectionStrategy, Component, inject, signal, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {API, DATA_TABLE_HEADERS} from "../../../lib";
import { AutoCompleteComponent } from 'src/app/components/auto-complete/auto-complete.component';
import { ApiService, DataTableComponent, ToastService, UtilService } from 'src/app';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
//import { ENTRY_FEE_DATA } from '../cwc-charges/entry-fees/entry-fees-data';
import { HT_CHARGES_DATA } from './ht-charges-data';

@Component({
  selector: 'app-ht-charges',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink, RouterOutlet,CommonModule, AutoCompleteComponent, DataTableComponent, NgbInputDatepicker, ReactiveFormsModule],
  templateUrl: './ht-charges.component.html',
  styleUrls: ['./ht-charges.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HtChargesComponent {
  // readonly tabs = [
  //   {path: PATHS.MASTER.HT_CHARGES.UNLOADING_LOADING, label: 'Unloading/Loading'},
  //   {path:PATHS.MASTER.HT_CHARGES.HANDLING, label: "Handling"},
  //   {path:PATHS.MASTER.HT_CHARGES.TRANSPORTATION, label: "Transportation"},
  // ]
  apiService = inject(ApiService);
    utilService = inject(UtilService);
    toasterService = inject(ToastService);
  
    readonly headers = DATA_TABLE_HEADERS.MASTER.HT_CHARGES.HANDLING
    readonly apiUrls = API.MASTER.HT_CHARGES;
  readonly sizes = HT_CHARGES_DATA.sizes;
    form!: FormGroup;
    operationList = signal<any[]>([]);
    isViewMode = signal(false);
    isSaving = signal(false);
    operationMap = signal(new Map<string, string>());
  sacCodeId = '';
    @ViewChild(DataTableComponent) table!: DataTableComponent;
  
    constructor() {
      this.getOperationList()
      this.setHeaderCallbacks();
      this.makeForm();
    }
  getSacCode(){
this.sacCodeId = this.form.controls['chargeId'].value;
    window.alert(this.form.controls['chargeId'].value)
  }
    getOperationList() {
      this.apiService.get(API.MASTER.SAC.LIST).subscribe({
        next: (response: any) => {
          this.operationList.set(response.data)
          const sacMap = new Map<string, string>();
          response.data.forEach((operation: any) => {
            sacMap.set(operation.operationId, operation.operationDesc);
          })
          this.operationMap.set(sacMap);
        }
      })
    }
  
    makeForm() {
      this.form = new FormGroup({
        handlingChargesID: new FormControl(0, []),
        effectiveDate: new FormControl(null, []),
        chargeId: new FormControl(null, []),
        sacCodeId: new FormControl(null, []),
         size: new FormControl("0", []),
        rate: new FormControl(null, []),
       
      })
    }
  
    edit(record: any) {
      this.patchForm({...record}, false);
    }
  
    view(record: any) {
      this.patchForm({...record}, true);
    }
  
    patchForm(record: any, isViewMode: boolean) {
      record.effectiveDate = this.utilService.getNgbDateObject(record.effectiveDate);
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
      this.makeForm();
    }
  
    submit() {
      this.form.markAllAsTouched();
      if (this.form.valid) {
        this.isSaving.set(true);
        const data = this.makePayload();
        this.apiService.post(this.apiUrls.SAVE, data).subscribe({
          next:() => {
            this.toasterService.showSuccess("Handling saved successfully");
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
      return this.operationMap().get(record.operationId)!
    }
}
