import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { OpterecenjaService } from './services/opterecenja.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { InputFormComponent } from './input-form/input-form.component';
import { HomeComponent } from './home/home.component';
import { DisplayGredaComponent } from './display-greda/display-greda.component';
import { NepokOslonacGrafComponent } from './display-greda/nepok-oslonac-graf/nepok-oslonac-graf.component';
import { JedMeraPipe } from 'app/models/pips/jedMere';
import { InputFormGredaComponent } from './input-form-greda/input-form-greda.component';
import { GredaGrafComponent } from './display-greda/greda-graf/greda-graf.component';
import { DataSharedService } from 'app/services/data-shared.service';
import { CrtanjeOptComponent } from './display-greda/greda-graf/crtanje-opt/crtanje-opt.component';
import { CrtanjeMTNComponent } from './display-greda/greda-graf/crtanje-mtn/crtanje-mtn.component';
import { CrtanjeKotaComponent } from './display-greda/greda-graf/crtanje-kota/crtanje-kota.component';
import { PathComponent } from './display-greda/greda-graf/path/path.component';

@NgModule({
  declarations: [
    AppComponent,
    InputFormComponent,
    HomeComponent,
    DisplayGredaComponent,
    NepokOslonacGrafComponent,
    JedMeraPipe,
    InputFormGredaComponent,
    GredaGrafComponent,
    CrtanjeOptComponent,
    CrtanjeMTNComponent,
    CrtanjeKotaComponent,
    PathComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [OpterecenjaService,DataSharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
