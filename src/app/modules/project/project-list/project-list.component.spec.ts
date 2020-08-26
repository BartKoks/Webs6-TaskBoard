import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListComponent } from './project-list.component';
import { AuthService } from '../../../core/auth/auth.service';
import { ProjectService } from '../../../core/projects/project.service';
import { AngularFirestore } from "@angular/fire/firestore";

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from '../project-routing.module';

import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from '../../../../environments/environment';
import { AngularFireModule } from '@angular/fire';

import { SprintModule } from '../../sprint/sprint.module';
import { UserModule } from '../../user/user.module';
import { UserstoryModule } from '../../userstory/userstory.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ProjectCreateComponent } from '../project-create/project-create.component';
import { ProjectEditComponent } from '../project-edit/project-edit.component';
import { ProjectViewComponent } from '../project-view/project-view.component';

import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppRoutingModule } from '../../../app-routing.module';
import { AppComponent } from '../../../app.component'

import { DashboardComponent } from '../../../modules/dashboard/dashboard.component';

import { LoginComponent } from '../../../modules/auth/login/login.component';
import { RegisterComponent } from '../../../modules/auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectListComponent],
      providers: [AuthService, ProjectService, AngularFirestore],
      imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        BrowserAnimationsModule,

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
