import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PricesService {
  constructor(private httpService: HttpClient) {}

  fetchPrice(currency: string) {
    return this.httpService.get(
      `${environment.apiBaseUrl}/prices/${currency}/spot`,
      {}
    );
  }
}
