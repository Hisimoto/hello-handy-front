import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  viewText: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { viewText: string },
    private dialogRef: MatDialogRef<ConfirmationComponent>
  ) {
    this.viewText = this.data.viewText;
  }

  yes() {
    this.dialogRef.close(true);
  }

  no() {
    this.dialogRef.close(false);
  }
}
