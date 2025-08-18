import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-library-edit-book',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './library-edit-book.component.html',
  styleUrl: './library-edit-book.component.scss'
})
export class LibraryEditBookComponent implements OnInit {
  bookForm!: FormGroup;
  bookId!: number;
  dummyBook = {
  title: 'Introduction to Algorithms',
  author: 'Thomas H. Cormen',
  isbn: '978-0262033848',
  copiesAvailable: 5,
  totalCopies: 10,
  addedDate: '2025-08-01'
};


  // 👉 Dummy list (replace with service call)

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.bookForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(150)]],
    author: ['', [Validators.required, Validators.maxLength(100)]],
    isbn: ['', [Validators.required, Validators.pattern(/^[0-9\-]{10,20}$/)]],
    copiesAvailable: [0, [Validators.required, Validators.min(0)]],
    totalCopies: [1, [Validators.required, Validators.min(1)]],
    addedDate: ['', Validators.required]
  });

  // ✅ Bind dummy data to form
  this.bookForm.patchValue(this.dummyBook);
}


  onSubmit(): void {
    if (this.bookForm.valid) {
      console.log('Updated Book Data:', this.bookForm.value);
      // 👉 Save to DB / API here
      this.router.navigate(['/library']); // back to list
    } else {
      this.bookForm.markAllAsTouched();
    }
  }

  onReset(): void {
    this.bookForm.reset();
  }
}
