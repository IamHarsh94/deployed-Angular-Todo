import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchnoteComponent } from './searchnote.component';

describe('SearchnoteComponent', () => {
  let component: SearchnoteComponent;
  let fixture: ComponentFixture<SearchnoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchnoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
