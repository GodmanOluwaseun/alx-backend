#!/usr/bin/env python3
"""0-app
Flask App that that outputs page title and header.
"""

from flask import Flask, render_template


app = Flask(__name__)

@app.route('/')
def home():
    """Return page title and header"""
    return render_template('index.html', title='Welcome to Holberton', header="Hello world")

if __name__ == '__main__':
    app.run()