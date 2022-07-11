import { Component, Input, OnInit } from '@angular/core';
import { IPrice } from '@core/models/price.model';

@Component({
  selector: 'app-price-list-item',
  templateUrl: './price-list-item.component.html',
  styleUrls: ['./price-list-item.component.scss'],
})
export class PriceListItemComponent implements OnInit {
  @Input() price: IPrice & { date: Date };
  constructor() {}

  ngOnInit() {}
  pruebas() {}
}
