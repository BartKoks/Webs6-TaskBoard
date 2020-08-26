import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintViewComponent } from './sprint-view.component';

describe('SprintViewComponent', () => {
  let component: SprintViewComponent;
  let fixture: ComponentFixture<SprintViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
