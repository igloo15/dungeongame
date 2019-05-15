import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExcaliburComponent } from './components/excalibur/excalibur.component';

const routes: Routes = [
  { path: 'game', component:  ExcaliburComponent },
  { path: '', redirectTo: '/game', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
