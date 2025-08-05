import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryStatusComponent } from './salary-status.component';

describe('SalaryStatusComponent', () => {
  let component: SalaryStatusComponent;
  let fixture: ComponentFixture<SalaryStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalaryStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
