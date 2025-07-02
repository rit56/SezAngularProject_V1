import {ChangeDetectionStrategy, Component, inject, signal, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApiService, ToastService, UtilService} from "../../../services";
import {API, DATA_TABLE_HEADERS} from "../../../lib";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataTableComponent} from "../../../components";
import {AutoCompleteComponent} from "../../../components/auto-complete/auto-complete.component";
import { HT_CHARGES_DATA } from '../../master/ht-charges/ht-charges-data';
import {  NgbInputDatepicker,NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { ENTRY_FEE_DATA } from '../../master/cwc-charges/ground-rent-charge/ground-rent-charge-data';

//import {OPERATION_DATA} from "./operations-data";

@Component({
  selector: 'app-prearrival-notification',
  standalone: true,
  imports: [CommonModule, DataTableComponent, FormsModule, ReactiveFormsModule, AutoCompleteComponent,NgbInputDatepicker , NgbTimepicker],
  templateUrl: './prearrival-notification.component.html',
  styleUrls: ['./prearrival-notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreArrivalNotificationComponent {
  apiService = inject(ApiService);
  toasterService = inject(ToastService);
    utilService = inject(UtilService);
 selectedTime: any = { hour: 13, minute: 30, second: 0 };
  readonly headers = DATA_TABLE_HEADERS.MASTER.OPERATION
  readonly apiUrls = API.MASTER.OPERATION;
  readonly types   = ENTRY_FEE_DATA.commodityTypes;
  readonly sizes = HT_CHARGES_DATA.sizes;

  form!: FormGroup;
  sacList = signal<any[]>([]);
  isViewMode = signal(false);
  isSaving = signal(false);
operationList = signal<any[]>([]);
 operationMap = signal(new Map<string, string>());
  @ViewChild(DataTableComponent) table!: DataTableComponent;
time = {hour: 13, minute: 30};
  constructor() {
    this.setHeaderCallbacks();
    this.makeForm();
    this.getSacList()
  }
   getOperationList() {
      this.apiService.get(API.MASTER.OPERATION.LIST).subscribe({
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
 getSacCode(){
var sacId = this.form.controls['operationId'].value;
if(sacId !== null ){
  this.apiService.get(API.MASTER.SAC.SACCODEBYOPERATION + sacId).subscribe({
        next: (response: any) => {
          if(response.status)
         {
          //this.sacCodeId = response.data.sacCode;
          this.form.controls['sacCodeId'].setValue(parseInt(response.data.sacCode)) ;
         }
         
         
        }
      })
}
   
  }
  getSacList() {
    this.apiService.get(API.MASTER.SAC.LIST).subscribe({
      next: (response: any) => {
        this.sacList.set(response.data)
      }
    })
  }

  makeForm() {
    this.form = new FormGroup({
      operationId: new FormControl(0, []),
      preArrivalNo: new FormControl("", []),
      date: new FormControl(null, []),
      containerNo: new FormControl(null, []),
      size: new FormControl(null, []),
      type: new FormControl(null, []),
       wt: new FormControl(null, []),
        value: new FormControl(null, []),
      expectedArrivalDate: new FormControl(null, []),
      expectedArrivalTime: new FormControl(null, []),
      packListFile: new FormControl(null, []),
      checkListFile: new FormControl(null, []),
     createdBy:new FormControl(null, []),
        createdOn: new FormControl(new Date(), []),
       updatedBy:new FormControl(null, []),
       updatedOn: new FormControl(null, []),
    })
  }

  edit(record: any) {
    this.patchForm({...record}, false);
  }

  view(record: any) {
    this.patchForm({...record}, true);
  }

  patchForm(record: any, isViewMode: boolean) {
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
          this.toasterService.showSuccess("Operation saved successfully");
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
    return {...this.form.value, date: this.utilService.getDateObject(this.form.value.date),expectedArrivalDate: this.utilService.getDateObject(this.form.value.expectedArrivalDate)};
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
    });
  }
}
