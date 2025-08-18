import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library-add-book',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './library-add-book.component.html',
  styleUrl: './library-add-book.component.scss'
})
export class LibraryAddBookComponent implements OnInit {
   bookForm!: FormGroup;
  categories = ['Fiction', 'Non-Fiction', 'Science', 'Technology', 'History', 'Biography'];
  genres = ['Novel', 'Research', 'Fantasy', 'Romance', 'Horror', 'Self-help'];

  previewUrl: string | ArrayBuffer | null = null;
  showSuccess = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(150)]],
      author: ['', [Validators.required, Validators.maxLength(100)]],
      isbn: ['', [Validators.required, Validators.pattern(/^[0-9\-]{10,20}$/)]],
      category: ['', Validators.required],
      genre: ['', Validators.required],
      copiesAvailable: [0, [Validators.required, Validators.min(0)]],
      totalCopies: [1, [Validators.required, Validators.min(1)]],
      addedDate: ['', Validators.required],
      coverImage: [null, Validators.required]
    });
  }

  // 📌 Image Preview
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.bookForm.patchValue({ coverImage: file });
      this.bookForm.get('coverImage')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result);
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      console.log('📚 Book Form Data:', this.bookForm.value);

      this.showSuccess = true;
      setTimeout(() => {
        this.showSuccess = false;
        this.router.navigate(['/library']); // go back to library list
      }, 2000);
    } else {
      this.bookForm.markAllAsTouched();
    }
  }

  onReset(): void {
    this.bookForm.reset();
    this.previewUrl = null;
  }
}
