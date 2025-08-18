import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CommonEngine } from '@angular/ssr/node';

@Component({
  selector: 'app-fee-receipt',
  imports: [CommonModule],
  templateUrl: './fee-receipt.component.html',
  styleUrl: './fee-receipt.component.scss'
})
export class FeeReceiptComponent {
 receiptData = {
    receiptNo: 'RCPT-2025-001',
    studentName: 'Rahul Sharma',
    rollNo: 'CSE2023001',
    course: 'B.Tech - Computer Science',
    semester: '5th',
    paymentDate: '16-Aug-2025',
    paymentMode: 'UPI',
    transactionId: 'TXN987654321',
    remarks: 'First Installment Paid',
    feeDetails: [
      { feeType: 'Tuition Fee', amount: 50000, paid: 25000 },
      { feeType: 'Library Fee', amount: 3000, paid: 3000 },
      { feeType: 'Exam Fee', amount: 2000, paid: 2000 },
      { feeType: 'Hostel Fee', amount: 20000, paid: 10000 }
    ]
  };

  getTotalAmount(): number {
    return this.receiptData.feeDetails.reduce((sum, item) => sum + item.amount, 0);
  }

  getTotalPaid(): number {
    return this.receiptData.feeDetails.reduce((sum, item) => sum + item.paid, 0);
  }

  getBalance(): number {
    return this.getTotalAmount() - this.getTotalPaid();
  }

  printReceipt() {
    window.print();
  }

  downloadReceipt() {
    // import('html2pdf.js').then(html2pdf => {
    //   const element = document.getElementById('receipt');
    //   if (element) {
    //     html2pdf.default().from(element).save('fee-receipt.pdf');
    //   }
    // });
  }
}
