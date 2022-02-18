import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { take } from 'rxjs/operators';
import { Stock } from 'src/app/model/stock';
import { StockDataService } from 'src/app/services/stock-data.service';
import { DataManager } from 'src/app/utils/data-manager.util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  stock: Stock = {
    name: '',
    symbol: '',
    data: undefined
  };

  multi!: any[];
  
  // W, H
  view: [number, number] = [1600, 1200];

  legend: boolean = true;
  showLabels: boolean = false;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Price';
  timeline: boolean = true;

  colorScheme: Color = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
    name: 'Joshua',
    selectable: false,
    group: ScaleType.Time
  };


  constructor(private dataService: StockDataService) { }

  ngOnInit(): void {
    this.requestData('MSFT');
  }

  onSelect(event: any) {
    console.log(event);
  }

  requestData(ticker: string): void {
    this.dataService.getStock(ticker)
      .pipe(take(1))
      .subscribe(data => {
        this.stock.name = "Microsoft";
        this.stock.symbol = "MSFT";
        this.stock.data = DataManager.toDTO(data);

        console.log(this.stock);

        console.log(DataManager.toOpenSeries(this.stock));

        this.multi = DataManager.toOpenSeries(this.stock);
      });
  }

}
