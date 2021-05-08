import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiEntryComponent } from './wiki-entry.component';

describe('WikiEntryComponent', () => {
  let component: WikiEntryComponent;
  let fixture: ComponentFixture<WikiEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WikiEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
