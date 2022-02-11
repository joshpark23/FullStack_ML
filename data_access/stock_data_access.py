import numpy as np
import pandas as pd

class StockDataAccess:

    def __init__(self):
        self.data_path = '/Users/joshpark/Desktop/Projects/FullStack_ML/data/stock_market_data'
    
    def get_stock(self, exchange, quote):
        path = self.data_path + f'{exchange}' + '/' + f'{quote}'
        return pd.read_csv(path)