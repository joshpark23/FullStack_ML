import { Data } from './../complex-types/data.ct';
export class DataManager {

    constructor() {

    }

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
}