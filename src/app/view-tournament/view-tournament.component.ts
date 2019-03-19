import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AngularIndexedDB } from 'angular2-indexeddb';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-tournament',
  templateUrl: './view-tournament.component.html',
  styleUrls: ['./view-tournament.component.css']
})
export class ViewTournamentComponent implements OnInit {
  private db = new AngularIndexedDB('myDb', 1);
  form: FormGroup;
  example: any;
  showOnload = false;

  constructor(builder: FormBuilder, private route: ActivatedRoute, public toastr: ToastrManager, public spinnerService: Ng4LoadingSpinnerService) {
    this.form = builder.group({
      Tournamentname: '',
      SOD: '',
      EOD: ''
    })
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);


    this.db.openDatabase(1);
    this.spinnerService.show();
    setTimeout(() => {
      this.db.getByIndex('TournamentData', 'Tournamentname', id).then(
        person => {
          this.spinnerService.hide();
          if (person != undefined) {
            this.example = person;
            this.showOnload = true;
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
