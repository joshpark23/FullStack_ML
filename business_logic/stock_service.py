import sys

sys.path.insert(0, '/Users/joshpark/Desktop/Projects/FullStack_ML/src/data_access/')

from data_access.stock_data_access import StockDataAccess

test = StockDataAccess()
test.get_stock('MSFT')