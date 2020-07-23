import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  private baseUrl = 'https://localhost:8443/api/receipt';
  private baseUrlInvoice = 'https://localhost:8443/api/invoiceproduct';
  private baseUrlInvoiceDetail = 'https://localhost:8443/api/invoiceproduct-product';

  private urlMonth = 'https://localhost:8443/api/receipt/revenuemonth';
  private urlTotal = 'https://localhost:8443/api/receipt/revenuetotal';

  private _refresh = new Subject<void>();
  private headers= new HttpHeaders({
    'Content-Type': 'application/json',
    //'x-access-token':localStorage.getItem('token'),
    //'Authorization': 'Bearer' + localStorage.getItem('token')
  })
  private options = { headers: this.headers };
  
  constructor(private http: HttpClient) { }
 
  get refresh(){
    return this._refresh;
  }
  getList(): Observable<any>{
    return this.http.get(`${this.baseUrl}`, this.options);
  }
  

  //for charts
  getListMonth(): Observable<any>{
    return this.http.get(`${this.urlMonth}`, this.options);
  }
  getListTotal(): Observable<any>{
    return this.http.get(`${this.urlTotal}`, this.options);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, this.options);
  }

  getInvoiceById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrlInvoice}/${id}`, this.options);
  }

  getInvoiceDetailById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrlInvoiceDetail+"/list"}/${id}`, this.options);
  }

  getNameCusById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrlInvoiceDetail+"/cus"}/${id}`, { responseType: 'text' });
  }

  getNameEmpById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrlInvoiceDetail+"/emp"}/${id}`, { responseType: 'text' });
  }

  
  createNew(ob: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, ob, this.options).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  update(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value, this.options).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`,this.options);
  }
}
