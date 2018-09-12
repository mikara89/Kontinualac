import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayGredaComponent } from './display-greda.component';
import { kontGreda } from 'app/models/kontGreda';

describe('DisplayGredaComponent', () => {
  let component: DisplayGredaComponent;
  let fixture: ComponentFixture<DisplayGredaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayGredaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayGredaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

//   it('should be created', () => {
//     let a =new kontGreda({brOslonca:2,nizRaspona:[4]});
//     a.paramKontGrada={brOslonca:2,nizRaspona:[4]};
//     component.kontGreda=a;
//     fixture.detectChanges();
//     expect(component).toBeTruthy();
//   });
});
