import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupdeleteDialogComponent } from './groupdelete-dialog.component';

describe('GroupdeleteDialogComponent', () => {
  let component: GroupdeleteDialogComponent;
  let fixture: ComponentFixture<GroupdeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupdeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupdeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
