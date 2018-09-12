import { kontGreda } from '../models/kontGreda';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InputFormGredaComponent } from './input-form-greda.component';
import { FormsModule } from '@angular/forms';
import { OpterecenjaService } from 'app/services/opterecenja.service';
import { By } from '@angular/platform-browser';
import { DataSharedService } from 'app/services/data-shared.service';
import { HttpModule } from '@angular/http';

describe('InputFormGredaComponent', () => {
  let component: InputFormGredaComponent;
  let fixture: ComponentFixture<InputFormGredaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ FormsModule,HttpModule ],
      declarations:[InputFormGredaComponent],
      providers: [OpterecenjaService,DataSharedService],
    });
    fixture= TestBed.createComponent(InputFormGredaComponent);
    component=fixture.componentInstance;
 
   }));

  it('should be created', () => {
     let a =new kontGreda({brOslonca:2,nizRaspona:[4]});
     a.paramKontGreda={brOslonca:2,nizRaspona:[4]};
    component.kontGreda=a;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should add raspon', () => {
    let a =new kontGreda({brOslonca:2,nizRaspona:[4]});
    a.paramKontGreda={brOslonca:2,nizRaspona:[4]};
   component.kontGreda=a;

   component.addRaspon();
   fixture.detectChanges();
   let result=component.kontGreda.paramKontGreda.nizRaspona[1]==4 && component.kontGreda.paramKontGreda.brOslonca==3;

   expect(result).toBeTruthy();
 });

 it('should remove raspon', () => {
    let a =new kontGreda({brOslonca:2,nizRaspona:[4]});
    a.paramKontGreda={brOslonca:3,nizRaspona:[4,4]};
   component.kontGreda=a;

   component.removeRaspon();
   fixture.detectChanges();
   let result=component.kontGreda.paramKontGreda.nizRaspona[1]==4 || component.kontGreda.paramKontGreda.brOslonca==3;
   
   expect(result).not.toBeTruthy();
 });
 it('should render next raspon L2:6', () => {
    let a =new kontGreda({brOslonca:2,nizRaspona:[4]});
    a.paramKontGreda={brOslonca:3,nizRaspona:[4,6]};
    component.kontGreda=a;

    component.next();

    fixture.whenStable().then(() => {
        // after something in the component changes, you should detect changes
        fixture.detectChanges();

        let de1=fixture.debugElement.query(By.css('.test-active')).nativeElement as HTMLElement;
        let de2=fixture.debugElement.query(By.css('.test-active-raspon')).nativeElement as HTMLElement;
        let result=de1.innerText=="L2" && de2.innerText=='6';

        expect(result).toBeTruthy;
    });
 });
 it('should render previous raspon L1:4', () => {
    let a =new kontGreda({brOslonca:2,nizRaspona:[4]});
    a.paramKontGreda={brOslonca:4,nizRaspona:[4,6,3]};
    component.kontGreda=a;
    component.active=2;
    
    component.preview();
    component.preview();

    fixture.whenStable().then(() => {
        // after something in the component changes, you should detect changes
        fixture.detectChanges();

        let de1=fixture.debugElement.query(By.css('.test-active')).nativeElement as HTMLElement;
        let de2=fixture.debugElement.query(By.css('.test-active-raspon')).nativeElement as HTMLElement;
        let result=de1.innerText=="L1" && de2.innerText=='4';

        expect(result).toBeTruthy;
    });
 });

});
