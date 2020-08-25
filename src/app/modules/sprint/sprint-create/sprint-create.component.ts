import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Sprint } from '../../../shared/model/sprint';
import { SprintService } from '../../../core/sprints/sprint.service'
import { AuthService } from '../../../core/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sprint-create',
  templateUrl: './sprint-create.component.html',
  styleUrls: ['./sprint-create.component.sass']
})
export class SprintCreateComponent implements OnInit {
  projectId: string;
  sprint: Sprint;
  sprintForm: FormGroup;
  errorMessage = '';
  constructor(private formBuilder: FormBuilder, private sprintService: SprintService, private authservice: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.sprint = new Sprint();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['key'];
      this.projectId = id;
    });

    this.sprintForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required]
    });
  }

  ngOnSubmit(): void {
      this.sprint = Object.assign(this.sprintForm.value);
      this.sprint.projectKey = this.projectId;
      this.sprintService.createSprint(this.sprint)
      this.router.navigate(['/project/' + this.projectId])
  }

}