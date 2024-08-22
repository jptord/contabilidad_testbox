import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SumassaldosComponent } from './contabilidad/sumassaldos/sumassaldos.component';
import { BgeneralComponent } from './contabilidad/bgeneral/bgeneral.component';
import { BresultadosComponent } from './contabilidad/bresultados/bresultados.component';

const routes: Routes = [

  { path: 'sumasaldos', component: SumassaldosComponent },
  { path: 'bgeneral', component: BgeneralComponent },
  { path: 'bresultados', component: BresultadosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
