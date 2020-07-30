import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://localhost:8443/api/product';
  private urlImg = 'https://localhost:8443/api/productimg';
  private urlImgList = 'https://localhost:8443/api/productimglist';
  private urlImg2 = 'https://localhost:8443/api/productimgA';

  private urlByType = 'https://localhost:8443/api/producttype';

  private urlImgListLimit = 'https://localhost:8443/api/productimglistlimit';
  private urltotal = 'https://localhost:8443/api/producttotal';
  private urlPageAsc = 'https://localhost:8443/api/products/pageasc';
  private urlPageDesc = 'https://localhost:8443/api/products/pagedesc';
  private urlPage = 'https://localhost:8443/api/products/page';
  private urlSearch = 'https://localhost:8443/api/products/search';
  private urlBestSeller = 'https://localhost:8443/api/products/bestseller';
  private urlNewPro = 'https://localhost:8443/api/products/newproduct';
  private urlCate = 'https://localhost:8443/api/productcate';
  private urlSearchRange = 'https://localhost:8443/api/products/range';
  private urlRelated = 'https://localhost:8443/api/products/related';


  private urlChartBestSeller = 'https://localhost:8443/api/products/chartbestseller';
  private urlCountBestSellerQuantity = 'https://localhost:8443/api/products/bestquantity';
  private urlChartWorstSeller = 'https://localhost:8443/api/products/chartworstseller';



  private _refresh = new Subject<void>();
  private headers= new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer ' + localStorage.getItem('token')
  })

  private options = { headers: this.headers };

  private headerImg= new HttpHeaders({
  })

  private optionsImg = { headers: this.headerImg };
  
  constructor(private http: HttpClient) { }
 
  get refresh(){
    return this._refresh;
  }

  total(): Observable<any>{
    return this.http.get(`${this.urltotal}`, this.options);
  }

  getList(): Observable<any>{
    return this.http.get(`${this.baseUrl}`, this.options);
  }

  getListByCate(id: number): Observable<any>{
    return this.http.get(`${this.urlCate}/${id}`, this.options);
  }

  getListPageAsc(pagenum: number): Observable<any>{
    return this.http.get(`${this.urlPageAsc}/${pagenum}`, this.options);
  }

  getListPageDesc(pagenum: number): Observable<any>{
    return this.http.get(`${this.urlPageDesc}/${pagenum}`, this.options);
  }

  getListPage(pagenum: number): Observable<any>{
    return this.http.get(`${this.urlPage}/${pagenum}`, this.options);
  }

  getListSearch(name: string): Observable<any>{
    return this.http.get(`${this.urlSearch}/${name}`, this.options);
  }

  getListSearchRange(min: number, max: number): Observable<any>{
    return this.http.get(`${this.urlSearchRange}/${min}/${max}`, this.options);
  }

  //for chart
  getChartBestSeller(): Observable<any>{
    return this.http.get(`${this.urlChartBestSeller}`, this.options);
  }
  getChartBestSellerQuantity(id: number): Observable<any>{
    return this.http.get(`${this.urlCountBestSellerQuantity}/${id}`, this.options);
  }
  getChartWorstSeller(): Observable<any>{
    return this.http.get(`${this.urlChartWorstSeller}`, this.options);
  }
  
  getListBestSeller(): Observable<any>{
    return this.http.get(`${this.urlBestSeller}`, this.options);
  }

  getListNewPro(): Observable<any>{
    return this.http.get(`${this.urlNewPro}`, this.options);
  }

  getListRelated(id: number): Observable<any>{
    return this.http.get(`${this.urlRelated}/${id}`, this.options);
  }


  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, this.options);
  }
  

  getProductImgByProductId(id: number): Observable<any> {
    return this.http.get(`${this.urlImgList}/${id}`, this.options);
  }

  getProductImgByProductIdLimit(id: number): Observable<any> {
    return this.http.get(`${this.urlImgListLimit}/${id}`, this.options);
  }

  getByType(id: number): Observable<any> {
    return this.http.get(`${this.urlByType}/${id}`, this.options);
  }

  
  createNew(idtype: number,idsub: number,ob: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${idtype}/${idsub}`, ob, this.options).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  createProductImg(id: number,ob: FormData): Observable<Object> {
    return this.http.post(`${this.urlImg}/${id}`, ob, this.optionsImg).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  createProductImg2(id: number,ob: FormData): Observable<Object> {
    return this.http.post(`${this.urlImg2}/${id}`, ob, this.optionsImg).pipe(
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
  update2(id: number,idtype: number,idsup:number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}/${idtype}/${idsup}`, value, this.options).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`,this.options);
  }

}
