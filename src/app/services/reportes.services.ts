import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
	providedIn: 'root'
})
export class ReportesService {
	apiUrl = environment.apiContabilidad;
	apiName = 'reportes';
    reqHeader = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + environment.token
     });
	constructor(private http: HttpClient) { }

	centroDeCostos(){
		return this.http.get(this.apiUrl + `/centro_costos`, { headers: this.reqHeader });
	}	
	grupos(){
		return this.http.get(this.apiUrl + `/grupos`, { headers: this.reqHeader });
	}
	sumasaldos() {
		return this.http.post(this.apiUrl + `/${this.apiName}/sumas_saldos`,{}, { headers: this.reqHeader });
	}
	sumasaldosFiltro(filtro:any={}) {
		return this.http.post(this.apiUrl + `/${this.apiName}/sumas_saldos`,filtro, { headers: this.reqHeader });
	}
	balancegeneral() {
		return this.http.post(this.apiUrl + `/${this.apiName}/balance_general`,{}, { headers: this.reqHeader });
	}
	balancegeneralFiltro(filtro:any={}) {
		return this.http.post(this.apiUrl + `/${this.apiName}/balance_general`,filtro, { headers: this.reqHeader });
	}
	balanceresultados() {
		return this.http.post(this.apiUrl + `/${this.apiName}/balance_resultados`,{}, { headers: this.reqHeader });
	}
	balanceresultadosFiltro(filtro:any={}) {
		return this.http.post(this.apiUrl + `/${this.apiName}/balance_resultados`,filtro, { headers: this.reqHeader });
	}
	/* exportaciones */
	sumasaldosExport(filtro:any={}) {
		return this.http.post(this.apiUrl + `/${this.apiName}/sumas_saldos_exportar`, filtro,{ headers: this.reqHeader });
	}
	balancegeneralExport(filtro:any={}) {
		return this.http.post(this.apiUrl + `/${this.apiName}/balance_general_exportar`,filtro, { headers: this.reqHeader });
	}
	balanceresultadosExport(filtro:any={}) {
		return this.http.post(this.apiUrl + `/${this.apiName}/balance_resultados_exportar`,filtro, { headers: this.reqHeader });
	}
}