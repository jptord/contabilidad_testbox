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
	prefix = '';
    reqHeader = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + environment.token
     });
	constructor(private http: HttpClient) { }

	setPrefix(prefix: string) {
		this.prefix = prefix;
	}

	register(datos: any) {
		return this.http.post(
			this.apiUrl + this.prefix + `/${this.apiName}/sync`,
			datos
		);
	}

	update(datos: any, id: any): Observable<any> {
		return this.http.put(
			this.apiUrl + this.prefix + `/${this.apiName}/${id}`,
			datos
		);
	}

	find(id: string = '') {
		return this.http.get(this.apiUrl + this.prefix + `/${this.apiName}/${id}`);
	}

	sumasaldos(id: string = '') {
		return this.http.get(this.apiUrl + this.prefix + `/${this.apiName}/sumas_saldos`, { headers: this.reqHeader });
	}
	balancegeneral(id: string = '') {
		return this.http.get(this.apiUrl + this.prefix + `/${this.apiName}/balance_general`, { headers: this.reqHeader });
	}
	balanceresultados(id: string = '') {
		return this.http.get(this.apiUrl + this.prefix + `/${this.apiName}/balance_resultados`, { headers: this.reqHeader });
	}
	

	getAll(
	) {
		return this.http.get(
			this.apiUrl +
			this.prefix +
			`/${this.apiName}`
		);
	}
	getList(
	) {
		return this.http.get(
			this.apiUrl +
			this.prefix +
			`/devices/getlist`
		);
	}

	delete(id: string | number): Observable<any> {
		return this.http.delete(
			this.apiUrl + this.prefix + `/${this.apiName}/${id}`
		);
	}
}