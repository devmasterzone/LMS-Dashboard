import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryHistoryComponent } from './library-history.component';

describe('LibraryHistoryComponent', () => {
  let component: LibraryHistoryComponent;
  let fixture: ComponentFixture<LibraryHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
