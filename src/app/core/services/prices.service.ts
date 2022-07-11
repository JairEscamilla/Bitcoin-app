import { IPrice } from './../models/price.model';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICoinbaseResponse } from '@core/models/coinbase-response.model';
import { DatesUtility } from '@core/utils/Dates.utility';

@Injectable({
  providedIn: 'root',
})
export class PricesService {
  constructor(private httpService: HttpClient) {}

  fetchPrice(currency: string, date?: Date) {
    return this.httpService.get<ICoinbaseResponse<IPrice>>(
      `${environment.apiBaseUrl}/prices/BTC-${currency}/spot`,
      {
        params: {
          date: DatesUtility.dateToUTC(date ? date : new Date()),
        },
      }
    );
  }
}
