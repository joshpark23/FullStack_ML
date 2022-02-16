import { Data } from './../complex-types/data.ct';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StockDataService {

  dataUrl = 'http://localhost:5000';
  route = '/api/stock/all'

  constructor(
    private http: HttpClient
  ) { }

  getStock(ticker: string) {
    return this.http.get<any>(this.dataUrl + this.route);
  }
}
