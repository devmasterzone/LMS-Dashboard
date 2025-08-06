import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsAllComponent } from './departments-all.component';

describe('DepartmentsAllComponent', () => {
  let component: DepartmentsAllComponent;
  let fixture: ComponentFixture<DepartmentsAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentsAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
