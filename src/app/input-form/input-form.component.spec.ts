import { kontGreda } from 'app/models/kontGreda';
import { JedMeraPipe } from './../models/pips/jedMere';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InputFormComponent } from './input-form.component';
import { OpterecenjaService } from 'app/services/opterecenja.service';
import { By} from "@angular/platform-browser";
import { DataSharedService } from 'app/services/data-shared.service';
import { HttpModule } from '@angular/http';

describe('InputFormComponent', () => {
  let component:InputFormComponent;
  let fixture:ComponentFixture<InputFormComponent>;

  beforeEach(async(() => {
   TestBed.configureTestingModule({
     imports:[ FormsModule,HttpModule],
     declarations:[InputFormComponent,JedMeraPipe],
     providers: [OpterecenjaService,DataSharedService],
   });
   fixture= TestBed.createComponent(InputFormComponent);
   component=fixture.componentInstance;

  }));

  it('should add and render opt in table', () => {
    component.kontGreda= new kontGreda({brOslonca:2,nizRaspona:[4]});
    component.kontGreda.optercenja=[];
    component.opt={tipopt:"uprkoncsila",sila:10, duzopt:0,polozopt:0}

    component.addOpt();
    
    fixture.whenStable().then(() => {
      // after something in the component changes, you should detect changes
      fixture.detectChanges();
  
      let de=fixture.debugElement.query(By.css('.test')).nativeElement as HTMLElement;

      expect(de.innerText).toContain("uprkoncsila");
    });

  });
  it('should remove opt in table', () => {
    component.kontGreda= new kontGreda({brOslonca:2,nizRaspona:[4]});
    let opt={tipopt:"uprkoncsila",sila:10, duzopt:0,polozopt:0};
    component.kontGreda.optercenja=[];
    component.kontGreda.optercenja.push(opt);

    fixture.whenStable().then(() => {
      // after something in the component changes, you should detect changes
      component.removeOpt(opt);
      fixture.detectChanges();
  
      let de=fixture.debugElement.query(By.css('.test'));

      expect(de).toBeNull();
    });

  });

  it('should return duzina grede', () => {
    component.kontGreda= new kontGreda({brOslonca:3,nizRaspona:[4,4]});
    component.getDuzinaGrede();
    let duzina=component.ukupnaDuzGrede

    expect(duzina).toEqual(8);
  });

  it('should return [kN]', () => {
    
    let result=component.getJedMere('uprkoncsila');

    expect(result).toContain('[kN]');
  });

  it('should return uprkoncsila', () => {

    component.setActiveOpt('uprkoncsila');

    let result=component.activeOpt;

    expect(result).toContain('uprkoncsila');
  });
  
    it('should be created', () => {
      expect(component).toBeTruthy();
    });
});
