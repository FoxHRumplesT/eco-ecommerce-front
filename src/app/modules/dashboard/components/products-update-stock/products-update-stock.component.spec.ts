import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsUpdateStockComponent } from './products-update-stock.component';

describe('ProductsUpdateStockComponent', () => {
  let component: ProductsUpdateStockComponent;
  let fixture: ComponentFixture<ProductsUpdateStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsUpdateStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsUpdateStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
