import { concatMap } from 'rxjs/operators';
import { ICoinbaseResponse } from '@core/models/coinbase-response.model';
import { DatesUtility } from '@core/utils/Dates.utility';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PricesService } from '@core/services/prices.service';
import { IPrice } from '@core/models/price.model';
import { forkJoin, Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  listOfPrices: IPrice[] = [];
  listOfDetailedPrices: IPrice[] = [];
  weeeksToShow = 2;
  numberOfDaysToShow = this.weeeksToShow * DatesUtility.numberOfDaysPerWeek;
  isLoading = false;
  refreshTimeInSeconds = 60;
  intervalId: number;
  isModalOpen = false;
  isModalDataLoading = false;

  constructor(private pricesService: PricesService, private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    this.fetchPrices();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  fetchPrices() {
    this.isLoading = true;
    const auxiliarDate = new Date();
    // Arreglo de observables de las peticiones a coinbase
    let prices$: Observable<ICoinbaseResponse<IPrice>>[] = [];
    // Arreglo de las fechas en que se recuperan los precios
    let priceDates: Date[] = [];

    // Para cada dia, se obtiene el observador que hace la peticion a coinbase
    for (let i = 0; i < this.numberOfDaysToShow; i++) {
      prices$ = [
        ...prices$,
        this.pricesService.fetchPrice('USD', auxiliarDate),
      ];
      priceDates = [...priceDates, new Date(auxiliarDate)];
      auxiliarDate.setDate(auxiliarDate.getDate() - 1);
    }

    forkJoin(prices$).subscribe(
      async (prices) => {
        prices.forEach(({ data }, index) => {
          this.listOfPrices = [
            ...this.listOfPrices,
            { ...data, date: priceDates[index] },
          ];
        });
        console.log(this.listOfPrices);
        await this.storage.set('listOfPrices', this.listOfPrices);
        this.isLoading = false;
        this.refreshCurrentDayPrice();
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  refreshCurrentDayPrice() {
    this.intervalId = window.setInterval(() => {
      this.pricesService.fetchPrice('USD').subscribe(({ data }) => {
        this.listOfPrices[0].amount = data.amount;
      });
    }, this.refreshTimeInSeconds * 1000);
  }

  handlePriceClick(price: IPrice) {
    this.isModalOpen = true;
    this.isModalDataLoading = true;
    this.listOfDetailedPrices = [price];
    this.pricesService
      .fetchPrice('EUR', price.date)
      .pipe(
        concatMap(({ data }) => {
          this.listOfDetailedPrices = [...this.listOfDetailedPrices, data];
          return this.pricesService.fetchPrice('COP', price.date);
        })
      )
      .subscribe(
        async ({ data }) => {
          this.listOfDetailedPrices = [...this.listOfDetailedPrices, data];
          await this.storage.set(
            price.date.toString(),
            this.listOfDetailedPrices
          );
          this.isModalDataLoading = false;
        },
        () => {
          this.isModalDataLoading = false;
        }
      );
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
