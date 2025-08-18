import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditadmissionComponent } from './add-editadmission.component';

describe('AddEditadmissionComponent', () => {
  let component: AddEditadmissionComponent;
  let fixture: ComponentFixture<AddEditadmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditadmissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditadmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
