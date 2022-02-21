import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
   
from pandas.plotting import autocorrelation_plot
from sklearn.model_selection import train_test_split

import tensorflow as tf
from tensorflow.keras import *
from tensorflow.keras.layers import Conv1D, LSTM, Dense, Dropout, Bidirectional, TimeDistributed
from tensorflow.keras.layers import MaxPooling1D, Flatten
from tensorflow.keras.models import load_model
from tensorflow.keras.regularizers import L1, L2
from tensorflow.keras.metrics import Accuracy
from tensorflow.keras.metrics import RootMeanSquaredError

from sklearn.metrics import explained_variance_score, mean_poisson_deviance, mean_gamma_deviance
from sklearn.metrics import r2_score
from sklearn.metrics import max_error

class MLDataAccess:

    def __init__(self):
        self.data_path = ''

    def create_model(self, x_train, x_test, y_train, y_test):

        model = Sequential()

        # Creating the Neural Network model here...
        # CNN layers
        model.add(TimeDistributed(Conv1D(64, kernel_size=3, activation='relu', input_shape=(None, 100, 1))))
        model.add(TimeDistributed(MaxPooling1D(2)))
        model.add(TimeDistributed(Conv1D(128, kernel_size=3, activation='relu')))
        model.add(TimeDistributed(MaxPooling1D(2)))
        model.add(TimeDistributed(Conv1D(64, kernel_size=3, activation='relu')))
        model.add(TimeDistributed(MaxPooling1D(2)))
        model.add(TimeDistributed(Flatten()))

        # LSTM layers
        model.add(Bidirectional(LSTM(100, return_sequences=True)))
        model.add(Dropout(0.5))
        model.add(Bidirectional(LSTM(100, return_sequences=False)))
        model.add(Dropout(0.5))

        # Final layers
        model.add(Dense(1, activation='linear'))
        model.compile(optimizer='adam', loss='mse', metrics=['mse', 'mae'])

        model.fit(x_train, y_train, validation_data=(x_test,y_test), epochs=40,batch_size=40, verbose=1, shuffle =True)

        # Evaluating the model
        model.evaluate(x_train, x_test)
        
        # predict probabilities for test set
        yhat_probs = model.predict(x_test, verbose=0)
        # reduce to 1d array
        yhat_probs = yhat_probs[:, 0]

        variance = explained_variance_score(y_test.reshape(-1,1), yhat_probs)
        r2_score = r2_score(y_test.reshape(-1,1), yhat_probs)
        max_error = max_error(y_test.reshape(-1,1), yhat_probs)

        predicted  = model.predict(x_test)
        predicted = np.array(predicted[:,0]).reshape(-1,1)

        model.save("/Users/joshpark/Desktop/Projects/FullStack_ML/server/cnn_models/lstm_model.h5")

        return load_model("/Users/joshpark/Desktop/Projects/FullStack_ML/server/cnn_models/lstm_model.h5")

    def read_model(self, model_name: str):

        return load_model(F"/Users/joshpark/Desktop/Projects/FullStack_ML/server/cnn_models/{model_name}.h5")

    def update_model(self, model_name: str):

        # Load the model
        model = self.read_model(model_name)

        # Train a new model, evaluate both on the new AND old test data. Overwrite if the new one outperforms.

        return

    def delete_model(self, mode_name: str):

        # Delete the model from the directory

        return