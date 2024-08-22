import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ReportesService } from '../../services/reportes.services';

@Component({
  selector: 'app-bgeneral',
  templateUrl: './bgeneral.component.html',
  styleUrl: './bgeneral.component.scss'
})
export class BgeneralComponent implements OnInit {

	modalRef?: BsModalRef;
  title = 'appwork';
  cuentas: any;
  cuentas2: any;
  resultados: any;
  constructor(
    private reportesService: ReportesService,
    private modalService: BsModalService,
  ) {}
  ngOnInit(): void {
    this.bgeneral();
  }

  bgeneral() {
    console.log('loading');
    this.reportesService.balancegeneral().subscribe((r: any) => {      
      let tempCuentas = r.content;
      tempCuentas[0].subcuentas = tempCuentas[0].subcuentas.sort( (a:any,b:any) =>{
        if (a.codigo > b.codigo) return 1;
        if (a.codigo < b.codigo) return -1;
        return 0;
      });
      tempCuentas.forEach((c:any)=> {
        c['show'] = true;
        c['toggled'] = false;
        
        c.subcuentas.forEach( (subcuenta:any)=>
          this.setControls(subcuenta)
        );    
      });
      this.resultados = tempCuentas[0];
      
      console.log('tempCuentas', tempCuentas);
      this.cuentas = tempCuentas[0].subcuentas;
      this.cuentas2 = tempCuentas[0].subcuentas;
      
      console.log('cuentas', this.cuentas);
    });
  }
  lvl2color(nivel:number){
    let colVal = (16 - nivel);
    if (colVal == 16) return "#ffffff";
    if (colVal == 15) return "#f7f7f7";
    if (colVal == 14) return "#eeeeee";
    if (colVal == 13) return "#e7e7e7";
    if (colVal == 12) return "#dddddd";
    if (colVal == 11) return "#d7d7d7";
    if (colVal == 10) return "#cccccc";
    if (colVal == 9) return "#c7c7c7";
    if (colVal == 8) return "#bbbbbb";
    if (colVal == 7) return "#b7b7b7";
    if (colVal == 6) return "#aaaaaa";
    if (colVal == 5) return "#a7a7a7";
    if (colVal == 4) return "#999999";
    if (colVal == 3) return "#979797";
    if (colVal == 2) return "#888888";
    if (colVal == 1) return "#878787";
    return "#fff"
  }
  showAll(cuentas:any){
    cuentas.forEach( (subcuenta:any)=>{
      subcuenta.toggled = true;
      subcuenta.show = true;
      this.showAll(subcuenta.subcuentas);
    });    
  }
  hideAll(cuentas:any){
    cuentas.forEach( (subcuenta:any)=>{
      subcuenta.toggled = false;
      subcuenta.show = false;
      this.hideAll(subcuenta.subcuentas);
    });    
  }
  setControls(cuenta:any){
    if (cuenta.nivel==1)     cuenta['show'] = true;
    else cuenta['show'] = false;
    cuenta['toggled'] = false;

    let me=this;
    cuenta.subcuentas.forEach( (subcuenta:any)=>
      me.setControls(subcuenta)
    );    
  }
  showSub(cuenta:any){
    cuenta.toggled = cuenta.toggled?false:true;
    cuenta.subcuentas.forEach( (subcuenta:any)=>{
      subcuenta.show = cuenta.toggled;
      if(subcuenta.show == false){
        this.hideAll(subcuenta.subcuentas);
      }
    });        
  }
  subcuenta : any;
  showComprobante(cuenta:any,modal:any){
    this.subcuenta = cuenta;
		this.modalRef = this.modalService.show(modal, {
			class: 'modal-dialog-centered modal-lg ',			
		});
  }
}