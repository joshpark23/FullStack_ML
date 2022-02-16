import { Stock } from './../model/stock';
import { Series, SeriesData } from './../model/series';
import { Data } from './../complex-types/data.ct';
export class DataManager {

    constructor() {

    }

    // {
    //     "name": "Germany",
    //     "series": [
    //       {
    //         "name": "1990",
    //         "value": 62000000
    //       },
    //       {
    //         "name": "2010",
    //         "value": 73000000
    //       },
    //       {
    //         "name": "2011",
    //         "value": 89400000
    //       }
    //     ]
    // }

    static toDTO(data: any): Data {
        const stockData: Data = {
            date: [],
            adjustedClose: [],
            close: [],
            high: [],
            low: [],
            open: [],
            volume: []
        };

        stockData.date = data['Date'];
        stockData.adjustedClose = data['Adjusted Close'];
        stockData.low = data['Low'];
        stockData.high = data['High'];
        stockData.volume = data['Volume'];
        stockData.open = data['Open'];
        stockData.close = data['Close'];

        return stockData
    }

    static toOpenSeries(stock: Stock) {
        const series: Series = {
            name: '',
            series: []
        };

        series.name = stock.name;
        
        if (!stock.data) return series;

        stock.data.open.forEach(openVal => {
            let seriesDataObj: SeriesData = {
                name: '',
                value: 0
            };

            seriesDataObj.name = 'open';
            seriesDataObj.value = openVal;

            series.series.push(seriesDataObj);
        });

        return series;
    }
}