import { ChangeDetectionStrategy, Component, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, ToastService, UtilService } from 'src/app/services';
import { API, DATA_TABLE_HEADERS } from 'src/app/lib';
import { HT_CHARGES_DATA } from '../../ht-charges/ht-charges-data';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataTableComponent } from 'src/app/components';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AutoCompleteComponent } from 'src/app/components/auto-complete/auto-complete.component';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-storage-charge',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink, RouterOutlet, AutoCompleteComponent, DataTableComponent, NgbInputDatepicker, ReactiveFormsModule],
  templateUrl: './reefer-charge.component.html',
  styleUrls: ['./reefer-charge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StorageChargeComponent {
apiService = inject(ApiService);
    utilService = inject(UtilService);
    toasterService = inject(ToastService);
  
    readonly headers = DATA_TABLE_HEADERS.MASTER.CWC_CHARGES.REFERER_CHARGE
    readonly apiUrls = API.MASTER.CWC_CHARGES.REFERER_CHARGE;
  readonly sizes = HT_CHARGES_DATA.sizes;
    form!: FormGroup;
    sacList = signal<any[]>([]);
    isViewMode = signal(false);
    isSaving = signal(false);
   sacMap = signal(new Map<string, string>());
  public sacCodeId = '';
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
        reeferChrgId: new FormControl(0, []),
         effectiveDate: new FormControl(null, []),
        sacCodeId: new FormControl(null, []),
        hours: new FormControl(null, []),
       size: new FormControl("0", []),
        rate: new FormControl(null, []),
       createdBy:new FormControl(1, []),
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
       this.isViewMode.set(false); // as edit off
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
            this.toasterService.showSuccess("HT Charge saved successfully");
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
        // if(header.field === "edit") {
        //   header.callback = this.edit.bind(this);
        // }
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
