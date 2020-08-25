import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SprintCreateComponent } from './sprint-create/sprint-create.component';
import { SprintListComponent } from './sprint-list/sprint-list.component';

const routes: Routes = [
  {
    path: 'create',
    component: SprintCreateComponent,
  },
  {
    path: '',
    component: SprintListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SprintRoutingModule { }
