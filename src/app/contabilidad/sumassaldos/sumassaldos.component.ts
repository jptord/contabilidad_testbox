
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReportesService } from '../../services/reportes.services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

function generateUUID() { // Public Domain/MIT
  var d = new Date().getTime();//Timestamp
  var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if(d > 0){//Use timestamp until depleted
          r = (d + r)%16 | 0;
          d = Math.floor(d/16);
      } else {//Use microseconds since page-load if supported
          r = (d2 + r)%16 | 0;
          d2 = Math.floor(d2/16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

@Component({
  selector: 'app-sumassaldos',
  templateUrl: './sumassaldos.component.html',
  styleUrl: './sumassaldos.component.scss'
})
export class SumassaldosComponent implements OnInit {

	modalRef?: BsModalRef;
  title = 'appwork';
  cuentas: any;
  resultados: any;
  base64:any=null;
  type:any=null;
  constructor(
    private reportesService: ReportesService,
    private modalService: BsModalService,
  ) {}
  ngOnInit(): void {
    this.sumaSaldos();
  }

  sumaSaldosExport() {
    this.reportesService.sumasaldosExport().subscribe((r: any) => {
      this.base64 = r.data.content;
      this.type = 'pdf';
    });
  }
  sumaSaldos() {
    console.log('loading');
    this.reportesService.sumasaldos().subscribe((r: any) => {      
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
      this.toJasper(this.resultados);
      
      console.log('tempCuentas', tempCuentas);
      this.cuentas = tempCuentas[0].subcuentas;      
      console.log('cuentas', this.cuentas);
    });
  }
  //Generador de parámetros para Jasper
  toJasper(data:any){
    let fields:any=[];
    let textfields:any=[];
    let textfieldsVar:any=[];
    let variablesSum:any=[];
    let variablesTot:any=[];
    let textfieldsTot:any=[];
    let textfieldSum:any=[];
    let startX = 190;
    let startY = 152;
    let width = 42;
    let height = 10;
    let fieldsValidAr = Object.keys({
      "iniciales_debe": 269780.0,
      "iniciales_haber": 269780.0,
      "movimientos_debe": 397690.0,
      "movimientos_haber": 397690.0,
      "sumas_debe": 667470.0,
      "sumas_haber": 667470.0,
      "saldos_deudor": 355280.0,
      "saldos_acreedor": 355280.0,
      "balance_act": 216440.0,
      "balance_patpas": 200340.0,
      "resultados_ingreso": 154940.0,
      "resultados_egreso": 138840.0,
    });

    let addTotFieldsValidAr = Object.keys({
      "resultado_balance_act" : 0.0,
      "resultado_balance_patpas" : 16100.0,
      "resultado_egresos" : 0.0,
      "resultado_ingresos" : 16100.0,
      "tot_balance_act" : 216440.0,
      "tot_balance_patpas" : 216440.0
    });

    Object.keys(data).forEach((k)=>{ 
      fields.push(`<field name="${k}" class="java.lang.Double"><property name="net.sf.jasperreports.json.field.expression" value="${k}"/><fieldDescription><![CDATA[${k}]]></fieldDescription></field>`);
    
     });     

     let count = 0;
     count++;
    Object.keys(data).forEach((k)=>{ 
      if (!fieldsValidAr.includes(k)) return;
      let uuid = generateUUID();
      textfields.push(`<textField><reportElement x="${startX+width*count}" y="0" width="42" height="10" uuid="${uuid}"/><textElement textAlignment="Right" verticalAlignment="Middle"><font fontName="SansSerif" size="4"/></textElement><textFieldExpression><![CDATA[new DecimalFormat("#,##0.00").format($F{${k}})]]></textFieldExpression></textField>`);
      variablesSum.push(`<variable name="sum_${k}" class="java.lang.Double" calculation="Sum"><variableExpression><![CDATA[$F{nivel}==1?$F{${k}}:0]]></variableExpression></variable>`);
      textfieldSum.push(`<textField evaluationTime="Report"><reportElement x="${startX+width*count}" y="0" width="42" height="10" uuid="${uuid}"/>
				<box topPadding="0" leftPadding="2" bottomPadding="0" rightPadding="2">
					<pen lineWidth="0.25" lineColor="#9C9C9C"/>
					<topPen lineWidth="0.0" lineStyle="Solid" lineColor="#000000"/>
					<leftPen lineWidth="0.25" lineStyle="Solid" lineColor="#9C9C9C"/>
					<bottomPen lineWidth="0.0" lineStyle="Solid" lineColor="#000000"/>
					<rightPen lineWidth="0.25" lineStyle="Solid" lineColor="#9C9C9C"/>
				</box>
				<textElement textAlignment="Right" verticalAlignment="Middle">
					<font fontName="SansSerif" size="6"/>
				</textElement>
				<textFieldExpression><![CDATA[new DecimalFormat("#,##0.00").format($V{sum_${k}})]]></textFieldExpression>
			</textField>`);
      count++;
     });     
     Object.keys(data).forEach((k)=>{ 
      if (!addTotFieldsValidAr.includes(k)) return;
      let uuid = generateUUID();
      variablesTot.push(`<variable name="tot_${k}" class="java.lang.Double" calculation="First"><variableExpression><![CDATA[$F{nivel}==0?$F{${k}}:0]]></variableExpression></variable>`);
      textfieldsTot.push(`<textField evaluationTime="Report"><reportElement x="${startX+width*count}" y="0" width="42" height="10" uuid="${uuid}"/>
          <box topPadding="0" leftPadding="2" bottomPadding="0" rightPadding="2">
            <pen lineWidth="0.25" lineColor="#9C9C9C"/>
            <topPen lineWidth="0.0" lineStyle="Solid" lineColor="#000000"/>
            <leftPen lineWidth="0.25" lineStyle="Solid" lineColor="#9C9C9C"/>
            <bottomPen lineWidth="0.0" lineStyle="Solid" lineColor="#000000"/>
            <rightPen lineWidth="0.25" lineStyle="Solid" lineColor="#9C9C9C"/>
          </box>
          <textElement textAlignment="Right" verticalAlignment="Middle">
            <font fontName="SansSerif" size="6"/>
          </textElement>
          <textFieldExpression><![CDATA[new DecimalFormat("#,##0.00").format($V{tot_${k}})]]></textFieldExpression>
        </textField>`);
        count++;
     });
     console.log("[fields]",fields.join("\n"));
     console.log("[textfields]",textfields.join("\n"));
     console.log("[variables]",variablesSum.join("\n"));

     console.log("[variablesSum]",variablesSum.join("\n"));
     console.log("[textfieldSum]",textfieldSum.join("\n"));

     console.log("[variablesTot]",variablesTot.join("\n"));
     console.log("[textfieldsTot]",textfieldsTot.join("\n"));

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

