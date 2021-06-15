import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrycreatorDialogComponent } from './entrycreator-dialog.component';

describe('EntrycreatorDialogComponent', () => {
  let component: EntrycreatorDialogComponent;
  let fixture: ComponentFixture<EntrycreatorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrycreatorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrycreatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
