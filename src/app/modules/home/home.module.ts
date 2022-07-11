import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home-page/home.page';
import { PriceListItemComponent } from './components/price-list-item/price-list-item.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [HomePage, PriceListItemComponent, ModalComponent],
})
export class HomePageModule {}
