import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomExaminationComponent } from './custom-examination.component';

describe('CustomExaminationComponent', () => {
  let component: CustomExaminationComponent;
  let fixture: ComponentFixture<CustomExaminationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CustomExaminationComponent]
    });
    fixture = TestBed.createComponent(CustomExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
