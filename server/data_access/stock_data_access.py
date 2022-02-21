import numpy as np
import pandas as pd

class StockDataAccess:

    def __init__(self):
        self.data_path = '/Users/joshpark/Desktop/Projects/FullStack_ML/server/data/'

    def get_stock(self, exchange: str, quote: str) -> pd.DataFrame:
        path = self.data_path + f'{exchange}' + '/csv/' + f'{quote}' + '.csv'
        return pd.read_csv(path)