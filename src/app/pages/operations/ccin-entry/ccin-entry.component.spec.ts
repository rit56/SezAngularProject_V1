import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CCINComponent } from './ccin-entry.component';

describe('GateInComponent', () => {
  let component: CCINComponent;
  let fixture: ComponentFixture<CCINComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CCINComponent]
    });
    fixture = TestBed.createComponent(CCINComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
