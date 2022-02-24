import json

from typing import Any
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

class DatabaseAccess:

    def __init__(self):

        self.app = Flask(__name__)
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
        self.db = SQLAlchemy(self.app)