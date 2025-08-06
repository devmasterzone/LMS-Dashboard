import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsAllComponent } from './students-all.component';

describe('StudentsAllComponent', () => {
  let component: StudentsAllComponent;
  let fixture: ComponentFixture<StudentsAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
