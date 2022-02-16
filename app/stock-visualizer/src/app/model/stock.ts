import { Data } from './../complex-types/data.ct';

export interface Stock {
    name: string,
    symbol: string, 
    data: Data | undefined
}