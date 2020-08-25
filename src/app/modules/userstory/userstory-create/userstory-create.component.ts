import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Userstory } from '../../../shared/model/userstory';
import { UserstoryService } from '../../../core/userstory/userstory.service'
import { AuthService } from '../../../core/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-userstory-create',
  templateUrl: './userstory-create.component.html',
  styleUrls: ['./userstory-create.component.sass']
})
export class UserstoryCreateComponent implements OnInit {

  projectId: string;
  projectMembers: any;
  userstory: Userstory
  userstoryForm: FormGroup;
  errorMessage = '';
  
  constructor(private formBuilder: FormBuilder, private userstoryService: UserstoryService, private authservice: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.userstory = new Userstory();
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['key'];
      this.projectId = id;
    });

    this.userstoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      storyPoints: ['', Validators.required],
      owner: ['', Validators.required]
    });
  }

  ngOnSubmit(): void {
      this.userstory = Object.assign(this.userstoryForm.value);
      this.userstory.projectKey = this.projectId;
      this.router.navigate(['/project/' + this.projectId])
  }

}
