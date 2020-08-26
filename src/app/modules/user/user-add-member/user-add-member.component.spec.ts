import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddMemberComponent } from './user-add-member.component';

describe('UserAddMemberComponent', () => {
  let component: UserAddMemberComponent;
  let fixture: ComponentFixture<UserAddMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
