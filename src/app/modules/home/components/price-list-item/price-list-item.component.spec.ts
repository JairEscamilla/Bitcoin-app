import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PriceListItemComponent } from './price-list-item.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PricesService } from '@core/services/prices.service';
import { HttpClient } from '@angular/common/http';

describe('PriceListItemComponent', () => {
  let component: PriceListItemComponent;
  let fixture: ComponentFixture<PriceListItemComponent>;
  let service: PricesService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PriceListItemComponent],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [PricesService],
    }).compileComponents();

    fixture = TestBed.createComponent(PriceListItemComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PricesService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has a variant', () => {
    expect(component.variant).toBeDefined();
  });
});
