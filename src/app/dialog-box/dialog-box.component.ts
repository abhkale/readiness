import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css'],
  providers:[{
    provide: MatDialogRef,
    useValue: {
      close: (dialogResult: any) => { }
    }
  }]
})
export class DialogBoxComponent {
  
  constructor() {}

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }



}
