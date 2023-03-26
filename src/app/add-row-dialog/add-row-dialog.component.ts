import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-add-row-dialog',
  templateUrl: './add-row-dialog.component.html',
  styleUrls: ['./add-row-dialog.component.css']
})
export class AddRowDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddRowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
