import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComprobanteService } from '../../services/comprobante.services';

@Component({
  selector: 'app-comprobantes',
  templateUrl: './comprobantes.component.html',
  styleUrl: './comprobantes.component.scss'
})
export class ComprobantesComponent implements OnInit{
	@Output() onClose = new EventEmitter<string>();
	@Input() cuenta:any;

  comprobantes:any=[];

  constructor(private comprobanteService:ComprobanteService){}

  ngOnInit(): void {
    this.loadComprobantes();
  }
	loadComprobantes(){
    this.comprobantes = [];
    this.cuenta.comprobantes.forEach( (c:any)=>{
      this.comprobanteService.find(c).subscribe((r:any)=>{        
        r.content['rel'] = r.content.detalleComprobantes.find((cc:any) => this.cuenta.detalle_comprobantes.includes(cc.id) ); 
        this.comprobantes.push(r.content);
      });
    });
  }
}
