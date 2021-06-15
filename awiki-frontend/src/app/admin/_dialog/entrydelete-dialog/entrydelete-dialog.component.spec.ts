import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrydeleteDialogComponent } from './entrydelete-dialog.component';

describe('EntrydeleteDialogComponent', () => {
  let component: EntrydeleteDialogComponent;
  let fixture: ComponentFixture<EntrydeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrydeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrydeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
