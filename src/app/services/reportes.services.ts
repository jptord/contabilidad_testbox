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


	sumasaldos(id: string = '') {
		return this.http.get(this.apiUrl + `/${this.apiName}/sumas_saldos`, { headers: this.reqHeader });
	}
	balancegeneral(id: string = '') {
		return this.http.get(this.apiUrl + `/${this.apiName}/balance_general`, { headers: this.reqHeader });
	}
	balanceresultados(id: string = '') {
		return this.http.get(this.apiUrl + `/${this.apiName}/balance_resultados`, { headers: this.reqHeader });
	}
	/* exportaciones */
	sumasaldosExport(id: string = '') {
		return this.http.get(this.apiUrl + `/${this.apiName}/sumas_saldos_exportar`, { headers: this.reqHeader });
	}

}