import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { PricesService } from 'src/app/core/services/prices.service';
describe('PricesService', () => {
  let service: PricesService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(PricesService);
  });

  it('should fetch data from coinbase', (done) => {
    service.fetchPrice('USD').subscribe(({ data }) => {
      expect(data.currency).toBe('USD');
      expect(data.date).toBeUndefined();
      done();
    });
  });
});
