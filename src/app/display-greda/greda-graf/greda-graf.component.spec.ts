import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GredaGrafComponent } from './greda-graf.component';

describe('GredaGrafComponent', () => {
  let component: GredaGrafComponent;
  let fixture: ComponentFixture<GredaGrafComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GredaGrafComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GredaGrafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

//   it('should be created', () => {
//     expect(component).toBeTruthy();
//   });
});
