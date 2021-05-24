import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiEntryBoxComponent } from './wiki-entry-box.component';

describe('WikiEntryBoxComponent', () => {
  let component: WikiEntryBoxComponent;
  let fixture: ComponentFixture<WikiEntryBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WikiEntryBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiEntryBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
