import flask
from flask import request, jsonify

from business_logic import stock_service

app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
    return '''<h1>Stock Visualizer web service!</h1>'''

@app.route('/api/stock/all', methods=['GET'])
def get_stock():
    data_dict = dict()
    stock_data = stock_service.get_stock('nasdaq', 'MSFT')

    for col in stock_data:
        data_dict[col] = stock_data[col].values.tolist()

    return jsonify(data_dict)

app.run()