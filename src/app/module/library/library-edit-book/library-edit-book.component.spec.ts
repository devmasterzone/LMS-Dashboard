import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryEditBookComponent } from './library-edit-book.component';

describe('LibraryEditBookComponent', () => {
  let component: LibraryEditBookComponent;
  let fixture: ComponentFixture<LibraryEditBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryEditBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryEditBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
