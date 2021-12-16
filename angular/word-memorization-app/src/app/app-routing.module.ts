import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecentlyAddedComponent} from './recently-added/recently-added.component';
import {ExercisesComponent} from './exercises/exercises.component';
import {SettingsComponent} from './settings/settings.component';

const routes: Routes = [
  { path: 'recently-added', component: RecentlyAddedComponent },
  { path: 'exercises', component: ExercisesComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: '/recently-added', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
