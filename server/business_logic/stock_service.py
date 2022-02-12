from data_access import stock_data_access

_data = stock_data_access.StockDataAccess()

def get_stock(exchange, quote):
    return _data.get_stock(exchange, quote)