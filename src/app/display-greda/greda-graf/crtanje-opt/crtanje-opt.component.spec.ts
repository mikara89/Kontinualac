import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrtanjeOptComponent } from './crtanje-opt.component';

describe('CrtanjeOptComponent', () => {
  let component: CrtanjeOptComponent;
  let fixture: ComponentFixture<CrtanjeOptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrtanjeOptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrtanjeOptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
