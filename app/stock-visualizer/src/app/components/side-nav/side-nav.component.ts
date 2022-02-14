import { StockDataService } from './../../services/stock-data.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor(
    private dataService: StockDataService
  ) { }

  ngOnInit(): void {

  }

  requestData(ticker: string): void {
    this.dataService.getStock(ticker)
      .pipe(take(1))
      .subscribe(data => {
        console.table(data);
      })
  }

}
