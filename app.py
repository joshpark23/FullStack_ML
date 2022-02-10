import flask
from flask import request, jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
    return '''<h1>StockPrediction API</h1><p>Welcome back, Josh.</p>'''

@app.route('/api/v1/stocks/{exchange}', methods=['GET'])
def api_id():
    # Check if an ID was provided as part of the URL.
    # If ID is provided, assign it to a variable.
    # If no ID is provided, display an error in the browser.
    if 'exchange' in request.args:
        id = int(request.args['exchange'])
    else:
        return "Error: No id field provided. Please specify an id."

    return_data = []

    # Use the jsonify function from Flask to convert our list of
    # Python dictionaries to the JSON format.
    return jsonify(return_data)

app.run()