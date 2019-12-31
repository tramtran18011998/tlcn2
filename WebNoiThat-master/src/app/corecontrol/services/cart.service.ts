import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:8080/api/cart';
  private urlcount = 'http://localhost:8080/api/cartcount';
  private urllist = 'http://localhost:8080/api/cartlist';
  private urlInvoice = 'http://localhost:8080/api/invoiceproduct';
  private urllisthistory = 'http://localhost:8080/api/invoicehistory';


  private _refresh = new Subject<void>();
  private headers= new HttpHeaders({
    'Content-Type': 'application/json',
    //'x-access-token':localStorage.getItem('token'),
    'Authorization': 'Bearer' + localStorage.getItem('token')
  })
  private options = { headers: this.headers };
  
  constructor(private http: HttpClient) { }
 
  get refresh(){
    return this._refresh;
  }

  countQuantity(id: number): Observable<any>{
    return this.http.get(`${this.urlcount}/${id}`, this.options);
  }

  getListCartByCustomer(id: number): Observable<any>{
    return this.http.get(`${this.urllist}/${id}`, this.options);
  }

  //history invoice
  getHistoryByCustomer(id: number): Observable<any>{
    return this.http.get(`${this.urllisthistory}/${id}`, this.options);
  }



  getList(): Observable<any>{
    return this.http.get(`${this.baseUrl}`, this.options);
  }
  
  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, this.options);
  }

  
  // createNew(ob: Object): Observable<Object> {
  //   return this.http.post(`${this.baseUrl}`, ob, this.options).pipe(
  //     tap(()=> {
  //       this._refresh.next();
  //     })
  //   );
  // }
  createNew(idpro: number, idcus: number, ob: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/${idpro}/${idcus}`, ob, this.options).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  createInvoice(idcus: number,idemp: number): Observable<Object> {
    return this.http.post(`${this.urlInvoice}/${idcus}/${idemp}`,this.options).pipe(
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
