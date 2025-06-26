import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscChargeComponent } from './misc-charge.component';

describe('MiscChargeComponent', () => {
  let component: MiscChargeComponent;
  let fixture: ComponentFixture<MiscChargeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MiscChargeComponent]
    });
    fixture = TestBed.createComponent(MiscChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
