import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/user/user.service'
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {
  projectId: string;
  users: any;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['key'];
      this.projectId = id;
    });

    this.users =this.userService.getUsersFromProject(this.projectId);
  }

  ngLeave(key: string): void{
    this.userService.deleteMemberFromProject(key);
  }

}