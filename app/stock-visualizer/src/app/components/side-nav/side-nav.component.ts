import { Stock } from './../../model/stock';
import { DataManager } from './../../utils/data-manager.util';
import { Data } from './../../complex-types/data.ct';
import { StockDataService } from './../../services/stock-data.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  stock: Stock = {
    name: '',
    symbol: '',
    data: undefined
  };

  constructor(
    private dataService: StockDataService
  ) { }

  ngOnInit(): void {

  }

  requestData(ticker: string): void {
    this.dataService.getStock(ticker)
      .pipe(take(1))
      .subscribe(data => {
        this.stock.name = "Microsoft";
        this.stock.symbol = "MSFT";
        this.stock.data = DataManager.toDTO(data);

        console.log(this.stock);
      });
  }

}
