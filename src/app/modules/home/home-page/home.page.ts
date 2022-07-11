import { DatesUtility } from '@core/utils/Dates.utility';
import { Component, OnInit } from '@angular/core';
import { PricesService } from '@core/services/prices.service';
import { IPrice } from '@core/models/price.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  listOfPrices: Array<IPrice & { date: Date }> = [];
  weeeksToShow = 2;
  numberOfDaysToShow = this.weeeksToShow * DatesUtility.numberOfDaysPerWeek;

  constructor(private pricesService: PricesService) {}

  ngOnInit() {
    const priceDate = new Date();
    for (let i = 0; i < this.numberOfDaysToShow; i++) {
      this.fetchPrices(priceDate);
      priceDate.setDate(priceDate.getDate() - 1);
    }
  }

  fetchPrices(priceDate: Date) {
    this.pricesService.fetchPrice('USD', priceDate).subscribe(({ data }) => {
      console.log(data);
    });
  }
}
