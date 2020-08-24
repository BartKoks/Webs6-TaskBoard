import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';

const routes: Routes = [
  {
    path: 'create',
    component: ProjectCreateComponent,
  },
  {
    path: 'edit',
    component: ProjectEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
