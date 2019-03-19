import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule ,Routes }  from '@angular/router';
import { AddTournamentComponent } from './add-tournament/add-tournament.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FixtureSetupComponent } from './fixture-setup/fixture-setup.component';
import {TeamSetupComponent}from './team-setup/team-setup.component';
import {ViewTournamentComponent} from './view-tournament/view-tournament.component';
export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'Sign-up', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path:'addTournament' ,component:AddTournamentComponent },
  {path:'fixtureSetup',component : FixtureSetupComponent},
  {path:'teamSetup',component:TeamSetupComponent},
  {path:'ViewTournament/:id',component: ViewTournamentComponent}
];

@NgModule({
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
