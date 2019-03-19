import { CommonModule, DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { routes} from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ToastrModule } from 'ng6-toastr-notifications';
import { HeaderComponent } from './header/header.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { AddTournamentComponent } from './add-tournament/add-tournament.component';
import { TeamSetupComponent } from './team-setup/team-setup.component';
import { FixtureSetupComponent } from './fixture-setup/fixture-setup.component';
import { ViewTournamentComponent } from './view-tournament/view-tournament.component';
//import { CommonModule } from '@angular/common/src/common_module';
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    SignUpComponent,
    HeaderComponent,
    DialogBoxComponent,
    AddTournamentComponent,
    TeamSetupComponent,
    FixtureSetupComponent,
    ViewTournamentComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    Ng4LoadingSpinnerModule.forRoot(),
    ToastrModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    HttpClientModule,ButtonsModule,
    GridModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents:[DialogBoxComponent]
})
export class AppModule { }
