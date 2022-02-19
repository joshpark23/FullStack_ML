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
  view: [number, number] = [900, 600];

  legend: boolean = false;
  showLabels: boolean = false;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Price';
  timeline: boolean = true;

  colorScheme: Color = {
    domain: ['#68f2a9'],
    name: 'Joshua',
    selectable: true,
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

        this.multi = DataManager.toRangeSeries(this.stock,500);
      });
  }

}
