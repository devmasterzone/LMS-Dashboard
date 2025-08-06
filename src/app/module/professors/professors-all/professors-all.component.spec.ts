import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorsAllComponent } from './professors-all.component';

describe('ProfessorsAllComponent', () => {
  let component: ProfessorsAllComponent;
  let fixture: ComponentFixture<ProfessorsAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorsAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
