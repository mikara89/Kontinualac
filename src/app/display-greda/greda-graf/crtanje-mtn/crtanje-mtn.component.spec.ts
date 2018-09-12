import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrtanjeMTNComponent } from './crtanje-mtn.component';

describe('CrtanjeMTNComponent', () => {
  let component: CrtanjeMTNComponent;
  let fixture: ComponentFixture<CrtanjeMTNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrtanjeMTNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrtanjeMTNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
