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

    /**
     * Generates a graphable object of the stock's last 500 opening prices.
     * 
     * @param stock Stock object to chart
     * @returns A "multi" object of the Stock's "open" values
     */
    static toOpenSeries(stock: Stock): any[] {
        if (!stock.data) return [{}];

        const obj = [{
            "name": stock.name,
            "series": [{}]
        }];

        obj[0].series.shift();

        let length = stock.data.open.length;

        for (let i = length - 500; i < stock.data.open.length; i++) {
            let seriesDataObj = {
                "name": stock.data.date[i],
                "value": 0
            };

            seriesDataObj.value = stock.data.open[i];

            obj[0].series.push(seriesDataObj);
        }

        return obj;
    }
}