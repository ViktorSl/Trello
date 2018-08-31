import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './components/auth/auth.component';
import {BoardsComponent} from './components/boards/boards.component';

const routes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'report', component: BoardsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
