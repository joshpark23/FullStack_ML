from data_access import stock_data_access, ml_data_access

import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import math
import seaborn as sns
import datetime as dt
from datetime import datetime    
from pandas.plotting import autocorrelation_plot
from sklearn.model_selection import train_test_split

import tensorflow as tf
from tensorflow.keras.layers import Conv1D, LSTM, Dense, Dropout, Bidirectional, TimeDistributed
from tensorflow.keras.layers import MaxPooling1D, Flatten
from tensorflow.keras.regularizers import L1, L2
from tensorflow.keras.metrics import Accuracy
from tensorflow.keras.metrics import RootMeanSquaredError

_data = ml_data_access.MLDataAccess()

def prepare_data(data: pd.DataFrame) -> pd.DataFrame:

    data.reset_index(drop=True, inplace=True)
    data.fillna(data.mean(), inplace=True)

    ma_day = [10,50,100]

    for ma in ma_day:
        column_name = "MA for %s days" %(str(ma))
        data[column_name]=pd.DataFrame.rolling(data['Close'],ma).mean()

    data['Daily Return'] = data['Close'].pct_change()

    data.reset_index(drop=True, inplace=True)
    data.fillna(data.mean(), inplace=True)

    data.sort_index(axis=1,ascending=True)

    return data

def prepare_train_test_data(data: pd.DataFrame) -> tuple(np.ndarray, np.ndarray, np.ndarray):

    X = []
    Y = []
    window_size=100
    for i in range(1 , len(data) - window_size -1 , 1):
        first = data.iloc[i,2]
        temp = []
        temp2 = []
        for j in range(window_size):
            temp.append((data.iloc[i + j, 2] - first) / first)
        temp2.append((data.iloc[i + window_size, 2] - first) / first)
        X.append(np.array(temp).reshape(100, 1))
        Y.append(np.array(temp2).reshape(1, 1))

    x_train, x_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, shuffle=True)

    train_X = np.array(x_train)
    test_X = np.array(x_test)
    train_Y = np.array(y_train)
    test_Y = np.array(y_test)

    train_X = train_X.reshape(train_X.shape[0],1,100,1)
    test_X = test_X.reshape(test_X.shape[0],1,100,1)

    return train_X, test_X, train_Y, test_Y

def create_model(model_name: str, data: pd.DataFrame): 

    # Check the directory if we have an existing model, if so throw an exception

    prepared_data = prepare_data(data)

    return _data.create_model(prepare_train_test_data(prepared_data))

def update_model(model_name: str):
    return _data.update_model(model_name)
