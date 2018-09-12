import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrtanjeKotaComponent } from './crtanje-kota.component';

describe('CrtanjeKotaComponent', () => {
  let component: CrtanjeKotaComponent;
  let fixture: ComponentFixture<CrtanjeKotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrtanjeKotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrtanjeKotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
