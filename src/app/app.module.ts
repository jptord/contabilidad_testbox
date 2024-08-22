import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { ComprobantesComponent } from './contabilidad/comprobantes/comprobantes.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SumassaldosComponent } from './contabilidad/sumassaldos/sumassaldos.component';
import { BgeneralComponent } from './contabilidad/bgeneral/bgeneral.component';
import { BresultadosComponent } from './contabilidad/bresultados/bresultados.component';
@NgModule({
  declarations: [
    AppComponent,
    ComprobantesComponent,
    SumassaldosComponent,
    BgeneralComponent,
    BresultadosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient(),
    provideClientHydration(),
    BsModalRef, 
    BsModalService ,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
