import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AngularIndexedDB } from 'angular2-indexeddb';
import { MatDialog } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Key } from 'protractor';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DialogBoxComponent]
})
export class DashboardComponent {

  products: any;

  private db = new AngularIndexedDB('myDb', 1);
  response: any;
  hideModal = false;
  Key: any;


  constructor(private permissionsService: NgxPermissionsService,public dialog: MatDialog, public dialogComponent: DialogBoxComponent, private router: Router, public toastr: ToastrManager, private http: HttpClient, private spinnerService: Ng4LoadingSpinnerService) {

  }

  ngOnInit() {
    const perm = ["Guest"];
    this.permissionsService.loadPermissions(perm);

    this.db.openDatabase(1);
    this.spinnerService.show();
    setTimeout(() => {
      this.db.getAll('TournamentData').then(
        person => {
          this.spinnerService.hide();
          if (person != undefined) {
            if (person.length != 0) {
              this.toastr.successToastr('Data Loaded', 'Success!');
              console.log(person);
              this.products = person;
              this.router.navigateByUrl('dashboard');
            } else {
              this.toastr.infoToastr('No Tournament Data available');
            }
          } else {
            this.toastr.errorToastr('Please check crendentials');
          }

        },
        error => {
          console.log(error);
          this.toastr.errorToastr('This is error toast.', 'Oops!');
        }
      );
    }, 4000);

  }

  addTournament() {
    this.hideModal = true;
    this.router.navigateByUrl("addTournament");
  }

  deleteTournament(Key) {
    this.spinnerService.show();
    setTimeout(() => {
      this.db.delete("TournamentData", Key).then(() => {
        this.spinnerService.hide();
        this.toastr.successToastr('This is success toast.', 'Success!');
        location.reload();

      }, (error) => {
        console.log(error);
        this.toastr.errorToastr('This is error toast.', 'Oops!');
      });
    }, 4000);
  }

  viewTournament(Key) {
    this.spinnerService.show();
    setTimeout(() => {
      this.db.getByKey("TournamentData", Key).then(
        person => {
          this.spinnerService.hide();
          if (person != undefined) {
            if (person.length != 0) {
              console.log(person);
            }
          } else {
            this.toastr.errorToastr('Please check crendentials');
          }

        },
        error => {
          console.log(error);
          this.toastr.errorToastr('This is error toast.', 'Oops!');
        }
      );
    }, 4000);
  }

}
