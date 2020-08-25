import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserstoryCreateComponent } from './userstory-create.component';

describe('UserstoryCreateComponent', () => {
  let component: UserstoryCreateComponent;
  let fixture: ComponentFixture<UserstoryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserstoryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserstoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
