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


  constructor(
  ) { }

  ngOnInit(): void {

  }


}
